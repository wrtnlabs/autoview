import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type IShoppingDeposit = {
    id: string & tags.Format<"uuid">;
    created_at: string & tags.Format<"date-time">;
    code: string;
    source: string;
    direction: -1 | 1;
};
type IAutoViewTransformerInputType = IShoppingDeposit;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform the deposit data into a vertical card representation.
  // The card header uses an icon to indicate the deposit direction.
  // The card content uses a markdown component for a rich and responsive textual display.
  
  // Choose an icon based on the deposit direction:
  // - For an incoming deposit (direction 1), we display an upward arrow with a "green" color.
  // - For an outgoing deposit (direction -1), we display a downward arrow with a "red" color.
  const directionIcon: IAutoView.IAutoViewIconProps = {
    id: input.direction === 1 ? "arrow-up" : "arrow-down",
    // Use specific allowed colors for icons
    color: input.direction === 1 ? "green" : "red",
    size: 24,
    type: "Icon",
  };

  // Build the card header to show the deposit code and creation date.
  // The startElement is set to the direction icon to visually indicate the nature of the deposit.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: `Deposit ${input.code}`,
    description: `Created at: ${new Date(input.created_at).toLocaleString()}`,
    startElement: directionIcon,
    type: "CardHeader",
  };

  // Use a markdown component to display additional deposit details.
  // Markdown is preferred for rich text rendering and better mobile responsiveness.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    content: `
**Deposit Details**

- **ID:** ${input.id}
- **Source:** ${input.source}
- **Direction:** ${input.direction === 1 ? "Incoming" : "Outgoing"}
    `.trim(),
    type: "Markdown",
  };

  // Compose the card content using the markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    childrenProps: markdownContent,
    type: "CardContent",
  };

  // Assemble the card components into a vertical card.
  // This vertical card will be responsive and adaptable to various screen sizes.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [cardHeader, cardContent],
    type: "VerticalCard",
  };

  // Return the composed visual component.
  return verticalCard;
}
