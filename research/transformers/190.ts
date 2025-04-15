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
  // Check if the plugin data exists.
  if (!input.plugin) {
    // Return a simple markdown component indicating that no plugin data was provided.
    return {
      type: "Markdown",
      content: "## No Plugin Data\n\nThe plugin data is unavailable. Please ensure that a valid plugin is provided."
    };
  }

  const plugin = input.plugin;

  // Build the CardHeader component.
  // We use the plugin name as the title and include a state description.
  // We also include an icon if the plugin.iconButton field exists.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: plugin.name,
    description: plugin.state ? `State: ${plugin.state}` : undefined,
    // Use an icon element if available. The allowed type for startElement is IAutoViewIconProps.
    startElement: plugin.iconButton
      ? {
          type: "Icon",
          id: plugin.iconButton, // the plugin.iconButton holds the icon name as per allowed values.
          size: 24,
          // Optionally, you can decide the color based on the appearance.
          color: plugin.appearance === "dark" ? "gray" : "blue"
        }
      : undefined
  };

  // Build the CardMedia component if there is an image URL available.
  // We prefer customImageUrl over deskImageUrl, then mobileImageUrl.
  const imageUrl = plugin.customImageUrl || plugin.deskImageUrl || plugin.mobileImageUrl;
  const cardMedia: IAutoView.IAutoViewCardMediaProps | undefined = imageUrl
    ? {
        type: "CardMedia",
        src: imageUrl
      }
    : undefined;

  // Compose detailed information using Markdown.
  // We include fields such as appearance, button type, and creation date if available.
  let detailsMarkdown = "## Plugin Details\n";
  detailsMarkdown += `- **Appearance:** ${plugin.appearance}\n`;
  detailsMarkdown += `- **Button Type:** ${plugin.buttonType}\n`;
  // Optionally include createdAt information if provided.
  if (plugin.createdAt) {
    const createdDate = new Date(plugin.createdAt).toLocaleString();
    detailsMarkdown += `- **Created At:** ${createdDate}\n`;
  }
  // Include additional properties if needed. This section can be easily extended.
  
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: detailsMarkdown
  };

  // Build the CardContent component.
  // We embed the markdown content to display the detailed plugin information.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownComponent
  };

  // Optionally, build the CardFooter component if a button should be displayed.
  // The button provides an actionable element as per plugin.labelButton flag.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (plugin.labelButton) {
    // Create a button component.
    const buttonComponent: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      // Use provided label text or default to "Action".
      label: plugin.labelButtonText ? plugin.labelButtonText : "Action",
      // Optionally assign a variant and color.
      variant: "contained",
      color: plugin.appearance === "dark" ? "secondary" : "primary"
      // You can also set the href property if navigation is required.
    };

    cardFooter = {
      type: "CardFooter",
      childrenProps: buttonComponent
    };
  }

  // Assemble the vertical card components.
  // The VerticalCard component accepts a list of child components (header, media, content, footer).
  const childrenProps: (IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardMediaProps | IAutoView.IAutoViewCardContentProps | IAutoView.IAutoViewCardFooterProps)[] = [];
  
  childrenProps.push(cardHeader);
  if (cardMedia) {
    childrenProps.push(cardMedia);
  }
  childrenProps.push(cardContent);
  if (cardFooter) {
    childrenProps.push(cardFooter);
  }

  // Return the final VerticalCard component that visualizes the plugin data.
  return {
    type: "VerticalCard",
    childrenProps: childrenProps
  };
}
