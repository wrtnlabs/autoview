import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * API Insights usage summary stats for an organization
     *
     * @title Summary Stats
    */
    export type api_insights_summary_stats = {
        /**
         * The total number of requests within the queried time period
        */
        total_request_count?: number & tags.Type<"int32">;
        /**
         * The total number of requests that were rate limited within the queried time period
        */
        rate_limited_request_count?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.api_insights_summary_stats;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Safely extract counts, defaulting to zero when undefined
  const totalCount = input.total_request_count ?? 0;
  const rateLimitedCount = input.rate_limited_request_count ?? 0;

  // Compute the percentage of rate‐limited requests if we have a nonzero total
  const rateLimitPercent =
    totalCount > 0
      ? Math.round((rateLimitedCount / totalCount) * 100)
      : undefined;

  // Build individual data list items
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Label for the metric
      label: [
        {
          type: "Text",
          variant: "subtitle2",
          content: "Total Requests",
        },
      ],
      // Badge with an icon to represent requests count
      value: {
        type: "Badge",
        count: totalCount,
        showZero: true,
        childrenProps: {
          type: "Icon",
          id: "sync",     // spinning arrows icon
          color: "blue",
          size: 16,
        },
      },
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          variant: "subtitle2",
          content: "Rate Limited",
        },
      ],
      // Use a red badge to call out rate‐limited requests
      value: {
        type: "Badge",
        count: rateLimitedCount,
        showZero: true,
        color: "error",
        childrenProps: {
          type: "Icon",
          id: "ban",      // "no entry" icon
          color: "red",
          size: 16,
        },
      },
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          variant: "subtitle2",
          content: "Rate Limit %",
        },
      ],
      // Display percentage as a colored chip, or "N/A" if undefined
      value:
        rateLimitPercent !== undefined ? {
          type: "Chip",
          label: `${rateLimitPercent}%`,
          size: "small",
          variant: "outlined",
          // Color code based on severity thresholds
          color:
            rateLimitPercent < 50 ? "success" :
            rateLimitPercent < 80 ? "warning" :
            "error",
        } : {
          type: "Text",
          variant: "body2",
          content: "N/A",
        },
    },
  ];

  // Compose a DataList to hold our metrics
  const metricsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Card header with title, description, and an illustrative icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "API Insights Summary",
    description: "Overview of total and rate‐limited requests",
    startElement: {
      type: "Icon",
      id: "chart-pie",  // pie chart icon
      color: "teal",
      size: 24,
    },
  };

  // Card content wraps our DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: metricsList,
  };

  // Final layout: a vertical card, responsive on all screen sizes
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
