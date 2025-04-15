import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type EventsView = {
    prev?: string;
    next?: string;
    events?: Event[];
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
type IAutoViewTransformerInputType = EventsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no events available, show a Markdown component informing the user.
  if (!input.events || input.events.length === 0) {
    return {
      type: "Markdown",
      content: "## No events available\n\nThere are currently no events to display. Please check back later."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Initialize an array to collect list children components.
  const listChildren: (IAutoView.IAutoViewListSubheaderProps | IAutoView.IAutoViewListItemProps)[] = [];

  // Add a subheader at the top of the list to title the event list.
  listChildren.push({
    type: "ListSubheader",
    stickToTop: true,
    // Use a Text component (allowed as a presentation component) to render the header with markdown-like emphasis
    childrenProps: {
      type: "Text",
      content: "Event List",
      variant: "subtitle1",
      color: "primary"
    } as IAutoView.IAutoViewTextProps
  });

  // Iterate over each event and transform it into a ListItem.
  input.events.forEach((event) => {
    // Compose a description string from available event details.
    // We prefer minimal text, so we include the event's id if present.
    const descriptionText = event.id ? `ID: ${event.id}` : undefined;

    // Each event list item includes an icon (e.g., a calendar) to create a more engaging UI.
    // Note: The icon id should be in kebab-case without any prefix.
    const listItem: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: event.name,
      description: descriptionText,
      startElement: {
        type: "Icon",
        id: "calendar", // using "calendar" as a generic icon representing event scheduling
        color: "blue",
        size: 16
      }
    };

    listChildren.push(listItem);
  });

  // If navigation URLs (prev/next) are provided, add an extra list item with navigation buttons.
  if (input.prev || input.next) {
    const navButtons: IAutoView.IAutoViewButtonProps[] = [];

    if (input.prev) {
      navButtons.push({
        type: "Button",
        label: "Prev",
        variant: "outlined",
        color: "primary",
        href: input.prev // Utilizing the provided URI for navigating to previous events
      });
    }

    if (input.next) {
      navButtons.push({
        type: "Button",
        label: "Next",
        variant: "outlined",
        color: "primary",
        href: input.next // Utilizing the provided URI for navigating to next events
      });
    }

    // Create a list item for navigation. The endElement can accept a single component or an array.
    listChildren.push({
      type: "ListItem",
      title: "Navigation",
      endElement: navButtons.length === 1 ? navButtons[0] : navButtons
    });
  }

  // Finally, return the constructed List component with all children.
  return {
    type: "List",
    childrenProps: listChildren
  } as IAutoView.IAutoViewListProps;
}
