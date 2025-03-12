import { renderPrompt } from "../../core/Prompt";

export interface PromptContext {
  input_schema: unknown;
  output_schema: unknown;
  component_plan: string;
}

const rawPrompt = `
You are an expert TypeScript developer specializing in data visualization. Your task is to create a function that transforms input data into a format suitable for visualization based on given schemas and a component plan.

First, review the following input schema, output schema, and component plan:

<input_schema>
{{input_schema}}
</input_schema>

<output_schema>
{{output_schema}}
</output_schema>

<component_plan>
{{component_plan}}
</component_plan>

Before writing the function, you'll need to reason through the entire process in detail. Use the following steps to guide your reasoning:

1. Analyze the input schema and identify key data structures.
2. Examine the output schema and determine the required transformations.
3. Study the component plan and break down the visualization requirements.
4. Plan the data transformation process, including any necessary aggregations, filtering, or calculations.
5. Consider potential edge cases and how to handle them.
6. Determine appropriate TypeScript types and interfaces based on the schemas.
7. Outline the main steps the function will need to perform.

Present your reasoning inside <analysis> tags. Be thorough and detailed in your step-by-step analysis. Include the following:

- List out the input and output data structures explicitly.
- Identify any potential data type conversions or calculations needed.
- Provide a high-level pseudocode outline of the function.
- Consider and list potential error scenarios and how to handle them.

After completing your analysis, implement a TypeScript function named "visualizeData" that accomplishes the following:
a. Accepts input data conforming to the input schema
b. Transforms the input data according to the component plan
c. Produces output data conforming to the output schema

Ensure that your function:
- Uses appropriate TypeScript types and interfaces
- Implements all necessary data transformations
- Handles potential edge cases gracefully
- Includes comments explaining complex logic or non-obvious transformations
- Do not validate inputs, as external system will validate inputs for you for better performance

Provide your TypeScript function inside <typescript_function> tags. The function should have the following signature:

function visualizeData(input: InputType): OutputType

Where InputType and OutputType are appropriate TypeScript types based on the input and output schemas.

Remember to adhere strictly to the input schema, output schema, and component plan provided. Do not introduce any additional functionality or data structures that are not specified in these inputs.

Example output structure (do not copy this content, it's just to illustrate the format):

<analysis>
Step 1: Input Schema Analysis
...
Step 2: Output Schema Examination
...
[Continue with detailed analysis for all steps]

Input Data Structures:
...

Output Data Structures:
...

Data Type Conversions and Calculations:
...

Pseudocode Outline:
...

Potential Error Scenarios:
...
</analysis>

<typescript_function>
interface InputType {
  // Define input type here
}

interface OutputType {
  // Define output type here
}

function visualizeData(input: InputType): OutputType {
  // Function implementation
}
</typescript_function>

Do not generate any other text such as explanation, introduction, so on, after the <typescript_function> tags.

Begin your response with the analysis process as instructed.
`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
