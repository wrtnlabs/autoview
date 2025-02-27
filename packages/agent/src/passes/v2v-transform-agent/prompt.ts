import { renderPrompt } from "../../core/Prompt";
import { V2vTransformAgentDto } from "./dto";

export interface PromptContext {
  content: unknown;
  atomic_components: Omit<V2vTransformAgentDto.IComponent, "valueValidator">[];
}

const rawPrompt = `
You are tasked with constructing an optimal visualization for a given input value by selecting and composing atomic visual components into a single rooted sub-tree. These atomic components are minimal, reusable building blocks with limited functionality and no inherent semantic meaning. Your goal is to analyze the input value, choose a single root atomic component as the entry point, and populate its properties—nesting other atomic components within it (e.g., via a 'children' property) across potentially multiple levels when applicable—to form a meaningful hierarchical structure. Note that each component has its own unique properties beyond 'type', and not all components accept 'children'.

Follow this reasoning process carefully:

Step 1: Identify the key fields in the content that must be represented visually. List these fields explicitly, focusing on the essential parts of the data that need to be conveyed.

Step 2: For each key field identified in Step 1, select the atomic component that best expresses its data type and purpose from the provided list. Consider the component’s schema and description to match its specific properties (beyond 'type') to the field’s data.

Step 3: Determine the layout for combining these fields across potentially multiple nesting levels. For each key field or group of fields, decide how the selected components should be arranged—e.g., stacked vertically, aligned horizontally, presented as a list—and whether any field requires further nesting (e.g., a list within a list, a group within a group). Explore the hierarchical relationships and layout needs at all necessary depths.

Step 4: Construct the final sub-tree by choosing a single root atomic component as the top-level container and composing the full hierarchy from Step 3. Map the content values to each component’s specific property schema, nesting additional components via 'children' when the schema allows, ensuring the entire structure fully represents the data.

Here is the raw input content to process:

<content>
{{content}}
</content>

Here is the list of atomic components, each with a name, description, and JSON Schema for its properties (note that 'type' is required, but other properties vary by component, and 'children' is optional):

<atomic_components>
{{atomic_components}}
</atomic_components>

Provide your response in this format:
{
  "reasoning": "A detailed explanation following the steps: (1) list key fields, (2) select components for each, (3) determine layout across nesting levels, (4) construct the final sub-tree with all levels reflected",
  "visualization": {
    "type": "The name of the root atomic component",
    "key": "Value mapped to this component’s specific schema",
    "children": [
      {
        "type": "The name of a nested atomic component",
        "key": "Value mapped to this component’s schema",
        "children": [...] // Further nesting if supported by schema
      },
      ...
    ] // Optional; omitted if the component does not support 'children'
  }
}

Here are three examples to guide you:

Example 1:
<content>
{
  "title": "Sales Report",
  "data": [
    {"year": 2020, "sales": 100},
    {"year": 2021, "sales": 150}
  ]
}
</content>
<atomic_components>
[
  {
    "name": "Text",
    "description": "Displays a single piece of text, no nesting",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "value": {"type": "string"}},
      "required": ["type", "value"]
    }
  },
  {
    "name": "List",
    "description": "Renders a list of items as nested components",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "children": {"type": "array"}},
      "required": ["type", "children"]
    }
  },
  {
    "name": "Container",
    "description": "Groups multiple components vertically",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "children": {"type": "array"}},
      "required": ["type", "children"]
    }
  }
]
</atomic_components>
Output:
{
  "reasoning": "Step 1: Key fields are 'title' (string) and 'data' (array of objects). Step 2: 'title' matches the Text component ('value' property, no children). 'data' suits the List component ('children' property), with each item as a Text component (stringified). Step 3: Layout is vertical—'title' as header, 'data' as a list below. The List nests Text components, while Text itself does not support nesting. Step 4: A Container (supports 'children') is the root, nesting Text for 'title' and List for 'data', with List further nesting Text components.",
  "visualization": {
    "type": "Container",
    "children": [
      {
        "type": "Text",
        "value": "Sales Report"
      },
      {
        "type": "List",
        "children": [
          {
            "type": "Text",
            "value": "{\"year\": 2020, \"sales\": 100}"
          },
          {
            "type": "Text",
            "value": "{\"year\": 2021, \"sales\": 150}"
          }
        ]
      }
    ]
  }
}

Example 2:
<content>
{
  "image": "https://example.com/pic.jpg",
  "caption": "Nature view"
}
</content>
<atomic_components>
[
  {
    "name": "Image",
    "description": "Displays a single image, no nesting",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "src": {"type": "string"}},
      "required": ["type", "src"]
    }
  },
  {
    "name": "Text",
    "description": "Displays a single piece of text, no nesting",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "value": {"type": "string"}},
      "required": ["type", "value"]
    }
  },
  {
    "name": "Container",
    "description": "Groups multiple components vertically",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "children": {"type": "array"}},
      "required": ["type", "children"]
    }
  }
]
</atomic_components>
Output:
{
  "reasoning": "Step 1: Key fields are 'image' (string URL) and 'caption' (string). Step 2: 'image' matches the Image component ('src' property, no children). 'caption' fits the Text component ('value' property, no children). Step 3: Layout is vertical—'image' above 'caption'—a common pattern for captioned images. No further nesting is needed since neither Image nor Text supports 'children'. Step 4: A Container (supports 'children') is the root, nesting Image and Text components.",
  "visualization": {
    "type": "Container",
    "children": [
      {
        "type": "Image",
        "src": "https://example.com/pic.jpg"
      },
      {
        "type": "Text",
        "value": "Nature view"
      }
    ]
  }
}

Example 3:
<content>
{
  "report": {
    "title": "Inventory Overview",
    "sections": [
      {
        "section_name": "Electronics",
        "products": [
          {
            "name": "Laptop",
            "specs": {"price": 1200, "stock": 10}
          },
          {
            "name": "Phone",
            "specs": {"price": 800, "stock": 15}
          }
        ]
      },
      {
        "section_name": "Furniture",
        "products": [
          {
            "name": "Chair",
            "specs": {"price": 50, "stock": 20}
          }
        ]
      }
    ]
  }
}
</content>
<atomic_components>
[
  {
    "name": "Text",
    "description": "Displays a single piece of text, no nesting",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "value": {"type": "string"}},
      "required": ["type", "value"]
    }
  },
  {
    "name": "List",
    "description": "Renders a list of items as nested components",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "children": {"type": "array"}},
      "required": ["type", "children"]
    }
  },
  {
    "name": "Container",
    "description": "Groups multiple components vertically",
    "schema": {
      "type": "object",
      "properties": {"type": {"type": "string"}, "children": {"type": "array"}},
      "required": ["type", "children"]
    }
  }
]
</atomic_components>
Output:
{
  "reasoning": "Step 1: Key fields are 'report.title' (string), 'report.sections' (array of objects with 'section_name' and 'products'), and within 'products', 'name' (string) and 'specs' (object with 'price' and 'stock'). Step 2: 'title' fits Text ('value'). 'sections' suits List, with each section needing a Container for 'section_name' (Text) and 'products' (List). Each product in 'products' uses a Container for 'name' (Text) and 'specs' (Container with Text for 'price' and 'stock'). Step 3: Layout is vertical—'title' at the top, followed by a list of sections. Each section is a vertical group (Container) with 'section_name' and a nested List of products. Each product is a vertical Container with 'name' and a nested Container for 'specs' (price and stock stacked vertically). This requires three nesting levels. Step 4: A root Container nests Text for 'title' and a List for 'sections', with deeper nesting for products and specs.",
  "visualization": {
    "type": "Container",
    "children": [
      {
        "type": "Text",
        "value": "Inventory Overview"
      },
      {
        "type": "List",
        "children": [
          {
            "type": "Container",
            "children": [
              {
                "type": "Text",
                "value": "Electronics"
              },
              {
                "type": "List",
                "children": [
                  {
                    "type": "Container",
                    "children": [
                      {
                        "type": "Text",
                        "value": "Laptop"
                      },
                      {
                        "type": "Container",
                        "children": [
                          {
                            "type": "Text",
                            "value": "price: 1200"
                          },
                          {
                            "type": "Text",
                            "value": "stock: 10"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "Container",
                    "children": [
                      {
                        "type": "Text",
                        "value": "Phone"
                      },
                      {
                        "type": "Container",
                        "children": [
                          {
                            "type": "Text",
                            "value": "price: 800"
                          },
                          {
                            "type": "Text",
                            "value": "stock: 15"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "type": "Container",
            "children": [
              {
                "type": "Text",
                "value": "Furniture"
              },
              {
                "type": "List",
                "children": [
                  {
                    "type": "Container",
                    "children": [
                      {
                        "type": "Text",
                        "value": "Chair"
                      },
                      {
                        "type": "Container",
                        "children": [
                          {
                            "type": "Text",
                            "value": "price: 50"
                          },
                          {
                            "type": "Text",
                            "value": "stock: 20"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

Now, analyze the provided content and atomic components, follow the reasoning steps above, and construct the rooted visualization sub-tree as instructed.
`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
