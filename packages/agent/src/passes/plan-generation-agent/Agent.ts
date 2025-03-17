import { AgentBase, LlmFailure, LlmProxy } from "../../core";
import { Input, Output } from "./dto";
import { prompt } from "./prompt";

export class Agent implements AgentBase<Input, Output> {
  async execute(input: Input): Promise<Output> {
    const systemPrompt = prompt({
      atomic_components: input.components,
      input_schema: input.inputSchema,
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
        },
        input.provider.options,
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
    visualizationPlanning: output.visualization_planning,
    component: output.component,
  };
}

interface TextOutput {
  visualization_planning: string;
  component: string;
}

function parseOutput(text: string): TextOutput {
  const visualizationPlanning = text.match(
    /<visualization_planning>([\s\S]*?)<\/visualization_planning>/,
  );
  const component = text.match(/<component>([\s\S]*?)<\/component>/);

  if (visualizationPlanning?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain visualization planning within <visualization_planning> tags`,
    );
  }

  if (component?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain component within <component> tags`,
    );
  }

  return {
    visualization_planning: visualizationPlanning[1],
    component: component[1],
  };
}
