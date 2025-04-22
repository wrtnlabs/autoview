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



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  const plugin = input.plugin;

  // Handle missing plugin gracefully
  if (!plugin) {
    return {
      type: "Text",
      content: "No plugin data available",
      variant: "body1",
    };
  }

  // Utility to format timestamps into human-readable strings
  const formatTimestamp = (ts?: number): string | undefined => {
    if (typeof ts !== "number") return undefined;
    try {
      return new Date(ts).toLocaleString();
    } catch {
      return ts.toString();
    }
  };

  // Icon to indicate plugin state
  const stateIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: plugin.state === "active" ? "play" : "hourglass",
    color: plugin.state === "active" ? "green" : "yellow",
    size: 20,
  };

  // Build a DataList of core plugin properties
  const detailsList: IAutoView.IAutoViewDataListItemProps[] = [];

  // Helper to push a label/value pair
  const pushDetail = (label: string, value?: string) => {
    if (value == null) return;
    detailsList.push({
      type: "DataListItem",
      label: { type: "Text", content: label, variant: "subtitle2" },
      value: { type: "Text", content: value, variant: "body2" },
    });
  };

  pushDetail("ID", plugin.id);
  pushDetail("Key", plugin.key);
  pushDetail("Channel", plugin.channelId);
  pushDetail("State", plugin.state);
  pushDetail("Created At", formatTimestamp(plugin.createdAt));
  pushDetail("Bot Name", plugin.botName);
  if (typeof plugin.runRate === "number") {
    pushDetail("Run Rate", `${(plugin.runRate * 100).toFixed(1)}%`);
  }
  if (plugin.color) {
    pushDetail("Color", plugin.color);
  }

  // Build markdown sections for I18n texts if present
  const markdownSections: string[] = [];
  const renderI18n = (title: string, i18n?: Schema.I18nText) => {
    if (!i18n) return;
    markdownSections.push(`### ${title}`);
    if (i18n.text) markdownSections.push(`- Default: ${i18n.text}`);
    if (i18n.en) markdownSections.push(`- EN: ${i18n.en}`);
    if (i18n.ja) markdownSections.push(`- JA: ${i18n.ja}`);
    if (i18n.ko) markdownSections.push(`- KO: ${i18n.ko}`);
    markdownSections.push(""); // blank line
  };
  renderI18n("Welcome Text", plugin.welcomeI18n);
  renderI18n("Profile Bot Message", plugin.profileBotMessageI18n);

  // Build chip list for URL whitelist
  const urlChips: IAutoView.IAutoViewChipProps[] =
    plugin.urlWhitelist?.map((url) => ({
      type: "Chip",
      label: url,
      variant: "outlined",
      size: "small",
    })) ?? [];

  // Assemble the VerticalCard children
  const cardChildren: (
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardMediaProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  )[] = [];

  // Header with state icon and plugin name
  cardChildren.push({
    type: "CardHeader",
    title: plugin.name,
    description: plugin.labelButton ? "Label button enabled" : undefined,
    startElement: stateIcon,
  });

  // Media: desktop image if available
  if (plugin.deskImageUrl) {
    cardChildren.push({
      type: "CardMedia",
      src: plugin.deskImageUrl,
    });
  }

  // Content: Details list
  cardChildren.push({
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: detailsList,
    },
  });

  // Content: I18n markdown if any section generated
  if (markdownSections.length > 0) {
    cardChildren.push({
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content: markdownSections.join("\n"),
      },
    });
  }

  // Footer: URL whitelist chips
  if (urlChips.length > 0) {
    cardChildren.push({
      type: "CardFooter",
      childrenProps: urlChips,
    });
  }

  // Return a vertical card that composes all parts
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
