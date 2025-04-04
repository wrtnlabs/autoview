export const STEPPER_CONTENTS = [
  {
    title: "Upload",
    description:
      "Select schema presets or upload your own schema as Swagger file format. It might takes 1 minutes for transmitting data for UI format.",
  },
  {
    title: "Converting",
    description:
      "Select schema presets or upload your own schema as Swagger file format. It might takes 1 minutes for transmitting data for UI format.",
  },
  {
    title: "Display",
    description:
      "Select schema presets or upload your own schema as Swagger file format. It might takes 1 minutes for transmitting data for UI format.",
  },
];

export const HOW_TO_USE_CONTENTS = `Edit  **src/env.ts**  to set your API key.
Edit  **src/YourSchema.ts**  to define your own schema (and value).
Run  **npm run generate**  to generate the component.
- It takes some time (about a minute) to generate the component.
- You can see the generated code in **src/transform.ts**
Run **npm run start** to see the component in action.
All operations are run in your browser only, so no data is sent to the server.`;
