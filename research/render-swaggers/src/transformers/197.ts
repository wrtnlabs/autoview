import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4PluginsView = {
                    plugins?: Schema.legacy.v4.LegacyV4Plugin[];
                    next?: number;
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4PluginsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract plugins array, defaulting to empty if undefined.
  const plugins = input.plugins ?? [];

  // If there are no plugins, show a friendly Markdown message.
  if (plugins.length === 0) {
    return {
      type: "Markdown",
      content: `### No plugins available\n\nThere are currently no plugins to display.`
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Build list children: a subheader plus one ListItem per plugin.
  const listChildren: Array<IAutoView.IAutoViewListSubheaderProps | IAutoView.IAutoViewListItemProps> = [];

  // Add a sticky subheader for the list.
  listChildren.push({
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: {
      // Use Text for the section title.
      type: "Text",
      variant: "h6",
      content: "Installed Plugins"
    }
  });

  // Map each plugin to a ListItem.
  for (const plugin of plugins) {
    // Prepare the avatar or icon for the plugin.
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = plugin.deskImageUrl
      ? {
          type: "Avatar",
          src: plugin.deskImageUrl,
          name: plugin.name,
          variant: "primary",
          size: 32
        }
      : {
          type: "Icon",
          id: "puzzle-piece",
          color: "cyan",
          size: 24
        };

    // Format the creation date if available.
    const createdAtText = plugin.createdAt
      ? new Date(plugin.createdAt).toLocaleDateString()
      : "Unknown date";

    // Build a status chip for the plugin state.
    const stateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: plugin.state ?? "waiting",
      color: plugin.state === "active" ? "green" : "warning",
      variant: "filled",
      size: "small"
    };

    // Optional display of channelId as a chip if present.
    const channelChip: IAutoView.IAutoViewChipProps | undefined = plugin.channelId
      ? {
          type: "Chip",
          label: plugin.channelId,
          color: "blue",
          variant: "outlined",
          size: "small"
        }
      : undefined;

    // Assemble endElement array: always show state, then optional channel.
    const endElements: IAutoView.IAutoViewChipProps[] = [stateChip];
    if (channelChip) endElements.push(channelChip);

    // Compose the ListItemProps.
    const item: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: plugin.name,
      description: `Created: ${createdAtText}`,
      startElement,
      endElement: endElements
    };

    listChildren.push(item);
  }

  // Return the List component wrapping all plugins.
  return {
    type: "List",
    childrenProps: listChildren
  } as IAutoView.IAutoViewListProps;
}
