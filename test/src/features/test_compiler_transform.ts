import { AutoViewCompiler } from "@autoview/compiler";
import {
  IAutoViewCompilerResult,
  IAutoViewComponentProps,
  IAutoViewTransformerService,
} from "@autoview/interface";
import { IChatGptSchema } from "@samchon/openapi";
import { Driver, WorkerConnector } from "tgrid";
import typia from "typia";

import { TestGlobal } from "../TestGlobal";
import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_transform = async (): Promise<void> => {
  const $defs: Record<string, IChatGptSchema> = {};
  const schema: IChatGptSchema = typia.llm.schema<
    IBbsArticle,
    "chatgpt",
    {
      reference: true;
    }
  >($defs);

  const compiler: AutoViewCompiler = new AutoViewCompiler({
    inputMetadata: {
      $defs,
      schema,
    },
    componentMetadata: {
      $defs: {},
      schema: {},
    },
    compilerOptions: {
      module: "cjs",
    },
  });
  const result: IAutoViewCompilerResult = await compiler.compile(`
        return {
          type: "GridList",
          items: [],
        };
    `);
  if (result.type !== "success")
    throw new Error(JSON.stringify(result, null, 2));
  await TestGlobal.archive("transformer.js", result.javascript);

  const worker: WorkerConnector<
    null,
    null,
    IAutoViewTransformerService<unknown>
  > = new WorkerConnector(null, null);
  await worker.compile(result.javascript);

  try {
    const service: Driver<IAutoViewTransformerService<unknown>> =
      worker.getDriver();
    const value: IBbsArticle = typia.assert<IBbsArticle>(
      await service.random(),
    );
    const props: IAutoViewComponentProps = await service.transform(value);
    typia.assert(props);
  } catch (error) {
    throw error;
  } finally {
    await worker.close();
  }
};
