import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * API Insights usage route stats for an actor
     *
     * @title Route Stats
    */
    export type api_insights_route_stats = {
        /**
         * The HTTP method
        */
        http_method?: string;
        /**
         * The API path's route template
        */
        api_route?: string;
        /**
         * The total number of requests within the queried time period
        */
        total_request_count?: number & tags.Type<"int32">;
        /**
         * The total number of requests that were rate limited within the queried time period
        */
        rate_limited_request_count?: number & tags.Type<"int32">;
        last_rate_limited_timestamp?: string | null;
        last_request_timestamp?: string;
    }[];
}
type IAutoViewTransformerInputType = Schema.api_insights_route_stats;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No route statistics available.\nPlease try again later or adjust your query.",
    };
  }

  // Helper to map HTTP methods to a Chip color
  const methodColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    GET: "blue",
    POST: "green",
    PUT: "orange",
    PATCH: "teal",
    DELETE: "red",
    OPTIONS: "violet",
    HEAD: "gray",
  };

  // Transform each route stat into a DataListItem component
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((stat) => {
    const method = (stat.http_method ?? "").toUpperCase();
    const route = stat.api_route ?? "/";

    // 1. Chip showing the HTTP method
    const methodChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: method,
      color: methodColorMap[method] || "darkGray",
      size: "small",
      variant: "filled",
    };

    // 2. Text component showing the route path
    const routeText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "body2",
      color: "primary",
      content: route,
    };

    // 3. Chips for total requests and rate-limited requests
    const totalChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `Total: ${stat.total_request_count ?? 0}`,
      color: "info",
      size: "small",
      variant: "outlined",
    };

    const rateLimitedCount = stat.rate_limited_request_count ?? 0;
    const rateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `Rate-limited: ${rateLimitedCount}`,
      color: rateLimitedCount > 0 ? "error" : "success",
      size: "small",
      variant: "outlined",
    };

    // 4. Markdown for timestamps, using bold labels and line breaks
    const lastRequest = stat.last_request_timestamp ?? "N/A";
    const lastRateLimited = stat.last_rate_limited_timestamp ?? "N/A";
    const timestampsMd: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content:
        `**Last Request:** ${lastRequest}  \n` +
        `**Last Rate-Limited:** ${lastRateLimited}`,
    };

    return {
      type: "DataListItem",
      // Label area: method chip + route text
      label: [methodChip, routeText],
      // Value area: statistics chips and timestamps
      value: [totalChip, rateChip, timestampsMd],
    };
  });

  // Wrap all items in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
