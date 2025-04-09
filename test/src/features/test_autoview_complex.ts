import {
  AutoViewAgent,
  type IAutoViewResult,
  type IAutoViewVendor,
} from "@autoview/agent";
import { HttpLlm, OpenApi } from "@samchon/openapi";
import fs from "fs/promises";
import OpenAI from "openai";

import { TestGlobal } from "../TestGlobal";

export async function test_autoview_complex(): Promise<void> {
  if (TestGlobal.env.CHATGPT_API_KEY === undefined)
    throw new Error("env.CHATGPT_API_KEY is not defined.");

  const vendor: IAutoViewVendor = {
    model: "o3-mini-2025-01-31",
    isThinkingEnabled: true,
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };
  const [page, sale] = await generateForSwagger(vendor);

  console.log("----------------------------");
  console.log("page");
  console.log("----------------------------");
  console.log(page);
  console.log("----------------------------");

  console.log("");
  console.log("");
  console.log("");

  console.log("----------------------------");
  console.log("sale");
  console.log("----------------------------");
  console.log(sale);
  console.log("----------------------------");
}

const generateForSwagger = async (
  vendor: IAutoViewVendor,
): Promise<IAutoViewResult[]> => {
  // GET SWAGGER SCHEMA INFORMATION
  const document = OpenApi.convert(
    await fetch(
      "https://raw.githubusercontent.com/samchon/shopping-backend/refs/heads/master/packages/api/swagger.json",
    ).then((r) => r.json()),
  );

  // CONVERT TO LLM FUNCTION CALLING SCHEMA
  const app = HttpLlm.application({
    model: "chatgpt",
    document,
    options: {
      reference: true,
    },
  });
  const page = app.functions.find(
    (func) =>
      func.path === "/shoppings/customers/sales" && func.method === "patch",
  );
  const sale = app.functions.find(
    (func) =>
      func.path === "/shoppings/customers/sales/{id}" && func.method === "get",
  );
  if (page === undefined || sale === undefined) {
    console.error("Operation not found");
    process.exit(-1);
  }

  // GENERATE
  return await Promise.all(
    Object.entries({
      page,
      sale,
    }).map(async ([key, func]) => {
      const name: string = `transform${key[0].toUpperCase()}${key.slice(1)}`;
      const agent: AutoViewAgent = new AutoViewAgent({
        vendor,
        input: {
          type: "parameters",
          model: "chatgpt",
          parameters: func.parameters,
        },
        transformFunctionName: name,
        experimentalAllInOne: true,
      });
      const result = await agent.generate();

      await fs.writeFile(
        `test_autoview_complex/${key[0].toUpperCase()}${key.slice(1)}.ts`,
        result.transformTsCode,
        "utf8",
      );

      return result;
    }),
  );
};
