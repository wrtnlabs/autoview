import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace shared {
    export type IntegerView = {
        result?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int32"
        }>;
    };
}
type IAutoViewTransformerInputType = shared.IntegerView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if we have a valid number in the 'result' property.
  // If the input is missing or undefined, we display a friendly "no data" message.
  const hasResult = typeof input.result === "number";

  // Define an icon component for visualization.
  // We use an icon to make the UI more engaging.
  // Allowed icon types: IAutoViewAvatarProps, IAutoViewIconProps, IAutoViewChipProps, IAutoViewBadgeProps, IAutoViewIconButtonProps, IAutoViewTextProps.
  // Here, we choose an icon with id "hashtag" to signify a number.
  const iconComponent: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "hashtag", // using a common icon name in kebab-case (without any prefix)
    color: "blue",
    size: 24,
  };

  // Prepare the card header component.
  // This header uses the icon above as the start element.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: hasResult ? "Integer Result" : "No Data",
    description: hasResult
      ? "Visualization of your provided number."
      : "Please provide a valid number to display visualization.",
    startElement: iconComponent,
  };

  // Prepare the card content component using a markdown component.
  // Markdown is used here to format and visually enhance text representation.
  let markdownContent = "";
  if (hasResult) {
    // When data is present, format the output using markdown to emphasize the numeric value.
    markdownContent = `## Your Number\n\nThe input number is: **${input.result}**\n\n*This value was dynamically generated from your input.*`;
  } else {
    // When input is missing, show an appropriate message.
    markdownContent = `## No Data Available\n\nIt looks like you haven't provided a number. Please check your input and try again.`;
  }
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // We use the markdown component here to enhance the display of textual information.
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Compose the vertical card component, which is a container for our header and content.
  // The Vertical Card component accepts childrenProps as an array of child components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the final composed value.
  return verticalCard;
}
