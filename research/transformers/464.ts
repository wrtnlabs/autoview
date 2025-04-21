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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format timestamps in a concise, locale-aware way
  const formatTimestamp = (ts?: string): string => {
    if (!ts) return "Unknown date";
    const date = new Date(ts);
    // Format like: "Jan 01, 2024, 13:45"
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter out entries without any numeric data and sort by timestamp ascending
  const sortedEntries = input
    .filter((entry) => entry.timestamp || entry.total_request_count || entry.rate_limited_request_count)
    .sort((a, b) => {
      const aTime = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const bTime = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return aTime - bTime;
    });

  // If there's no data, show a friendly markdown message
  if (sortedEntries.length === 0) {
    return {
      type: "Markdown",
      content: "#### No Data Available\nThere are no API time statistics to display.",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Build a DataListItem for each entry
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = sortedEntries.map((entry) => {
    const labelText = formatTimestamp(entry.timestamp);
    const total = entry.total_request_count ?? 0;
    const rateLimited = entry.rate_limited_request_count ?? 0;

    // Each item shows the date on the left and two chips on the right
    return {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          variant: "body2",
          content: labelText,
        },
      ],
      value: [
        {
          type: "ChipGroup",
          // Two chips: total requests (filled primary), rate-limited (outlined error)
          childrenProps: [
            {
              type: "Chip",
              label: `Total: ${total}`,
              color: "primary",
              variant: "filled",
              size: "small",
            },
            {
              type: "Chip",
              label: `Rate-limited: ${rateLimited}`,
              color: "error",
              variant: "outlined",
              size: "small",
            },
          ],
        },
      ],
    };
  });

  // Compose the final card UI
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with a chart icon
        type: "CardHeader",
        title: "API Request Statistics",
        startElement: {
          type: "Icon",
          id: "chart-bar",
          color: "blue",
          size: 24,
        },
      },
      {
        // Card content wrapping the DataList
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: dataListItems,
          },
        ],
      },
    ],
  } as IAutoView.IAutoViewVerticalCardProps;
}
