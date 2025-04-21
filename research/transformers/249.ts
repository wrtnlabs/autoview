import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type CallLog = {
        channelId?: string;
        missedReason?: string;
        direction?: string;
        state?: string;
        from?: string;
        to?: string;
        createdAt?: number;
        updatedAt?: number;
        engagedAt?: number;
        closedAt?: number;
        userChatId?: string;
        managerIds?: string[];
    };
}
type IAutoViewTransformerInputType = Schema.CallLog[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms call logs into an interactive, responsive list view.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no call logs, display a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No call logs available**",
    };
  }

  // Map each call log to a ListItem with icons and chips for visual clarity.
  const items: IAutoView.IAutoViewListItemProps[] = input.map((call) => {
    const {
      direction,
      state,
      from,
      to,
      createdAt,
      engagedAt,
      closedAt,
    } = call;

    // 1) Select an arrow icon for inbound/outbound calls.
    const directionIconId: string =
      direction === "outbound" ? "arrow-up" : "arrow-down";

    // 2) Color the icon red if missed, green otherwise.
    const directionIconColor: IAutoView.IAutoViewIconProps["color"] =
      state === "missed" ? "red" : "green";

    // 3) Format the creation timestamp for display.
    const timeLabel: string = createdAt
      ? new Date(createdAt).toLocaleString()
      : "";

    // 4) Compute call duration if engagedAt and closedAt are valid.
    let durationChip: IAutoView.IAutoViewChipProps | undefined;
    if (
      typeof engagedAt === "number" &&
      typeof closedAt === "number" &&
      closedAt >= engagedAt
    ) {
      const totalSec = Math.floor((closedAt - engagedAt) / 1000);
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;
      const durationStr = `${minutes}m ${seconds}s`;

      durationChip = {
        type: "Chip",
        label: durationStr,
        size: "small",
        variant: "outlined",
        color: "info",
      };
    }

    // 5) Create a chip indicating call state (e.g., missed, answered).
    const stateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: state ?? "unknown",
      size: "small",
      variant: "outlined",
      color: state === "missed" ? "error" : "success",
    };

    // 6) Combine state and duration chips in the endElement area.
    const endChips = durationChip
      ? [stateChip, durationChip]
      : [stateChip];

    // 7) Assemble the ListItemProps object.
    return {
      type: "ListItem",
      title: `${from ?? "Unknown"} → ${to ?? "Unknown"}`,
      description: timeLabel,
      startElement: {
        type: "Icon",
        id: directionIconId,
        color: directionIconColor,
        size: 24,
      },
      endElement: endChips,
    };
  });

  // Wrap all items in a responsive List component.
  return {
    type: "List",
    childrenProps: items,
  };
}
