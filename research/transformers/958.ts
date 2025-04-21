import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Key
     *
     * @title Key
    */
    export type key = {
        key: string;
        id: number & tags.Type<"int32">;
        url: string;
        title: string;
        created_at: string & tags.Format<"date-time">;
        verified: boolean;
        read_only: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine avatar color based on verification status
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    name: input.title,
    variant: input.verified ? "green" : "red",
    size: 40,
  };

  // Compose the card header with title, creation date, and an avatar
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    // Format the date if valid, otherwise fall back to the raw string
    description: (() => {
      const d = new Date(input.created_at);
      return isNaN(d.getTime()) ? input.created_at : d.toLocaleDateString();
    })(),
    startElement: avatar,
  };

  // Build a data list of key details for a concise, responsive layout
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Key" },
      value: { type: "Text", content: input.key },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "ID" },
      value: { type: "Text", content: String(input.id) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Verified" },
      // Use a checkmark icon for visual clarity
      value: {
        type: "Icon",
        id: input.verified ? "check-circle" : "times-circle",
        color: input.verified ? "green" : "red",
        size: 20,
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Read Only" },
      value: { type: "Text", content: input.read_only ? "Yes" : "No" },
    },
  ];

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Wrap the details list in a card content section
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Provide a button that opens the URL, with an icon to indicate navigation
  const openButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "Open Link",
    href: input.url,
    startElement: {
      type: "Icon",
      id: "external-link-alt",
      color: "blue",
      size: 16,
    },
    variant: "outlined",
    color: "primary",
    size: "small",
  };

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: openButton,
  };

  // Compose the vertical card layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
