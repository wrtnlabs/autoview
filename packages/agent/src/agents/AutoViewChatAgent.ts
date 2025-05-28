import OpenAI from "openai";
import { Stream } from "openai/streaming";
import { isPromise } from "util/types";

import { ILlmBackoffStrategy, createCompletion } from "../core";
import { IAutoViewVendor } from "../structures";
import {
  IAutoViewChatMessage,
  IAutoViewChatMessageTextContent,
  IAutoViewChatMessageToolCallContent,
  IAutoViewChatToolMessage,
} from "../structures/agents/IAutoViewChatMessage";
import {
  AutoViewAgent,
  AutoViewAgentType,
  IAutoViewConfig,
  IAutoViewInput,
  IAutoViewResult,
} from "./AutoViewAgent";
import { prompt } from "./AutoViewChatAgent/prompt";

export interface IAutoViewChatConfig {
  vendor: IAutoViewVendor;
  toolCodeGenVendor: IAutoViewVendor;
  toolMockDataVendor?: IAutoViewVendor;
}

export interface IAutoViewChatSchemaProvider {
  getSchema(): Promise<IAutoViewInput>;
}

export class AutoViewChatAgent<M = undefined> {
  constructor(private config: IAutoViewChatConfig) {}

  createMessageEmitter(sessionId: string): AutoViewChatAgentDriver<M> {
    return new AutoViewChatAgentDriver(sessionId, this.config);
  }
}

export type AutoViewChatAgentErrorHandler = (
  error: unknown,
) => void | Promise<void>;

export type AutoViewChatAgentEventHandler = (
  event: AutoViewChatAgentEvent,
) => void | Promise<void>;

export type AutoViewChatAgentMessageHandler = (
  message: IAutoViewChatMessage,
) => void | Promise<void>;

export type AutoViewChatAgentStreamingMessageHandler = (
  id: string,
  role: "assistant",
  partialContent: string,
) => void | Promise<void>;

export type AutoViewChatAgentEvent =
  | AutoViewChatAgentPreLlmGenerationEvent
  | AutoViewChatAgentPostLlmGenerationEvent
  | AutoViewChatAgentProcessingEvent
  | AutoViewChatAgentPreComponentGenerationEvent
  | AutoViewChatAgentPostComponentGenerationEvent;

export interface AutoViewChatAgentEventBase<T extends string> {
  type: T;
}

export interface AutoViewChatAgentPreLlmGenerationEvent
  extends AutoViewChatAgentEventBase<"pre-llm-generation"> {
  agent: "chat" | AutoViewAgentType;
  sessionId: string;
  api: OpenAI;
  body: OpenAI.Chat.Completions.ChatCompletionCreateParams;
  options: OpenAI.RequestOptions | undefined;
  backoffStrategy: ILlmBackoffStrategy;
}

export interface AutoViewChatAgentPostLlmGenerationEvent
  extends AutoViewChatAgentEventBase<"post-llm-generation"> {
  agent: "chat" | AutoViewAgentType;
  sessionId: string;
  api: OpenAI;
  body: OpenAI.Chat.Completions.ChatCompletionCreateParams;
  options: OpenAI.RequestOptions | undefined;
  backoffStrategy: ILlmBackoffStrategy;
  completion: (
    | OpenAI.Chat.Completions.ChatCompletion
    | Stream<OpenAI.Chat.Completions.ChatCompletionChunk>
  ) & {
    _request_id?: string | null;
  };
  startTimestamp: Date;
  endTimestamp: Date;
}

export interface AutoViewChatAgentProcessingEvent
  extends AutoViewChatAgentEventBase<"processing"> {}

export interface AutoViewChatAgentPreComponentGenerationEvent
  extends AutoViewChatAgentEventBase<"pre-component-generation"> {}

export interface AutoViewChatAgentPostComponentGenerationEvent
  extends AutoViewChatAgentEventBase<"post-component-generation"> {
  result: IAutoViewResult;
}

export class AutoViewChatAgentDriver<M = undefined> {
  private errorHandler?: AutoViewChatAgentErrorHandler;
  private eventHandler?: AutoViewChatAgentEventHandler;
  private messageHandler?: AutoViewChatAgentMessageHandler;
  private streamingMessageHandler?: AutoViewChatAgentStreamingMessageHandler;

  constructor(
    private sessionId: string,
    private config: IAutoViewChatConfig,
  ) {}

  withErrorHandler(
    handler: AutoViewChatAgentErrorHandler,
  ): AutoViewChatAgentDriver<M> {
    this.errorHandler = handler;
    return this;
  }

  withEventHandler(
    handler: AutoViewChatAgentEventHandler,
  ): AutoViewChatAgentDriver<M> {
    this.eventHandler = handler;
    return this;
  }

  withMessageHandler(
    handler: AutoViewChatAgentMessageHandler,
  ): AutoViewChatAgentDriver<M> {
    this.messageHandler = handler;
    return this;
  }

  withStreamingMessageHandler(
    handler: AutoViewChatAgentStreamingMessageHandler,
  ): AutoViewChatAgentDriver<M> {
    this.streamingMessageHandler = handler;
    return this;
  }

  private sendError(context: string, error: unknown): void {
    // SAFETY: It might be useful if we have some mechanism to handle cases where error reporting is not possible.
    // Currently this kind of errors are not handled.
    void this.errorHandler?.(
      `[ERROR] ${context}: ${JSON.stringify(error, null, 2)}`,
    );
  }

  private sendEvent(event: AutoViewChatAgentEvent): void {
    const result = this.eventHandler?.(event);

    if (!isPromise(result)) {
      return;
    }

    result.catch((error) =>
      this.sendError(`emitting event ${event.type}`, error),
    );
  }

  private sendMessage(message: IAutoViewChatMessage): void {
    const result = this.messageHandler?.(message);

    if (!isPromise(result)) {
      return;
    }

    result.catch((error) =>
      this.sendError(`sending message ${message.id}`, error),
    );
  }

  private sendStreamingMessage(
    id: string,
    role: "assistant",
    partialContent: string,
  ): void {
    const result = this.streamingMessageHandler?.(id, role, partialContent);

    if (!isPromise(result)) {
      return;
    }

    result.catch((error) =>
      this.sendError(`sending streaming message ${id}`, {
        error,
        id,
        role,
        partialContent,
      }),
    );
  }

  async send(
    schemaProvider: IAutoViewChatSchemaProvider,
    context: IAutoViewChatMessage[],
  ): Promise<void> {
    try {
      const [id, timestamp, content, toolCalls] =
        await this.callStream(context);

      this.sendMessage({
        id,
        role: "assistant",
        timestamp,
        contents: [
          {
            type: "text",
            text: content,
          } satisfies IAutoViewChatMessageTextContent,
          ...toolCalls.map(
            (toolCall) =>
              ({
                type: "tool",
                id: toolCall.id,
                tool_name: toolCall.toolName,
                arguments: toolCall.arguments,
              }) satisfies IAutoViewChatMessageToolCallContent,
          ),
        ],
      });

      interface CallResult {
        value: string;
        timestamp: Date;
      }

      const callResults: Promise<CallResult>[] = [];

      for (const toolCall of toolCalls) {
        let result: Promise<string>;

        switch (toolCall.toolName) {
          case "generate_auto_view_component":
            {
              this.sendEvent({
                type: "pre-component-generation",
              });

              result = generateAutoViewComponent(
                {
                  sessionId: this.sessionId,
                  vendor: this.config.toolCodeGenVendor,
                  mockDataVendor: this.config.toolMockDataVendor,
                  input: await schemaProvider.getSchema(),
                  onPreLlmGeneration: async (
                    agent,
                    sessionId,
                    api,
                    body,
                    options,
                    backoffStrategy,
                  ) => {
                    const startTimestamp = new Date();
                    this.sendEvent({
                      type: "pre-llm-generation",
                      agent,
                      sessionId,
                      api,
                      body,
                      options,
                      backoffStrategy,
                    });

                    return async (agent, sessionId, completion) => {
                      const endTimestamp = new Date();
                      this.sendEvent({
                        type: "post-llm-generation",
                        agent,
                        sessionId,
                        api,
                        body,
                        options,
                        backoffStrategy,
                        completion,
                        startTimestamp,
                        endTimestamp,
                      });
                    };
                  },
                },
                toolCall.arguments,
                undefined,
              ).then((result) => {
                this.sendEvent({
                  type: "post-component-generation",
                  result,
                });

                if (result.status === "success") {
                  return result.tsxCodeGeneratedOnly;
                } else {
                  return `[FAILURE] ${result.reason}`;
                }
              });
            }
            break;
          default:
            {
              result = Promise.resolve(
                `[FAILURE] Unknown tool name: ${toolCall.toolName}`,
              );
            }
            break;
        }

        callResults.push(
          result
            .then((result) => ({
              value: result,
              timestamp: new Date(),
            }))
            .catch((error) => {
              this.sendError(`calling tool ${toolCall.toolName}`, error);

              return {
                value: `[FAILURE] ${error}`,
                timestamp: new Date(),
              };
            }),
        );
      }

      const results = await Promise.all(callResults);
      const joined = toolCalls.map((toolCall, index) => ({
        toolCall,
        result: results[index]!,
      }));

      for (const { toolCall, result } of joined) {
        this.sendMessage({
          id: toolCall.id,
          role: "tool",
          timestamp: result.timestamp,
          tool_call_id: toolCall.id,
          tool_name: toolCall.toolName,
          contents: [
            {
              type: "text",
              text: result.value,
            } satisfies IAutoViewChatMessageTextContent,
          ],
        } satisfies IAutoViewChatToolMessage);
      }
    } catch (error: unknown) {
      this.sendError("calling the LLM", error);
    }
  }

  private async callStream(
    context: IAutoViewChatMessage[],
  ): Promise<[string, Date, string, ToolCallPart[]]> {
    const stream = await createCompletion(
      this.config.vendor.api,
      createBodyFromContext(this.config, context),
      this.config.vendor.options,
      undefined,
      async (api, body, options, backoffStrategy) => {
        const startTimestamp = new Date();
        this.sendEvent({
          type: "pre-llm-generation",
          agent: "chat",
          sessionId: this.sessionId,
          api,
          body,
          options,
          backoffStrategy,
        });

        return async (completion) => {
          const endTimestamp = new Date();
          this.sendEvent({
            type: "post-llm-generation",
            agent: "chat",
            sessionId: this.sessionId,
            api,
            body,
            options,
            backoffStrategy,
            completion,
            startTimestamp,
            endTimestamp,
          });
        };
      },
    );

    let id: string | undefined;
    let timestamp: Date | undefined;
    const toolCallParts: Map<number, ToolCallPart> = new Map();
    const contentParts: string[] = [];

    for await (const chunk of stream) {
      if (!id) {
        id = chunk.id;
      }

      if (!timestamp) {
        timestamp = new Date(chunk.created);
      }

      const choice = chunk.choices[0];

      if (!choice) {
        continue;
      }

      if (choice.delta.content) {
        contentParts.push(choice.delta.content);
        this.sendStreamingMessage(chunk.id, "assistant", choice.delta.content);
      }

      if (choice.delta.tool_calls) {
        for (const toolCall of choice.delta.tool_calls) {
          let toolCallPart = toolCallParts.get(toolCall.index);

          if (!toolCallPart) {
            toolCallPart = {
              id: toolCall.id ?? "",
              toolName: toolCall.function?.name ?? "",
              arguments: toolCall.function?.arguments ?? "",
            };

            toolCallParts.set(toolCall.index, toolCallPart);
          }

          if (toolCall.id) {
            toolCallPart.id += toolCall.id;
          }

          if (toolCall.function?.name) {
            toolCallPart.toolName += toolCall.function.name;
          }

          if (toolCall.function?.arguments) {
            toolCallPart.arguments += toolCall.function.arguments;
          }
        }
      }
    }

    const toolCalls = Array.from(toolCallParts.entries())
      .sort(([a], [b]) => a - b)
      .map(([, toolCallPart]) => toolCallPart);
    const content = contentParts.join("");

    return [id ?? "", timestamp ?? new Date(), content, toolCalls];
  }
}

interface ToolCallPart {
  id: string;
  toolName: string;
  arguments: string;
}

function createBodyFromContext(
  config: IAutoViewChatConfig,
  context: IAutoViewChatMessage[],
): OpenAI.Chat.Completions.ChatCompletionCreateParamsStreaming {
  return {
    model: config.vendor.model,
    messages: [
      {
        role: "developer",
        content: prompt({
          component_code: "",
          component_schema: "",
        }),
      },
      ...context.map(toOpenAIMessage),
    ],
    ...(config.vendor.isThinkingEnabled ? { reasoning_effort: "medium" } : {}),
    tools: [generateAutoViewComponentTool()],
    stream: true,
    stream_options: {
      include_usage: true,
    },
  };
}

function toOpenAIMessage(
  message: IAutoViewChatMessage,
): OpenAI.Chat.Completions.ChatCompletionMessageParam {
  switch (message.role) {
    case "developer": {
      return {
        role: "developer",
        content: message.contents.map(
          (content) =>
            ({
              type: "text",
              text: content.text,
            }) satisfies OpenAI.Chat.Completions.ChatCompletionContentPartText,
        ),
      } satisfies OpenAI.Chat.Completions.ChatCompletionDeveloperMessageParam;
    }
    case "user": {
      return {
        role: "user",
        content: message.contents.map((content) =>
          content.type === "image"
            ? ({
                type: "image_url",
                image_url: {
                  url: content.image_url,
                  detail: "auto",
                },
              } satisfies OpenAI.Chat.Completions.ChatCompletionContentPartImage)
            : ({
                type: "text",
                text: content.text,
              } satisfies OpenAI.Chat.Completions.ChatCompletionContentPartText),
        ),
      } satisfies OpenAI.Chat.Completions.ChatCompletionUserMessageParam;
    }
    case "assistant": {
      return {
        role: "assistant",
        content: message.contents
          .filter((content) => content.type === "text")
          .map(
            (content) =>
              ({
                type: "text",
                text: content.text,
              }) satisfies OpenAI.Chat.Completions.ChatCompletionContentPartText,
          ),
        tool_calls: message.contents
          .filter((content) => content.type === "tool")
          .map(
            (content) =>
              ({
                id: content.id,
                type: "function",
                function: {
                  name: content.tool_name,
                  arguments: content.arguments,
                },
              }) satisfies OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
          ),
      } satisfies OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam;
    }
    case "tool": {
      return {
        role: "tool",
        tool_call_id: message.id,
        content: message.contents.map(
          (content) =>
            ({
              type: "text",
              text: content.text,
            }) satisfies OpenAI.Chat.Completions.ChatCompletionContentPartText,
        ),
      } satisfies OpenAI.Chat.Completions.ChatCompletionToolMessageParam;
    }
  }
}

/**
 * A tool that generates an AutoView component.
 */
async function generateAutoViewComponent<M>(
  config: IAutoViewConfig<M>,
  context: string,
  metadata: M,
): Promise<IAutoViewResult> {
  const agent = new AutoViewAgent(config);
  return await agent.generate(context, metadata);
}

function generateAutoViewComponentTool(): OpenAI.Chat.Completions.ChatCompletionTool {
  return {
    type: "function",
    function: {
      name: "generate_auto_view_component",
      description:
        "Generate an AutoView component that visually presents data based on user requirements.",
      parameters: {
        type: "object",
        properties: {
          context: {
            type: "string",
            title: "Context",
            description:
              "Detailed instructions for generating the AutoView component.",
          },
        },
      },
    },
  };
}
