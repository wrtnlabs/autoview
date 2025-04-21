import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export namespace marketing {
            export type OneTimeMsgUserView = {
                oneTimeMsgUser?: Schema.marketing.OneTimeMsgUser;
            };
        }
    }
    export namespace marketing {
        export type OneTimeMsgUser = {
            oneTimeMsgId?: string;
            userId?: string;
            sent?: number;
            view?: number;
            goal?: number;
            click?: number;
            version?: number & tags.Type<"int32">;
            id?: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.open.marketing.OneTimeMsgUserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const userView = input.oneTimeMsgUser;
  // If there's no data, show a simple text prompt
  if (!userView) {
    return {
      type: "Text",
      content: "No message metrics available",
    };
  }

  // Destructure with sensible defaults
  const {
    oneTimeMsgId,
    userId,
    sent = 0,
    view = 0,
    click = 0,
    goal = 0,
  } = userView;

  // Build an array of chips, one for each metric
  const metricChips: IAutoView.IAutoViewChipProps[] = [
    {
      type: "Chip",
      label: `Sent: ${sent}`,
      startElement: {
        type: "Icon",
        id: "envelope",
        color: "blue",
        size: 20,
      },
      variant: "filled",
    },
    {
      type: "Chip",
      label: `Views: ${view}`,
      startElement: {
        type: "Icon",
        id: "eye",
        color: "teal",
        size: 20,
      },
      variant: "filled",
    },
    {
      type: "Chip",
      label: `Clicks: ${click}`,
      startElement: {
        type: "Icon",
        id: "mouse-pointer",
        color: "green",
        size: 20,
      },
      variant: "filled",
    },
  ];

  // Only show goal if it's a positive number
  if (goal > 0) {
    metricChips.push({
      type: "Chip",
      label: `Goal: ${goal}`,
      startElement: {
        type: "Icon",
        id: "bullseye",
        color: "red",
        size: 20,
      },
      variant: "filled",
    });
  }

  // Compute progress toward the goal
  const progressPercent = goal > 0 ? Math.round((view / goal) * 100) : 0;
  const progressText =
    goal > 0
      ? `**Progress:** ${progressPercent}% of goal reached`
      : "";

  // Compose the card UI
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header with message and user identification
      {
        type: "CardHeader",
        title: oneTimeMsgId
          ? `Message ID: ${oneTimeMsgId}`
          : "Message Metrics",
        description: userId ? `User: ${userId}` : undefined,
      },
      // Main content: a group of chips and an optional progress note
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "ChipGroup",
            childrenProps: metricChips,
          },
          // Use Markdown for bold formatting if progress text is present
          progressText
            ? {
                type: "Markdown",
                content: progressText,
              }
            : null,
        ].filter(Boolean) as IAutoView.IAutoViewPresentationComponentProps[],
      },
    ],
  };
}
