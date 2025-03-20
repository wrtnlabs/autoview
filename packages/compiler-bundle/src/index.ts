import { AutoViewCompilerService } from "@autoview/compiler";
import { WorkerServer } from "tgrid";

const main = async (): Promise<void> => {
  const worker: WorkerServer<null, AutoViewCompilerService, null> =
    new WorkerServer();
  const service: AutoViewCompilerService = new AutoViewCompilerService();
  await worker.open(service);
};
main().catch(console.error);
