import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4EventsView = {
                    events?: Schema.legacy.v4.LegacyV4Event[];
                    prev?: string;
                    next?: string;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Event = {
                userId?: string;
                id?: string;
                channelId?: string;
                name: string;
                property?: {
                    [key: string]: {};
                };
                createdAt?: number;
                expireAt?: number;
                version?: number & tags.Type<"int32">;
            };
        }
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4EventsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Ensure we have a list to work with
  const events = input.events ?? [];

  // If there are no events, render a simple markdown message
  if (events.length === 0) {
    return {
      type: "Markdown",
      content: "### No events to display\n\nThere are currently no events in the data source.",
    };
  }

  // Helper to format a timestamp into a human-readable string
  const formatDate = (ts?: number): string =>
    ts != null ? new Date(ts).toLocaleString() : "N/A";

  // Create a DataListItem for each event
  const items: IAutoView.IAutoViewDataListItemProps[] = events.map((event) => {
    // Build a markdown block with the event details
    const detailsLines: string[] = [
      `**ID:** ${event.id ?? "N/A"}`,
      `**User:** ${event.userId ?? "N/A"}`,
      event.channelId ? `**Channel:** ${event.channelId}` : "",
      `**Version:** ${event.version ?? "N/A"}`,
      `**Created At:** ${formatDate(event.createdAt)}`,
      `**Expired At:** ${formatDate(event.expireAt)}`,
    ].filter(Boolean);

    return {
      type: "DataListItem",
      // Use Text component for the primary label
      label: [
        {
          type: "Text",
          variant: "subtitle1",
          content: [event.name],
        },
      ],
      // Use Markdown for the details, which supports lists and bold text
      value: {
        type: "Markdown",
        content: detailsLines.join("\n\n"),
      },
    };
  });

  // Wrap the list of items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Card header with an icon and summary
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Events (${events.length})`,
    description: `${events.length} event${events.length > 1 ? "s" : ""} fetched.`,
    startElement: {
      type: "Icon",
      id: "calendar",    // Assumes `calendar` icon is available
      size: 24,
      color: "blue",
    },
  };

  // Card content wrapping the data list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Optionally render navigation buttons in the footer
  const navButtons: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (input.prev) {
    navButtons.push({
      type: "Button",
      label: ["Previous"],
      href: input.prev,
      variant: "text",
      size: "small",
    });
  }
  if (input.next) {
    navButtons.push({
      type: "Button",
      label: ["Next"],
      href: input.next,
      variant: "text",
      size: "small",
    });
  }

  // Assemble the card children
  const cardChildren: (
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  )[] = [header, content];

  if (navButtons.length > 0) {
    cardChildren.push({
      type: "CardFooter",
      childrenProps: navButtons,
    });
  }

  // Return a vertical card component that encapsulates everything
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
