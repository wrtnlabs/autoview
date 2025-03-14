import { AutoViewCompiler } from "@autoview/compiler";
import { IAutoViewCompilerResult } from "@autoview/interface";
import { IChatGptSchema } from "@samchon/openapi";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";
import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_llm_schema = async (): Promise<void> => {
  const $defs: Record<string, IChatGptSchema> = {};
  const schema: IChatGptSchema = typia.llm.schema<
    IBbsArticle,
    "chatgpt",
    {
      reference: true;
    }
  >($defs);

  const compiler: AutoViewCompiler = new AutoViewCompiler({
    inputMetadata: {
      $defs,
      schema,
    },
    componentMetadata: {
      $defs: {},
      schema: {},
    },
  });
  const result: IAutoViewCompilerResult = await compiler.compile(`
      return {
        type: "GridList",
        items: [],
      };
  `);
  if (result.type === "success")
    await TestGlobal.archive("llm_schema.ts", result.typescript);
  else throw new Error(JSON.stringify(result, null, 2));
};
