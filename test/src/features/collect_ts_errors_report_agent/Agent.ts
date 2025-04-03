import { AgentBase, LlmFailure, LlmProxy } from "@autoview/agent";

import { Input, Output } from "./dto";
import { prompt } from "./prompt";

export class Agent implements AgentBase<Input, Output> {
  async execute(input: Input): Promise<Output> {
    const systemPrompt = prompt({
      generated_code: input.generatedCode,
      diagnostics: input.diagnostics,
    });

    const results = await new LlmProxy<Input, Output>()
      .withTextHandler(handleText)
      .withErrorCallback((error) => {
        console.warn(`[collect-ts-errors-report] LLM Failure: ${error}`);
      })
      .call(
        input,
        input.vendor.api,
        {
          model: input.vendor.model,
          messages: [
            {
              role: "user",
              content: systemPrompt,
            },
          ],
          ...(input.vendor.isThinkingEnabled
            ? { reasoning_effort: "medium" }
            : {}),
        },
        input.vendor.options,
      );

    const result = results[0];

    if (result == null) {
      throw new LlmFailure(`expect 1 output, but got ${results.length}`);
    }

    return result;
  }
}

function handleText(_input: Input, text: string): Output {
  const output = parseOutput(text);

  return {
    componentName: output.component_name,
    componentProperties: output.component_properties,
  };
}

interface TextOutput {
  component_name: string;
  component_properties: string[];
}

function parseOutput(text: string): TextOutput {
  const componentName = text.match(
    /<component_name>([\s\S]*?)<\/component_name>/,
  );
  const componentProperties = text.match(
    /<component_properties>([\s\S]*?)<\/component_properties>/,
  );

  if (componentName?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain component name within <component_name> tags`,
    );
  }

  if (componentProperties?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain component properties within <component_properties> tags`,
    );
  }

  let parsedComponentProperties: string[];

  try {
    const parsed = JSON.parse(componentProperties[1]);

    if (!Array.isArray(parsed)) {
      throw new LlmFailure(
        `failed to parse the output; component properties within <component_properties> tags is not a valid JSON array of strings`,
      );
    }

    if (parsed.some((property) => typeof property !== "string")) {
      throw new LlmFailure(
        `failed to parse the output; component properties within <component_properties> tags is not a valid JSON array of strings`,
      );
    }

    parsedComponentProperties = parsed;
  } catch (error) {
    throw new LlmFailure(
      `failed to parse the output; component properties within <component_properties> tags is not a valid JSON array of strings`,
    );
  }

  return {
    component_name: componentName[1].trim(),
    component_properties: parsedComponentProperties.map((property) =>
      property.trim(),
    ),
  };
}
