import { TypeGuardError, assertGuard } from "typia";

import { Agent, LlmFailure, LlmProxy, parseLlmJsonOutput } from "../../core";
import { PlanGenerationAgentDto } from "./dto";
import { prompt } from "./prompt";

export class PlanGenerationAgent
  implements Agent<PlanGenerationAgentDto.Input, PlanGenerationAgentDto.Output>
{
  async execute(
    input: PlanGenerationAgentDto.Input,
  ): Promise<PlanGenerationAgentDto.Output> {
    const systemPrompt = prompt({
      atomic_components: input.components,
      input_schema: input.inputSchema,
    });

    const results = await new LlmProxy<
      PlanGenerationAgentDto.Input,
      PlanGenerationAgentDto.Output
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
}

function handleText(
  input: PlanGenerationAgentDto.Input,
  text: string,
): PlanGenerationAgentDto.Output {
  const output = parseOutput(text);

  if (rendered === undefined) {
    throw new LlmFailure(
      `failed to render the json path "${output.shortest_json_path}"; perhaps the json path is invalid? try again`,
    );
  }

  if (Array.isArray(rendered) && rendered.length === 0) {
    throw new LlmFailure(
      `rendered json path "${output.shortest_json_path}" is an empty array, you should select higher level of the json structure; try again`,
    );
  }

  return {
    explanation: output.explanation,
    jsonPath: output.shortest_json_path,
    mainContent: rendered,
  };
}

interface Output {
  visualization_planning: string;
  component: string;
}

function parseOutput(text: string): Output {
  const visualizationPlanning = text.match(
    /<visualization_planning>(.*?)<\/visualization_planning>/s,
  );
  const component = text.match(/<component>(.*?)<\/component>/s);

  if (visualizationPlanning == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain visualization planning within <visualization_planning> tags`,
    );
  }

  if (component == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain component within <component> tags`,
    );
  }

  return {
    visualization_planning: visualizationPlanning[1],
    component: component[1],
  };
}
