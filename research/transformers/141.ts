import type * as IAutoView from "@autoview/interface";
namespace shared {
    export type StringView = {
        result?: string;
    };
}
type IAutoViewTransformerInputType = shared.StringView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if the input data contains a result string.
  // If it's not provided, we display a fallback message in the markdown.
  const contentText = input.result && input.result.trim().length > 0
    ? input.result
    : "No data available.";

  // Create a markdown component to render the text content. 
  // Using markdown allows flexible formatting and responsive design on various devices.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: contentText,
  };

  // Prepare a card header with an icon element.
  // The header visually explains that this card represents the data transformation result.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Data Visualization",
    description: "Visualizing the input data using modern UI components.",
    // startElement accepts an IAutoViewIconProps object.
    startElement: {
      id: "chart-bar", // an icon representing data or charts (should correspond to a valid FontAwesome icon in kebab-case)
      color: "blue",
      size: 24,
      type: "Icon",
    },
    // endElement is optional and not used here.
  };

  // Compose the card content which includes the markdown component.
  // This allows any text to leverage markdown formatting while keeping the UI engaging.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps accepts either an array or a single component.
    childrenProps: markdownComponent,
  };

  // Compose the final UI using a vertical card.
  // VerticalCard combines the header and the content in a responsive layout suitable for web and mobile.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
    ],
  };

  // Return the composed component.
  return verticalCard;
}
