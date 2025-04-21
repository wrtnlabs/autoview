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
  // Extract the tag data; if missing, render a friendly markdown message
  const tag = input.chatTag;
  if (!tag) {
    return {
      type: "Markdown",
      content: "**No tag data available**"
    };
  }

  // Map back-end variants to AutoView color scales
  const colorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    red: "red",
    orange: "orange",
    yellow: "yellow",
    olive: "lime",
    green: "green",
    cobalt: "blue",
    purple: "violet",
    pink: "pink",
    navy: "indigo"
  };
  const chipColor = colorMap[tag.colorVariant ?? ""] ?? "gray";

  // Build a list of DataListItemProps for each relevant field
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", variant: "subtitle2", content: "ID" },
    value: { type: "Text", content: tag.id ?? "-" }
  });

  // Channel ID (if present)
  if (tag.channelId) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", variant: "subtitle2", content: "Channel" },
      value: { type: "Text", content: tag.channelId }
    });
  }

  // Created At timestamp (formatted)
  if (typeof tag.createdAt === "number") {
    const formatted = new Date(tag.createdAt).toLocaleString();
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", variant: "subtitle2", content: "Created At" },
      value: { type: "Text", content: formatted }
    });
  }

  // Follower count as a badge on a users icon
  if (Array.isArray(tag.followerIds)) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", variant: "subtitle2", content: "Followers" },
      value: {
        type: "Badge",
        count: tag.followerIds.length,
        maxCount: 99,
        showZero: false,
        childrenProps: {
          type: "Icon",
          id: "users",
          color: "gray",
          size: 16
        }
      }
    });
  }

  // Header: display tag name, description, avatar, and key chip
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: tag.name,
    description: tag.description,
    startElement: {
      // Avatar using the tag's name initials
      type: "Avatar",
      name: tag.name,
      variant: chipColor,
      size: 40
    },
    endElement: {
      // Display the tag key as a small, outlined chip
      type: "Chip",
      label: tag.key,
      color: chipColor,
      size: "small",
      variant: "outlined"
    }
  };

  // DataList to summarize fields
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Wrap the DataList in CardContent
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Assemble into a VerticalCard for responsive display
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
}
