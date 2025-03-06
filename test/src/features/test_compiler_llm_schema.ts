import { AutoViewCompiler } from "@autoview/compiler";
import { IAutoViewCompilerResult } from "@autoview/interface";
import { IChatGptSchema } from "@samchon/openapi";
import typia, { tags } from "typia";

import { TestGlobal } from "../TestGlobal";

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
    $defs,
    schema,
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

interface IBbsArticle {
  id: string;
  title: string;
  body: string;
  thumbnail: IBbsArticle.IThumbnail | null;
  created_at: string & tags.Format<"date-time">;
}
namespace IBbsArticle {
  export interface IThumbnail {
    url: string;
    width: number;
    height: number;
  }
}
