import { renderPrompt } from "../../core/Prompt";

export interface PromptContext {
  main_content: unknown;
  components: unknown[];
}

const rawPrompt = `
You are responsible for determining the most suitable visualization component from a provided list to effectively render the given main content. Your goal is to analyze the structure, intent, and nature of the main content, then select the component that optimally aligns with it based on the descriptions of the available components.

Follow these steps carefully:

Step 1: Analyze the main content in detail. Consider its structure (e.g., key-value pairs, arrays), data types (e.g., numbers, text, URLs), and implied purpose (e.g., comparison, description, visual display). Additionally, examine the field names and values for clues about the data's origin or context (e.g., specific API patterns like Slack, Twitter, or GitHub). Document your reasoning about what the data might represent, including its potential source or situational context.

Step 2: Based on your analysis in Step 1, infer what entity or concept the main content represents (e.g., "purchased products," "user profiles," "Slack file attachment"). This inference should emerge naturally from your reasoning, not be guessed immediately, and should reflect both the content's nature and its contextual origin where identifiable.

Step 3: Evaluate the list of components and choose the one that best represents or displays the main content, given your inferred entity. You must select a component name exactly as it appears in the list, without altering it or introducing new names.

Here is the main content to evaluate:

<main_content>
{{main_content}}
</main_content>

Here is the list of available components, each with a name and a description of its purpose and use case:

<components>
{{components}}
</components>

Provide your response in this precise format:
{
  "reasoning": "A detailed explanation of your analysis from Step 1, leading to the inferred entity in Step 2",
  "inferred_entity": "The entity or concept you concluded the main content represents, based on your reasoning",
  "explanation": "A concise rationale detailing why this component is the best fit for the inferred entity and main content",
  "selected_component_name": "The exact name of the chosen component from the list"
}

To assist you, here are three illustrative examples:

Example 1:
<main_content>
{
  "data": [
    {"year": 2020, "sales": 100},
    {"year": 2021, "sales": 150},
    {"year": 2022, "sales": 200}
  ]
}
</main_content>
<components>
[
  {"name": "BarChart", "description": "Visualizes data as vertical or horizontal bars, ideal for comparing numerical values across categories or time periods"},
  {"name": "PieChart", "description": "Presents data as a circular chart with slices, perfect for illustrating proportions or percentages"},
  {"name": "TextBlock", "description": "Displays plain text content, well-suited for narrative or descriptive information"}
]
</components>
Output:
{
  "reasoning": "The main content is an object with a 'data' key containing an array of objects. Each object has a 'year' field (numeric) and a 'sales' field (numeric), suggesting a dataset that tracks a quantitative metric over multiple years. The structure implies a temporal sequence, and the numerical values indicate a focus on measurement or comparison over time. No specific API patterns are evident, so this appears to be a generic dataset, likely representing trends or changes in a metric such as revenue or sales.",
  "inferred_entity": "sales trends",
  "explanation": "Given the inferred entity of sales trends, BarChart is the most appropriate choice because it excels at comparing numerical values across distinct time periods, aligning perfectly with the temporal and quantitative nature of the data.",
  "selected_component_name": "BarChart"
}

Example 2:
<main_content>
{
  "image_url": "https://example.com/product.jpg",
  "caption": "New product launch photo"
}
</main_content>
<components>
[
  {"name": "ImageViewer", "description": "Renders a single image with an optional caption, optimal for highlighting individual visual content"},
  {"name": "Carousel", "description": "Displays a slideshow of multiple images or cards, excellent for galleries or sequential presentations"},
  {"name": "DetailCard", "description": "Presents a card layout with an image, title, and additional text, ideal for detailed summaries of complex items"}
]
</components>
Output:
{
  "reasoning": "The main content is an object with two fields: 'image_url' (a string pointing to an image) and 'caption' (a short text string). The presence of a single image URL suggests a focus on one visual element, while the caption provides supplementary context. The caption text 'New product launch photo' indicates the image serves to highlight or promote a specific item or event. The field names are generic and don’t point to a specific API, suggesting a standalone visual element likely used for promotional or illustrative purposes.",
  "inferred_entity": "product showcase",
  "explanation": "For the inferred entity of a product showcase, ImageViewer is the best match, as it is designed to highlight a single image and its caption effectively, fitting the visual focus and simplicity of the main content.",
  "selected_component_name": "ImageViewer"
}

Example 3:
<main_content>
{
  "url_private": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/image.png",
  "url_private_download": "https://files.slack.com/files-pri/T01N3NBLFL4-F07RLA68XGV/download/image.png",
  "thumb_1024": "https://files.slack.com/files-tmb/T01N3NBLFL4-F07RLA68XGV-7ba430e150/image_1024.png",
  "name": "image.png",
  "id": "F07RLA68XGV",
  "user": "U0769CNJVLL",
  "size": 1351407,
  "channels": ["C0654GRKQNM"],
  "comments_count": 0,
  "created": 1728865958,
  "mimetype": "image/png"
}
</main_content>
<components>
[
  {"name": "ImageViewer", "description": "Renders a single image with an optional caption, optimal for highlighting individual visual content"},
  {"name": "Carousel", "description": "Displays a slideshow of multiple images or cards, excellent for galleries or sequential presentations"},
  {"name": "DetailCard", "description": "Presents a card layout with an image, title, and additional text, ideal for detailed summaries of complex items"}
]
</components>
Output:
{
  "reasoning": "The main content is an object with multiple fields related to an image file. Key fields include 'url_private' and 'url_private_download' (URLs with 'slack.com/files-pri' domain), 'thumb_1024' (a thumbnail URL), 'name' (filename), 'id' (unique identifier), 'user' (user ID), 'channels' (array of channel IDs), and 'mimetype' (image/png). The URL structure and field names like 'url_private', 'thumb_1024', and 'channels' strongly suggest this is a file attachment from the Slack API. The data includes a single image with metadata, indicating it’s an uploaded file shared in a Slack channel, likely for communication or collaboration purposes.",
  "inferred_entity": "Slack image upload",
  "explanation": "For the inferred entity of a Slack image upload, ImageViewer is the best fit, as it effectively renders a single image with minimal additional context, aligning with the purpose of displaying a shared file in a simple and focused manner.",
  "selected_component_name": "ImageViewer"
}

Now, carefully examine the provided main content and components, follow the steps outlined above, and determine the most appropriate component name as instructed.
`;

export function prompt(context: PromptContext): string {
  return renderPrompt(rawPrompt, context);
}
