import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export type PluginView = {
            plugin?: Schema.Plugin;
        };
    }
    export type Plugin = {
        id?: string;
        key?: string & tags.Format<"uuid">;
        channelId?: string;
        state?: "waiting" | "active";
        name: string;
        createdAt?: number;
        appearance: "light" | "dark" | "system";
        labelButton?: boolean;
        labelButtonText?: string;
        labelButtonTextI18nMap?: {
            [key: string]: string;
        };
        buttonType: "legacy" | "customImage" | "iconButton";
        iconButton: "channel" | "channel-filled" | "chat-bubble-alt" | "chat-bubble-alt-filled" | "chat-bubble-filled" | "chat-lightning-filled" | "chat-progress" | "chat-progress-filled" | "chat-question" | "chat-question-filled" | "comment" | "comment-filled" | "communication" | "headset" | "help-filled" | "send-forward" | "send-forward-filled" | "sms" | "sms-filled";
        customImage?: Schema.ImageFile;
        deskImage?: Schema.TinyFile;
        deskMarginX?: number & tags.Type<"int32">;
        deskMarginY?: number & tags.Type<"int32">;
        deskHideButton?: boolean;
        deskPosition?: "left" | "right";
        mobileImage?: Schema.TinyFile;
        mobileMarginX?: number & tags.Type<"int32">;
        mobileMarginY?: number & tags.Type<"int32">;
        mobilePosition?: "left" | "right";
        mobileHideButton?: boolean;
        mobileBubblePosition?: "top" | "bottom";
        urlWhitelist?: string[] & tags.MinItems<0> & tags.MaxItems<5>;
        runRate?: number & tags.Minimum<0> & tags.Maximum<1>;
        facebookPixelId?: string;
        customImageUrl?: string;
        deskImageUrl?: string;
        mobileImageUrl?: string;
        validLabelButtonText?: boolean;
        validLabelButtonTextI18nMap?: boolean;
    };
    export type ImageFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
        contentType?: string & tags.Pattern<"^image/.*">;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.open.PluginView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const plugin = input.plugin;
  // If there's no plugin data, show a markdown placeholder
  if (!plugin) {
    return {
      type: "Markdown",
      content: "## No plugin data available"
    };
  }

  // Helper: format timestamp to human-readable string
  const formatDate = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : "—";

  // Icon mapping for plugin state
  const stateIcon = plugin.state === "active"
    ? { id: "check-circle", color: "green" as const }
    : { id: "hourglass-start", color: "yellow" as const };

  // Icon mapping for appearance
  const appearanceIcon = plugin.appearance === "light"
    ? { id: "sun", color: "orange" as const }
    : plugin.appearance === "dark"
      ? { id: "moon", color: "blue" as const }
      : { id: "adjust", color: "gray" as const };

  // Build a list of DataListItemProps to display plugin properties
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Unique key (UUID) if available
  if (plugin.key) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "UUID", variant: "body2" },
      value: { type: "Text", content: plugin.key, variant: "body1" }
    });
  }

  // State with icon
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "State", variant: "body2" },
    value: {
      type: "Icon",
      id: stateIcon.id,
      color: stateIcon.color,
      size: 16
    }
  });

  // Creation date
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Created At", variant: "body2" },
    value: { type: "Text", content: formatDate(plugin.createdAt), variant: "body1" }
  });

  // Appearance icon
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Appearance", variant: "body2" },
    value: {
      type: "Icon",
      id: appearanceIcon.id,
      color: appearanceIcon.color,
      size: 16
    }
  });

  // Run rate percentage
  if (plugin.runRate !== undefined) {
    const pct = Math.round(plugin.runRate * 100) + "%";
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Run Rate", variant: "body2" },
      value: {
        type: "Chip",
        label: pct,
        variant: "outlined",
        color: "info",
        size: "small"
      }
    });
  }

  // URL whitelist as a group of chips
  if (Array.isArray(plugin.urlWhitelist) && plugin.urlWhitelist.length > 0) {
    const chips = plugin.urlWhitelist.map((url) => ({
      type: "Chip" as const,
      label: url,
      size: "small" as const,
      variant: "filled" as const
    }));
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Allowed URLs", variant: "body2" },
      value: chips
    });
  }

  // Custom image preview if URL is provided
  if (plugin.customImageUrl) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Custom Image", variant: "body2" },
      value: {
        type: "Image",
        src: plugin.customImageUrl,
        alt: plugin.name + " custom"
      }
    });
  }

  // If there is a mobile image URL, show it
  if (plugin.mobileImageUrl) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Mobile Image", variant: "body2" },
      value: {
        type: "Image",
        src: plugin.mobileImageUrl,
        alt: plugin.name + " mobile"
      }
    });
  }

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items
  };

  // Compose the final VerticalCard: header + content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: plugin.name,
        // state icon on the left
        startElement: {
          type: "Icon",
          id: stateIcon.id,
          color: stateIcon.color,
          size: 20
        },
        // appearance icon on the right
        endElement: {
          type: "Icon",
          id: appearanceIcon.id,
          color: appearanceIcon.color,
          size: 20
        }
      },
      {
        type: "CardContent",
        childrenProps: dataList
      }
    ]
  };
}
