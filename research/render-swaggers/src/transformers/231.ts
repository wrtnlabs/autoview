import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type ChatTagView = {
            chatTag?: Schema.ChatTag;
        };
    }
    export type ChatTag = {
        id?: string;
        channelId?: string;
        colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
        name: string;
        key: string;
        description?: string;
        /**
         * @deprecated
        */
        followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        createdAt?: number;
    };
}
type IAutoViewTransformerInputType = Schema.desk.ChatTagView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const tag = input.chatTag;
  // If there's no tag data, render a simple markdown message
  if (!tag) {
    return {
      type: "Markdown",
      content: "### No tag data available",
    };
  }

  // Map backend colorVariant values to UI avatar variants
  const colorMap: Record<string, IAutoView.IAutoViewAvatarProps["variant"]> = {
    red: "red",
    orange: "orange",
    yellow: "yellow",
    olive: "lime",    // olive → lime
    green: "green",
    cobalt: "blue",   // cobalt → blue
    purple: "violet", // purple → violet
    pink: "pink",
    navy: "indigo",   // navy → indigo
  };
  const avatarVariant = tag.colorVariant ? colorMap[tag.colorVariant] : undefined;

  // Prepare a badge for follower count if provided
  let followerBadge: IAutoView.IAutoViewBadgeProps | undefined;
  if (Array.isArray(tag.followerIds) && tag.followerIds.length > 0) {
    followerBadge = {
      type: "Badge",
      count: tag.followerIds.length,
      maxCount: 99,
      showZero: false,
      dot: false,
      color: avatarVariant ?? "primary",
      // Use a simple user icon inside the badge
      childrenProps: {
        type: "Icon",
        id: "user",
        color: "gray",
        size: 20,
      },
    };
  }

  // Build the card header: show avatar, name, key, and follower count badge
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: tag.name,
    description: tag.key,
    startElement: {
      type: "Avatar",
      // Show the initial of the tag name
      name: tag.name.charAt(0).toUpperCase(),
      variant: avatarVariant,
      size: 40,
    },
    endElement: followerBadge,
  };

  // Build a list of tag properties to display
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "ID", variant: "body2", color: "tertiary" },
    value: { type: "Text", content: tag.id ?? "N/A", variant: "body1" },
  });

  // Channel ID (if available)
  if (tag.channelId) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Channel", variant: "body2", color: "tertiary" },
      value: { type: "Text", content: tag.channelId, variant: "body1" },
    });
  }

  // Creation timestamp
  if (typeof tag.createdAt === "number") {
    const date = new Date(tag.createdAt);
    if (!isNaN(date.getTime())) {
      items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At", variant: "body2", color: "tertiary" },
        value: { type: "Text", content: date.toLocaleString(), variant: "body1" },
      });
    }
  }

  // Description (if available) rendered as markdown for richer formatting
  if (tag.description) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Description", variant: "body2", color: "tertiary" },
      // Markdown component will wrap plain text gracefully and support links etc.
      value: {
        type: "Markdown",
        content: tag.description,
      },
    });
  }

  // Wrap the items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Card content holds the data list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Compose a vertical card with header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
