import fs from "fs";
import OpenAI from "openai";
import { Singleton } from "tstl";

import { AutoViewAgent } from "../src/agents/AutoViewAgent";
import { IAutoViewAgentProvider } from "../src/structures/agents/IAutoViewAgentProvider";
import { IAutoViewComponentProps } from "../src/structures/properties/IAutoViewComponentProps";
import { TestGlobal } from "./TestGlobal";

const EXAMPLES = `${TestGlobal.ROOT}/public/examples`;
const RESULTS = `${TestGlobal.ROOT}/public/results`;

const main = async (): Promise<void> => {
  if (TestGlobal.env.CHATGPT_API_KEY === undefined)
    throw new Error("env.CHATGPT_API_KEY is not defined.");

  // PREPARE ASSETS
  const provider: IAutoViewAgentProvider.IChatGpt = {
    type: "chatgpt",
    model: "gpt-4o-mini",
    api: new OpenAI({
      apiKey: TestGlobal.env.CHATGPT_API_KEY,
    }),
  };
  const include: string[] = TestGlobal.getArguments("include");
  const exclude: string[] = TestGlobal.getArguments("exclude");
  const filter = (name: string): boolean =>
    (include.length ? include.some((str) => name.includes(str)) : true) &&
    (exclude.length ? exclude.every((str) => !name.includes(str)) : true);

  const directory: string[] = await fs.promises.readdir(
    `${TestGlobal.ROOT}/public/examples`,
  );
  const mkdir = new Singleton(async () => {
    const create = async (str: string): Promise<void> => {
      try {
        await fs.promises.mkdir(str);
      } catch {}
    };
    await create(RESULTS);
    await create(`${RESULTS}/images`);
    await create(`${RESULTS}/json`);
  });
  for (const file of directory) {
    if (file.endsWith(".json") === false) continue;
    else if (filter(file) === false) continue;

    const name = file.substr(0, file.length - 5);
    const data = JSON.parse(
      await fs.promises.readFile(`${EXAMPLES}/${file}`, "utf8"),
    );
    const result: IAutoViewComponentProps | null = await AutoViewAgent.value({
      retry: 3,
      provider,
      inputs: Array.isArray(data) ? data : [data],
    });
    if (result === null) {
      console.log(`${name}: failure`);
      continue;
    }
    console.log(`${name}: success`);

    await mkdir.get();
    await fs.promises.writeFile(
      `${RESULTS}/json/${name}.json`,
      JSON.stringify(result, null, 2),
      "utf8",
    );
  }
};
main().catch((error) => {
  console.log(error);
  process.exit(-1);
});
