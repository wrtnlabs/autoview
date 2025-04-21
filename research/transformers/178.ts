import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ChatTagView = {
                    chatTag?: Schema.legacy.v4.LegacyV4ChatTag;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4ChatTag = {
                id?: string;
                channelId?: string;
                colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
                name: string;
                key: string;
                description?: string;
                followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                createdAt?: number;
            };
        }
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ChatTagView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const tag = input.chatTag;
  // If there's no tag data, show a simple markdown message
  if (!tag) {
    return {
      type: "Markdown",
      content: "## No chat tag data available"
    };
  }

  // Map legacy color variants to AutoView icon colors
  const colorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
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
  const mappedColor = colorMap[tag.colorVariant ?? ""] ?? "gray";

  // Build a list of key/value items for the tag metadata
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Tag key
  listItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: ["Key:"],
      variant: "body2",
      color: "tertiary"
    },
    value: {
      type: "Text",
      content: [tag.key],
      variant: "body1"
    }
  });

  // Channel ID (if present)
  if (tag.channelId) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: ["Channel:"],
        variant: "body2",
        color: "tertiary"
      },
      value: {
        type: "Text",
        content: [tag.channelId],
        variant: "body1"
      }
    });
  }

  // Creation date (if present)
  if (typeof tag.createdAt === "number") {
    const dateStr = new Date(tag.createdAt).toLocaleString();
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: ["Created At:"],
        variant: "body2",
        color: "tertiary"
      },
      value: {
        type: "Text",
        content: [dateStr],
        variant: "body1"
      }
    });
  }

  // Wrap the metadata in a DataList component
  const metadataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Build a badge to show follower count
  const followerBadge: IAutoView.IAutoViewBadgeProps = {
    type: "Badge",
    count: tag.followerIds?.length ?? 0,
    showZero: true,
    childrenProps: {
      type: "Icon",
      id: "user",
      size: 16,
      color: "gray"
    }
  };

  // Assemble the card header with the tag name and optional description
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: tag.name,
    description: tag.description,
    startElement: {
      type: "Icon",
      id: "tag",
      color: mappedColor,
      size: 36
    }
  };

  // Card content holds the metadata list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: metadataList
  };

  // Card footer holds the follower badge
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: followerBadge
  };

  // Return a responsive vertical card that displays all of the above
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };
}
