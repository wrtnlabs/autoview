import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4BotView = {
                    bot?: Schema.legacy.v4.LegacyV4Bot;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Bot = {
                id?: string;
                channelId?: string;
                name: string;
                createdAt?: number;
                avatar?: Schema.legacy.v4.LegacyV4TinyFile;
                avatarUrl?: string;
                color: string & tags.Default<"#123456">;
            };
            export type LegacyV4TinyFile = {
                bucket: string;
                key: string;
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            };
        }
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4BotView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const bot = input.bot;
  // Handle case when there's no bot data
  if (!bot) {
    return {
      type: "Text",
      content: "No bot data available",
      variant: "body1",
    } as IAutoView.IAutoViewTextProps;
  }

  // Format the creation timestamp to a human-readable string
  const createdDate = bot.createdAt
    ? new Date(bot.createdAt).toLocaleString()
    : "Unknown";

  // Choose an avatar image or fallback to an icon
  let startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
  if (bot.avatarUrl) {
    // Use the provided avatar URL
    startElement = {
      type: "Avatar",
      src: bot.avatarUrl,
      name: bot.name,
      size: 40,
    };
  } else {
    // Fallback icon when no avatar URL is available
    startElement = {
      type: "Icon",
      id: "robot",
      color: "gray",
      size: 40,
    };
  }

  // Build the card header containing the bot name and creation date
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: bot.name,
    description: `Created: ${createdDate}`,
    startElement,
  };

  // Build a list of key-value pairs: ID, Channel ID, and Color
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "ID",
        variant: "subtitle2",
        color: "tertiary",
      },
      value: {
        type: "Text",
        content: bot.id ?? "N/A",
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Channel ID",
        variant: "subtitle2",
        color: "tertiary",
      },
      value: {
        type: "Text",
        content: bot.channelId ?? "N/A",
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Color",
        variant: "subtitle2",
        color: "tertiary",
      },
      value: {
        type: "Chip",
        label: bot.color,
        variant: "outlined",
        size: "small",
      } as IAutoView.IAutoViewChipProps,
    },
  ];

  // Wrap the list items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Put the DataList inside the card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Compose a vertical card with header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
