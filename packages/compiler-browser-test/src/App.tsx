import {
  IAutoViewCompilerResult,
  IAutoViewCompilerService,
} from "@autoview/interface";
import { useEffect, useState } from "react";
import { Driver, WorkerConnector } from "tgrid";
import typia from "typia";

import "./App.css";
import reactLogo from "./assets/react.svg";
import { IBbsArticle } from "./structures/IBbsArticle";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const initialize = async () => {
      const worker: WorkerConnector<null, null, IAutoViewCompilerService> =
        new WorkerConnector(null, null);
      await worker.connect("worker.js");
      const service: Driver<IAutoViewCompilerService> = worker.getDriver();
      await service.initialize({
        inputMetadata: typia.json.schema<IBbsArticle>(),
      });
      const result: IAutoViewCompilerResult =
        await service.compileReactComponent(
          await service.generateBoilerplateForReactComponent(
            "AutoViewInput",
            "AutoViewInputSubTypes",
          ),
          `
export default function Component(value: AutoViewInput): React.ReactNode {
  return {
    type: "GridList",
    items: [],
  };
}
      `,
        );
      console.log(result);
    };
    initialize().catch(console.error);
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
