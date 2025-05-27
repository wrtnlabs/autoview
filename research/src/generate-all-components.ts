import { AutoViewAgent, IAutoViewVendor } from "@autoview/agent";
import * as crypto from "crypto";
import * as fs from "fs/promises";
import {
  Langfuse,
  LangfuseGenerationClient,
  LangfuseTraceClient,
} from "langfuse";
import OpenAI from "openai";
import { Stream } from "openai/streaming";
import * as path from "path";
import { assertGuard } from "typia";

import { CrawledOpenApiResType } from "./crawl-openapis";
import { semaphorePromiseAll } from "./semaphore-promise-all";

async function main(): Promise<void> {
  if (!("CHATGPT_API_KEY" in process.env)) {
    throw new Error("CHATGPT_API_KEY is not set");
  }

  let langfuse: Langfuse | null = null;
  const sessionId = `generate-all-components-${crypto.randomUUID()}`;

  if (
    !("LANGFUSE_SECRET_KEY" in process.env) ||
    !("LANGFUSE_PUBLIC_KEY" in process.env) ||
    !("LANGFUSE_BASE_URL" in process.env)
  ) {
    console.warn(
      "LANGFUSE_SECRET_KEY, LANGFUSE_PUBLIC_KEY, and LANGFUSE_BASE_URL are not set; Langfuse will not be used",
    );
  } else {
    langfuse = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY!,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
      baseUrl: process.env.LANGFUSE_BASE_URL!,
    });

    langfuse.on("error", (error) => {
      console.error("Langfuse error:", error);
    });
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
    if (
      !(await fs.stat(`./components/${index}.tsx`).catch(() => false)) ||
      !(await fs.stat(`./mock-data/${index}.ts`).catch(() => false))
    ) {
      swaggersWithIndex.push({ index, swagger: swaggers[index] });
    }
  }

  console.log(`${swaggersWithIndex.length} swaggers need to be generated`);
  console.log("generating components...");

  await semaphorePromiseAll(
    swaggersWithIndex.map(
      (swaggerWithIndex) => () =>
        generateComponent(
          sessionId,
          langfuse,
          vendor,
          swaggerWithIndex.index,
          swaggerWithIndex.swagger,
        ),
    ),
    40, // 40 concurrent requests
    5000, // 5 seconds
  );

  console.log(
    "finished; the components are saved in the `components` directory",
  );

  if (langfuse) {
    await langfuse.shutdownAsync();
  }
}

async function listSwaggers(): Promise<CrawledOpenApiResType[]> {
  interface ResTypeWithIndex {
    index: number;
    resType: CrawledOpenApiResType;
  }

  const swaggers = fs.glob("./swaggers/*.json");
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

async function generateComponent(
  sessionId: string,
  langfuse: Langfuse | null,
  vendor: IAutoViewVendor,
  index: number,
  resType: CrawledOpenApiResType,
): Promise<void> {
  const MAX_RETRY = 5;

  let trace: LangfuseTraceClient | null = null;

  if (langfuse) {
    trace = langfuse.trace({
      sessionId,
      name: `generate-component-${index}`,
      metadata: {
        index,
        schema: resType,
      },
      public: true,
    });
  }

  interface TracingMetadata {
    codegen?: LangfuseGenerationClient;
    randomgen?: LangfuseGenerationClient;
  }

  for (let retry = 0; retry < MAX_RETRY; retry++) {
    try {
      const agent = new AutoViewAgent<TracingMetadata>({
        vendor,
        input: {
          type: "llm-schema",
          model: "3.1",
          schema: resType.schema,
          $defs: resType.$defs,
        },
        onPreLlmGeneration: async (
          agentType,
          sessionId,
          _api,
          body,
          _options,
          _backoffStrategy,
          metadata,
        ) => {
          if (!trace) {
            return;
          }

          if (!metadata) {
            return;
          }

          const generation = trace.generation({
            name: `generate-component-${index}-${agentType}`,
            model: body.model,
            modelParameters: {
              temperature: body.temperature ?? null,
            },
            input: body.messages,
            metadata: {
              sessionId,
            },
          });

          metadata[agentType] = generation;

          return async (agentType, _sessionId, completion) => {
            if (!metadata) {
              return;
            }

            if (completion instanceof Stream) {
              return;
            }

            metadata[agentType]?.end({
              output: completion,
              usageDetails: {
                input_tokens: completion.usage?.prompt_tokens ?? 0,
                output_tokens: completion.usage?.completion_tokens ?? 0,
                total_tokens: completion.usage?.total_tokens ?? 0,
                input_tokens_details:
                  (completion.usage?.prompt_tokens_details as any) ?? null,
                output_tokens_details:
                  (completion.usage?.completion_tokens_details as any) ?? null,
              },
            });
          };
        },
      });
      const result = await agent.generate({} satisfies TracingMetadata);

      if (result.status === "failure") {
        if (result.reason.includes("INVALID SCHEMA")) {
          console.warn(
            `[INVALID SCHEMA] the schema at index ${index} is invalid; skipping`,
          );
          return;
        }

        console.warn(
          `failed to generate component for the schema at index ${index} (${MAX_RETRY - retry - 1} retries left): ${result.reason}`,
        );
        continue;
      }

      await fs.writeFile(`./components/${index}.tsx`, result.tsxCode, {
        encoding: "utf-8",
      });
      await fs.writeFile(
        `./mock-data/${index}.ts`,
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
  return ${JSON.stringify(value)};
}
`;
}

main().catch(console.error);
