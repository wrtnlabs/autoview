import {
  AutoViewAgent,
  IAutoViewVendor,
  LlmUnrecoverableError,
} from "@autoview/agent";
import * as fs from "fs/promises";
import OpenAI from "openai";
import * as path from "path";
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
    model: "o4-mini-2025-04-16",
    isThinkingEnabled: true,
  };

  console.log("loading swaggers...");

  const swaggers = await listSwaggers();

  console.log(`loaded ${swaggers.length} swaggers`);

  interface SwaggerWithIndex {
    index: number;
    swagger: CrawledOpenApiResType;
  }

  const swaggersWithIndex: SwaggerWithIndex[] = [];

  for (let index = 0; index < swaggers.length; ++index) {
    if (!(await fs.stat(`./components/${index}.ts`).catch(() => false))) {
      swaggersWithIndex.push({ index, swagger: swaggers[index] });
    }
  }

  console.log(`${swaggersWithIndex.length} swaggers need to be generated`);
  console.log("generating components...");

  await semaphorePromiseAll(
    swaggersWithIndex.map(
      (swaggerWithIndex) => () =>
        generatecomponent(
          vendor,
          swaggerWithIndex.index,
          swaggerWithIndex.swagger,
        ),
    ),
    20, // 20 concurrent requests
    10000, // 10 seconds
  );

  console.log(
    "finished; the components are saved in the `components` directory",
  );
}

async function listSwaggers(): Promise<CrawledOpenApiResType[]> {
  interface ResTypeWithIndex {
    index: number;
    resType: CrawledOpenApiResType;
  }

  const swaggers = await fs.glob("./swaggers/*.json");
  const results: ResTypeWithIndex[] = [];

  for await (const swagger of swaggers) {
    const content = await fs.readFile(swagger, "utf-8");
    const json = JSON.parse(content);

    assertGuard<CrawledOpenApiResType>(json);

    results.push({
      index: Number(path.basename(swagger, ".json")),
      resType: json,
    });
  }

  results.sort((a, b) => a.index - b.index);

  return results.map((result) => result.resType);
}

async function generatecomponent(
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
      });
      const result = await agent.generate();

      if (result.status === "failure") {
        console.warn(
          `failed to generate component for the schema at index ${index} (${MAX_RETRY - retry - 1} retries left): ${result.reason}`,
        );
        continue;
      }

      await fs.writeFile(`./components/${index}.ts`, result.tsxCode, {
        encoding: "utf-8",
      });
      await fs.writeFile(
        `./component-randoms/${index}.ts`,
        generateRandomModuleSourceCode(index, result.mockData),
        {
          encoding: "utf-8",
        },
      );

      console.log(
        `[PASS] generated component for the schema at index ${index}`,
      );

      return;
    } catch (error: unknown) {
      console.warn(
        `failed to generate component for the schema at index ${index} (${MAX_RETRY - retry - 1} retries left): ${error}`,
      );
    }
  }

  console.warn(
    `failed to generate component for the schema at index ${index}, after ${MAX_RETRY} retries; giving up`,
  );
}

function generateRandomModuleSourceCode(index: number, value: any): string {
  return `
import Component from "../components/${index}";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return JSON.parse(${JSON.stringify(value)});
}
`;
}

main().catch(console.error);
