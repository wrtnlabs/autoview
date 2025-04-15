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
  // We choose to render the input data as a VerticalCard component.
  // The card is divided into three sections:
  // 1. Card Header: Displays a title (using the code), description (using the source),
  //    and an icon representing the direction (up for positive, down for negative).
  // 2. Card Content: Uses a Markdown component to visually list the details in a user-friendly manner.
  // 3. Card Footer: Displays the creation time in a text component.
  
  // Determine the direction icon based on the "direction" field.
  // We map positive direction to "arrow-up" and negative to "arrow-down" icons.
  // The icon color is set accordingly (green for positive and red for negative).
  const directionIcon: IAutoView.IAutoViewIconProps = {
    id: input.direction === 1 ? "arrow-up" : "arrow-down",
    color: input.direction === 1 ? "green" : "red",
    size: 24,
    type: "Icon"
  };

  // Build the Card Header using the input fields.
  // The header displays the 'code' and 'source' along with the directional icon.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: input.code,
    description: `Source: ${input.source}`,
    startElement: directionIcon,  // Allowed: Icon component is valid for startElement.
    type: "CardHeader"
  };

  // Compose Markdown content to visually render the details of the record.
  // We use a markdown bullet list to display the id, value, and created_at fields.
  // If 'value' is null, we use 'N/A' to denote no available numerical value.
  const markdownContent = `
- **ID:** ${input.id}
- **Value:** ${input.value !== null ? input.value : "N/A"}
- **Created At:** ${input.created_at}
  `;

  // Build the Card Content component using Markdown.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    childrenProps: {
      content: markdownContent,
      type: "Markdown"
    },
    type: "CardContent"
  };

  // Build the Card Footer to display the creation time in a more prominent text style.
  // We prepare a Text component that shows the creation timestamp.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    childrenProps: {
      content: `Created on: ${input.created_at}`,
      variant: "caption",
      type: "Text"
    },
    type: "CardFooter"
  };

  // Assemble the full vertical card with the header, content, and footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [cardHeader, cardContent, cardFooter],
    type: "VerticalCard"
  };

  return verticalCard;
}
