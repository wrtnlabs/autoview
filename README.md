<h1>Autoview, Automated Frontend Viewer Development
</h1>

![autoview](https://github.com/user-attachments/assets/8dee7cb0-65a6-436a-89e5-b39893070c16)


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

<h3 align="center">
<!-- === Quick links === -->

<p align="center">
  <a href="https://wrtnlabs.io/autoview/">
    <img
      src="https://img.shields.io/badge/Website-00393E?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz4KPHBhdGggZD0iTTIgMTJoMjAiLz4KPHBhdGggZD0iTTEyIDJhMTUuMyAxNS4zIDAgMCAxIDQgMTAgMTUuMyAxNS4zIDAgMCAxLTQgMTAgMTUuMyAxNS4zIDAgMCAxLTQtMTAgMTUuMyAxNS4zIDAgMCAxIDQtMTB6Ii8+Cjwvc3ZnPg==&logoColor=white"
      alt="Website"
    />
  </a>&nbsp;&nbsp;
  <a href="https://wrtnlabs.io/autoview/docs/">
    <img
      src="https://img.shields.io/badge/Docs-00393E?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KPHBhdGggZD0iTTIgM2g2YTQgNCAwIDAgMSA0IDR2MTRhNCA0IDAgMCAwLTQtNEgyWiIvPgo8cGF0aCBkPSJNMjIgM2gtNmE0IDQgMCAwIDAtNCA0djE0YTQgNCAwIDAgMSA0LTRoNnoiLz4KPC9zdmc+&logoColor=white"
      alt="Docs"
    />
  </a>&nbsp;&nbsp;
  <a href="https://www.youtube.com/@wrtnlabs">
    <img
      src="https://img.shields.io/badge/Tutorial-00393E?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4KPHBvbHlnb24gcG9pbnRzPSI2IDMgMjAgMTIgNiAyMSA2IDMiLz4KPC9zdmc+&logoColor=white"
      alt="Tutorial"
    />
  </a>&nbsp;&nbsp;
  <a href="https://wrtnlabs.io/autoview/" style="text-decoration:none">
    <img
    src="https://img.shields.io/badge/Playground-00393E?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNiIgeDI9IjEwIiB5MT0iMTEiIHkyPSIxMSIvPjxsaW5lIHgxPSI4IiB4Mj0iOCIgeTE9IjkiIHkyPSIxMyIvPjxsaW5lIHgxPSIxNSIgeDI9IjE1LjAxIiB5MT0iMTIiIHkyPSIxMiIvPjxsaW5lIHgxPSIxOCIgeDI9IjE4LjAxIiB5MT0iMTAiIHkyPSIxMCIvPjxwYXRoIGQ9Ik0xNy4zMiA1SDYuNjhhNCA0IDAgMCAwLTMuOTc4IDMuNTljLS4wMDYuMDUyLS4wMS4xMDEtLjAxNy4xNTVDMi42MDQgOS40MTYgMiAxNC40NTYgMiAxNmEzIDMgMCAwIDAgMyAzYzEgMCAxLjUtLjUgMi0xbDEuNDE0LTEuNDE0QTIgMiAwIDAgMSA5LjgyOCAxNmg0LjM0NGEyIDIgMCAwIDEgMS40MTQuNTg2TDE3IDE4Yy41LjUgMSAxIDIgMWEzIDMgMCAwIDAgMy0zYzAtMS41NDUtLjYwNC02LjU4NC0uNjg1LTcuMjU4LS4wMDctLjA1LS4wMTEtLjEtLjAxNy0uMTUxQTQgNCAwIDAgMCAxNy4zMiA1eiIvPjwvc3ZnPg=="
    alt="Playground"
    style="margin:0 4px"
   />
  </a>
</p>


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

---

## 🙋 Frequently Asked Questions (FAQ)

### Q: What is AutoView and why was it created?

AutoView is an open-source library that automatically transforms schema-based data into React UI components. It originated from the idea that, when developing AI agent chatbots, returning structured function call results as plain text leads to poor user experience. Instead, AutoView dynamically renders appropriate UI components based on the data structure—defined by TypeScript types or OpenAPI schemas—so that repetitive UI work is minimized and responses from the AI become much more user-friendly.

### Q: What problem does AutoView solve?

When AI chatbots return structured JSON data, displaying it as plain text can lead to poor readability and a subpar user experience. AutoView analyzes such data structures and automatically generates the most appropriate React UI components. Whether it's user profiles, product lists, or timestamps, it renders them in a more visually digestible format. Even if you have dozens of different API responses, AutoView helps you generate matching UI components without writing them one by one—greatly improving development efficiency.

### Q: What types of schemas does AutoView support? Are there any limitations?

AutoView primarily supports TypeScript interfaces/types and OpenAPI (Swagger) schemas as input. It uses typia to perform static analysis and validation of the schema, and the schema must be a statically defined object. This means dynamic keys or arbitrary shapes (e.g., `{ [key: string]: any }`) are not supported.

Also, AutoView focuses solely on generating **presentational** UI components—it does not handle user input, function types, or interactive logic even if such details are included in the schema.

### Q: What kind of UI does AutoView generate?

AutoView generates **React functional components** that correspond to each schema. These components are styled using TailwindCSS and shadcn/ui. Fields are rendered using suitable UI elements based on their types and format metadata. For example, an image URL field becomes an `<img>` or avatar component, a timestamp gets formatted text, and lists are rendered as tables or item lists. The output is TSX code that can be directly imported and used in your project.

### Q: How do I integrate AutoView components into my app?

1. Define a TypeScript type or OpenAPI schema.
2. Run the AutoView agent to generate UI components (includes LLM-based generation and typia validation).
3. Save the generated components as `.tsx` files.
4. Import and use the components in your project.

```tsx
import { renderComponent } from "@autoview/ui";
import { transformUser } from "./transformers/transformUser";

function UserCard({ user }: { user: IUser }) {
  return <div>{renderComponent(transformUser(user))}</div>;
}

```

### Q: Can I customize the UI generated by AutoView?

Yes. AutoView only provides an **initial draft** of UI code—it’s fully up to you to modify or customize it as needed. Since the components are built using TailwindCSS and shadcn/ui, you can easily adjust them to match your design system.

You can also influence the generation by adding typia tags like `Format`, `Minimum`, and `Maximum` to your schema. For example, a field with `Format<\"uri\">` may be rendered as an image.

### Q: When is AutoView a good fit—and when is it not?

**Great use cases for AutoView:**

- When you need to quickly visualize structured data
- When you have many similar components to generate
- When building AI chat interfaces or API-based dashboards
- When you want schema-driven, type-safe UI consistency

**Not suitable when:**

- You need pixel-perfect custom design
- Complex interactivity (e.g., drag & drop, multi-step forms) is required
- Your data structure is highly dynamic or defined only at runtime

### Q: What technical limitations should I be aware of?

- **No form handling or interactive logic:** AutoView does not generate logic for actions like button clicks or form submissions. Its focus is on data visualization.
- **Tailwind & shadcn dependency:** Generated components depend on TailwindCSS and shadcn/ui, so these must be set up in your project.
- **SSR compatibility:** The generated components can be used in server-side rendering, but generation must happen at build time.
- **No runtime generation:** Components cannot be generated dynamically in the browser—generation only happens during the build phase.

### Q: Is AutoView production-ready? What should I consider?

AutoView is an MIT-licensed open-source project and can be safely used in production. However, consider the following:

- **Code review is essential:** Although components are generated with type correctness, QA and visual validation are still necessary.
- **Performance:** Components are plain React code with no heavy runtime dependencies, so performance is not an issue.
- **Maintainability:** When your schema changes, you must regenerate the components. It's recommended to version control the generated files.

### Q: How does AutoView handle validation automatically?

- **Schema validation via typia:** AutoView uses typia to ensure the schema is valid and translatable into TypeScript interfaces.
- **Compile-time checks:** Generated code is compiled using TypeScript, and any errors are fed back to the LLM for correction, ensuring only valid code is produced.
- **Data formatting:** Fields with formats like date, time, email, or URL are automatically rendered in appropriate formats (e.g., `yyyy-mm-dd`, currency symbols).
- **Type safety:** AutoView ensures that components receive data of the correct type, helping catch bugs at build time and reducing runtime issues.

With this architecture, AutoView goes beyond just “drawing” UI—it intelligently generates **meaningful, reliable, and schema-consistent UI components** for your application.

---

## 💬 Community & Support

For support, questions, or to provide feedback, join our Discord community:

[![Discord](https://dcbadge.limes.pink/api/server/https://discord.gg/aMhRmzkqCx)](https://discord.gg/aMhRmzkqCx)

---

## ⚖️ License

Autoview is open-source and available under the [MIT License](https://github.com/wrtnlabs/autoview/blob/master/LICENSE).

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/e5e9e6e2-4295-45e7-8956-9f1d3aa757b4" alt="Wrtn Technologies Logo" />
</p>
<div align="center">
  Autoview is maintained by <a href="https://wrtnlabs.io">Wrtn Technologies</a> &mdash; Empowering developers to automate frontend viewer creation.
</div>
