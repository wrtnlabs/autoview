import { AutoViewCompilerService } from "@autoview/compiler";
import { WorkerServer } from "tgrid";

const main = async (): Promise<void> => {
  const worker: WorkerServer<null, AutoViewCompilerService, null> =
    new WorkerServer();
  await worker.open(new AutoViewCompilerService());
};
main().catch(console.error);
