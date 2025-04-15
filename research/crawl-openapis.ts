import { ILlmSchemaV3_1, LlmTypeCheckerV3_1 } from "@samchon/openapi";
import * as fs from "fs/promises";

import { crawlOpenApi } from "./openapi-crawler";

const urls = [
  "https://raw.githubusercontent.com/samchon/shopping-backend/refs/heads/master/packages/api/swagger.json",
  "https://api.channel.io/docs/open/swagger.json",
  "https://raw.githubusercontent.com/picktogram/nestia-example/refs/heads/main/example/swagger.json",
  "https://raw.githubusercontent.com/github/rest-api-description/refs/heads/main/descriptions/api.github.com/api.github.com.json",
];

export async function crawlOpenApiAll(): Promise<ILlmSchemaV3_1[]> {
  return await crawlOpenApi(...urls).then((apis) =>
    apis
      .flatMap((api) => api.functions.map((func) => func.output))
      .filter((output) => output != null)
      .filter(
        (output) =>
          !LlmTypeCheckerV3_1.isNull(output) &&
          !LlmTypeCheckerV3_1.isUnknown(output),
      ),
  );
}

async function main(): Promise<void> {
  const apis = await crawlOpenApiAll();
  apis.map((api, index) =>
    fs.writeFile(`./swaggers/${index}.json`, JSON.stringify(api, null, 2)),
  );
}

main().catch(console.error);
