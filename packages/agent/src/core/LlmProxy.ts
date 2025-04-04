import OpenAI from "openai";

/**
 * A promise or a value.
 */
export type PromiseOrValue<T> = Promise<T> | T;

/**
 * A handler for text.
 *
 * This type is used to simplify the process of handling text.
 */
export type TextHandler<I, O> = (input: I, text: string) => PromiseOrValue<O>;

/**
 * A handler for tool calls.
 *
 * This type is used to simplify the process of handling tool calls.
 */
export type ToolHandler<I, O> = (
  input: I,
  toolCallId: string,
  toolName: string,
  toolInput: unknown,
) => PromiseOrValue<O>;

/**
 * A strategy for retrying a request.
 */
export interface ILlmBackoffStrategy {
  /**
   * The maximum number of attempts to make.
   */
  maximumAttempts: number;

  /**
   * The base delay in milliseconds.
   */
  baseDelay: number;

  /**
   * The maximum delay in milliseconds.
   */
  maximumDelay: number;
}

/**
 * An error that occurs when the LLM fails to generate a valid output.
 *
 * Throw this type of error inside of the {@link TextHandler} or {@link ToolHandler}
 * to indicate that the LLM has failed to generate a valid output and the request
 * should be retried.
 */
export class LlmFailure {
  constructor(private readonly message: string) {}

  getMessage(): string {
    return this.message;
  }
}

/**
 * An error that occurs when the LLM fails to generate any valid output, even after a few retries.
 *
 * You should review and edit the prompt if this error occurs.
 */
export class LlmUnrecoverableError {
  constructor(private readonly message: string) {}

  getMessage(): string {
    return this.message;
  }
}

/**
 * Create a completion.
 *
 * This function will create a completion for the given body and options.
 *
 * It retries the request when the LLM returns a 429 or a 5xx error.
 *
 * @param api - The API to use to create the completion.
 * @param body - The body of the request to the LLM.
 * @param options - The options for the request to the LLM.
 * @param backoffStrategy - The backoff strategy to use for the request to the LLM.
 * @returns The completion.
 */
async function createCompletion(
  api: OpenAI,
  body: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
  options?: OpenAI.RequestOptions,
  backoffStrategy?: ILlmBackoffStrategy,
): Promise<OpenAI.ChatCompletion> {
  const backoffStrategyOrDefault = backoffStrategy ?? {
    maximumAttempts: 5,
    baseDelay: 1000,
    maximumDelay: 5000,
  };

  if (backoffStrategyOrDefault.maximumAttempts < 1) {
    throw new Error("maximumAttempts must be greater than 0");
  }

  for (let i = 1; i <= backoffStrategyOrDefault.maximumAttempts; ++i) {
    try {
      const completion = await api.chat.completions.create(body, options);

      if (completion.choices.length === 0) {
        continue;
      }

      return completion;
    } catch (error: unknown) {
      if (
        error instanceof OpenAI.APIError &&
        (error.status === 429 || (500 <= error.status && error.status <= 599))
      ) {
        if (i === backoffStrategyOrDefault.maximumAttempts) {
          throw error;
        }

        const jitter = Math.random() * backoffStrategyOrDefault.baseDelay;
        const delay = Math.min(
          backoffStrategyOrDefault.baseDelay * 2 ** (i - 1) + jitter,
          backoffStrategyOrDefault.maximumDelay,
        );
        let delayWithRetryAfter = delay;

        if (
          error.status === 429 &&
          error.headers &&
          "retry-after" in error.headers
        ) {
          let retryAfter = parseInt(error.headers["retry-after"]);

          if (isNaN(retryAfter)) {
            retryAfter =
              (Date.parse(error.headers["retry-after"]) - Date.now()) / 1000;
          }

          if (!isNaN(retryAfter) && 0 < retryAfter) {
            delayWithRetryAfter = Math.max(delay, retryAfter * 1000);
          }
        }

        await new Promise((resolve) =>
          setTimeout(resolve, delayWithRetryAfter),
        );
      } else {
        throw error;
      }
    }
  }

  throw new Error("unreachable");
}

/**
 * A proxy for an LLM.
 *
 * This class simplifies the process of calling an LLM by providing a way to
 * handle text and tool calls. It automatically retries the request when the LLM
 * fails to generate a valid output.
 */
export class LlmProxy<I, O> {
  private textHandler: TextHandler<I, O> | undefined;
  private readonly toolHandlers: Map<string, ToolHandler<I, O>> = new Map();
  private errorCallback: ((error: LlmFailure) => void) | undefined;

  /**
   * Set the text handler.
   *
   * The text handler is called when the LLM generates text.
   *
   * @param handler - The text handler.
   * @returns The proxy itself.
   */
  withTextHandler(handler: TextHandler<I, O>): this {
    this.textHandler = handler;
    return this;
  }

  /**
   * Set the tool handler.
   *
   * The tool handler is called when the LLM generates a tool call.
   *
   * @param name - The name of the tool.
   * @param handler - The tool handler.
   * @returns The proxy itself.
   */
  withToolHandler(name: string, handler: ToolHandler<I, O>): this {
    this.toolHandlers.set(name, handler);
    return this;
  }

  withErrorCallback(callback: (error: LlmFailure) => void): this {
    this.errorCallback = callback;
    return this;
  }

  /**
   * Call the LLM.
   *
   * This method will call the LLM with the given body and options.
   *
   * @param input - The input to the LLM.
   * @param api - The API to use to call the LLM.
   * @param body - The body of the request to the LLM.
   * @param options - The options for the request to the LLM.
   * @param backoffStrategy - The backoff strategy to use for the request to the LLM.
   * @returns The output of the LLM.
   */
  async call(
    input: I,
    api: OpenAI,
    body: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
    options?: OpenAI.RequestOptions,
    backoffStrategy?: ILlmBackoffStrategy,
  ): Promise<O[]> {
    interface ILastFailure {
      llmOutput: OpenAI.ChatCompletion;
      llmFailure: string;
    }

    let lastFailure: ILastFailure | null = null;
    const MAXIMUM_RETRIES = 5;

    outer: for (let i = 1; i <= MAXIMUM_RETRIES; ++i) {
      const mergedBody = {
        ...body,
        messages: [...body.messages],
      };

      if (lastFailure != null) {
        mergedBody.messages.push(lastFailure.llmOutput.choices[0]!.message);
        mergedBody.messages.push({
          role: "user",
          content: lastFailure.llmFailure,
        });
      }

      const completion = await createCompletion(
        api,
        body,
        options,
        backoffStrategy,
      );

      const outputs: O[] = [];
      const content = completion.choices[0]!.message.content;

      if (content != null) {
        if (this.textHandler == null) {
          lastFailure = {
            llmOutput: completion,
            llmFailure:
              "you should trigger tools instead of generating text; try again",
          };
          continue;
        }

        try {
          outputs.push(await this.textHandler(input, content));
        } catch (error: unknown) {
          if (error instanceof LlmFailure) {
            if (this.errorCallback != null) {
              this.errorCallback(error);
            }

            lastFailure = {
              llmOutput: completion,
              llmFailure: error.getMessage(),
            };
            continue;
          }

          throw error;
        }
      }

      const toolCalls = completion.choices[0]!.message.tool_calls;

      if (toolCalls != null) {
        for (const toolCall of toolCalls) {
          const handler = this.toolHandlers.get(toolCall.function.name);

          if (handler == null) {
            const toolNames = Array.from(this.toolHandlers.keys()).join(", ");
            const message = `tool ${toolCall.function.name} not found; available tools are: ${toolNames}`;
            lastFailure = {
              llmOutput: completion,
              llmFailure: message,
            };
            continue outer;
          }

          let args: unknown;

          try {
            args = JSON.parse(toolCall.function.arguments);
          } catch (error: unknown) {
            if (error instanceof SyntaxError) {
              lastFailure = {
                llmOutput: completion,
                llmFailure: `you've generated invalid JSON: "${error.message}"; try again`,
              };
              continue outer;
            }

            throw error;
          }

          try {
            outputs.push(
              await handler(input, toolCall.id, toolCall.function.name, args),
            );
          } catch (error: unknown) {
            if (error instanceof LlmFailure) {
              if (this.errorCallback != null) {
                this.errorCallback(error);
              }

              lastFailure = {
                llmOutput: completion,
                llmFailure: error.getMessage(),
              };
              continue outer;
            }

            throw error;
          }
        }
      }

      return outputs;
    }

    throw new LlmUnrecoverableError(
      `failed to generate output, despite maximum retries(=${MAXIMUM_RETRIES}); last failure: ${JSON.stringify(lastFailure, null, 2)}`,
    );
  }
}
