<h1 align="center">Autoview</h1>
<p align="center">
<a href="https://www.npmjs.com/package/@autoview/agent">
  <img src="https://img.shields.io/npm/v/@autoview/agent?style=for-the-badge" alt="npm version">
</a>
<a href="https://www.npmjs.com/package/@autoview/agent">
  <img src="https://img.shields.io/npm/dm/@autoview/agent?style=for-the-badge" alt="Downloads">
</a>
<a href="https://opensource.org/licenses/MIT">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License">
</a>
<a href="https://github.com/samchon/typia">
    <img src="https://img.shields.io/badge/poweredby-Typia-blue?style=for-the-badge" alt="Badge">
</a>
<a href="https://discord.gg/aMhRmzkqCx">
  <img src="https://dcbadge.limes.pink/api/server/https://discord.gg/aMhRmzkqCx" alt="Discord">
</a>
</p>

<p align="center">
    <strong>Turn your blueprint into UI components</strong>
  <br>
    <span>Automated Frontend Viewer Development</span>
</p>

---

[![AutoView Playground](https://wrtnlabs.io/autoview/images/docs/playground.png)](https://wrtnlabs.io/autoview)

<h3 align="center">

[Homepage](https://wrtnlabs.io/autoview) // [Documentation](https://wrtnlabs.io/autoview/docs) // [Tutorials](https://youtube.com) // [Playground](https://wrtnlabs.io/autoview/images/docs/playground.png)

</h3>

---

_Autoview_ is a code generator that transforms your schema into fully functional TypeScript frontend components. Whether you define your schema as TypeScript types or provide a Swagger/OpenAPI document, _Autoview_ automatically generates the corresponding UI code with precision.

For frontend developers, this means you can instantly see your design take shape. Simply define your TypeScript types, and watch as _Autoview_ produces the necessary code for you to refine and integrate into your application.

Backend developers benefit as well—just supply your swagger.json file and let _Autoview_ work its magic. Whether your API defines 200 functions or 300, the tool scales effortlessly by generating an equal number of frontend components, streamlining integration and boosting productivity.

## 🚀 Key Features

- **🤖 Automated Viewer Generation**: Uses LLM function calling to automatically compose React viewer components.
- **💻 TypeScript Code Generation**: Generate compile-ready TypeScript code based on your schema, easing the path for rapid prototyping.
- **🔌 Swagger/OpenAPI Integration**: Automatically generate viewer components for every API operation using your Swagger (OpenAPI) document.
- **✅ LLM Function Calling & Validation**: Combines LLM function calling with real-time compiler and validator feedback to achieve high reliability.
- **🚀 Boost Developer Productivity**: Streamline repetitive frontend tasks with automation that integrates directly into your workflow.

---

## ⚡ Quickstart

### Step 1. Setup

Install `@autoview/agent` along with its required dependencies:

```bash
npm install @autoview/agent @autoview/ui openai
npm install -D @samchon/openapi typia
npx typia setup
```

### Step 2. Define your own TypeScript interface to display

```typescript
import typia, type { tags } from "typia";

interface IMember {
  id: string & tags.Format<"uuid">;
  name: string;
  age: number & tags.Minimum<0> & tags.Maximum<100>;
  thumbnail: string & tags.Format<"uri"> & tags.ContentMediaType;
}
```

### Step 3. Setup the _Autoview_ agent

```typescript
import { AutoViewAgent } from "@autoview/agent";
import fs from "node:fs";
import OpenAI from "openai";

const agent = new AutoViewAgent({
  model: "chatgpt",
  vendor: {
    api: new OpenAI({ apiKey: "********" }),
    model: "o3-mini",
    isThinkingEnabled: true,
  },
  input: {
    type: "json-schema",
    unit: typia.json.unit<IMember>(),
  },
  transformFunctionName: "transformMember",
  experimentalAllInOne: true, // recommended for faster and less-error results
});
```

### Step 4. Lights, camera, action! 🎥

```typescript
const result = await agent.generate(); // generate the code

// save the code
await fs.promises.writeFile(
  "./src/transformers/transformMember.ts",
  result.transformTsCode,
  "utf8",
);
```

### Step 5. Use the generated component

```typescript
import { renderComponent } from "@autoview/ui";

import { transformMember } from "./transformers/transformMember";

export interface MemberComponentProps {
  member: IMember;
}

export default function MemberComponent(props: MemberComponentProps) {
  return <div>{renderComponent(transformMember(props.member))}</div>;
}
```

## 💬 Community & Support

For support, questions, or to provide feedback, join our Discord community:

[![Discord](https://dcbadge.limes.pink/api/server/https://discord.gg/aMhRmzkqCx)](https://discord.gg/aMhRmzkqCx)

---

## ⚖️ License

Autoview is open-source and available under the [MIT License](https://github.com/wrtnlabs/autoview/blob/master/LICENSE).

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/2a143ef8-6a9d-4258-96ce-fb3a59137a5b" alt="Wrtn Technologies Logo" />
</p>
<div align="center">
  Autoview is maintained by <a href="https://wrtnlabs.io">Wrtn Technologies</a> &mdash; Empowering developers to automate frontend viewer creation.
</div>
