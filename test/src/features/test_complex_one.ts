import { AutoViewAgent } from "@autoview/agent";
import { ILlmSchemaV3_1 } from "@samchon/openapi";
import * as fs from "fs/promises";
import OpenAI from "openai";
import * as path from "path";
import { assertGuard } from "typia";

import { TestGlobal } from "../TestGlobal";

export async function test_complex_one(): Promise<void> {
  const raw = await fs.readFile(
    path.join(__dirname, "complex_one", "schema_4.json"),
    "utf-8",
  );
  const schema = JSON.parse(raw);

  interface RawSchema {
    schema: ILlmSchemaV3_1;
    $defs: Record<string, ILlmSchemaV3_1>;
  }

  assertGuard<RawSchema>(schema);

  const agent = new AutoViewAgent({
    vendor: {
      api: new OpenAI({
        apiKey: TestGlobal.env.CHATGPT_API_KEY,
      }),
      model: "o3-mini-2025-01-31",
      isThinkingEnabled: true,
    },
    input: {
      type: "llm-schema",
      model: "3.1",
      schema: schema.schema,
      $defs: schema.$defs,
    },
  });
  const result = await agent.generate(undefined);

  console.log(result.status);

  if (result.status === "success") {
    console.log(result.tsxCode);
  }
}
