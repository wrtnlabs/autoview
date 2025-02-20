import OpenAI from "openai";

export type PromiseOrValue<T> = Promise<T> | T;

export type TextHandler<I, O> = (input: I, text: string) => PromiseOrValue<O>;
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

export class LlmFailure {
  constructor(private readonly message: string) {}

  getMessage(): string {
    return this.message;
  }
}

async function createCompletion(
  api: OpenAI,
  body: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming,
  options?: OpenAI.RequestOptions,
  backoffStrategy?: ILlmBackoffStrategy,
): Promise<OpenAI.ChatCompletion> {
  const backoffStrat = backoffStrategy ?? {
    maximumAttempts: 5,
    baseDelay: 1000,
    maximumDelay: 5000,
  };

  if (backoffStrat.maximumAttempts < 1) {
    throw new Error("maximumAttempts must be greater than 0");
  }

  for (let i = 1; i <= backoffStrat.maximumAttempts; ++i) {
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
        if (i === backoffStrat.maximumAttempts) {
          throw error;
        }

        const jitter = Math.random() * backoffStrat.baseDelay;
        const delay = Math.min(
          backoffStrat.baseDelay * 2 ** (i - 1) + jitter,
          backoffStrat.maximumDelay,
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

export class LlmProxy<I, O> {
  private textHandler: TextHandler<I, O> | undefined;
  private readonly toolHandlers: Map<string, ToolHandler<I, O>> = new Map();

  withTextHandler(handler: TextHandler<I, O>): this {
    this.textHandler = handler;
    return this;
  }

  withToolHandler(name: string, handler: ToolHandler<I, O>): this {
    this.toolHandlers.set(name, handler);
    return this;
  }

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

    throw new Error(
      `failed to generate output, despite maximum retries(=${MAXIMUM_RETRIES}); last failure: ${JSON.stringify(lastFailure, null, 2)}`,
    );
  }
}
