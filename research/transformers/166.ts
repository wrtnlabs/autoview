import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type EventView = {
    event?: Event;
};
type Event = {
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
        format: "int64",
        readOnly: true
    }>;
    expireAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    managed?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    nameI18nMap?: {
        [key: string]: string;
    };
};
type IAutoViewTransformerInputType = EventView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the event from the input data
  const event = input.event;

  // If no event is provided, compose a simple UI indicating absence of data.
  if (!event) {
    return {
      type: "VerticalCard",
      childrenProps: [
        {
          type: "CardHeader",
          title: "No Event",
          description: "No event data available.",
          // Use an alert icon to alert the user that no data is present.
          startElement: {
            type: "Icon",
            id: "exclamation-triangle", // assuming a standard icon name exists in the library
            size: 16
          }
        },
        {
          type: "CardContent",
          childrenProps: {
            type: "Markdown",
            content: "### Sorry\n\nEvent data could not be found. Please try again later."
          }
        }
      ]
    };
  }

  // Prepare the header using the event name and channel information.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: event.name,
    // If channelId is provided, add it to the description.
    description: event.channelId ? `Channel: ${event.channelId}` : undefined,
    // Use a calendar icon to represent the event visually.
    startElement: {
      type: "Icon",
      id: "calendar", // icon name in kebab-case without a prefix
      size: 16
    }
  };

  // Create a detailed JSON representation of the event data to show advanced details.
  // This data is rendered within a markdown code block for better readability.
  const eventDetails = {
    userId: event.userId,
    id: event.id,
    channelId: event.channelId,
    createdAt: event.createdAt,
    expireAt: event.expireAt,
    managed: event.managed,
    version: event.version,
    nameI18nMap: event.nameI18nMap,
    property: event.property
  };
  const markdownContent = `## Event Details

\`\`\`json
${JSON.stringify(eventDetails, null, 2)}
\`\`\`
`;

  // Compose the content section using a Markdown component for a rich text display.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose a footer that includes a button for extra actions or more information.
  // Note: The button's startElement uses an icon to visually enhance the UI.
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        label: "More Info",
        variant: "contained",
        startElement: {
          type: "Icon",
          id: "info",
          size: 16
        }
        // Additional properties like href can be added here if available
      }
    ]
  };

  // Aggregate all the components into a responsive vertical card.
  // VerticalCard is chosen to stack the header, content, and footer in a mobile-friendly manner.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };

  // Return the final composed view that can be rendered by the client.
  return verticalCard;
}
