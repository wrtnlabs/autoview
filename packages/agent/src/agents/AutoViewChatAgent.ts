import OpenAI from "openai";
import { Stream } from "openai/streaming";

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
} from "./AutoViewAgent";

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
  | AutoViewChatAgentCodeGenerationEvent;

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

export interface AutoViewChatAgentCodeGenerationEvent
  extends AutoViewChatAgentEventBase<"code-generation"> {}

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

  async send(
    schemaProvider: IAutoViewChatSchemaProvider,
    context: IAutoViewChatMessage[],
  ): Promise<void> {
    try {
      const [id, timestamp, content, toolCalls] =
        await this.callStream(context);

      if (this.messageHandler) {
        await this.messageHandler({
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
      }

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
                    if (this.eventHandler) {
                      const startTimestamp = new Date();

                      await this.eventHandler({
                        type: "pre-llm-generation",
                        agent,
                        sessionId,
                        api,
                        body,
                        options,
                        backoffStrategy,
                      });

                      return async (agent, sessionId, completion) => {
                        if (this.eventHandler) {
                          const endTimestamp = new Date();

                          await this.eventHandler({
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
                        }
                      };
                    }

                    return;
                  },
                },
                toolCall.arguments,
                undefined,
              );
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
              if (this.errorHandler) {
                void this.errorHandler(error);
              }

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

      if (this.messageHandler) {
        for (const { toolCall, result } of joined) {
          await this.messageHandler({
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
      }
    } catch (error: unknown) {
      if (this.errorHandler) {
        await this.errorHandler(error);
      }
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
        if (this.eventHandler) {
          const startTimestamp = new Date();

          await this.eventHandler({
            type: "pre-llm-generation",
            agent: "chat",
            sessionId: this.sessionId,
            api,
            body,
            options,
            backoffStrategy,
          });

          return async (completion) => {
            if (this.eventHandler) {
              const endTimestamp = new Date();

              await this.eventHandler({
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
            }
          };
        }

        return;
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

        if (this.streamingMessageHandler) {
          void this.streamingMessageHandler(
            chunk.id,
            "assistant",
            choice.delta.content,
          );
        }
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
    messages: context.map(toOpenAIMessage),
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
 *
 * TODO: it must takes some operator so that the system can update the generated component
 */
async function generateAutoViewComponent<M>(
  config: IAutoViewConfig<M>,
  context: string,
  metadata: M,
): Promise<string> {
  // TODO: make the AutoView pipeline takes the context so that the generated component is affected by the context
  const agent = new AutoViewAgent(config);
  const result = await agent.generate(metadata);

  if (result.status === "success") {
    return result.tsxCodeGeneratedOnly;
  } else {
    return `[FAILURE] ${result.reason}`;
  }
}

function generateAutoViewComponentTool(): OpenAI.Chat.Completions.ChatCompletionTool {
  return {
    type: "function",
    function: {
      name: "generate_auto_view_component",
      description:
        "Generate an AutoView component that visually presents data based on user requirements. This tool creates a React component designed for visually displaying information without interactive capabilities.",
      parameters: {
        type: "object",
        properties: {
          context: {
            type: "string",
            title: "Context",
            description: `
**Purpose:**
This parameter provides detailed instructions for generating an AutoView component that visually displays data. The context directly controls how the component is generated, its visual style, and its specific behavior.

**Required Information:**
- Detailed description of the component's purpose and visual presentation goals
- Specific design requirements (colors, layouts, styling preferences)
- Data visualization preferences (charts, tables, cards, etc.)
- For modifications: previous implementation code and specific issues to fix

**Best Practices:**
1. **Be Specific:** Provide clear details about the desired appearance and behavior
2. **Include Examples:** Reference familiar UI patterns when possible (e.g., "like a Twitter card" or "similar to a GitHub profile")
3. **Specify Visual Elements:** Mention desired colors, shapes, typography, spacing, or layout preferences
4. **For Fixes:** Clearly identify what's broken and how it should function correctly

**Examples:**

<example_1>
Generate a user profile card component with the following features:
- Dark mode design with deep blue background (#1a2b3c)
- Circular avatar image in the top center
- User's name in large font below the avatar
- Contact information (email, phone) displayed with appropriate icons
- Social media links as small icon buttons at the bottom
- Stats (followers, following, posts) displayed in a horizontal row with dividers
</example_1>

<example_2>
Here is the previous implementation of the dashboard card component:
\`\`\`typescriptreact
export default function VisualComponent(value: AutoViewInputType): React.ReactNode {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800">{value.title}</h3>
      <div className="mt-2 flex items-center">
        <span className="text-2xl font-bold">{value.value}</span>
        <span className="ml-2 text-sm text-gray-500">{value.unit}</span>
      </div>
      <div className="mt-1 text-xs text-gray-400">
        {value.changePercentage > 0 ? (
          <span className="text-green-500">↑ {value.changePercentage}%</span>
        ) : (
          <span className="text-red-500">↓ {Math.abs(value.changePercentage)}%</span>
        )}
        <span className="ml-1">vs last period</span>
      </div>
    </div>
  );
}
\`\`\`

This component has several issues:
1. The percentage indicators are too small and hard to read
2. There's no visual graph showing the trend data that exists in value.trendData
3. The colors don't provide enough contrast for accessibility

Please update it to:
- Increase the size of percentage indicators and make them more prominent
- Add a small sparkline chart using the trendData array
- Improve color contrast for better accessibility
- Keep the overall card size compact but make better use of the space
</example_2>

<example_3>
Create a data visualization component for financial transactions with these requirements:
- Light, professional appearance suitable for financial applications
- Clear hierarchy with transaction amount as the focal point
- Transaction date formatted as "MMM DD, YYYY" (e.g., "Jan 15, 2023")
- Status indicators using color-coded badges (green for "completed", amber for "pending", red for "failed")
- Category icons that visually represent the transaction type (shopping, dining, travel, etc.)
- Responsive design that works well on both desktop and mobile
- Include appropriate spacing between multiple transaction items when displayed in a list
</example_3>

<example_4>
Fix this product listing component that compiles but crashes at runtime:
\`\`\`typescriptreact
export default function VisualComponent(value: AutoViewInputType): React.ReactNode {
  // This component compiles but crashes with "Cannot read properties of undefined (reading 'map')"
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.products.map((product: any) => (
        <div key={product.id} className="bg-white rounded-lg shadow p-4">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 text-lg font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-lg font-bold">\${product.price}</span>
            {product.inStock ? (
              <span className="text-green-600 text-sm">In Stock</span>
            ) : (
              <span className="text-red-600 text-sm">Out of Stock</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
\`\`\`

This component needs the following fixes:
1. It crashes when value.products is undefined or null
2. It doesn't handle empty product arrays gracefully
3. The imageUrl might be null, causing broken images
4. Long product descriptions don't truncate properly
5. The price formatting doesn't handle decimal places consistently

Please update it to:
- Add proper null checks for value.products to prevent runtime errors
- Display a meaningful message when there are no products to show
- Add fallback images when product.imageUrl is missing
- Limit product description length with text truncation
- Format prices consistently with two decimal places
- Keep the same general layout and responsive design
</example_4>
`,
          },
        },
      },
    },
  };
}
