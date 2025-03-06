import { AutoViewCompiler } from "@autoview/compiler";
import { IAutoViewCompilerResult } from "@autoview/interface";
import typia, { tags } from "typia";

import { TestGlobal } from "../TestGlobal";

export const test_compiler_llm_parameters = async (): Promise<void> => {
  const compiler: AutoViewCompiler = new AutoViewCompiler({
    parameters: typia.llm.parameters<
      IBbsArticle,
      "chatgpt",
      {
        reference: true;
      }
    >(),
  });
  const result: IAutoViewCompilerResult = await compiler.compile(`
      return {
        type: "GridList",
        items: [],
      };
  `);
  if (result.type === "success")
    await TestGlobal.archive("llm_parameters.ts", result.typescript);
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
