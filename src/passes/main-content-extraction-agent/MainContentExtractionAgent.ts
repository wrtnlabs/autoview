import { JSONPath } from "jsonpath-plus";
import { TypeGuardError, assertGuard } from "typia";

import { Agent, LlmFailure, LlmProxy, parseLlmJsonOutput } from "../../core";
import { IAutoViewAgentProvider } from "../../structures/agents/IAutoViewAgentProvider";
import { prompt } from "./prompt";

export namespace MainContentExtractionAgent {
  export interface Input {
    provider: IAutoViewAgentProvider;
    jsonResponse: string;
  }

  export interface Output {
    explanation: string;
    jsonPath: string;
    mainContent: unknown;
  }
}

export class MainContentExtractionAgent
  implements
    Agent<MainContentExtractionAgent.Input, MainContentExtractionAgent.Output>
{
  async execute(
    input: MainContentExtractionAgent.Input,
  ): Promise<MainContentExtractionAgent.Output> {
    const systemPrompt = prompt({
      json_response: input.jsonResponse.trim(),
    });

    const results = await new LlmProxy<
      MainContentExtractionAgent.Input,
      MainContentExtractionAgent.Output
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
  input: MainContentExtractionAgent.Input,
  text: string,
): MainContentExtractionAgent.Output {
  const output = parseOutput(text);
  const rendered = JSONPath({
    path: output.shortest_json_path,
    json: JSON.parse(input.jsonResponse),
    wrap: false,
  });

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
  explanation: string;
  shortest_json_path: string;
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
