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
  // Transform the created_at string into a more human friendly format.
  // Using the browser's locale string for basic formatting.
  const formattedDate = new Date(input.created_at).toLocaleString();

  // Choose an icon based on the deposit direction.
  // Using "arrow-up" for incoming (1) and "arrow-down" for outgoing (-1).
  // Color is set to green for incoming and red for outgoing.
  const directionIcon: IAutoView.IAutoViewIconProps = {
    id: input.direction === 1 ? "arrow-up" : "arrow-down",
    type: "Icon",
    size: 24,
    color: input.direction === 1 ? "green" : "red"
  };

  // Compose the card header using the deposit code as the title.
  // The description shows the creation date.
  // The startElement is the icon representing the deposit direction.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: `Deposit ${input.code}`,
    description: `Created at: ${formattedDate}`,
    startElement: directionIcon,
    type: "CardHeader"
  };

  // Compose a markdown string to display additional deposit details.
  // Markdown is used here to emphasize the important information in a visually appealing way.
  const markdownContent: string =
`## Deposit Details

- **ID**: ${input.id}
- **Code**: ${input.code}
- **Source**: ${input.source}
- **Direction**: ${input.direction === 1 ? "Incoming" : "Outgoing"}
- **Created At**: ${formattedDate}`;

  // Create the card content component using a Markdown component.
  // The markdown will render the details with formatting for enhanced readability.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    // The childrenProps accepts a presentation component such as a Markdown component.
    childrenProps: {
      content: markdownContent,
      type: "Markdown"
    },
    type: "CardContent"
  };

  // Compose the final vertical card which aggregates the header and content.
  // VerticalCard is chosen to provide a clear separation between header and details,
  // and ensures the layout is responsive across various devices.
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
}
