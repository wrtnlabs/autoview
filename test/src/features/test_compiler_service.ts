import {
  IAutoViewCompilerResult,
  IAutoViewCompilerService,
} from "@autoview/interface";
import { IChatGptSchema } from "@samchon/openapi";
import { Driver, WorkerConnector } from "tgrid";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";
import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_service = async (): Promise<void> => {
  const $defs: Record<string, IChatGptSchema> = {};
  const schema: IChatGptSchema = typia.llm.schema<
    IBbsArticle,
    "chatgpt",
    {
      reference: true;
    }
  >($defs);

  const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
    new WorkerConnector(null, null);
  await worker.connect(
    `${__dirname}/../../node_modules/@autoview/compiler/src/worker/index.ts`,
  );

  try {
    const service: Driver<IAutoViewCompilerService> = worker.getDriver();
    await service.initialize({
      metadata: {
        $defs,
        schema,
      },
    });
    const result: IAutoViewCompilerResult = await service.compile(`
      return {
        type: "GridList",
        items: [],
      };
  `);
    if (result.type !== "success")
      throw new Error(JSON.stringify(result, null, 2));
  } catch (error) {
    throw error;
  } finally {
    await worker.close();
  }
};
