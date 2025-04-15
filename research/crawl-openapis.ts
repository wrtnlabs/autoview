import { ILlmSchemaV3_1, LlmTypeCheckerV3_1 } from "@samchon/openapi";
import * as fs from "fs/promises";

import { crawlOpenApi } from "./openapi-crawler";

const urls = [
  "https://raw.githubusercontent.com/samchon/shopping-backend/refs/heads/master/packages/api/swagger.json",
  "https://api.channel.io/docs/open/swagger.json",
  "https://raw.githubusercontent.com/picktogram/nestia-example/refs/heads/main/example/swagger.json",
  "https://raw.githubusercontent.com/github/rest-api-description/refs/heads/main/descriptions/api.github.com/api.github.com.json",
];

export interface CrawledOpenApiResType {
  schema: ILlmSchemaV3_1;
  $defs: Record<string, ILlmSchemaV3_1>;
}

export async function crawlOpenApiAll(): Promise<CrawledOpenApiResType[]> {
  return await crawlOpenApi(...urls).then((apis) =>
    apis
      .flatMap((api) => api.functions)
      .filter(
        (func) =>
          func.output != null &&
          !LlmTypeCheckerV3_1.isNull(func.output) &&
          !LlmTypeCheckerV3_1.isUnknown(func.output),
      )
      .map(
        (func) =>
          ({
            schema: func.output!,
            $defs: func.parameters.$defs,
          }) satisfies CrawledOpenApiResType,
      ),
  );
}

async function main(): Promise<void> {
  const apis = await crawlOpenApiAll();

  await clearGlob("./swaggers/*.json");

  apis.map((api, index) =>
    fs.writeFile(`./swaggers/${index}.json`, JSON.stringify(api, null, 2)),
  );
}

async function clearGlob(glob: string): Promise<void> {
  const tasks = [];

  for await (const file of fs.glob(glob)) {
    tasks.push(fs.unlink(file));
  }

  await Promise.all(tasks);
}

main().catch(console.error);
