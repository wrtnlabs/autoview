import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type BotView = {
    bot?: bot.CustomBot;
};
namespace bot {
    export type CustomBot = {
        id?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        channelId?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        name: string;
        description?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        nameDescI18nMap?: {
            [key: string]: NameDesc;
        };
        createdAt?: number & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        avatar?: TinyFile;
        color: string & tags.Default<"#123456">;
        avatarUrl?: string;
        ai?: boolean;
    };
}
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
};
type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type IAutoViewTransformerInputType = BotView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no bot data is provided, return a simple CardContent component that displays a markdown message.
  if (!input.bot) {
    return {
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content: "## No Data Available\n\nBot information is currently not provided."
      }
    };
  }
  
  const { bot } = input;

  // Determine the avatar for the header. Prefer using the avatarUrl if provided.
  // Otherwise, if a TinyFile avatar is provided, derive a URL (the derivation logic may be replaced with actual logic).
  // If neither is available, fall back to using an icon (for example, a robot icon).
  let headerAvatar: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
  if (bot.avatarUrl) {
    headerAvatar = {
      type: "Avatar",
      src: bot.avatarUrl,
      name: bot.name,
      size: 40 // chose a medium size for better visibility on both web and mobile
    };
  } else if (bot.avatar && bot.avatar.bucket && bot.avatar.key) {
    // This derivation of URL is a placeholder. Replace it with your actual logic to fetch the file URL.
    const derivedUrl = `https://cdn.example.com/${bot.avatar.bucket}/${bot.avatar.key}`;
    headerAvatar = {
      type: "Avatar",
      src: derivedUrl,
      name: bot.name,
      size: 40
    };
  } else {
    // Use an icon as fallback. The "robot" icon is used to visually indicate bot data.
    headerAvatar = {
      type: "Icon",
      id: "robot",
      color: "blue",
      size: 40
    };
  }

  // If the bot has AI enabled, add an AI indicator using an icon.
  // The Icon component is acceptable as an endElement in CardHeader.
  let headerEndElement: IAutoView.IAutoViewIconProps | undefined = undefined;
  if (bot.ai) {
    headerEndElement = {
      type: "Icon",
      id: "brain",
      color: "red",
      size: 24
    };
  }
  
  // Compose the card header with the bot's name and description.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: bot.name,
    description: bot.description,
    startElement: headerAvatar,
    endElement: headerEndElement
  };

  // Build markdown content with additional details.
  // Using markdown ensures that if text representation is necessary, it will be rendered in a rich and engaging format.
  let detailsContent = "";
  if (bot.channelId) {
    detailsContent += "**Channel ID:** " + bot.channelId + "\n\n";
  }
  detailsContent += "**Color:** " + bot.color + "\n\n";
  if (bot.createdAt) {
    // Convert the timestamp into a human-readable date string.
    const date = new Date(bot.createdAt);
    detailsContent += "**Created At:** " + date.toLocaleString() + "\n\n";
  }
  // If no additional details are available, indicate as such.
  if (detailsContent.trim() === "") {
    detailsContent = "No additional details provided.";
  }
  
  // Compose the card content component using Markdown for a rich text representation.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: detailsContent
    }
  };

  // Finally, compose everything into a vertical card.
  // Using a VerticalCard ensures responsiveness and a layout that adapts well to both desktop and mobile environments.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
