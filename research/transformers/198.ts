import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4PluginView = {
                    plugin?: Schema.legacy.v4.LegacyV4Plugin;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Plugin = {
                id?: string;
                key?: string & tags.Format<"uuid">;
                channelId?: string;
                state?: "waiting" | "active";
                name: string;
                createdAt?: number;
                color: string & tags.Default<"#123456">;
                botName: string;
                textI18n?: Schema.I18nText;
                labelButton?: boolean;
                deskImage?: Schema.legacy.v4.LegacyV4TinyFile;
                deskMarginX?: number & tags.Type<"int32">;
                deskMarginY?: number & tags.Type<"int32">;
                deskPosition?: "left" | "right";
                mobileImage?: Schema.legacy.v4.LegacyV4TinyFile;
                mobileMarginX?: number & tags.Type<"int32">;
                mobileMarginY?: number & tags.Type<"int32">;
                mobilePosition?: "left" | "right";
                mobileHideButton?: boolean;
                mobileBubblePosition?: "top" | "bottom";
                accessSecret?: string;
                welcomeI18n: Schema.I18nText;
                profileBot?: boolean;
                profileBotMessageI18n: Schema.I18nText;
                profileBotSchemaIds?: string[];
                urlWhitelist?: string[] & tags.MinItems<0> & tags.MaxItems<5>;
                runRate?: number & tags.Minimum<0> & tags.Maximum<1>;
                facebookPixelId?: string;
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
                width?: number & tags.Type<"int32">;
                height?: number & tags.Type<"int32">;
            };
        }
    }
    export type I18nText = {
        text?: string;
        en?: string;
        ja?: string;
        ko?: string;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4PluginView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const plugin = input.plugin;
  // If there's no plugin payload, render a friendly Markdown message
  if (!plugin) {
    return {
      type: "Markdown",
      content: "### No plugin data available"
    };
  }

  // Helper: create a Text component
  const makeText = (
    text: string,
    variant?: IAutoView.IAutoViewTextProps["variant"]
  ): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
    ...(variant ? { variant } : {})
  });

  // Helper: create a DataListItem component, value can be either text or an Image
  const makeItem = (
    label: string,
    value: string | IAutoView.IAutoViewImageProps
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: makeText(label, "body2"),
    value:
      typeof value === "string"
        ? makeText(value, "body1")
        : value
  });

  // Format timestamp
  const createdStr = plugin.createdAt
    ? new Date(plugin.createdAt).toLocaleString()
    : "N/A";

  // Build the list of key/value items
  const items: IAutoView.IAutoViewDataListItemProps[] = [
    makeItem("ID", plugin.id ?? "N/A"),
    makeItem("Key", plugin.key ?? "N/A"),
    makeItem("Channel", plugin.channelId ?? "N/A"),
    makeItem("State", plugin.state ?? "N/A"),
    makeItem("Created At", createdStr),
    makeItem("Bot Name", plugin.botName ?? "N/A"),
    makeItem("Color", plugin.color),
    makeItem("Label Button", plugin.labelButton ? "Yes" : "No"),
    makeItem("URL Whitelist Count", String(plugin.urlWhitelist?.length ?? 0)),
    makeItem("Run Rate", plugin.runRate != null ? String(plugin.runRate) : "N/A")
  ];

  // If images URLs are provided, render them inline
  if (plugin.deskImageUrl) {
    items.push(
      makeItem("Desktop Image", {
        type: "Image",
        src: plugin.deskImageUrl,
        alt: "Desktop image"
      })
    );
  }
  if (plugin.mobileImageUrl) {
    items.push(
      makeItem("Mobile Image", {
        type: "Image",
        src: plugin.mobileImageUrl,
        alt: "Mobile image"
      })
    );
  }

  // Header: show plugin name, description (i18n text), an icon, and a state chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: plugin.name,
    description: plugin.textI18n?.text ?? "",
    startElement: {
      type: "Icon",
      id: "robot",
      size: 32,
      color: "gray"
    },
    endElement: {
      type: "Chip",
      label: plugin.state ?? "",
      color: plugin.state === "active" ? "success" : "warning",
      size: "small",
      variant: "filled"
    }
  };

  // The DataList component wrapping all items
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Content: embed the DataList inside CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Wrap everything in a VerticalCard for a clean, responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content]
  };

  return card;
}
