import {
  IAutoViewCompilerResult,
  IAutoViewCompilerService,
  IAutoViewComponentProps,
  IAutoViewTransformerService,
} from "@autoview/interface";
import { IChatGptSchema } from "@samchon/openapi";
import { Driver, WorkerConnector } from "tgrid";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";
import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_service_transform = async (): Promise<void> => {
  const javascript: string = await test_service();
  await test_transform(javascript);
};

const test_service = async (): Promise<string> => {
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
    return result.javascript;
  } catch (error) {
    throw error;
  } finally {
    await worker.close();
  }
};

const test_transform = async (javascript: string): Promise<void> => {
  const worker: WorkerConnector<
    null,
    null,
    IAutoViewTransformerService<unknown>
  > = new WorkerConnector(null, null);
  await worker.compile(javascript);

  try {
    const service: Driver<IAutoViewTransformerService<unknown>> =
      worker.getDriver();
    const value: IBbsArticle = typia.assert<IBbsArticle>(
      await service.random(),
    );
    const props: IAutoViewComponentProps = await service.transform(value);
    typia.assert(props);
    await TestGlobal.archive("props.json", JSON.stringify(props, null, 2));
  } catch (error) {
    throw error;
  } finally {
    await worker.close();
  }
};
