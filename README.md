# Autoview

[![AutoView Playground](https://wrtnlabs.io/autoview/images/docs/playground.png)](https://wrtnlabs.io/autoview)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/wrtnlabs/autoview/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@autoview/interface.svg)](https://www.npmjs.com/package/@autoview/interface)
[![Downloads](https://img.shields.io/npm/dm/@autoview/interface.svg)](https://www.npmjs.com/package/@autoview/interface)
[![Build Status](https://github.com/wrtnlabs/autoview/workflows/build/badge.svg)](https://github.com/wrtnlabs/autoview/actions?query=workflow%3Abuild)

Turn your blueprint into UI components.

`@autoview` is a code generator that produces TypeScript frontend component from schema information. This schema information can be derived from either TypeScript types or Swagger/OpenAPI documents.

Frontend developers can use `@autoview` to significantly increase productivity. Simply define TypeScript types, and the frontend code will be generated immediately. You can then refine and enhance this code to complete your application.

For backend developers, simply bring your `swagger.json` file to `@autoview`. If your API contains 200 functions, it will automatically generate 200 frontend components. If there are 300 API functions, 300 frontend components will be generated automatically.

## Installation

```bash
npm install @autoview/agent @autoview/ui openai
npm install -D typia
npx typia setup
```

## How to generate the component

```ts
import { AutoViewAgent } from "@autoview/agent";
import fs from "fs";
import OpenAI from "openai";
import typia, { tags } from "typia";

// 1. Define your own TypeScript interface to display
interface IMember {
  id: string & tags.Format<"uuid">;
  name: string;
  age: number & tags.Minimum<0> & tags.Maximum<100>;
  thumbnail: string & tags.Format<"uri"> & tags.ContentMediaType;
}

// 2. Setup the AutoView agent
const agent = new AutoViewAgent<"chatgpt">({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({ apiKey: "********" }),
    model: "o3-mini",
    isThinkingEnabled: true,
  },
  input: {
    type: "interface",
    parameters: typia.llm.parameters<IMember, "chatgpt", { reference: true }>(),
  },
  transformFunctionName: "transform",
  experimentalAllInOne: true, // recommended for faster and less-error results
});

// 3. Get the result!
const result = await agent.generate();

await fs.promises.writeFile(
  "./src/transformers/transformMember.ts",
  result.transformTsCode,
  "utf8",
);
```

## How to use the generated component

```tsx
import { renderComponent } from "@autoview/ui";

import { transformMember } from "./transformers/transformMember";

export interface MemberComponentProps {
  member: IMember;
}

export default function MemberComponent(props: MemberComponentProps) {
  return <div>{renderComponent(transformMember(props.member))}</div>;
}
```

## Playground

You can experience how the AutoView works by playground website:

💻 https://wrtnlabs.io/autoview/

## Guide Documents

Check out the document in the [website](https://wrtnlabs.io/autoview):

- [🚀 Introduction](https://wrtnlabs.io/autoview/docs/)
- [📦 Setup](https://wrtnlabs.io/autoview/docs/setup/)
- [📜 Principles](https://wrtnlabs.io/autoview/docs/principles/)
- [📅 Roadmap](https://wrtnlabs.io/autoview/docs/roadmap/)
