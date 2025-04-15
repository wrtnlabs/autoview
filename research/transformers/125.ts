import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4PluginsView = {
                plugins?: legacy.v4.LegacyV4Plugin[];
                next?: number & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
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
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4PluginsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper function: Given a plugin object, create a HorizontalCard component containing an image (if available)
  // and a markdown description.
  const createHorizontalCard = (plugin: legacy.v4.LegacyV4Plugin): IAutoView.IAutoViewHorizontalCardProps => {
    // Prepare plugin image source: Prefer deskImageUrl; otherwise, try mobileImageUrl.
    const imageSrc = plugin.deskImageUrl ? plugin.deskImageUrl : plugin.mobileImageUrl;

    // Create the CardMedia component if we have an image source.
    const mediaComponent = imageSrc
      ? {
          type: "CardMedia",
          src: imageSrc
        } as IAutoView.IAutoViewCardMediaProps
      : undefined;

    // Prepare markdown content based on plugin details.
    // We use markdown formatting to make the text representation look nicer.
    const markdownContentLines: string[] = [];
    markdownContentLines.push(`# ${plugin.name}`);
    markdownContentLines.push("");
    markdownContentLines.push(`**Bot Name:** ${plugin.botName}`);
    // If available, include plugin text from i18n texts. Prefer english over others.
    if (plugin.textI18n) {
      const desc = plugin.textI18n.en || plugin.textI18n.text || plugin.textI18n.ja || plugin.textI18n.ko;
      if(desc) {
        markdownContentLines.push("");
        markdownContentLines.push(desc);
      }
    }
    // Optionally, include additional plugin properties.
    markdownContentLines.push("");
    markdownContentLines.push(`**Color:** ${plugin.color}`);
    // Join the lines into a markdown string.
    const markdownContent = markdownContentLines.join("\n");

    // Create a Markdown component to render the text.
    const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent
    };

    // Instead of directly placing text in the CardContent, we embed our markdown.
    const contentComponent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      // The childrenProps here can be a single presentation component. Markdown is acceptable.
      childrenProps: markdownComponent
    };

    // Compose children for the horizontal card.
    const children: (IAutoView.IAutoViewCardMediaProps | IAutoView.IAutoViewCardContentProps)[] = [];
    if (mediaComponent) {
      children.push(mediaComponent);
    }
    children.push(contentComponent);

    // Return the horizontal card that visualizes one plugin.
    return {
      type: "HorizontalCard",
      childrenProps: children
    };
  };

  // Main transformation logic:
  // Check if the input has a valid plugins array.
  if (input && input.plugins && Array.isArray(input.plugins) && input.plugins.length > 0) {
    // Map each plugin to a horizontal card component.
    const horizontalCards = input.plugins.map(createHorizontalCard);
    
    // Compose the carousel component to display all plugin cards visually.
    // A carousel is a nice way to show multiple items in a responsive manner.
    const carousel: IAutoView.IAutoViewCarouselProps = {
      type: "Carousel",
      autoPlay: true,
      infinite: true,
      interval: 40,      // Using a middle ground interval value for smooth transitions.
      navControls: true, // Show navigation controls.
      indicators: true,  // Show indicators for each slide.
      gutter: 8,
      childrenProps: horizontalCards
    };
    
    return carousel;
  } else {
    // If there are no plugins (or input is missing plugins), display a vertical card with a markdown message.
    // This vertical card informs the user that no plugins are available.
    const noDataMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "## No Plugins Available\n\nThere are currently no plugins available for display."
    };

    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: noDataMarkdown
    };

    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: "Plugins Dashboard",
      description: "No plugin data found."
      // Note: We could also add an icon in startElement if desired.
    };

    // Compose the vertical card with a header and content.
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      childrenProps: [cardHeader, cardContent]
    };

    return verticalCard;
  }
}
