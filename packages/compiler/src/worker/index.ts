import { rollup } from "rollup";
import { WorkerServer } from "tgrid";

import { AutoViewCompilerService } from "../AutoViewCompilerService";

const main = async (): Promise<void> => {
  const worker: WorkerServer<null, AutoViewCompilerService, null> =
    new WorkerServer();
  const service: AutoViewCompilerService = new AutoViewCompilerService(rollup);
  await worker.open(service);
};
main().catch(console.error);
