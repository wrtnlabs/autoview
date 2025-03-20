import { AutoViewCompiler } from "@autoview/compiler";
import { IAutoViewCompilerResult } from "@autoview/interface";
import { TestValidator } from "@nestia/e2e";
import { IChatGptSchema } from "@samchon/openapi";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";
import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_failure = async (): Promise<void> => {
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
      };
  `);
  TestValidator.equals("failure")(result.type)("failure");
  TestGlobal.archive("failure.json", JSON.stringify(result, null, 2));
};
