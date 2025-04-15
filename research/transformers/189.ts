import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace open {
    export type PluginView = {
        plugin?: Plugin;
    };
}
type Plugin = {
    id?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    key?: string & tags.Format<"uuid"> & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    channelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    state?: "waiting" | "active";
    name: string;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    appearance: "light" | "dark" | "system";
    labelButton?: boolean;
    labelButtonText?: string;
    labelButtonTextI18nMap?: {
        [key: string]: string;
    };
    buttonType: "legacy" | "customImage" | "iconButton";
    iconButton: "channel" | "channel-filled" | "chat-bubble-alt" | "chat-bubble-alt-filled" | "chat-bubble-filled" | "chat-lightning-filled" | "chat-progress" | "chat-progress-filled" | "chat-question" | "chat-question-filled" | "comment" | "comment-filled" | "communication" | "headset" | "help-filled" | "send-forward" | "send-forward-filled" | "sms" | "sms-filled";
    customImage?: ImageFile;
    deskImage?: TinyFile;
    deskMarginX?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    deskMarginY?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    deskHideButton?: boolean;
    deskPosition?: "left" | "right";
    mobileImage?: TinyFile;
    mobileMarginX?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    mobileMarginY?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    mobilePosition?: "left" | "right";
    mobileHideButton?: boolean;
    mobileBubblePosition?: "top" | "bottom";
    urlWhitelist?: string[] & tags.MinItems<0> & tags.MaxItems<5>;
    runRate?: number & tags.Minimum<0> & tags.Maximum<1> & tags.JsonSchemaPlugin<{
        format: "float"
    }>;
    facebookPixelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    customImageUrl?: string;
    deskImageUrl?: string;
    mobileImageUrl?: string;
    validLabelButtonText?: boolean;
    validLabelButtonTextI18nMap?: boolean;
};
type ImageFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    contentType?: string & tags.Pattern<"^image/.*">;
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
type IAutoViewTransformerInputType = open.PluginView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no plugin data is provided, we render a simple markdown message informing the user.
  if (!input.plugin) {
    const markdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "### No Plugin Data\n\nThe plugin data was not provided. Please check your input and try again."
    };
    return markdown;
  }

  const plugin = input.plugin;
  
  // Create an icon for the card header using the plugin's iconButton field.
  // Note: We must use one of the allowed types for startElement in CardHeader, here we use Icon.
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: plugin.iconButton, // using plugin.iconButton value as the icon id (expected in kebab-case without prefix)
    // We use a default size and color appropriate for header icons.
    size: 24,
    color: "blue"
  };

  // Build a card header component with the plugin's name and a description constructed from several plugin fields.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: plugin.name,
    description: [
      plugin.state ? `State: **${plugin.state}**` : "",
      plugin.appearance ? `Appearance: **${plugin.appearance}**` : "",
      plugin.channelId ? `Channel: **${plugin.channelId}**` : ""
    ].filter(Boolean).join(" | "),
    startElement: headerIcon // using icon as allowed type for CardHeader.startElement
  };

  // Optionally include a media/image component if the plugin provides a custom image URL.
  let cardMedia: IAutoView.IAutoViewCardMediaProps | undefined;
  if (plugin.customImageUrl) {
    cardMedia = {
      type: "CardMedia",
      src: plugin.customImageUrl
    };
  }

  // Compose detailed plugin information via a markdown component.
  // We use markdown to format the details in a more visually appealing way.
  const pluginDetailsTextLines: string[] = [];
  if (plugin.id) pluginDetailsTextLines.push(`**ID:** ${plugin.id}`);
  if (plugin.key) pluginDetailsTextLines.push(`**Key:** ${plugin.key}`);
  if (plugin.createdAt) pluginDetailsTextLines.push(`**Created At:** ${new Date(plugin.createdAt).toLocaleString()}`);
  if (plugin.labelButton !== undefined) pluginDetailsTextLines.push(`**Label Button:** ${plugin.labelButton}`);
  if (plugin.buttonType) pluginDetailsTextLines.push(`**Button Type:** ${plugin.buttonType}`);
  
  // Add additional fields if needed. Here we avoid cluttering the UI with too much text.
  const markdownContent = pluginDetailsTextLines.length > 0 
    ? pluginDetailsTextLines.join("\n\n")
    : "No additional plugin details available.";

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Use a markdown component inside the card content to display plugin info.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    } as IAutoView.IAutoViewMarkdownProps
  };

  // Compose the overall card by aggregating header, media (if available), and content.
  // We use a Vertical Card to stack these elements vertically.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: cardMedia 
      ? [cardHeader, cardMedia, cardContent]
      : [cardHeader, cardContent]
  };

  // Return the assembled UI component. This component is responsive by nature 
  // when rendered in a browser as it uses well-structured AutoView components.
  return verticalCard;
}
