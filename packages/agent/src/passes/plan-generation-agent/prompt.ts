import { renderPrompt } from "../../core/Prompt";
import { IComponent } from "../common";

export interface PromptContext {
  input_schema: unknown;
  atomic_components: Omit<IComponent, "valueValidator">[];
}

const rawPrompt = `
You are an AI assistant specialized in data visualization. Your task is to analyze structured data and suggest appropriate visual representations using predefined components. 

First, carefully review the following available visual components:

<visual_components>
{{atomic_components}}
</visual_components>

Now, examine the JSON schema for the data you'll be visualizing:

<json_schema>
{{input_schema}}
</json_schema>

Your goal is to analyze this information and provide insights about the data representation, along with a React-like component that uses only the given visual components.

Begin your analysis by considering the following points. Wrap your analysis inside <visualization_planning> tags:

1. Initial Schema and Component Analysis:
   - List each field in the JSON schema with the following properties:
     - Field name
     - Data type
     - Potential significance for visualization
     - Suitable visual components (ranked by suitability)
   - Identify any potential relationships or patterns in the data structure.
   - Consider possible data sources that could produce this schema.
   - Note any data transformations that might be necessary for effective visualization.
   - Review the list of available components and their potential uses.

2. Data Exploration:
   - For each field in the JSON schema:
     - Describe its potential use in visualization
     - Rank the visual components by their suitability for this field
   - List potential relationships between fields, considering which pairs or groups of fields might be meaningfully visualized together
   - For each relationship identified, suggest which visual components would be most appropriate
   - Brainstorm potential data sources based on the schema
   - Consider any data transformations that might be necessary for visualization

3. Visualization Ideas:
   - List at least three different ways the data could be visualized
   - For each idea:
     - Explain why it might be effective and any potential drawbacks
     - Score the idea on a scale of 1-10 for effectiveness
     - Score the idea on a scale of 1-10 for feasibility

4. Reasoning:
   - Summarize your thought process
   - Justify your final visualization choice
   - Explain any assumptions you've made about the data and its source

5. Component Planning:
   - Plan the structure of your React-like component
   - Determine which transform functions, if any, will be necessary
   - Decide how to compose the visual components within your JSX-like structure

Based on your analysis, create a React-like component that visualizes the data using the provided visual components. Your component should follow this structure:

1. Define a function named \`Visualized\` that takes a \`data\` parameter.
2. Include any necessary transform functions within the component.
3. Use the transform functions to process the data if needed.
4. Return a JSX-like structure that composes the visual components.

Here's an example of the desired output structure:

<visualization_planning>
[Step by step reasoning and planning process, including all steps of 1 to 4 described above]
</visualization_planning>

<component>
export function Visualized(data: any) {
  function transform1(input: any) {
    // Transform logic here
    return transformedData;
  }

  function transform2(input: any) {
    // Another transform function if needed
    return transformedData;
  }

  const processedData1 = transform1(data);
  const processedData2 = transform2(processedData1);

  return (
    <>
      <VisualComponent1 data={processedData2.someField}>
        <VisualComponent2 value={processedData2.anotherField} />
      </VisualComponent1>
      <VisualComponent3 data={processedData2.yetAnotherField} />
    </>
  );
}
</component>

Remember to use only the visual components provided in the <visual_components> section. Do not introduce any HTML elements or other React components that weren't specified.

Now, please provide your analysis and the resulting React-like component based on the given JSON schema and visual components.
`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
