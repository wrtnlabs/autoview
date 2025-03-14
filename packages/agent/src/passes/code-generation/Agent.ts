import { AutoViewCompiler } from "@autoview/compiler";

import { AgentBase, LlmFailure, LlmProxy } from "../../core";
import { Input, Output } from "./dto";
import { prompt } from "./prompt";

export class Agent implements AgentBase<Input, Output> {
  async execute(input: Input): Promise<Output> {
    const compiler = new AutoViewCompiler({
      inputMetadata: {
        $defs: (input.inputSchema as any)["$defs"],
        schema: input.inputSchema as any,
      },
      componentMetadata: {
        $defs: (input.componentSchema as any)["$defs"],
        schema: input.componentSchema as any,
      },
      compilerOptions: {
        module: "cjs",
      },
    });
    const boilerplate = compiler.generateBoilerplate();
    const systemPrompt = prompt({
      input_schema: input.inputSchema,
      output_schema: input.componentSchema,
      component_plan: input.componentPlan,
      boilerplate,
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

async function handleText(input: Input, text: string): Promise<Output> {
  const output = parseOutput(text);
  const compiler = new AutoViewCompiler({
    inputMetadata: {
      $defs: (input.inputSchema as any)["$defs"],
      schema: input.inputSchema as any,
    },
    componentMetadata: {
      $defs: (input.componentSchema as any)["$defs"],
      schema: input.componentSchema as any,
    },
    compilerOptions: {
      module: "cjs",
    },
  });

  const result = await compiler.compile(output.typescript_function);

  if (result.type === "error") {
    throw result.error;
  }

  if (result.type === "failure") {
    console.log(JSON.stringify(result.diagnostics, null, 2));
    console.log(result.typescript);

    throw new LlmFailure(
      `failed to compile the typescript function: ${JSON.stringify(
        result.diagnostics,
        null,
        2,
      )}`,
    );
  }

  return {
    analysis: output.analysis,
    tsFunction: result.typescript,
    jsFunction: result.javascript,
  };
}

interface TextOutput {
  analysis: string;
  typescript_function: string;
}

function parseOutput(text: string): TextOutput {
  const analysis = text.match(
    /<transformation_analysis>([\s\S]*?)<\/transformation_analysis>/,
  );
  const typescriptFunction = text.match(
    /<typescript_function>([\s\S]*?)<\/typescript_function>/,
  );

  if (analysis?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain analysis within <analysis> tags`,
    );
  }

  if (typescriptFunction?.[1] == null) {
    throw new LlmFailure(
      `failed to parse the output; your response should contain typescript function within <typescript_function> tags`,
    );
  }

  return {
    analysis: analysis[1],
    typescript_function: typescriptFunction[1],
  };
}
