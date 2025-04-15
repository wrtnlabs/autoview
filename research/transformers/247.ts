import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type Try_lt_string_gt_ = {
    result: true & tags.JsonSchemaPlugin<{
        "x-typia-required": true,
        "x-typia-optional": false
    }>;
    code: 1000 & tags.JsonSchemaPlugin<{
        "x-typia-required": true,
        "x-typia-optional": false
    }>;
    requestToResponse?: string & tags.JsonSchemaPlugin<{
        "x-typia-required": false,
        "x-typia-optional": true
    }>;
    data: string & tags.JsonSchemaPlugin<{
        "x-typia-required": true,
        "x-typia-optional": false
    }>;
};
type IAutoViewTransformerInputType = Try_lt_string_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // In this function we transform input data into a visual representation by composing a vertical card.
  // We use a CardHeader with an icon to attract attention and a CardContent with Markdown for detailed insights.
  // This approach leverages visual elements (an icon and card layout) to present data in an engaging manner,
  // while resorting to markdown formatting for text details where necessary.

  // Create a CardHeader component that displays a title, description, and an icon.
  // Allowed element for startElement is IAutoView.IconProps. Here we choose an icon (e.g., "chart-bar")
  // which can represent data visualization.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Transformation",
    description: "Visual representation of the transformation output.",
    startElement: {
      type: "Icon",
      // The icon id should conform to the kebab-case naming convention without a prefix.
      // "chart-bar" is chosen to imply visualization; adjust as needed to your icon set.
      id: "chart-bar",
      size: 24,
      color: "blue",
    },
  };

  // Construct a markdown string that summarizes the input data.
  // Using markdown makes the textual data easier to read and visually appealing.
  let markdownContent = "### Transformation Output\n";
  markdownContent += `- **Result:** \`${input.result}\`\n`;
  markdownContent += `- **Code:** \`${input.code}\`\n`;

  // Optionally include the 'requestToResponse' field if provided.
  if (input.requestToResponse) {
    markdownContent += `- **Request To Response:** \`${input.requestToResponse}\`\n`;
  }
  markdownContent += `- **Data:** \`${input.data}\`\n`;

  // Create a CardContent component that uses a Markdown component to render the text.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Compose all the parts into a VerticalCard.
  // VerticalCard's childrenProps accepts an array of components so that header and content are arranged vertically.
  // This layout is responsive and should render well on mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the composed UI component ensuring it fulfills the IAutoView.IAutoViewComponentProps type.
  return verticalCard as IAutoView.IAutoViewComponentProps;
}
