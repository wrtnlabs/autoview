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
  // Determine the display text: if input.result is not provided or empty, set a default markdown message.
  const displayContent = input.result && input.result.trim().length > 0 
    ? input.result 
    : "No data provided. Please check your input.";

  // Create an icon element to visually represent the data.
  // This icon is used in the card header as a visual cue.
  const iconElement: IAutoView.IAutoViewIconProps = {
    id: "info-circle", // using a common info icon in kebab-case (without 'fa-' prefix)
    color: "blue",
    size: 20,
    type: "Icon"
  };

  // Compose the card header.
  // The CardHeader includes a title, an optional description and the icon element as startElement.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: "Data Visualization",
    description: "Below is a visual interpretation of your provided data.",
    startElement: iconElement, // startElement accepts an icon according to the allowed types
    type: "CardHeader"
  };

  // Compose the markdown component.
  // Using markdown provides a richer text formatting experience over plain text.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    content: displayContent,
    type: "Markdown"
  };

  // Compose the card content.
  // The CardContent holds the markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    childrenProps: markdownComponent, // CardContent.childrenProps can be a single component
    type: "CardContent"
  };

  // Finally, compose a vertical card that wraps the header and content.
  // VerticalCard.childrenProps is an array of card-related components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [cardHeader, cardContent],
    type: "VerticalCard"
  };

  // Return the composed value of type IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
