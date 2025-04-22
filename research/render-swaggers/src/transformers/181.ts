import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4EventView = {
                    event?: Schema.legacy.v4.LegacyV4Event;
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4EventView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const event = input.event;
  // If there is no event data, show a simple text message
  if (!event) {
    return {
      type: "Text",
      content: "No event data available",
      variant: "body1",
      color: "gray",
    };
  }

  // Build a header icon: use an avatar with initials if userId exists; otherwise, a generic user icon
  let startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
  if (event.userId) {
    // Derive an "initials" string from the first 2 characters of the userId
    const initials = event.userId.slice(0, 2).toUpperCase();
    startElement = {
      type: "Avatar",
      name: initials,
    };
  } else {
    startElement = {
      type: "Icon",
      id: "user",
      color: "gray",
      size: 24,
    };
  }

  // Prepare the list of data items to visualize
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Helper to push simple text items
  const pushTextItem = (
    labelText: string,
    valueText: string | number | undefined
  ) => {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: labelText,
        variant: "subtitle2",
        color: "primary",
      },
      value: {
        type: "Text",
        content: valueText != null ? String(valueText) : "N/A",
        variant: "body2",
      },
    });
  };

  // ID, Channel, and Version as simple text
  pushTextItem("ID", event.id);
  pushTextItem("Channel", event.channelId);
  pushTextItem("Version", event.version);

  // Dates: decorate with calendar icons and format with locale string
  const pushDateItem = (
    labelText: string,
    timestamp?: number,
    iconId: string = "calendar"
  ) => {
    const display = timestamp ? new Date(timestamp).toLocaleString() : "N/A";
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: labelText,
        variant: "subtitle2",
        color: "primary",
      },
      // Combining an icon and text in the value slot
      value: [
        {
          type: "Icon",
          id: iconId,
          color: "gray",
          size: 16,
        },
        {
          type: "Text",
          content: display,
          variant: "body2",
          color: "gray",
        },
      ],
    });
  };

  pushDateItem("Created At", event.createdAt, "calendar");
  pushDateItem("Expire At", event.expireAt, "calendar-alt");

  // Properties: render the keys as a markdown list for better readability
  const propKeys = event.property ? Object.keys(event.property) : [];
  const propContent =
    propKeys.length > 0
      ? propKeys.map((k) => `- **${k}**`).join("\n")
      : "_No properties_";
  items.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Properties",
      variant: "subtitle2",
      color: "primary",
    },
    value: {
      type: "Markdown",
      content: propContent,
    },
  });

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Card header with the event name and the avatar/icon
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: event.name,
    startElement,
  };

  // Card content including the data list
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Passing the DataList as the sole child of the card content
    childrenProps: dataList,
  };

  // Wrap everything in a vertical card for a clean, responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
