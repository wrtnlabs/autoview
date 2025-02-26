import { renderPrompt } from "../../core/Prompt";

export interface PromptContext {
  content: unknown;
  component_schema: unknown;
}

const rawPrompt = `
You are tasked with transforming raw server input data into a format that conforms to the schema required by a specific visualization component. Your objective is to analyze the provided content, understand the structure and requirements of the component’s JSON Schema, and then copy, extract, transform, or process the data as needed to produce a valid input for the component. The component schema follows the JSON Schema specification, which defines the expected data structure, types, and constraints.

Follow these steps carefully:

Step 1: Analyze the provided content. Examine its structure (e.g., key-value pairs, arrays), data types (e.g., strings, numbers, objects), and the meaning of each field. Consider how the data might represent real-world entities or concepts.

Step 2: Review the component’s JSON Schema. The schema adheres to the JSON Schema standard (e.g., it may include 'type', 'properties', 'required', 'items' for arrays). Identify the expected structure, required fields, data types, and any additional constraints (e.g., array item types, optional fields). Understand what the component needs to function correctly.

Step 3: Map and transform the content to match the JSON Schema. Extract relevant fields from the content, copy them as-is where appropriate, transform values (e.g., renaming keys, converting types, aggregating data) where necessary, and fill in defaults or skip irrelevant data as needed. Ensure the output fully satisfies the schema’s requirements and constraints.

Here is the raw server content to process:

<content>
{{content}}
</content>

Here is the JSON Schema of the selected component, defining the expected input structure:

<component_schema>
{{component_schema}}
</component_schema>

Provide your response in this format:
{
  "reasoning": "A detailed explanation of how you analyzed the content, interpreted the JSON Schema, and decided on the transformations",
  "transformed_data": "The processed data, structured to match the JSON Schema exactly"
}

Here are two examples to guide you:

Example 1:
<content>
{
  "records": [
    {"year": 2020, "revenue": 100},
    {"year": 2021, "revenue": 150},
    {"year": 2022, "revenue": 200}
  ]
}
</content>
<component_schema>
{
  "type": "object",
  "properties": {
    "labels": {"type": "array", "items": {"type": "number"}},
    "values": {"type": "array", "items": {"type": "number"}}
  },
  "required": ["labels", "values"]
}
</component_schema>
Output:
{
  "reasoning": "The content is an object with a 'records' array, where each item has 'year' and 'revenue' fields (both numbers). The JSON Schema specifies an object with two required properties: 'labels' (an array of numbers) and 'values' (an array of numbers). I interpreted 'year' as the labels and 'revenue' as the values, extracting them from each record into separate arrays. The schema’s 'items' constraint confirms that both arrays must contain numbers, which matches the content’s data types.",
  "transformed_data": {
    "labels": [2020, 2021, 2022],
    "values": [100, 150, 200]
  }
}

Example 2:
<content>
{
  "image_url": "https://example.com/product.jpg",
  "description": "New product launch photo",
  "timestamp": 1728865958
}
</content>
<component_schema>
{
  "type": "object",
  "properties": {
    "src": {"type": "string"},
    "caption": {"type": "string"}
  },
  "required": ["src"]
}
</component_schema>
Output:
{
  "reasoning": "The content is an object with 'image_url' (string), 'description' (string), and 'timestamp' (number) fields. The JSON Schema defines an object with 'src' (string, required) and 'caption' (string, optional). I mapped 'image_url' to 'src' since it’s a URL string suitable for an image source, and 'description' to 'caption' as it provides contextual text. The 'timestamp' field is not referenced in the schema and can be omitted, as only 'src' is required.",
  "transformed_data": {
    "src": "https://example.com/product.jpg",
    "caption": "New product launch photo"
  }
}

Now, analyze the provided content and component JSON Schema, follow the steps above, and generate the transformed data as instructed.
`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
