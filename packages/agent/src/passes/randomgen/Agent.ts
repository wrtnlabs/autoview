import { IAutoViewCompilerService } from "@autoview/interface";
import { WorkerConnector } from "tgrid";
import { is_node } from "tstl";
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
  private worker: WorkerConnector<null, null, IAutoViewCompilerService> | null =
    null;

  async open(): Promise<void> {
    this.worker = new WorkerConnector(null, null);

    if (is_node()) {
      await this.worker.connect(
        `${__dirname}/../../../../compiler/lib/worker/index.js`,
      );
    } else {
      await this.worker.connect("/worker.js");
    }
  }

  async close(): Promise<void> {
    if (this.worker == null) return;
    await this.worker.close();
    this.worker = null;
  }

  async execute(input: Input): Promise<Output> {
    if (!this.worker) throw new Error("worker not initialized");

    const service = this.worker.getDriver();
    await service.initialize({
      inputMetadata: input.inputSchema,
    });

    const boilerplate = await service.generateBoilerplate(
      "Schema",
      input.inputSchema,
    );
    const systemPrompt = prompt({
      boilerplate,
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
