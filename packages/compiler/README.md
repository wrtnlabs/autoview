# `@autoview/compiler`

Embedded TypeScript compiler for `@autoview/agent`.

It is for validation feedback, and bundling for actual running.

## NodeJS Environment
Connect to the worker in the `node_modules`.

```typescript
import { Driver, WorkerConnector } from "tgrid";
import {
  IAutoViewCompilerService,
  IAutoViewCompilerResult
} from "@autoview/compiler";

const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
  new WorkerConnector(null, null);
await worker.connect(
  `${__dirname}/../../node_modules/@autoview/compiler/lib/worker/index.js`,
);
const service: Driver<IAutoViewCompilerService> = worker.getDriver();
await service.initialize({...});

const result: IAutoViewCompilerResult = await service.compile("...");
await worker.close();
```

### Browser Environment
Compile the worker from by below URL.

  - https://wrtnlabs.io/autoview/compiler/worker.js

```typescript
import { Driver, WorkerConnector } from "tgrid";
import {
  IAutoViewCompilerService,
  IAutoViewCompilerResult
} from "@autoview/compiler";

const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
  new WorkerConnector(null, null);
await worker.compile(
  await fetch(
    "https://wrtnlabs.io/autoview/compiler/worker.js",
  ).then((r) => r.json()),
);
const service: Driver<IAutoViewCompilerService> = worker.getDriver();
await service.initialize({...});

const result: IAutoViewCompilerResult = await service.compile("...");
await worker.close();
```
