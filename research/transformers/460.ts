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
  // Extract stats with sensible defaults if undefined
  const total = input.total_request_count ?? 0;
  const rateLimited = input.rate_limited_request_count ?? 0;

  // Calculate rate-limited percentage, guard against division by zero
  const rateLimitPercent = total > 0 ? (rateLimited / total) * 100 : 0;
  const rateLimitPercentFormatted = rateLimitPercent.toFixed(1);

  // Build a DataListItem for each statistic
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Using Text component for the label for better styling & responsiveness
      label: [
        {
          type: "Text",
          content: ["Total Requests"],
          variant: "body1",
        },
      ],
      // Visualize the raw count as a filled Chip
      value: {
        type: "Chip",
        label: total.toString(),
        color: "primary",
        variant: "filled",
        size: "medium",
      },
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: ["Rate-Limited Requests"],
          variant: "body1",
        },
      ],
      value: {
        type: "Chip",
        label: rateLimited.toString(),
        color: "error",
        variant: "filled",
        size: "medium",
      },
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: ["Rate Limit Percentage"],
          variant: "body1",
        },
      ],
      value: {
        type: "Chip",
        label: `${rateLimitPercentFormatted}%`,
        color: "warning",
        variant: "filled",
        size: "medium",
      },
    },
  ];

  // Wrap the items in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Header with an engaging icon and a summary description
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "API Usage Summary",
    description: `${rateLimitPercentFormatted}% of requests were rate limited`,
    startElement: {
      type: "Icon",
      id: "chart-pie",    // FontAwesome-style icon
      color: "blue",
      size: 28,
    },
  };

  // Content area holding our DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Return a vertical card combining header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}
