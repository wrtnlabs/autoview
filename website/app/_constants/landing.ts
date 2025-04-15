export const STEPPER_CONTENTS = [
  {
    title: "Define",
    description:
      "Define the data schema via TypeScript interface. It guides the automatic component generation.",
  },
  {
    title: "Generate",
    description:
      "The LLM analyzes the schema, generating React code. This process typically takes less than one minute.",
  },
  {
    title: "Display",
    description:
      "Pass data to the generated component for instant rendering. Enjoy efficient performance without runtime LLM calls.",
  },
];

export const HOW_TO_USE_CONTENTS = `Edit  **src/env.ts**  to set your API key.
Edit  **src/YourSchema.ts**  to define your own schema (and value).
Run  **npm run generate**  to generate the component.
- It takes some time (about a minute) to generate the component.
- You can see the generated code in **src/transform.ts**
Run **npm run start** to see the component in action.
All operations are run in your browser only, so no data is sent to the server.`;
