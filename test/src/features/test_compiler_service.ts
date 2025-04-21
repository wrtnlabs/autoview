import {
  IAutoViewCompilerResult,
  IAutoViewCompilerService,
  IAutoViewComponentProps,
} from "@autoview/interface";
import { Driver, WorkerConnector } from "tgrid";
import typia from "typia";

import { IBbsArticle } from "../structures/IBbsArticle";

export const test_compiler_service = async (): Promise<void> => {
  const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
    new WorkerConnector(null, null);
  await worker.connect(
    `${__dirname}/../../node_modules/@autoview/compiler/src/worker/index.ts`,
  );

  try {
    const service: Driver<IAutoViewCompilerService> = worker.getDriver();
    await service.initialize({
      inputMetadata: {
        parameters: typia.llm.parameters<IBbsArticle, "chatgpt">(),
      },
      componentMetadata: {
        parameters: typia.llm.parameters<
          {
            props: IAutoViewComponentProps;
          },
          "chatgpt",
          {
            reference: true;
          }
        >(),
      },
    });
    const result: IAutoViewCompilerResult = await service.compile(
      `
function visualizeData(_: unknown): IAutoView.IAutoViewComponentProps {
  return {
    type: "GridList",
    items: [],
  };
}
  `,
      "Schema",
      "test_compiler_service",
    );
    if (result.type !== "success")
      throw new Error(JSON.stringify(result, null, 2));
  } catch (error) {
    throw error;
  } finally {
    await worker.close();
  }
};
