import * as crypto from "crypto";
import OpenAI from "openai";
import { Stream } from "openai/streaming";
import typia, { TypeGuardError } from "typia";

import { ILlmBackoffStrategy, createCompletion } from "../core";
import { IAutoViewVendor } from "../structures";
import {
  IAutoViewChatAssistantMessage,
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

export interface IAutoViewChatMemoryProvider {
  readMemory(): Promise<IAutoViewChatMemory>;
}

export interface IAutoViewChatMemory {
  schema: IAutoViewInput;
  code: string;
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
  | AutoViewChatAgentPreProcessingEvent
  | AutoViewChatAgentPostProcessingEvent
  | AutoViewChatAgentInvalidToolCallEvent
  | AutoViewChatAgentPreReadSchemaAndCodeEvent
  | AutoViewChatAgentPostReadSchemaAndCodeEvent
  | AutoViewChatAgentPreComponentGenerationEvent
  | AutoViewChatAgentPostComponentGenerationEvent;

export interface AutoViewChatAgentEventBase<T extends string> {
  id: string;
  timestamp: Date;
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

export interface AutoViewChatAgentPreProcessingEvent
  extends AutoViewChatAgentEventBase<"pre-processing"> {}

export interface AutoViewChatAgentPostProcessingEvent
  extends AutoViewChatAgentEventBase<"post-processing"> {
  error?: unknown;
}

export interface AutoViewChatAgentInvalidToolCallEvent
  extends AutoViewChatAgentEventBase<"invalid-tool-call"> {
  toolCall: IAutoViewChatMessageToolCallContent;
  error?: unknown;
}

export interface AutoViewChatAgentPreReadSchemaAndCodeEvent
  extends AutoViewChatAgentEventBase<"pre-read-schema-and-code"> {}

export interface AutoViewChatAgentPostReadSchemaAndCodeEvent
  extends AutoViewChatAgentEventBase<"post-read-schema-and-code"> {
  error?: unknown;
  memory?: IAutoViewChatMemory;
}

export interface AutoViewChatAgentPreComponentGenerationEvent
  extends AutoViewChatAgentEventBase<"pre-component-generation"> {}

export interface AutoViewChatAgentPostComponentGenerationEvent
  extends AutoViewChatAgentEventBase<"post-component-generation"> {
  error?: unknown;
  result?: IAutoViewResult;
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

  private async sendError(context: string, error: unknown): Promise<void> {
    try {
      await this.errorHandler?.(
        `[ERROR] ${context}: ${JSON.stringify(error, null, 2)}`,
      );
    } catch {
      // SAFETY: It might be useful if we have some mechanism to handle cases where error reporting is not possible.
      // Currently this kind of errors are not handled.
    }
  }

  private async sendEvent<
    T extends Omit<AutoViewChatAgentEvent, "id" | "timestamp">,
  >(event: T, pairId?: string): Promise<string> {
    const id = pairId ?? crypto.randomUUID();
    const timestamp = new Date();

    try {
      await this.eventHandler?.({
        id,
        timestamp,
        ...event,
      } as AutoViewChatAgentEvent);
    } catch (error: unknown) {
      await this.sendError(`emitting event ${event.type}`, error);
    }

    return id;
  }

  private async sendMessage(message: IAutoViewChatMessage): Promise<void> {
    try {
      await this.messageHandler?.(message);
    } catch (error: unknown) {
      await this.sendError(`sending message ${message.id}`, error);
    }
  }

  private async sendStreamingMessage(
    id: string,
    role: "assistant",
    partialContent: string,
  ): Promise<void> {
    try {
      await this.streamingMessageHandler?.(id, role, partialContent);
    } catch (error: unknown) {
      await this.sendError(`sending streaming message ${id}`, {
        error,
        id,
        role,
        partialContent,
      });
    }
  }

  async send(
    threadContextProvider: IAutoViewChatMemoryProvider,
    context: IAutoViewChatMessage[],
    userMessage: string,
  ): Promise<void> {
    const userMessageItem = {
      id: crypto.randomUUID(),
      role: "user",
      timestamp: new Date(),
      contents: [
        {
          type: "text",
          text: userMessage,
        } satisfies IAutoViewChatMessageTextContent,
      ],
    } satisfies IAutoViewChatMessage;

    await this.sendMessage(userMessageItem);
    context.push(userMessageItem);

    for (;;) {
      const result = await this.processTurn(threadContextProvider, context);

      if (!result.assistantMessage) {
        break;
      }

      if ((result.toolMessages?.length ?? 0) === 0) {
        break;
      }

      context.push(result.assistantMessage);
      context.push(...(result.toolMessages ?? []));
    }
  }

  private async processTurn(
    threadContextProvider: IAutoViewChatMemoryProvider,
    context: IAutoViewChatMessage[],
  ): Promise<TurnResult> {
    try {
      const preProcessingEventId = await this.sendEvent({
        type: "pre-processing",
      });

      const [id, timestamp, content, toolCalls] = await this.callStream(context)
        .then(async (result) => {
          await this.sendEvent(
            {
              type: "post-processing",
            },
            preProcessingEventId,
          );

          return result;
        })
        .catch(async (error) => {
          await this.sendEvent(
            {
              type: "post-processing",
              error,
            },
            preProcessingEventId,
          );

          throw error;
        });

      const assistantMessage = {
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
      } satisfies IAutoViewChatAssistantMessage;
      await this.sendMessage(assistantMessage);

      if (toolCalls.length === 0) {
        return {
          assistantMessage,
          toolMessages: [],
        };
      }

      interface CallResult {
        value: string;
        timestamp: Date;
      }

      const callResults: Promise<CallResult>[] = [];

      for (const toolCall of toolCalls) {
        let result: Promise<string>;

        switch (toolCall.toolName) {
          case "read_schema_and_code":
            {
              result = this.triggerReadSchemaAndCode(threadContextProvider);
            }
            break;
          case "generate_auto_view_component":
            {
              interface GenerateAutoViewComponentArguments {
                context: string;
              }

              let args: GenerateAutoViewComponentArguments;

              try {
                args = JSON.parse(toolCall.arguments);
                typia.assertGuard<GenerateAutoViewComponentArguments>(args);
              } catch (error: unknown) {
                let errorMessage: string;

                if (error instanceof TypeGuardError) {
                  errorMessage = `[FAILURE] Invalid arguments: ${error}`;
                } else {
                  errorMessage = `[FAILURE] Unable to parse arguments: ${error}`;
                }

                await this.sendEvent({
                  type: "invalid-tool-call",
                  toolCall: {
                    type: "tool",
                    id: toolCall.id,
                    tool_name: toolCall.toolName,
                    arguments: toolCall.arguments,
                  },
                  error: errorMessage,
                });

                result = Promise.resolve(errorMessage);
                break;
              }

              result = this.triggerGenerateAutoViewComponent(
                threadContextProvider,
                args.context,
              );
            }
            break;
          default:
            {
              const errorMessage = `[FAILURE] Unknown tool name: ${toolCall.toolName}`;

              await this.sendEvent({
                type: "invalid-tool-call",
                toolCall: {
                  type: "tool",
                  id: toolCall.id,
                  tool_name: toolCall.toolName,
                  arguments: toolCall.arguments,
                },
                error: errorMessage,
              });

              result = Promise.resolve(errorMessage);
            }
            break;
        }

        callResults.push(
          result
            .then((result) => ({
              value: result,
              timestamp: new Date(),
            }))
            .catch(async (error) => {
              await this.sendError(`calling tool ${toolCall.toolName}`, error);

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

      const toolMessages = joined.map(
        ({ toolCall, result }) =>
          ({
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
          }) satisfies IAutoViewChatToolMessage,
      );

      for (const toolMessage of toolMessages) {
        await this.sendMessage(toolMessage);
      }

      return {
        assistantMessage,
        toolMessages,
      };
    } catch (error: unknown) {
      await this.sendError("calling the LLM", error);

      return {};
    }
  }

  private async callStream(
    context: IAutoViewChatMessage[],
  ): Promise<[string, Date, string, ToolCallPart[]]> {
    let preLlmGenerationEvent:
      | AutoViewChatAgentPreLlmGenerationEvent
      | undefined;

    const stream = await createCompletion(
      this.config.vendor.api,
      createBodyFromContext(this.config, context),
      this.config.vendor.options,
      undefined,
      (api, body, options, backoffStrategy) => {
        preLlmGenerationEvent = {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          type: "pre-llm-generation",
          agent: "chat",
          sessionId: this.sessionId,
          api,
          body,
          options,
          backoffStrategy,
        };
      },
    );

    if (preLlmGenerationEvent) {
      await this.sendEvent(preLlmGenerationEvent, preLlmGenerationEvent.id);
    }

    let id: string | undefined;
    let timestamp: Date | undefined;
    let usage: OpenAI.Completions.CompletionUsage | undefined;
    let finishReason:
      | OpenAI.Chat.Completions.ChatCompletion.Choice["finish_reason"]
      | undefined;
    let completion: OpenAI.Chat.Completions.ChatCompletion | undefined;
    const toolCallParts: Map<number, ToolCallPart> = new Map();
    const contentParts: string[] = [];

    for await (const chunk of stream) {
      if (!id) {
        id = chunk.id;
      }

      if (!timestamp) {
        timestamp = new Date(chunk.created);
      }

      if (!usage) {
        usage = chunk.usage ?? undefined;
      }

      if (!completion) {
        completion = {
          id: chunk.id,
          choices: [],
          created: chunk.created,
          model: chunk.model,
          object: "chat.completion",
          service_tier: chunk.service_tier,
          system_fingerprint: chunk.system_fingerprint,
        };
      }

      const choice = chunk.choices[0];

      if (!choice) {
        continue;
      }

      if (choice.delta.content) {
        contentParts.push(choice.delta.content);
        await this.sendStreamingMessage(
          chunk.id,
          "assistant",
          choice.delta.content,
        );
      }

      if (choice.delta.tool_calls) {
        for (const toolCall of choice.delta.tool_calls) {
          let toolCallPart = toolCallParts.get(toolCall.index);

          if (!toolCallPart) {
            toolCallPart = {
              id: "",
              toolName: "",
              arguments: "",
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

      if (choice.finish_reason) {
        finishReason = choice.finish_reason;
      }
    }

    const endTimestamp = new Date();
    const toolCalls = Array.from(toolCallParts.entries())
      .sort(([a], [b]) => a - b)
      .map(([, toolCallPart]) => toolCallPart);
    const content = contentParts.join("");

    if (finishReason && completion) {
      if (usage) {
        completion.usage = usage;
      }

      completion.choices.push({
        index: 0,
        logprobs: null,
        finish_reason: finishReason,
        message: {
          role: "assistant",
          content: content,
          refusal: null,
          tool_calls:
            toolCalls.length === 0
              ? undefined
              : toolCalls.map((toolCall) => ({
                  id: toolCall.id,
                  type: "function",
                  function: {
                    name: toolCall.toolName,
                    arguments: toolCall.arguments,
                  },
                })),
        },
      });
    }

    if (preLlmGenerationEvent && completion) {
      await this.sendEvent(
        {
          type: "post-llm-generation",
          agent: preLlmGenerationEvent.agent,
          sessionId: preLlmGenerationEvent.sessionId,
          api: preLlmGenerationEvent.api,
          body: preLlmGenerationEvent.body,
          options: preLlmGenerationEvent.options,
          backoffStrategy: preLlmGenerationEvent.backoffStrategy,
          completion,
          startTimestamp: preLlmGenerationEvent.timestamp,
          endTimestamp,
        },
        preLlmGenerationEvent.id,
      );
    }

    return [id ?? "", timestamp ?? new Date(), content, toolCalls];
  }

  private async triggerReadSchemaAndCode(
    threadContextProvider: IAutoViewChatMemoryProvider,
  ): Promise<string> {
    const preReadSchemaAndCodeEventId = await this.sendEvent({
      type: "pre-read-schema-and-code",
    });

    try {
      const result = await readSchemaAndCode(threadContextProvider);

      await this.sendEvent(
        {
          type: "post-read-schema-and-code",
          memory: result,
        },
        preReadSchemaAndCodeEventId,
      );

      return `Here is the current schema and component code:

  <schema>
  ${result.schema}
  </schema>

  <component_code>
  ${result.code}
  </component_code>`;
    } catch (error: unknown) {
      await this.sendEvent(
        {
          type: "post-read-schema-and-code",
          error,
        },
        preReadSchemaAndCodeEventId,
      );

      throw error;
    }
  }

  private async triggerGenerateAutoViewComponent(
    threadContextProvider: IAutoViewChatMemoryProvider,
    context: string,
  ): Promise<string> {
    const preComponentGenerationEventId = await this.sendEvent({
      type: "pre-component-generation",
    });

    try {
      const memory = await threadContextProvider.readMemory();
      const result = await generateAutoViewComponent(
        {
          sessionId: this.sessionId,
          vendor: this.config.toolCodeGenVendor,
          mockDataVendor: this.config.toolMockDataVendor,
          input: memory.schema,
          onPreLlmGeneration: async (
            agent,
            sessionId,
            api,
            body,
            options,
            backoffStrategy,
          ) => {
            const startTimestamp = new Date();
            const preLlmGenerationEventId = await this.sendEvent({
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
              await this.sendEvent(
                {
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
                },
                preLlmGenerationEventId,
              );
            };
          },
        },
        context,
        undefined,
      );

      await this.sendEvent(
        {
          type: "post-component-generation",
          result,
        },
        preComponentGenerationEventId,
      );

      if (result.status === "success") {
        return result.tsxCodeGeneratedOnly;
      } else {
        return `[FAILURE] ${result.reason}`;
      }
    } catch (error: unknown) {
      await this.sendEvent(
        {
          type: "post-component-generation",
          error,
        },
        preComponentGenerationEventId,
      );

      throw error;
    }
  }
}

interface TurnResult {
  assistantMessage?: IAutoViewChatAssistantMessage;
  toolMessages?: IAutoViewChatToolMessage[];
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
        content: prompt({}),
      },
      ...context.map(toOpenAIMessage),
    ],
    ...(config.vendor.isThinkingEnabled ? { reasoning_effort: "medium" } : {}),
    tools: [readSchemaAndCodeTool(), generateAutoViewComponentTool()],
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
      const toolCalls = message.contents
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
        );
      const isContentEmpty =
        toolCalls.length !== 0 &&
        message.contents.filter(
          (content) => content.type === "text" && content.text.length !== 0,
        ).length === 0;

      return {
        role: "assistant",
        content: isContentEmpty
          ? undefined
          : message.contents
              .filter((content) => content.type === "text")
              .map(
                (content) =>
                  ({
                    type: "text",
                    text: content.text,
                  }) satisfies OpenAI.Chat.Completions.ChatCompletionContentPartText,
              ),
        tool_calls: toolCalls.length === 0 ? undefined : toolCalls,
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

async function readSchemaAndCode(
  memoryProvider: IAutoViewChatMemoryProvider,
): Promise<IAutoViewChatMemory> {
  const memory = await memoryProvider.readMemory();
  return memory;
}

function readSchemaAndCodeTool(): OpenAI.Chat.Completions.ChatCompletionTool {
  return {
    type: "function",
    function: {
      name: "read_schema_and_code",
      description:
        "Fetch the latest schema and component code which are bound to the current chat session.",
    },
  };
}

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
