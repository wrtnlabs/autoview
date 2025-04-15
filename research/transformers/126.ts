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
  // Extract the plugin data from the input.
  const plugin = input.plugin;

  // If there is no plugin data, return a simple markdown message.
  if (!plugin) {
    return {
      type: "Markdown",
      content: "## No Plugin Data\n\nPlugin information is not available.",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Use an icon to indicate plugin state.
  // For example, if the plugin is active, display a "check-circle" icon in green;
  // otherwise, display a "pause-circle" icon in yellow.
  const stateIcon: IAutoView.IAutoViewIconProps = {
    id: plugin.state === "active" ? "check-circle" : "pause-circle",
    color: plugin.state === "active" ? "green" : "yellow",
    size: 24,
    type: "Icon",
  };

  // Build the card header.
  // The header uses the plugin name as its title and botName as a brief description.
  // The icon is set in the startElement for visual emphasis.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: plugin.name,
    description: plugin.botName,
    startElement: stateIcon,
  };

  // Create card media component if an image URL is available.
  // Prefer the desk image over the mobile image if both are provided.
  let cardMedia: IAutoView.IAutoViewCardMediaProps | undefined;
  const imageUrl = plugin.deskImageUrl || plugin.mobileImageUrl;
  if (imageUrl) {
    cardMedia = {
      type: "CardMedia",
      src: imageUrl,
    };
  }

  // Use a markdown component to display various plugin details.
  // Markdown is preferred to ensure the text is visually approachable.
  let detailsMarkdown = "";
  if (plugin.id) {
    detailsMarkdown += `**ID:** ${plugin.id}\n\n`;
  }
  if (plugin.key) {
    detailsMarkdown += `**Key:** ${plugin.key}\n\n`;
  }
  if (plugin.createdAt) {
    // Format the timestamp into a readable date string.
    const dateStr = new Date(plugin.createdAt).toLocaleString();
    detailsMarkdown += `**Created At:** ${dateStr}\n\n`;
  }
  if (plugin.color) {
    detailsMarkdown += `**Color:** ${plugin.color}\n\n`;
  }
  // If there is any internationalized text provided, add it to the description.
  const i18nText = plugin.textI18n?.text || plugin.textI18n?.en || plugin.textI18n?.ja || plugin.textI18n?.ko;
  if (i18nText) {
    detailsMarkdown += `**Description:**\n\n${i18nText}\n\n`;
  }

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: detailsMarkdown || "No additional details available.",
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Optionally create a card footer to display additional metadata such as margin properties.
  let footerMarkdown = "";
  if (plugin.deskMarginX !== undefined || plugin.deskMarginY !== undefined) {
    footerMarkdown += `**Desk Margins:** X=${plugin.deskMarginX ?? "N/A"} Y=${plugin.deskMarginY ?? "N/A"}\n\n`;
  }
  if (plugin.mobileMarginX !== undefined || plugin.mobileMarginY !== undefined) {
    footerMarkdown += `**Mobile Margins:** X=${plugin.mobileMarginX ?? "N/A"} Y=${plugin.mobileMarginY ?? "N/A"}\n\n`;
  }
  
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined;
  if (footerMarkdown) {
    cardFooter = {
      type: "CardFooter",
      childrenProps: {
        type: "Markdown",
        content: footerMarkdown,
      } as IAutoView.IAutoViewMarkdownProps,
    };
  }

  // Compose the vertical card using the various sections.
  // The vertical card is an effective container for responsive layouts.
  const childrenProps: (
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardMediaProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  )[] = [cardHeader];

  if (cardMedia) {
    childrenProps.push(cardMedia);
  }
  childrenProps.push(cardContent);
  if (cardFooter) {
    childrenProps.push(cardFooter);
  }

  return {
    type: "VerticalCard",
    childrenProps,
  } as IAutoView.IAutoViewVerticalCardProps;
}
