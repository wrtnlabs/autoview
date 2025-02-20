import { TypeGuardError, assertGuard } from "typia";

import { Agent, LlmFailure, LlmProxy, parseLlmJsonOutput } from "../../core";
import { IAutoViewAgentProvider } from "../../structures/agents/IAutoViewAgentProvider";
import { prompt } from "./prompt";

export namespace V2vTransformAgent {
  export interface Input {
    provider: IAutoViewAgentProvider;
    content: unknown;
    /**
     * The schema of the component.
     *
     * It must describe a single object, even if the content is an array of objects. The {@link V2vTransformAgent} will
     * iterate the content and validate each value.
     */
    componentSchema: unknown;
    /**
     * Validate the value of the component. It must throw an error of type {@link LlmFailure} if the value is invalid.
     *
     * It must expect a single object, even if the content is an array of objects. The {@link V2vTransformAgent} will
     * iterate the content and validate each value.
     *
     * @param value - The value of the component.
     */
    componentValueValidator(value: unknown): void;
  }

  export interface Output {
    transformedData: unknown;
  }
}

export class V2vTransformAgent
  implements Agent<V2vTransformAgent.Input, V2vTransformAgent.Output>
{
  async execute(
    input: V2vTransformAgent.Input,
  ): Promise<V2vTransformAgent.Output> {
    if (!Array.isArray(input.content)) {
      return transform(input);
    }

    const outputs = await Promise.all(
      input.content.map((content) =>
        transform({
          ...input,
          content,
        }),
      ),
    );

    return {
      transformedData: outputs.map((output) => output.transformedData),
    };
  }
}

async function transform(
  input: V2vTransformAgent.Input,
): Promise<V2vTransformAgent.Output> {
  const systemPrompt = prompt({
    content: input.content,
    component_schema: input.componentSchema,
  });
  const results = await new LlmProxy<
    V2vTransformAgent.Input,
    V2vTransformAgent.Output
  >()
    .withTextHandler(handleText)
    .call(
      input,
      input.provider.api,
      {
        model: input.provider.model,
        messages: [
          {
            role: "user",
            content: systemPrompt,
          },
        ],
      },
      input.provider.options,
    );

  const result = results[0];

  if (result == null) {
    throw new LlmFailure(`expect 1 output, but got ${results.length}`);
  }

  return result;
}

function handleText(
  input: V2vTransformAgent.Input,
  text: string,
): V2vTransformAgent.Output {
  const output = parseOutput(text);

  input.componentValueValidator(output.transformed_data);

  return {
    transformedData: output.transformed_data,
  };
}

interface Output {
  reasoning: string;
  transformed_data: unknown;
}

function parseOutput(text: string): Output {
  const parsed = parseLlmJsonOutput(text);
  let output: Output;

  try {
    assertGuard<Output>(parsed);
    output = parsed;
  } catch (error: unknown) {
    if (error instanceof TypeGuardError) {
      throw new LlmFailure(
        `expected ${error.expected}, but got ${error.value}`,
      );
    }

    throw error;
  }

  return output;
}
