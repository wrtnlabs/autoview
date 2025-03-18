import { AutoViewCompilerService } from "@autoview/compiler";
import { rollup } from "@rollup/browser";
import { WorkerServer } from "tgrid";

const main = async (): Promise<void> => {
  const worker: WorkerServer<null, AutoViewCompilerService, null> =
    new WorkerServer();
  const service: AutoViewCompilerService = new AutoViewCompilerService(rollup);
  await worker.open(service);
};
main().catch(console.error);
