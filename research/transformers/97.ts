import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4BotsView = {
                bots?: legacy.v4.LegacyV4Bot[];
                next?: number & tags.JsonSchemaPlugin<{
                    format: "int64"
                }>;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Bot = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            avatar?: legacy.v4.LegacyV4TinyFile;
            avatarUrl?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            color: string & tags.Default<"#123456">;
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
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4BotsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract bots from input; if undefined, default to an empty array.
  const bots = input.bots || [];

  // Map each bot to a DataListItem component.
  const items: IAutoView.IAutoViewDataListItemProps[] = bots.map((bot) => {
    // For visual engagement, use an Avatar component if an image URL is provided.
    // Otherwise, fallback to an Icon component with a "user" icon.
    const avatarComponent = bot.avatarUrl
      ? {
          type: "Avatar",
          src: bot.avatarUrl, // URL for the bot's avatar image.
          name: bot.name,
          // Chosen variant and size help maintain consistency across devices.
          variant: "primary",
          size: 40,
        } as IAutoView.IAutoViewAvatarProps
      : {
          type: "Icon",
          id: "user", // A default icon ID representing a user.
          size: 40,
          color: "gray",
        } as IAutoView.IAutoViewIconProps;

    // Create a Markdown component to emphasize the bot name.
    const nameMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      // Using markdown bold formatting to highlight the name.
      content: `**${bot.name}**`,
    };

    // Aggregate additional bot details using markdown.
    let details = "";
    if (bot.channelId) {
      details += `**Channel ID:** ${bot.channelId}\n\n`;
    }
    if (bot.createdAt) {
      // Convert the timestamp to a locale-specific date string for readability.
      const createdDate = new Date(bot.createdAt).toLocaleString();
      details += `**Created At:** ${createdDate}\n\n`;
    }
    // Always display the bot's color.
    details += `**Color:** ${bot.color}\n\n`;

    const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: details.trim(),
    };

    // Compose the DataListItem using an array for the label field
    // to include both the visual avatar and the markdown name.
    return {
      type: "DataListItem",
      label: [avatarComponent, nameMarkdown],
      value: detailsMarkdown,
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // Handle the case where no bots are available.
  if (items.length === 0) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "_No bots available_",
      },
      value: {
        type: "Markdown",
        content: "",
      },
    } as IAutoView.IAutoViewDataListItemProps);
  }

  // If the input provides a 'next' property, display a "Load More" button
  // to indicate there is more data available. This ensures a responsive experience.
  if (input.next !== undefined) {
    const loadMoreButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      // Using a clear label so users recognize the action.
      label: "Load More",
      variant: "contained",
      color: "primary",
    };
    // Add the button at the end of the list, using it as the label for a DataListItem.
    items.push({
      type: "DataListItem",
      label: loadMoreButton,
      value: {
        type: "Markdown",
        content: "",
      },
    } as IAutoView.IAutoViewDataListItemProps);
  }

  // Compose the final UI as a DataList component.
  // The DataList container aggregates all individual DataListItem components.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
