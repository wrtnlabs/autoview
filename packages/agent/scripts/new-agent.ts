import fs from "fs/promises";
import path from "path";
import process from "process";

async function main(): Promise<void> {
  const agentName = process.argv[3]?.trim() || "new";

  console.log(`generating ${agentName}...`);

  const agentPath = path.join(__dirname, "..", "src", "passes", agentName);

  if (await fs.stat(agentPath).catch(() => false)) {
    throw new Error(
      `the agent "${agentName}" at "${agentPath}" already exists; aborting`,
    );
  }

  await fs.mkdir(agentPath, { recursive: true });
  await Promise.all([
    fs.writeFile(
      path.join(agentPath, "Agent.ts"),
      `
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
      throw new LlmFailure(\`expect 1 output, but got \${results.length}\`);
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
        \`expected \${error.expected}, but got \${error.value}\`,
      );
    }

    throw error;
  }

  return output;
}
`.trimStart(),
    ),
    fs.writeFile(
      path.join(agentPath, "dto.ts"),
      `
import { IAutoViewAgentProvider } from "../../structures";

export interface Input {
  provider: IAutoViewAgentProvider;
  input: unknown;
}

export interface Output {
  output: string;
}
`.trimStart(),
    ),
    fs.writeFile(
      path.join(agentPath, "prompt.ts"),
      `
import { renderPrompt } from "../../core/Prompt";

export interface PromptContext {
  input: unknown;
}

const rawPrompt = \`
You are an helpful assistant.

<input>
{{input}}
</input>
\`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
`.trimStart(),
    ),
    fs.writeFile(
      path.join(agentPath, "index.ts"),
      `
export * from "./Agent";
export * from "./dto";
export * from "./prompt";
`.trimStart(),
    ),
  ]);
}

main().catch(console.error);
