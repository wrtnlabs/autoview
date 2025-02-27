import OpenAI from "openai";
import typia, { ILlmFunctionOfValidate, IValidation } from "typia";

import { IAutoViewApplication } from "../structures/IAutoViewApplication";
import { IAutoViewValueResult } from "../structures/IAutoViewValueResult";
import { IAutoViewAgentProvider } from "../structures/agents/IAutoViewAgentProvider";
import { IAutoViewAgentValueProps } from "../structures/agents/IAutoViewAgentValueProps";

export namespace AutoViewAgent {
  export const value = (
    props: IAutoViewAgentValueProps,
  ): Promise<IAutoViewValueResult> =>
    execute({
      provider: props.provider,
      retry: props.retry ?? 3,
      prompt: [
        "I wanna render this JSON value into a display components.",
        "",
        "Please fill the proper arguments of the render() function",
        "with the given properties.",
        "",
        "For reference, the `value` property is the actual value to render,",
        "and the others are metadata describing the value like JSON schema.",
        "By the way, as the other properties are all optional, it is possible",
        "to being only the `value` property existing case.",
        "",
        "```json",
        JSON.stringify(props.inputs),
        "```",
      ].join("\n"),
    });

  const execute = async (ctx: {
    provider: IAutoViewAgentProvider;
    prompt: string;
    retry: number;
  }): Promise<IAutoViewValueResult> => {
    let result: IAutoViewValueResult | null = null;
    try {
      while (true) {
        result = await process({
          provider: ctx.provider,
          prompt: ctx.prompt,
          failure: result?.type === "invalid" ? result : null,
        });
        if (--ctx.retry <= 0 || result?.type === "success") break;
      }
      return result;
    } catch (error) {
      return {
        type: "error",
        error: error as Error,
      };
    }
  };

  const process = async (ctx: {
    provider: IAutoViewAgentProvider;
    prompt: string;
    failure: IAutoViewValueResult.IInvalid | null;
  }): Promise<IAutoViewValueResult> => {
    const completion: OpenAI.ChatCompletion =
      await ctx.provider.api.chat.completions.create(
        {
          model: ctx.provider.model,
          tools: [
            {
              type: "function",
              function: {
                name: FUNCTION.name,
                description: FUNCTION.description,
                parameters: FUNCTION.parameters as Record<string, any>,
              },
            },
          ],
          messages: [
            {
              role: "system",
              content: [
                "You are a helpful customer support assistant.",
                "",
                "Use the supplied tools to assist the user.",
              ].join("\n"),
            },
            {
              role: "user",
              content: ctx.prompt,
            },
            ...(ctx.failure
              ? [
                  {
                    role: "assistant",
                    tool_calls: [
                      {
                        type: "function",
                        id: ctx.failure.id,
                        function: {
                          name: FUNCTION.name,
                          arguments: JSON.stringify(
                            ctx.failure.validation.data,
                          ),
                        },
                      },
                    ],
                  } satisfies OpenAI.ChatCompletionAssistantMessageParam,
                  {
                    role: "tool",
                    tool_call_id: ctx.failure.id,
                    content: JSON.stringify(ctx.failure.validation.errors),
                  } satisfies OpenAI.ChatCompletionToolMessageParam,
                  {
                    role: "system",
                    content: [
                      "You A.I. assistant has composed wrong arguments.",
                      "",
                      "Correct it at the next function calling.",
                    ].join("\n"),
                  } satisfies OpenAI.ChatCompletionSystemMessageParam,
                ]
              : []),
          ],
        },
        ctx.provider.options,
      );
    const results: ICallResult[] = completion.choices
      .map((choice) =>
        (choice.message.tool_calls ?? [])
          .filter((call) => call.function.name === FUNCTION.name)
          .map((call) => ({
            id: call.id,
            arguments: FUNCTION.validate(
              JSON.parse(call.function.arguments),
            ) as IValidation<IAutoViewApplication.IRenderArgument>,
          })),
      )
      .flat();
    const success = results.find((r) => r.arguments.success);
    const failure = results.find((r) => r.arguments.success === false);
    if (success)
      return {
        type: "success",
        props: success.arguments.success
          ? success.arguments.data.component
          : null!,
        completion,
      };
    else if (failure)
      return {
        type: "invalid",
        id: failure.id,
        validation: failure.arguments as IValidation.IFailure,
        completion,
      };
    else
      return {
        type: "nothing",
        completion,
      };
  };
}

const FUNCTION: ILlmFunctionOfValidate<"chatgpt"> = typia.llm
  .applicationOfValidate<IAutoViewApplication, "chatgpt", { reference: true }>()
  .functions.find((f) => f.name === "render")!;

interface ICallResult {
  id: string;
  arguments: IValidation<IAutoViewApplication.IRenderArgument>;
}
