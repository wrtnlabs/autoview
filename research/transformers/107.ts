import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4EventsView = {
                events?: legacy.v4.LegacyV4Event[];
                prev?: string;
                next?: string;
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
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4EventsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create a Card Header with an icon to immediately convey that this is an events dashboard.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Events Dashboard",
    description: "Visual overview of the latest events from the legacy system.",
    // Using an Icon as a visual indicator for the dashboard
    startElement: {
      type: "Icon",
      id: "calendar", // assuming "calendar" is a valid kebab-case icon name
      color: "blue",
      size: 24
    }
  };

  // Determine if there are events to display
  const events = input.events || [];

  // Create a DataList to hold the events.
  // Each event is represented by a DataListItem with its details visualized using both icons and markdown components.
  let dataListChildren: IAutoView.IAutoViewDataListItemProps[] = [];

  if (events.length > 0) {
    dataListChildren = events.map(event => {
      // Create an icon for the event item. This helps users quickly recognize an event.
      const eventIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "event", // using a generic event icon name
        color: "teal",
        size: 16
      };

      // Use Markdown to render the event name with emphasis.
      const eventNameMarkdown: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: `**${event.name}**`
      };

      // If a createdAt timestamp exists, format it nicely into a date string.
      // We display this as supplemental information using a Markdown component.
      let eventDetails: IAutoView.IAutoViewMarkdownProps | undefined = undefined;
      if (event.createdAt) {
        const createdDate = new Date(event.createdAt).toLocaleString();
        eventDetails = {
          type: "Markdown",
          content: `Created at: ${createdDate}`
        };
      }

      return {
        type: "DataListItem",
        // The label is composed of an event icon and the event name (rendered in markdown) to enhance visual appeal.
        label: [
          eventIcon,
          eventNameMarkdown
        ],
        // The value contains extra details. If no details are available, it may be left undefined.
        value: eventDetails
      };
    });
  } else {
    // In absence of events, provide a fallback message using Markdown.
    dataListChildren = [
      {
        type: "DataListItem",
        label: {
          type: "Markdown",
          content: "No events available at the moment."
        }
      }
    ];
  }

  // Compose the main DataList component that encapsulates all event items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListChildren
  };

  // Optionally, create a navigation footer if the input provides "prev" or "next" links.
  let navigationFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  const navButtons: IAutoView.IAutoViewButtonProps[] = [];

  if (input.prev) {
    navButtons.push({
      type: "Button",
      label: "Previous",
      href: input.prev,
      variant: "outlined",
      color: "primary",
      size: "small"
    });
  }
  if (input.next) {
    navButtons.push({
      type: "Button",
      label: "Next",
      href: input.next,
      variant: "outlined",
      color: "primary",
      size: "small"
    });
  }
  if (navButtons.length > 0) {
    navigationFooter = {
      type: "CardFooter",
      childrenProps: navButtons
    };
  }

  // Compose the Card Content component where we integrate the DataList component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Wrap the DataList into the childrenProps of the CardContent for a unified layout.
    childrenProps: dataList
  };

  // Finally, compose the Vertical Card component,
  // which aggregates the header, content, and optionally the footer (navigation buttons).
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // The childrenProps must be arranged in the order they will appear in the UI.
    childrenProps: navigationFooter
      ? [cardHeader, cardContent, navigationFooter]
      : [cardHeader, cardContent]
  };

  // Return the composed value which conforms to IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
