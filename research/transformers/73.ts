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
  // Determine the direction icon based on the transaction's direction.
  // We use an upward arrow for positive direction and downward arrow for negative.
  const directionIcon: IAutoView.IAutoViewIconProps = {
    id: input.direction > 0 ? "arrow-up" : "arrow-down", // using kebab-case icon names (without prefix)
    // Use green for positive and red for negative visual cue.
    color: input.direction > 0 ? "green" : "red",
    size: 24, // a moderate icon size for clarity on all devices
    type: "Icon",
  };

  // Create a card header to display the primary identifiers of the transaction.
  // The header uses the direction icon as a start element, along with a title and description.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    title: `Transaction ${input.code}`,
    description: `Source: ${input.source}`,
    startElement: directionIcon,
    type: "CardHeader",
  };

  // Determine the displayed value. If the value is null, we show "N/A".
  const valueDisplay = input.value !== null ? input.value.toString() : "N/A";

  // Compose a markdown string to visually present the detailed information.
  // Markdown is chosen over plain text to allow for rich formatting.
  const markdownContent = `
## Transaction Details

- **ID:** ${input.id}
- **Value:** ${valueDisplay}
- **Created At:** ${input.created_at}
`;

  // Use the Markdown component to render the formatted details.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    content: markdownContent,
    type: "Markdown",
  };

  // Create the card content that wraps the markdown component.
  const content: IAutoView.IAutoViewCardContentProps = {
    childrenProps: markdownComponent,
    type: "CardContent",
  };

  // Finally, compose a vertical card containing the header and content.
  // VerticalCard is chosen to ensure responsiveness across web and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [header, content],
    type: "VerticalCard",
  };

  // Return the complete visual component props.
  return verticalCard;
}
