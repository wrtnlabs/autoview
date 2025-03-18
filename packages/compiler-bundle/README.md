```bash
npm run build
```

Isolated environment for bundling `@autoview/compiler` as a worker provider.

No need to run `npm install`. Just run `npm run build` command. Then `dist` directory would be created.

Deploy the `dist` directory to somewhere, and make web browser to load it by `WorkerConnector` like below.

```typescript
import { 
  IAutoViewCompilerResult,
  IAutoViewCompilerService
} from "@autoview/interface";
import { Driver, WorkerConnector } from "tgrid";

const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
  new WorkerConnector(null, null);
await worker.compile(
  await fetch(
    "http://localhost:3000/compiler/worker.js",
  ).then(r => r.json()),
);

const driver: Driver<IAutoViewCompilerService> = worker.getDriver();
const result: IAutoViewCompilerResult = await driver.compile("YOUR_SCRIPT");

await worker.close();
```