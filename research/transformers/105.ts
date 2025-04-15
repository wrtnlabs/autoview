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
  // Extract the chatTag from the input.
  const { chatTag } = input;

  // If no chatTag is provided, return a simple markdown component to indicate missing data.
  if (!chatTag) {
    return {
      type: "Markdown",
      content: "### No Chat Tag Found\n\nPlease check your input data."
    };
  }

  // Build a markdown string to display additional chat tag details.
  // Using markdown formatting to make the content engaging.
  const channelId = chatTag.channelId ?? "N/A";
  const key = chatTag.key;
  const followerCount = chatTag.followerIds ? chatTag.followerIds.length : 0;
  const createdAt = chatTag.createdAt ? new Date(chatTag.createdAt).toLocaleString() : "N/A";

  const markdownContent = [
    `- **Channel ID**: ${channelId}`,
    `- **Key**: ${key}`,
    `- **Follower Count**: ${followerCount}`,
    `- **Created At**: ${createdAt}`
  ].join("\n");

  // Compose a CardHeader component for a visual presentation.
  // We use an icon as the startElement to represent a chat tag visually.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: chatTag.name,           // Display the chat tag name as the title.
    description: chatTag.description,  // Optionally display the description.
    // The startElement expects types: Avatar, Icon, Chip, Badge, IconButton, or Text.
    // Here, we use an Icon for a visually appealing header.
    startElement: {
      type: "Icon",
      id: "tag",                   // Assuming "tag" is a valid icon id in kebab-case.
      color: "blue",               // Choose a color that contrasts well on most backgrounds.
      size: 32                     // A moderate size for visual emphasis.
    }
  };

  // Compose a CardContent component that leverages a Markdown component
  // to render the details in a formatted and responsive manner.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The childrenProps here contains a Markdown component to display additional info.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Optionally, a CardFooter could be added to include actions (e.g., a button), but
  // this example focuses on a header and content for visualization.

  // Compose the main VerticalCard component, aggregating the header and content.
  // VerticalCard.childrenProps accepts an array of card components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the composed component props that the UI renderer will use.
  return verticalCard;
}
