import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4ChatTagView = {
                chatTag?: legacy.v4.LegacyV4ChatTag;
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
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4ChatTagView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the chat tag information from the input data.
  const tag = input.chatTag;
  
  // If there's no chat tag provided, return a Markdown component that informs the user.
  if (!tag) {
    return {
      type: "Markdown",
      content: "No chat tag data available."
    };
  }

  // Helper function to map legacy color variants to the allowed icon color values.
  // Some legacy variants (olive, cobalt, purple, navy) are converted to their nearest visual match.
  const mapColorVariant = (color: string): IAutoView.IAutoViewIconProps["color"] => {
    switch(color) {
      case "olive":
        return "lime";
      case "cobalt":
        return "blue";
      case "purple":
        return "violet";
      case "navy":
        return "indigo";
      default:
        // Assuming the provided color is already one of the allowed color strings.
        return color as IAutoView.IAutoViewIconProps["color"];
    }
  };

  // Determine the icon color if the legacy colorVariant is defined.
  const iconColor = tag.colorVariant ? mapColorVariant(tag.colorVariant) : undefined;

  // Create a CardHeader component to prominently display the chat tag's name and description.
  // The startElement is set as an Icon (e.g., a chat bubble) to immediately give a visual cue.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: tag.name,
    description: tag.description,
    startElement: {
      type: "Icon",
      id: "chat", // Icon name in kebab-case; ensures visually engaging representation.
      color: iconColor,
      size: 24  // Chosen size within the allowed set; adjust as necessary.
    }
  };

  // Build markdown content for the additional details.
  // Using markdown allows better formatting and responsiveness on mobile devices.
  let markdownContent = "";
  if (tag.channelId) {
    markdownContent += `- **Channel ID:** ${tag.channelId}\n`;
  }
  // 'key' is read-only but included as identifying information.
  markdownContent += `- **Key:** ${tag.key}\n`;
  if (tag.followerIds && tag.followerIds.length > 0) {
    markdownContent += `- **Followers:** ${tag.followerIds.length}\n`;
  }
  if (tag.createdAt) {
    // Format the createdAt timestamp into an ISO string for human-readable display.
    const formattedDate = new Date(tag.createdAt).toISOString();
    markdownContent += `- **Created At:** ${formattedDate}\n`;
  }

  // Create a CardContent component. Its childrenProps is set with a Markdown component which
  // ensures that the details are elegantly formatted.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose a VerticalCard which includes the CardHeader and CardContent.
  // VerticalCard is used to ensure a responsive layout that works on both desktop and mobile.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
