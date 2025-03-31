import { IAutoViewCompilerService } from "@autoview/interface";
import { WorkerConnector } from "tgrid";
import { is_node } from "tstl";

import { AgentBase, LlmFailure, LlmProxy } from "../../core";
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
      componentMetadata: input.componentSchema,
    });

    const componentTypes = await service.generateComponentDto();
    const systemPrompt = prompt({
      input_schema: input.inputSchema,
      component_types: componentTypes,
    });

    const results = await new LlmProxy<Input, Output>()
      .withTextHandler(handleText)
      .withErrorCallback((error) => {
        console.warn(`[plan-generation] LLM Failure: ${error}`);
      })
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
          ...(input.provider.isThinkingEnabled
            ? { reasoning_effort: "medium" }
            : {}),
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
    initial_analysis: output.initial_analysis,
    data_exploration: output.data_exploration,
    ideas: output.ideas,
    reasoning: output.reasoning,
    planning: output.planning,
  };
}

interface TextOutput {
  initial_analysis: string;
  data_exploration: string;
  ideas: string;
  reasoning: string;
  planning: string;
}

function parseOutput(text: string): TextOutput {
  const initialAnalysis = text.match(
    /<initial_analysis>([\s\S]*?)<\/initial_analysis>/,
  );
  const dataExploration = text.match(
    /<data_exploration>([\s\S]*?)<\/data_exploration>/,
  );
  const ideas = text.match(/<ideas>([\s\S]*?)<\/ideas>/);
  const reasoning = text.match(/<reasoning>([\s\S]*?)<\/reasoning>/);
  const planning = text.match(/<planning>([\s\S]*?)<\/planning>/);

  if (initialAnalysis?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain initial analysis within <initial_analysis> tags`,
    );
  }

  if (dataExploration?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain data exploration within <data_exploration> tags`,
    );
  }

  if (dataExploration?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain data exploration within <data_exploration> tags`,
    );
  }

  if (ideas?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain ideas within <ideas> tags`,
    );
  }

  if (reasoning?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain reasoning within <reasoning> tags`,
    );
  }

  if (planning?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain planning within <planning> tags`,
    );
  }

  return {
    initial_analysis: initialAnalysis[1],
    data_exploration: dataExploration[1],
    ideas: ideas[1],
    reasoning: reasoning[1],
    planning: planning[1],
  };
}
