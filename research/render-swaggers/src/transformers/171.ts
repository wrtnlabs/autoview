import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4BotsView = {
                    bots?: Schema.legacy.v4.LegacyV4Bot[];
                    next?: number;
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4BotsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract bot list, guard against undefined
  const bots = input.bots ?? [];

  // If no bots, render a simple markdown message
  if (bots.length === 0) {
    return {
      type: "Markdown",
      content: "#### 🤖 No bots found.",
    };
  }

  // Sort bots alphabetically by name for consistent ordering
  const sortedBots = bots.slice().sort((a, b) => a.name.localeCompare(b.name));

  // Map each bot into a ListItem component
  const childrenProps: IAutoView.IAutoViewListItemProps[] = sortedBots.map((bot) => {
    // Use avatarUrl if provided, else fallback to a text avatar with the bot's name initials
    const startElement: IAutoView.IAutoViewAvatarProps = bot.avatarUrl
      ? { type: "Avatar", src: bot.avatarUrl, name: bot.name }
      : { type: "Avatar", name: bot.name };

    // Format creation timestamp into a human‐readable string if available
    const description: string | undefined = bot.createdAt != null
      ? new Date(bot.createdAt).toLocaleString()
      : undefined;

    // Use channelId or id as a small chip label
    const label = bot.channelId ?? bot.id;
    const endElement: IAutoView.IAutoViewChipProps | undefined = label
      ? {
          type: "Chip",
          label,
          size: "small",
          variant: "outlined",
        }
      : undefined;

    return {
      type: "ListItem",
      title: bot.name,
      description,
      startElement,
      // Only attach endElement if we have a valid label
      ...(endElement && { endElement }),
    } as IAutoView.IAutoViewListItemProps;
  });

  // Wrap all items in a responsive List component
  return {
    type: "List",
    childrenProps,
  };
}
