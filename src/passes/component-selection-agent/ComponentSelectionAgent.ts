import { TypeGuardError, assertGuard } from "typia";

import { Agent, LlmFailure, LlmProxy, parseLlmJsonOutput } from "../../core";
import { IAutoViewAgentProvider } from "../../structures/agents/IAutoViewAgentProvider";
import { prompt } from "./prompt";

export namespace ComponentSelectionAgent {
  export interface Input {
    provider: IAutoViewAgentProvider;
    mainContent: unknown;
    components: InputComponent[];
  }

  export interface InputComponent {
    name: string;
    description: string;
  }

  export interface Output {
    reasoning: string;
    inferredEntity: string;
    explanation: string;
    selectedComponentName: string;
  }
}

export class ComponentSelectionAgent
  implements
    Agent<ComponentSelectionAgent.Input, ComponentSelectionAgent.Output>
{
  async execute(
    input: ComponentSelectionAgent.Input,
  ): Promise<ComponentSelectionAgent.Output> {
    const systemPrompt = prompt({
      main_content: Array.isArray(input.mainContent)
        ? input.mainContent[0]!
        : input.mainContent,
      components: input.components,
    });

    const results = await new LlmProxy<
      ComponentSelectionAgent.Input,
      ComponentSelectionAgent.Output
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
  input: ComponentSelectionAgent.Input,
  text: string,
): ComponentSelectionAgent.Output {
  const output = parseOutput(text);

  if (
    input.components.some(
      (component) => component.name === output.selected_component_name,
    )
  ) {
    return {
      reasoning: output.reasoning,
      inferredEntity: output.inferred_entity,
      explanation: output.explanation,
      selectedComponentName: output.selected_component_name,
    };
  }

  throw new LlmFailure(
    `selected component name "${output.selected_component_name}" is not in the list of components; try again`,
  );
}

interface Output {
  reasoning: string;
  inferred_entity: string;
  explanation: string;
  selected_component_name: string;
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
