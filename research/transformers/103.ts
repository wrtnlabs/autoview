import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4ChatTagsView = {
                chatTags?: legacy.v4.LegacyV4ChatTag[];
                next?: string;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4ChatTag = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
            name: string;
            key: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            description?: string;
            followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
        };
    }
}
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4ChatTagsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



  
// Helper function to map legacy colorVariant to supported chip color.
function mapColor(colorVariant: string): 
  "primary" | "secondary" | "success" | "error" | "warning" | "info" | 
  "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | 
  "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray" {
  switch (colorVariant) {
    case "red":
      return "red";
    case "orange":
      return "orange";
    case "yellow":
      return "yellow";
    case "olive":
      return "green";
    case "green":
      return "green";
    case "cobalt":
      return "blue";
    case "purple":
      return "violet";
    case "pink":
      return "pink";
    case "navy":
      return "indigo";
    default:
      return "gray";
  }
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the chat tags from input; if not present, use an empty array.
  const chatTags = input.chatTags || [];

  // Create data list items for each chat tag. Each item will include:
  // - a Chip (used in the label) showing the tag name with its associated color.
  // - a Markdown component (used in the value) showing the description and extra info.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = chatTags.map((tag) => {
    // Compose the markdown content.
    let markdownContent = tag.description ? tag.description : "No description provided.";
    if (tag.followerIds && tag.followerIds.length > 0) {
      // Append follower count information in markdown format.
      markdownContent += `\n\n*Followers: ${tag.followerIds.length}*`;
    }
    
    return {
      type: "DataListItem",
      // The label uses a Chip component to visually display the tag name.
      label: {
        type: "Chip",
        label: tag.name,
        color: mapColor(tag.colorVariant || ""),
        // Optionally, size can be adjusted if needed.
        size: "small"
      } as IAutoView.IAutoViewChipProps,
      // The value uses a Markdown component to render the description with markdown styling.
      value: {
        type: "Markdown",
        content: markdownContent
      } as IAutoView.IAutoViewMarkdownProps
    };
  });

  // If no chat tags are available, create a fallback message.
  const dataListComponent: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems.length > 0 ? dataListItems : [
      {
        type: "DataListItem",
        label: {
          type: "Chip",
          label: "No Chat Tags",
          color: "gray",
          size: "small"
        } as IAutoView.IAutoViewChipProps,
        value: {
          type: "Markdown",
          content: "There are no chat tags available to display."
        } as IAutoView.IAutoViewMarkdownProps
      }
    ]
  };

  // Create a vertical card to encapsulate the header and the data list content.
  // The card header displays the title and a brief description.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Chat Tags Overview",
    description: "A visual list of available chat tags with their descriptions and follower counts.",
    // Using an icon in the startElement can improve visual appeal.
    startElement: {
      type: "Icon",
      id: "tags", // This icon id should correspond to an existing icon in the icon set.
      color: "blue",
      size: 20
    } as IAutoView.IAutoViewIconProps
  };

  // The card content consists of the data list component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataListComponent
  };

  // Compose the vertical card with header and content.
  // Using vertical cards enhances responsiveness and organizes the UI for mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the visual component composed of a vertical card.
  return verticalCard;
}
