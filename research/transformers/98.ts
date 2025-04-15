import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4BotView = {
                bot?: legacy.v4.LegacyV4Bot;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Bot = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            avatar?: legacy.v4.LegacyV4TinyFile;
            avatarUrl?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            color: string & tags.Default<"#123456">;
        };
        export type LegacyV4TinyFile = {
            bucket: string;
            key: string;
            width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
        };
    }
}
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4BotView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the bot object from the input
  const bot = input.bot;

  // If no bot data is provided, display a simple message using a Markdown component within a VerticalCard.
  if (!bot) {
    return {
      type: "VerticalCard",
      childrenProps: {
        type: "CardContent",
        // Use Markdown to visually display the error message
        childrenProps: {
          type: "Markdown",
          content: "### No Bot Data\n\nThe input data does not contain any bot information to display."
        }
      }
    } as IAutoView.IAutoViewComponentProps;
  }

  // Determine the source URL for the bot avatar.
  // Prefer the provided avatarUrl; if not available, optionally construct one from the avatar file if available.
  // (Note: In production, ensure that the constructed URL is valid based on your file storage service.)
  const avatarSrc = bot.avatarUrl 
    ? bot.avatarUrl 
    : bot.avatar 
      ? `https://your-storage-service/${bot.avatar.bucket}/${bot.avatar.key}`
      : undefined;

  // Compose the CardHeader for displaying the bot's primary details.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: bot.name,
    description: bot.id ? `Bot ID: ${bot.id}` : "Bot ID not available",
    // Use an Avatar component as the start element to engage visually.
    startElement: {
      type: "Avatar",
      src: avatarSrc,
      name: bot.name,
      size: 40, // Using a medium size avatar
      // For the variant, since bot.color is a hex-code and not one of the allowed variants,
      // we omit applying variant directly. In a real scenario, you might map colors to variants if desired.
    }
  };

  // Compose the CardContent using a Markdown component to provide extra details.
  // Markdown helps in rendering rich text and is more engaging than plain text.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content:
        "### Bot Details\n" +
        `**Channel ID:** ${bot.channelId ? bot.channelId : "Not provided"}\n\n` +
        `**Created At:** ${bot.createdAt ? new Date(bot.createdAt).toLocaleString() : "Not specified"}\n\n` +
        `**Color:** ${bot.color}`
    }
  };

  // Compose the final VerticalCard that aggregates all the individual components.
  // VerticalCard ensures that the UI elements are stacked vertically,
  // making them easy to view on mobile and small screen devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard as IAutoView.IAutoViewComponentProps;
}
