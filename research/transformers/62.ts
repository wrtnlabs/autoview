import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type IShoppingMileage = {
    id: string & tags.Format<"uuid">;
    value: null | number;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
};
type IAutoViewTransformerInputType = IShoppingMileage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We will create a vertical card to visually represent the mileage data.
  // The card will include a header with a direction icon (up/down) and basic info,
  // and a content section with detailed information rendered in Markdown.
  
  // Determine the appropriate icon for the direction.
  // "arrow-up" for positive direction (1) and "arrow-down" for negative direction (-1).
  // The icon color is set to green for up and red for down.
  const directionIcon = {
    id: input.direction === 1 ? "arrow-up" : "arrow-down",
    color: input.direction === 1 ? "green" : "red",
    size: 24 as 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 56 | 64 | 72,
    type: "Icon" as const
  } as IAutoView.IAutoViewIconProps;
  
  // Create the card header.
  // The header displays the mileage code as title and creation time as description.
  // It includes the directionIcon as the startElement.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.code,
    description: `Created: ${input.created_at}`,
    startElement: directionIcon
  };

  // Construct detailed information using markdown formatting.
  // This provides a visually engaging way to see key details.
  // We make sure to check if the value is valid. If value is null, we display "N/A".
  const mileageValue = input.value !== null ? input.value.toString() : "N/A";
  const markdownContent = 
    `### Mileage Details\n\n` +
    `- **Value:** ${mileageValue}\n` +
    `- **Source:** ${input.source}\n` +
    `- **ID:** ${input.id}`;

  // Create the card content.
  // We're using a Markdown component to render the details.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    } as IAutoView.IAutoViewMarkdownProps
  };

  // Compose and return the final vertical card component.
  // The vertical card's childrenProps are an array that contains the header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
