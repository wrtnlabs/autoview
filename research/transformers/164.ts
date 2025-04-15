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



function mapColor(colorVariant?: string): "primary" | "secondary" | "success" | "error" | "warning" | "info" | "red" | "orange" | "yellow" | "lime" | "green" | "teal" | "cyan" | "blue" | "indigo" | "violet" | "pink" | "gray" | "darkGray" {
  // Maps the ChatTag colorVariant (from desk.ChatTag) to a valid Avatar variant.
  switch (colorVariant) {
    case "red":
      return "red";
    case "orange":
      return "orange";
    case "yellow":
      return "yellow";
    case "olive":
      // olive can be represented by green in our allowed list
      return "green";
    case "green":
      return "green";
    case "cobalt":
      // cobalt can be approximated with blue
      return "blue";
    case "purple":
      // purple mapped to violet
      return "violet";
    case "pink":
      return "pink";
    case "navy":
      // navy approximated with indigo
      return "indigo";
    default:
      // Fallback to a default variant if none provided or mapping not found
      return "primary";
  }
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if the input contains a ChatTag
  if (input.chatTag) {
    const chatTag = input.chatTag;
    
    // Prepare the card header with visual elements
    const header: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: chatTag.name,
      // Use the 'key' field as a secondary descriptor; if not available, leave it undefined
      description: chatTag.key,
      // Use an avatar as a visual identifier for the chat tag.
      startElement: {
        type: "Avatar",
        name: chatTag.name,
        variant: mapColor(chatTag.colorVariant),
        // Choosing a moderate size suited for responsive design across devices.
        size: 36
      }
    };

    // Build markdown content to display additional ChatTag details.
    // Markdown is chosen over plain text to improve readability and UI engagement.
    let markdownLines: string[] = [];
    if (chatTag.channelId) {
      markdownLines.push(`**Channel ID:** ${chatTag.channelId}`);
    }
    if (chatTag.description) {
      markdownLines.push(`**Description:** ${chatTag.description}`);
    }
    if (chatTag.createdAt !== undefined) {
      // Converting the UNIX timestamp (assumed to be in milliseconds or seconds) to a locale string.
      // Note: In production, consider validating the timestamp unit.
      const date = new Date(chatTag.createdAt);
      markdownLines.push(`**Created At:** ${date.toLocaleString()}`);
    }
    // Optionally display follower IDs if provided (even though deprecated)
    if (chatTag.followerIds && chatTag.followerIds.length > 0) {
      markdownLines.push(`**Followers:** ${chatTag.followerIds.join(", ")}`);
    }
    
    // Join markdown lines into a single markdown content string.
    const markdownContent = markdownLines.length > 0 ? markdownLines.join("\n\n") : "No additional details available.";

    // Prepare the card content using a markdown component for rich text formatting.
    const content: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content: markdownContent
      }
    };

    // Compose the final UI component as a vertical card, which allows stacking of header and content.
    // VerticalCard is responsive and adapts well for both web and mobile devices.
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
      type: "VerticalCard",
      childrenProps: [header, content]
    };

    return verticalCard;
  } else {
    // In case there is no ChatTag data in the input, provide a fallback UI element.
    // Here we use a text component with markdown-like syntax embedded for consistency.
    const fallbackText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      // The content informs the user that no chat tag data was provided.
      content: "### No Chat Tag Data Available\n\nPlease provide valid chat tag information to display the details.",
      variant: "subtitle1",
      color: "gray"
    };
    return fallbackText;
  }
}
