# Autoview
[![AutoView Playground](https://wrtnlabs.io/autoview/images/docs/playground.png)](https://wrtnlabs.io/autoview)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wrtnlabs/autoview/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@autoview/interface.svg)](https://www.npmjs.com/package/@autoview/interface)
[![Downloads](https://img.shields.io/npm/dm/@autoview/interface.svg)](https://www.npmjs.com/package/@autoview/interface)
[![Build Status](https://github.com/wrtnlabs/autoview/workflows/build/badge.svg)](https://github.com/wrtnlabs/autoview/actions?query=workflow%3Abuild)

`@autoview` is an automated frontend builder that generates code using type schema.

`@autoview` is a code generator that produces TypeScript frontend component from schema information. This schema information can be derived from either TypeScript types or Swagger/OpenAPI documents.

Frontend developers can use `@autoview` to significantly increase productivity. Simply define TypeScript types, and the frontend code will be generated immediately. You can then refine and enhance this code to complete your application.

For backend developers, simply bring your `swagger.json` file to `@autoview`. If your API contains 200 functions, it will automatically generate 200 frontend components. If there are 300 API functions, 300 frontend components will be generated automatically.

```typescript
import { AutoViewAgent } from "@autoview/agent";
import fs from "fs";
import OpenAI from "openai";
import typia, { tags } from "typia";

interface IMember {
  id: string & tags.Format<"uuid">;
  name: string;
  age: number & tags.Minimum<0> & tags.Maximum<100>;
  thumbnail: string & tags.Format<"uri"> & tags.ContentMiaType;
}

const agent: AutoViewAgent = new AutoViewAgent({
  vendor: {
    api: new OpenAI({ apiKey: "********" }),
    model: "o3-mini",
  },
  inputSchema: {
    parameters: typia.llm.parameters<
      IMember, 
      "chatgpt", 
      { reference: true }
    >(),
  },
});
const result: IAutoViewResult = await agent.generate();

await fs.promises.writeFile(
  "./src/transformers/transformMember.ts",
  result.transformTsCode,
  "utf8",
);
```



## Playground

You can experience how typia works by playground website:

💻 https://wrtnlabs.io/agentica/




## Guide Documents
Check out the document in the [website](https://wrtnlabs.io/autoview):

  - [🚀 Introduction](https://wrtnlabs.io/autoview/docs/)
  - [📦 Setup](https://wrtnlabs.io/autoview/docs/setup/)
  - [📜 Principles](https://wrtnlabs.io/autoview/docs/principles/)
  - [📅 Roadmap](https://wrtnlabs.io/autoview/docs/roadmap/)