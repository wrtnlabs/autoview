import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4PluginView = {
                plugin?: legacy.v4.LegacyV4Plugin;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Plugin = {
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
            color: string & tags.Default<"#123456">;
            botName: string;
            textI18n?: I18nText;
            labelButton?: boolean;
            deskImage?: legacy.v4.LegacyV4TinyFile;
            deskMarginX?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            deskMarginY?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            deskPosition?: "left" | "right";
            mobileImage?: legacy.v4.LegacyV4TinyFile;
            mobileMarginX?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            mobileMarginY?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32"
            }>;
            mobilePosition?: "left" | "right";
            mobileHideButton?: boolean;
            mobileBubblePosition?: "top" | "bottom";
            accessSecret?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            welcomeI18n: I18nText;
            profileBot?: boolean;
            profileBotMessageI18n: I18nText;
            profileBotSchemaIds?: string[];
            urlWhitelist?: string[] & tags.MinItems<0> & tags.MaxItems<5>;
            runRate?: number & tags.Minimum<0> & tags.Maximum<1> & tags.JsonSchemaPlugin<{
                format: "float"
            }>;
            facebookPixelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            bright?: boolean;
            borderColor?: string;
            gradientColor?: string;
            textColor?: string;
            deskImageUrl?: string;
            mobileImageUrl?: string;
            /**
             * @deprecated
            */
            showPoweredBy?: boolean;
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
type I18nText = {
    text?: string;
    en?: string;
    ja?: string;
    ko?: string;
};
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4PluginView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the plugin from the input. If missing, we show a fallback message.
  const plugin = input.plugin;

  // If no plugin data is provided, return a simple markdown component displaying a friendly message.
  if (!plugin) {
    return {
      type: "Markdown",
      content: "## No Plugin Data\n\nThere is no plugin information available to display."
    };
  }

  // Create an avatar component for the header.
  // We'll try to use the deskImageUrl as the source image.
  const avatarComponent: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: plugin.deskImageUrl ? plugin.deskImageUrl : undefined,
    name: plugin.name,
    // Use a default size for the avatar.
    size: 40,
    // You can adjust the variant based on the plugin state or color if needed.
    variant: "primary"
  };

  // Determine the state icon based on the plugin state.
  const stateIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    // For active state, use a check-circle; for waiting, use an exclamation-circle.
    id: plugin.state === "active" ? "check-circle" : "exclamation-circle",
    // Use green for active and red for waiting.
    color: plugin.state === "active" ? "green" : "red",
    size: 20
  };

  // Prepare a markdown string that summarizes additional plugin details.
  // Using markdown formatting to include multiple pieces of data.
  const pluginDetailsMarkdown = `
### Plugin Details

- **ID:** ${plugin.id ?? "N/A"}
- **Channel:** ${plugin.channelId ?? "N/A"}
- **Created At:** ${plugin.createdAt ? new Date(plugin.createdAt).toLocaleString() : "Unknown"}
- **Color:** ${plugin.color}
- **Bot Name:** ${plugin.botName}
- **State:** ${plugin.state ?? "Unknown"}

### Welcome Message

${plugin.welcomeI18n.text || plugin.welcomeI18n.en || plugin.welcomeI18n.ja || plugin.welcomeI18n.ko || "Welcome!"}
`;

  // Create a markdown component to display plugin details.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: pluginDetailsMarkdown.trim()
  };

  // Optionally, include an image component if a desk image URL is available.
  // This image can provide visual context.
  const imageComponent: IAutoView.IAutoViewImageProps | undefined = plugin.deskImageUrl
    ? {
        type: "Image",
        src: plugin.deskImageUrl,
        alt: `${plugin.name} Image`
      }
    : undefined;

  // Compose the card header component.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: plugin.name,
    description: plugin.botName,
    // Use the avatar component we built as the start element; if no image is available, the avatar will simply show the name.
    startElement: avatarComponent,
    // Append the state icon at the end to quickly show the plugin's status.
    endElement: stateIcon
  };

  // Compose the card content components.
  // We include the markdown component and conditionally add the image component if available.
  const cardContentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  cardContentChildren.push(markdownComponent);
  if (imageComponent) {
    cardContentChildren.push(imageComponent);
  }

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: cardContentChildren
  };

  // Finally, combine the header and content components into a vertical card.
  // VerticalCard accepts an array of components as childrenProps.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the fully composed vertical card which will render responsively on web and mobile.
  return verticalCard;
}
