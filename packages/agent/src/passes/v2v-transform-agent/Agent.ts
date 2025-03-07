import { TypeGuardError, assertGuard } from "typia";

import {
  AgentBase,
  LlmFailure,
  LlmProxy,
  parseLlmJsonOutput,
} from "../../core";
import { Input, Output } from "./dto";
import { prompt } from "./prompt";

export class Agent implements AgentBase<Input, Output> {
  async execute(input: Input): Promise<Output> {
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
      visualizations: outputs.flatMap((output) => output.visualizations),
    };
  }
}

async function transform(input: Input): Promise<Output> {
  const systemPrompt = prompt({
    content: input.content,
    atomic_components: input.components.map((component) => ({
      ...component,
      valueValidator: undefined,
    })),
  });
  const results = await new LlmProxy<Input, Output>()
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
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "visualization",
            description:
              "The visualization to be returned, with an reasoning process",
            schema: {
              type: "object",
              properties: {
                reasoning: {
                  type: "string",
                },
                visualization: {
                  anyOf: input.components,
                },
              },
              $defs: input.defs,
              additionalProperties: false,
              required: ["reasoning", "visualization"],
            },
            strict: false,
          },
        },
      },
      input.provider.options,
    );

  const result = results[0];

  if (result == null) {
    throw new LlmFailure(`expect 1 output, but got ${results.length}`);
  }

  return result;
}

function handleText(input: Input, text: string): Output {
  const output = parseOutput(text);
  const isOutputValid = input.components.some((component) => {
    try {
      component.valueValidator(output.visualization);
      return true;
    } catch (error: unknown) {
      console.error("error", error, error instanceof TypeGuardError);

      if (error instanceof TypeGuardError) {
        return false;
      }

      throw error;
    }
  });

  if (!isOutputValid) {
    throw new LlmFailure(
      "output is invalid; your visualization properties do not match with the any of the atomic components",
    );
  }

  return {
    visualizations: [
      {
        reasoning: output.reasoning,
        properties: output.visualization,
      },
    ],
  };
}

interface TextOutput {
  reasoning: string;
  visualization: unknown;
}

function parseOutput(text: string): TextOutput {
  const parsed = parseLlmJsonOutput(text);
  let output: TextOutput;

  try {
    assertGuard<TextOutput>(parsed);
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
