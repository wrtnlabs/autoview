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
  // Handle the empty-input case with a friendly markdown notice
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No email addresses available.**"
    };
  }

  // Map each email record into a DataListItem with icon+text label and status chips
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((record) => {
    const { email, primary, verified, visibility } = record;

    // Label: envelope icon + email address text
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: "envelope",
        color: "blue",
        size: 16
      },
      {
        type: "Text",
        content: email,
        variant: "body1"
      }
    ];

    // Value: chips indicating primary/secondary, verified/unverified, and visibility
    const statusChips: IAutoView.IAutoViewChipProps[] = [];

    // Primary vs. secondary badge
    statusChips.push({
      type: "Chip",
      label: primary ? "Primary" : "Secondary",
      color: primary ? "teal" : "gray",
      size: "small",
      variant: "filled"
    });

    // Verified status badge
    statusChips.push({
      type: "Chip",
      label: verified ? "Verified" : "Unverified",
      color: verified ? "success" : "warning",
      size: "small",
      variant: "outlined"
    });

    // Visibility badge (fall back to "Private" when null or empty)
    const visLabel = visibility
      ? visibility.charAt(0).toUpperCase() + visibility.slice(1)
      : "Private";
    statusChips.push({
      type: "Chip",
      label: visLabel,
      color: visibility ? "blue" : "darkGray",
      size: "small",
      variant: "outlined"
    });

    return {
      type: "DataListItem",
      label: labelComponents,
      value: statusChips
    };
  });

  // Compose the DataList to display all items
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Wrap the list in a vertical card with a header for better grouping
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Email Addresses",
    description: `${input.length} address${input.length > 1 ? "es" : ""}`,
    startElement: {
      type: "Icon",
      id: "envelope",
      color: "blue",
      size: 24
    }
  };

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The DataList itself is a presentation component and can be a child
    childrenProps: dataList
  };

  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
}
