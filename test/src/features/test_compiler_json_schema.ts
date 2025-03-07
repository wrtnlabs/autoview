import { AutoViewCompiler } from "@autoview/compiler";
import { IAutoViewCompilerResult } from "@autoview/interface";
import typia, { IJsonSchemaCollection } from "typia";

import { TestGlobal } from "../TestGlobal";
import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_json_schema = async (): Promise<void> => {
  const collection: IJsonSchemaCollection = typia.json.schemas<[IBbsArticle]>();
  const compiler: AutoViewCompiler = new AutoViewCompiler({
    metadata: {
      components: collection.components,
      schema: collection.schemas[0]!,
    },
  });
  const result: IAutoViewCompilerResult = await compiler.compile(`
      return {
        type: "GridList",
        items: [],
      };
  `);
  if (result.type === "success")
    await TestGlobal.archive("json_schema.ts", result.typescript);
  else throw new Error(JSON.stringify(result, null, 2));
};
