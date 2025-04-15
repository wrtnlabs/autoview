import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4EventView = {
                event?: legacy.v4.LegacyV4Event;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4Event = {
            userId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name: string;
            property?: {
                [key: string]: {};
            };
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64"
            }>;
            expireAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
        };
    }
}
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4EventView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if the event data is provided. If not, render a Markdown component indicating missing data.
  if (!input.event) {
    const noData: IAutoView.IAutoViewMarkdownProps = {
      content:
        "## No Event Data\n\nThe input did not include any event information. Please verify your data source.",
      type: "Markdown",
    };
    return noData;
  }

  const event = input.event;

  // Create a CardHeader component emphasizing the event's name.
  // We use an icon as the start element for a more engaging UI.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    title: event.name,
    // Use event.id if available; otherwise show "N/A"
    description: `Event ID: ${event.id ?? "N/A"}`,
    startElement: {
      id: "calendar", // Using a calendar icon to represent an event
      color: "blue",  // Color choice for visual appeal; can be modified as needed
      size: 24,       // A size value that renders well on both desktop and mobile views
      type: "Icon",
    },
    type: "CardHeader",
  };

  // Compose a Markdown content string that displays additional event details.
  // Markdown is used here to enhance the presentation and allow for formatting.
  let markdownContent = "### Event Details\n\n";
  markdownContent += `- **User ID:** ${event.userId ?? "N/A"}\n`;
  markdownContent += `- **Channel ID:** ${event.channelId ?? "N/A"}\n`;
  // If createdAt is provided, convert from timestamp to a readable local date string.
  if (event.createdAt) {
    markdownContent += `- **Created At:** ${new Date(event.createdAt).toLocaleString()}\n`;
  }
  // If expireAt is provided, convert from timestamp to a readable local date string.
  if (event.expireAt) {
    markdownContent += `- **Expire At:** ${new Date(event.expireAt).toLocaleString()}\n`;
  }
  // Include version information if available.
  if (event.version) {
    markdownContent += `- **Version:** ${event.version}\n`;
  }
  // If there are any additional properties, list them in a separate markdown section.
  if (event.property) {
    markdownContent += "\n#### Additional Properties\n";
    for (const key in event.property) {
      if (Object.prototype.hasOwnProperty.call(event.property, key)) {
        // Serialize each property value as JSON to ensure a clear display.
        markdownContent += `- **${key}:** ${JSON.stringify(event.property[key])}\n`;
      }
    }
  }

  // Create a CardContent component that utilizes a Markdown component for rich text rendering.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    // Here, we use a Markdown component to render our markdownContent.
    // This ensures that even when text is used, it is formatted and engaging.
    childrenProps: {
      content: markdownContent,
      type: "Markdown",
    },
    type: "CardContent",
  };

  // Combine the header and content components into a VerticalCard for responsive design.
  // Vertical cards are generally more adaptable on mobile screens.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    childrenProps: [cardHeader, cardContent],
    type: "VerticalCard",
  };

  // Return the fully composed component properties. This is the transformed UI data.
  return verticalCard;
}
