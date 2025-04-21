import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type BotsView = {
        next?: number;
        bots?: Schema.bot.CustomBot[];
    };
    export namespace bot {
        export type CustomBot = {
            id?: string;
            channelId?: string;
            name: string;
            description?: string;
            nameDescI18nMap?: {
                [key: string]: Schema.NameDesc;
            };
            createdAt?: number;
            avatar?: Schema.TinyFile;
            color: string & tags.Default<"#123456">;
            avatarUrl?: string;
            ai?: boolean;
        };
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.BotsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Safely extract the bots array, defaulting to empty if undefined
  const bots = input.bots ?? [];

  // If there are no bots, render a friendly markdown message
  if (bots.length === 0) {
    return {
      type: "Markdown",
      content: "### No bots available\n\nThere are no bots to display. Create or invite bots to see them here.",
    };
  }

  // Helper to format timestamps into user‐friendly dates
  function formatDate(ts?: number): string {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleDateString();
    } catch {
      return "";
    }
  }

  // Build a list item for each bot
  const listItems: IAutoView.IAutoViewListItemProps[] = bots.map((bot) => {
    // Prepare avatar props: prefer an explicit URL, fallback to initials if absent
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      // Use the provided avatarUrl; if missing, omit src so Avatar falls back to initials
      src: bot.avatarUrl,
      name: bot.name,
      size: 40,
    };

    // Description: use the bot's own description or show its creation date
    const descriptionText =
      bot.description?.trim() ||
      (bot.createdAt
        ? `Created on ${formatDate(bot.createdAt)}`
        : undefined);

    // If the bot is AI‐powered, show a robot icon at the end
    const aiBadge: IAutoView.IAutoViewIconProps | undefined = bot.ai
      ? {
          type: "Icon",
          id: "robot",
          color: "gray",
          size: 20,
        }
      : undefined;

    return {
      type: "ListItem",
      title: bot.name,
      // Only include description if non‐empty
      ...(descriptionText ? { description: descriptionText } : {}),
      startElement: avatar,
      // Link to the bot's detail page if we have its ID
      ...(bot.id ? { href: `/bots/${encodeURIComponent(bot.id)}` } : {}),
      // Optionally show the AI icon on the right
      ...(aiBadge ? { endElement: aiBadge } : {}),
    };
  });

  // Return a responsive list component with all bots
  return {
    type: "List",
    childrenProps: listItems,
  };
}
