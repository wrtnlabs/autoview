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
    const systemPrompt = prompt({
      input: input.input,
    });

    const results = await new LlmProxy<Input, Output>()
      .withTextHandler(handleText)
      .withToolHandler("example", handleExampleTool)
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
    output: output.output,
  };
}

function handleExampleTool(
  _input: Input,
  toolCallId: string,
  toolName: string,
  toolInput: unknown,
): Output {
  console.log(toolCallId, toolName, toolInput);

  return {
    output: "example",
  };
}

interface TextOutput {
  output: string;
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
