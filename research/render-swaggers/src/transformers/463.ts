import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * API Insights usage time stats for an organization
     *
     * @title Time Stats
    */
    export type api_insights_time_stats = {
        timestamp?: string;
        total_request_count?: number & tags.Type<"int32">;
        rate_limited_request_count?: number & tags.Type<"int32">;
    }[];
}
type IAutoViewTransformerInputType = Schema.api_insights_time_stats;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms API time stats into a responsive, swipeable carousel of cards.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show an informative markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No request data available to display."
    };
  }

  // Sort entries by timestamp ascending to present chronological order.
  const sorted = [...input].sort((a, b) => {
    const ta = new Date(a.timestamp ?? "").getTime();
    const tb = new Date(b.timestamp ?? "").getTime();
    return ta - tb;
  });

  // Map each time‐stat entry into a VerticalCard component.
  const cards: IAutoView.IAutoViewVerticalCardProps[] = sorted.map((item) => {
    const total = item.total_request_count ?? 0;
    const rateLimited = item.rate_limited_request_count ?? 0;
    // Safely compute rate limit percentage.
    const percent = total > 0 ? Math.round((rateLimited / total) * 100) : 0;

    // Format timestamp for display; fall back on placeholder if invalid.
    const date = new Date(item.timestamp ?? "");
    const formattedDate = isNaN(date.getTime())
      ? "Unknown date"
      : date.toLocaleString();

    // Choose a chip color based on severity of rate‐limiting.
    let percentColor: IAutoView.IAutoViewChipProps["color"] = "success";
    if (percent > 50) {
      percentColor = "error";
    } else if (percent > 20) {
      percentColor = "warning";
    }

    return {
      type: "VerticalCard",
      childrenProps: [
        // CardHeader with a clock icon and the formatted timestamp.
        {
          type: "CardHeader",
          title: formattedDate,
          startElement: {
            type: "Icon",
            id: "clock", // FontAwesome clock icon
            size: 20,
            color: "cyan"
          }
        },
        // CardContent showing total, rate-limited, and percentage as chips.
        {
          type: "CardContent",
          childrenProps: [
            {
              type: "Chip",
              label: `Total: ${total}`,
              color: "primary",
              size: "small"
            },
            {
              type: "Chip",
              label: `Rate‑Limited: ${rateLimited}`,
              color: "error",
              size: "small"
            },
            {
              type: "Chip",
              label: `Rate Limit: ${percent}%`,
              color: percentColor,
              size: "small"
            }
          ]
        }
      ]
    };
  });

  // Wrap all cards in a Carousel for horizontal swiping (mobile‐friendly).
  return {
    type: "Carousel",
    indicators: true,
    navControls: true,
    childrenProps: cards
  };
}
