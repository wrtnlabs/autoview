import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Protected Branch Admin Enforced
     *
     * @title Protected Branch Admin Enforced
    */
    export type protected_branch_admin_enforced = {
        url: string & tags.Format<"uri">;
        enabled: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.protected_branch_admin_enforced;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine chip properties based on enforcement status
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    // Use a green chip for enabled, red for disabled
    color: input.enabled ? "success" : "error",
    variant: "filled",
    label: input.enabled ? "Enabled" : "Disabled",
    // Prepend an icon to indicate state
    startElement: {
      type: "Icon",
      id: input.enabled ? "check-circle" : "times-circle",
      color: input.enabled ? "green" : "red",
      size: 20,
    },
  };

  // Prepare the URL field as a clickable button with a link icon
  const urlButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    variant: "text",
    size: "small",
    color: "primary",
    href: input.url,
    label: input.url,
    startElement: {
      type: "Icon",
      id: "link",
      color: "blue",
      size: 20,
    },
  };

  // Build list items for each property
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Label for the URL field
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "Repository URL",
      },
      // Value is a button linking to the URL
      value: urlButton,
    },
    {
      type: "DataListItem",
      // Label for the enforcement status
      label: {
        type: "Text",
        variant: "subtitle2",
        content: "Admin Enforcement",
      },
      // Value is a colored chip indicating the status
      value: statusChip,
    },
  ];

  // DataList to display the fields in a tidy fashion
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Header for the card: showing a lock icon and a title
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Protected Branch Admin Enforced",
    // Use a lock icon to convey protection
    startElement: {
      type: "Icon",
      id: "lock",
      color: "gray",
      size: 24,
    },
  };

  // Wrap the list in CardContent
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Assemble the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return card;
}
