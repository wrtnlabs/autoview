import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Email
     *
     * @title Email
    */
    export type email = {
        email: string & tags.Format<"email">;
        primary: boolean;
        verified: boolean;
        visibility: string | null;
    };
}
type IAutoViewTransformerInputType = Schema.email[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no email records, render a friendly markdown message
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "**No emails available**\n\nPlease add an email address to get started."
    };
  }

  // Build a List with a sticky subheader and one ListItem per email record
  const childrenProps: Array<
    IAutoView.IAutoViewListSubheaderProps | IAutoView.IAutoViewListItemProps
  > = [];

  // Subheader to label the list
  childrenProps.push({
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: [
      {
        type: "Text",
        variant: "h6",
        content: "Emails",
        color: "primary"
      }
    ]
  });

  // Iterate through each email entry and create a list item
  for (const record of input) {
    // Prepare badges/chips that indicate state: primary, verified, visibility
    const statusChips: IAutoView.IAutoViewChipProps[] = [];

    if (record.primary) {
      statusChips.push({
        type: "Chip",
        label: "Primary",
        color: "primary",
        size: "small",
        variant: "filled"
      });
    }

    if (record.verified) {
      statusChips.push({
        type: "Chip",
        label: "Verified",
        color: "success",
        size: "small",
        variant: "filled"
      });
    } else {
      // Show unverified state with an outlined warning chip
      statusChips.push({
        type: "Chip",
        label: "Unverified",
        color: "warning",
        size: "small",
        variant: "outlined"
      });
    }

    if (record.visibility) {
      // Visibility may be a custom string; show it as an informational chip
      statusChips.push({
        type: "Chip",
        label: record.visibility,
        color: "info",
        size: "small",
        variant: "outlined"
      });
    }

    // Each ListItem shows an envelope icon, the email text, and status chips on the right
    childrenProps.push({
      type: "ListItem",
      // Email address is the primary text
      title: record.email,
      // Envelope icon to visually represent the email field
      startElement: {
        type: "Icon",
        id: "envelope",
        color: "blue",
        size: 20
      },
      // Render all chips in a row on the item's end
      endElement: statusChips
    });
  }

  // Return the composed List component
  return {
    type: "List",
    childrenProps
  };
}
