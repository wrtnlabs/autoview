import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type IShoppingDeliveryShipper = {
    id: string & tags.Format<"uuid">;
    created_at: string & tags.Format<"date-time">;
    company: null | string;
    name: string;
    mobile: string;
};
type IAutoViewTransformerInputType = IShoppingDeliveryShipper;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a CardHeader to display the shipper's basic info.
  // We use an Avatar as the start element; it uses the shipper's name for display.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: "Delivery Shipper", // A fixed descriptive text to provide context.
    // startElement must be one of the allowed types: here we use an Avatar.
    startElement: {
      type: "Avatar",
      name: input.name,
      // Choose a size that looks good on both mobile and desktop.
      size: 40,
      variant: "primary"
    }
  };

  // Compose a markdown string to elegantly present additional details.
  // Markdown helps to keep text readable and visually engaging.
  const markdownContent = `
### Shipper Details

- **ID:** ${input.id}  
- **Created At:** ${input.created_at}  
- **Company:** ${input.company !== null ? input.company : 'N/A'}  
- **Mobile:** ${input.mobile}
`;

  // Create a Markdown component to render the detailed information.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: markdownContent
  };

  // Wrap the markdown component into a CardContent. This ensures the UI is sectioned
  // and that details are clearly separated from the header.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps for CardContent can be a single component (here the markdown component)
    childrenProps: markdownComponent
  };

  // Compose the final output as a VerticalCard.
  // A vertical card is chosen to arrange the header and content vertically,
  // making it naturally responsive and easy to use on small screens.
  return {
    type: "VerticalCard",
    // The childrenProps accepts an array of card components.
    childrenProps: [cardHeader, cardContent]
  };
}
