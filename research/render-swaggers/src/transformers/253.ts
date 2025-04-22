import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type PluginsView = {
        next?: number;
        plugins?: Schema.Plugin[];
    };
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
type IAutoViewTransformerInputType = Schema.PluginsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract plugins array, defaulting to empty for robustness
  const plugins = input.plugins ?? [];

  // Build the main content: either a DataList when we have plugins, or a Markdown notice when empty
  const contentComponent: IAutoView.IAutoViewPresentationComponentProps =
    plugins.length > 0
      ? {
          // Render each plugin as a list item
          type: "DataList",
          childrenProps: plugins.map((plugin) => {
            // --- Label: Plugin icon + name ---
            const labelItems: IAutoView.IAutoViewPresentationComponentProps[] = [
              {
                type: "Icon",
                id: plugin.iconButton, // FontAwesome icon name in kebab-case
                size: 20,
                color: "blue",
              },
              {
                type: "Text",
                content: plugin.name,
                variant: "body1",
              },
            ];

            // --- Value: status chip, appearance chip, optional image, optional action button ---
            const valueItems: IAutoView.IAutoViewPresentationComponentProps[] = [];

            // 1. State chip (waiting/active)
            const stateLabel = plugin.state ?? "unknown";
            const stateColor =
              stateLabel === "active"
                ? "success"
                : stateLabel === "waiting"
                ? "warning"
                : "gray";
            valueItems.push({
              type: "Chip",
              label: stateLabel,
              color: stateColor,
              size: "small",
              variant: "outlined",
            });

            // 2. Appearance chip (light/dark/system)
            if (plugin.appearance) {
              const appearanceColor: IAutoView.IAutoViewChipProps["color"] =
                plugin.appearance === "light"
                  ? "yellow"
                  : plugin.appearance === "dark"
                  ? "darkGray"
                  : "info";
              valueItems.push({
                type: "Chip",
                label: plugin.appearance,
                color: appearanceColor,
                size: "small",
                variant: "outlined",
              });
            }

            // 3. Custom image (if provided) to give a visual hint
            if (plugin.customImageUrl) {
              valueItems.push({
                type: "Image",
                src: plugin.customImageUrl,
                alt: plugin.name,
              });
            }

            // 4. Label button (if enabled) to let users trigger plugin action
            if (plugin.labelButton) {
              valueItems.push({
                type: "Button",
                label: plugin.labelButtonText ?? "Action",
                variant: "text",
                size: "small",
                color: "primary",
              });
            }

            // Compose the DataListItem
            return {
              type: "DataListItem",
              label: labelItems,
              value: valueItems,
            };
          }),
        }
      : {
          // Fallback markdown when no plugins are found
          type: "Markdown",
          content: "### No plugins available.\nThere are currently no plugins to display.",
        };

  // Card header summarizing the list
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Plugins",
    description: `Showing ${plugins.length} plugin${plugins.length !== 1 ? "s" : ""}`,
  };

  // Card content wraps the list or markdown
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentComponent,
  };

  // Optional footer: a "Load more" button if pagination cursor is provided
  const footer: IAutoView.IAutoViewCardFooterProps | undefined =
    typeof input.next === "number"
      ? {
          type: "CardFooter",
          childrenProps: [
            {
              type: "Button",
              label: "Load more",
              variant: "text",
              size: "medium",
              color: "primary",
            },
          ],
        }
      : undefined;

  // Assemble the final vertical card
  const cardProps: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: footer ? [header, content, footer] : [header, content],
  };

  return cardProps;
}
