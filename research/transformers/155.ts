import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type BotsView = {
    next?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    bots?: bot.CustomBot[];
};
namespace bot {
    export type CustomBot = {
        id?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        channelId?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        name: string;
        description?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        nameDescI18nMap?: {
            [key: string]: NameDesc;
        };
        createdAt?: number & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        avatar?: TinyFile;
        color: string & tags.Default<"#123456">;
        avatarUrl?: string;
        ai?: boolean;
    };
}
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
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
type IAutoViewTransformerInputType = BotsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose a card header to introduce the bots overview.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Bots Overview",
    // Show total bots count if any, or descriptive text when no bots are available
    description: input.bots && input.bots.length
      ? `Displaying ${input.bots.length} bot${input.bots.length > 1 ? "s" : ""}.`
      : "No bots available.",
    // Use an icon to visually represent the bots category.
    startElement: {
      type: "Icon",
      id: "robot", // Assuming 'robot' is a valid icon name in kebab-case without prefix.
      color: "blue",
      size: 20,
    },
  };

  // Build the data list items based on the bots array.
  let dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];
  if (input.bots && input.bots.length) {
    dataListItems = input.bots.map((bot) => {
      // Prepare an avatar component if an avatar URL is provided.
      let avatarComponent: IAutoView.IAutoViewAvatarProps | undefined;
      if (bot.avatarUrl) {
        avatarComponent = {
          type: "Avatar",
          src: bot.avatarUrl,
          name: bot.name,
          size: 40, // 40 is one of the allowed sizes.
        };
      }

      // Compose the label components for each bot.
      // First, use an avatar or a fallback icon to attract attention.
      const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
      if (avatarComponent) {
        labelComponents.push(avatarComponent);
      } else {
        // Fallback to a bot icon if no avatar is provided.
        labelComponents.push({
          type: "Icon",
          id: "robot",
          color: "blue",
          size: 20,
        });
      }
      // Then, add a markdown component with the bot's name
      labelComponents.push({
        type: "Markdown",
        content: `**${bot.name}**`,
      });
      
      // Compose the value component to show bot details.
      // Leverage a markdown component to allow rich text formatting.
      const valueComponent: IAutoView.IAutoViewPresentationComponentProps = {
        type: "Markdown",
        content: bot.description ? bot.description : "No description provided.",
      };

      // Create and return a DataListItem representing this bot.
      return {
        type: "DataListItem",
        label: labelComponents,
        value: valueComponent,
      };
    });
  } else {
    // In case there are no bots, provide a single DataListItem to notify the user.
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**No bots available.**",
      },
      value: {
        type: "Markdown",
        content: "",
      },
    });
  }

  // Build the DataList component to aggregate all bot items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Compose the Card Content that embeds the DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Compose a Vertical Card that includes a header and the content.
  // Using a vertical card ensures a responsive layout on both desktop and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return verticalCard;
}
