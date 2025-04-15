import { AutoViewAgent, IAutoViewVendor } from "@autoview/agent";
import * as fs from "fs/promises";
import OpenAI from "openai";
import { assertGuard } from "typia";

import { CrawledOpenApiResType } from "./crawl-openapis";
import { semaphorePromiseAll } from "./semaphore-promise-all";

async function main(): Promise<void> {
  if (!("CHATGPT_API_KEY" in process.env)) {
    throw new Error("CHATGPT_API_KEY is not set");
  }

  const vendor: IAutoViewVendor = {
    api: new OpenAI({
      apiKey: process.env.CHATGPT_API_KEY!,
    }),
    model: "o3-mini-2025-01-31",
    isThinkingEnabled: true,
  };

  console.log("loading swaggers...");

  const swaggers = await listSwaggers();

  console.log(`loaded ${swaggers.length} swaggers`);
  console.log("generating transformers...");

  await semaphorePromiseAll(
    swaggers.map(
      (swagger, index) => () => generateTransformer(vendor, index, swagger),
    ),
    20, // 20 concurrent requests
    100000, // 100 seconds
  );

  console.log(
    "finished; the transformers are saved in the `transformers` directory",
  );
}

async function listSwaggers(): Promise<CrawledOpenApiResType[]> {
  const swaggers = await fs.glob("./swaggers/*.json");
  const results: CrawledOpenApiResType[] = [];

  for await (const swagger of swaggers) {
    const content = await fs.readFile(swagger, "utf-8");
    const json = JSON.parse(content);

    assertGuard<CrawledOpenApiResType>(json);

    results.push(json);
  }

  return results;
}

async function generateTransformer(
  vendor: IAutoViewVendor,
  index: number,
  resType: CrawledOpenApiResType,
): Promise<void> {
  const MAX_RETRY = 5;

  for (let retry = 0; retry < MAX_RETRY; retry++) {
    try {
      const agent = new AutoViewAgent({
        vendor,
        input: {
          type: "llm-schema",
          model: "3.1",
          schema: resType.schema,
          $defs: resType.$defs,
        },
        experimentalAllInOne: true,
        transformFunctionName: "transform",
      });
      const { transformTsCode } = await agent.generate();

      await fs.writeFile(`./transformers/${index}.ts`, transformTsCode, {
        encoding: "utf-8",
      });

      console.log(
        `[PASS] generated transformer for the schema at index ${index}`,
      );

      return;
    } catch (error: unknown) {
      console.warn(
        `failed to generate transformer for the schema at index ${index} (${MAX_RETRY - retry - 1} retries left): ${JSON.stringify(error, null, 2)}`,
      );
    }
  }

  console.warn(
    `failed to generate transformers for the schema at index ${index}, after ${MAX_RETRY} retries; giving up`,
  );
}

main().catch(console.error);
