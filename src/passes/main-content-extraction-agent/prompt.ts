import { renderPrompt } from "../../core/Prompt";

export interface PromptContext {
  json_response: string;
}

const rawPrompt = `
You are tasked with generating the shortest JSON path for a given JSON response from an API invocation of a server. Your goal is to identify the most relevant part of the JSON structure and provide a valid JSON path from the root (noted as $) to that part.

Here's the JSON response you need to analyze:

<json_response>
{{json_response}}
</json_response>

Follow these guidelines to generate the shortest JSON path:

1. Analyze the JSON structure and identify the "main" part of the response. This is typically the section that contains the most relevant data, excluding metadata, status codes, or other auxiliary information.

2. Start your JSON path with $ to indicate the root of the JSON structure.

3. Use dot notation (.) to navigate through object properties.

4. Use square brackets [] to access array elements.

5. If you encounter an array that contains a list of critical items, select the outer array instead of individual elements. This helps indicate that the server returned an array of items rather than a single item.

6. Avoid including unnecessary levels of nesting or metadata in your path.

7. If there are multiple equally important sections, choose the one that appears to be the primary focus of the API response.

Output your answer in the following format:
{
  "explanation": "A brief explanation of why you chose this path",
  "shortest_json_path": "Your JSON path here"
}

Here are two examples to guide you:

Example 1:
JSON Response:
{
  "status": "success",
  "data": {
    "users": [
      {"id": 1, "name": "John"},
      {"id": 2, "name": "Jane"}
    ]
  }
}

Shortest JSON path:
{
  "explanation": "This path points to the array of users, which is likely the main data returned by the API. The \"status\" field is metadata and can be omitted.",
  "shortest_json_path": "$.data.users"
}

Example 2:
JSON Response:
{
  "metadata": {
    "timestamp": "2023-04-20T10:30:00Z",
    "version": "1.0"
  },
  "result": {
    "product": {
      "id": "ABC123",
      "name": "Sample Product",
      "price": 19.99
    }
  }
}

Shortest JSON path:
{
  "explanation": "This path leads directly to the product information, which appears to be the main content of the API response. The metadata section is excluded as it's not part of the core data.",
  "shortest_json_path": "$.result.product"
}

Now, analyze the provided JSON response and generate the shortest JSON path as instructed.
`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
