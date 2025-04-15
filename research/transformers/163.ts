import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type ChatTagView = {
        chatTag?: ChatTag;
    };
}
type ChatTag = {
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
    /**
     * @deprecated
    */
    followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
};
type IAutoViewTransformerInputType = desk.ChatTagView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine if the chatTag exists in the input.
  const chatTag = input.chatTag;

  // If there is no chatTag, return a simple Markdown component informing the user.
  if (!chatTag) {
    return {
      type: "Markdown",
      content: "# No Chat Tag Data\n\nThe provided data does not contain any chat tag information."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Create a mapping from chat tag colorVariant to allowed icon colors.
  // Note: Some provided color variants (like "olive", "cobalt", "purple", "navy") are mapped to the closest allowed colors.
  const colorMapping: Record<string, "red" | "orange" | "yellow" | "green" | "blue" | "violet" | "pink" | "darkGray"> = {
    red: "red",
    orange: "orange",
    yellow: "yellow",
    olive: "green",
    green: "green",
    cobalt: "blue",
    purple: "violet",
    pink: "pink",
    navy: "darkGray"
  };

  // Retrieve the mapped color. If none exists, undefined is used.
  const iconColor = chatTag.colorVariant ? colorMapping[chatTag.colorVariant] : undefined;

  // Build the card header component.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: chatTag.name,
    description: chatTag.description,
    // Use an icon as the start element to provide a visual cue.
    startElement: {
      type: "Icon",
      id: "tag", // Using a generic "tag" icon.
      color: iconColor, // Mapped color from the chatTag information.
      size: 24
    }
  };

  // Format additional details in Markdown.
  // We use markdown for text data to keep it visually engaging and allow basic formatting.
  const channelInfo = chatTag.channelId ? chatTag.channelId : "N/A";
  const createdAtInfo = chatTag.createdAt ? new Date(chatTag.createdAt).toLocaleString() : "Unknown";
  const keyInfo = chatTag.key ? chatTag.key : "N/A";

  const markdownContent = `
**Channel ID:** ${channelInfo}  
**Key:** ${keyInfo}  
**Created At:** ${createdAtInfo}
`;

  // Build the card content component with a markdown view.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    } as IAutoView.IAutoViewMarkdownProps
  };

  // Compose the final visual component as a vertical card.
  // A vertical card is chosen since it allows grouping header and content elements and adapts well on mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  return verticalCard;
}
