import { WorkerServer } from "tgrid";

import { AutoViewCompilerService } from "./AutoViewCompilerService";

const main = async (): Promise<void> => {
  const worker: WorkerServer<null, AutoViewCompilerService, null> =
    new WorkerServer();
  await worker.open(new AutoViewCompilerService());
};
main().catch(console.error);
