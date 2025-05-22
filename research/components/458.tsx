import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.api_insights_route_stats;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRequests = value.reduce(
    (sum, item) => sum + (item.total_request_count ?? 0),
    0,
  );
  const totalRateLimited = value.reduce(
    (sum, item) => sum + (item.rate_limited_request_count ?? 0),
    0,
  );
  const overallRateLimitedPct =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  const formatNumber = (num: number) =>
    new Intl.NumberFormat(undefined, {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);

  const formatDateTime = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg">
      {/* Summary */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <div className="text-gray-500 text-sm">Total Requests</div>
          <div className="text-xl font-semibold text-gray-800">
            {formatNumber(totalRequests)}
          </div>
        </div>
        <div className="mt-4 sm:mt-0 text-center sm:text-left">
          <div className="text-gray-500 text-sm">Rate Limited</div>
          <div className="text-xl font-semibold text-gray-800">
            {formatNumber(totalRateLimited)}{" "}
            <span className="text-sm text-gray-500">
              ({overallRateLimitedPct.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Route Cards */}
      <div className="space-y-4">
        {value.map((item, idx) => {
          const method = item.http_method?.toUpperCase() ?? "–";
          const route = item.api_route ?? "Unknown Route";
          const total = item.total_request_count ?? 0;
          const limited = item.rate_limited_request_count ?? 0;
          const pct = total > 0 ? (limited / total) * 100 : 0;

          return (
            <div
              key={`${method}-${route}-${idx}`}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:justify-between"
            >
              <div className="flex items-center space-x-2 truncate">
                <span className="px-2 py-0.5 text-xs font-semibold uppercase text-blue-800 bg-blue-100 rounded">
                  {method}
                </span>
                <span className="text-gray-800 font-medium truncate">
                  {route}
                </span>
              </div>
              <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <div className="text-gray-500">Requests</div>
                  <div className="text-gray-800 font-semibold">
                    {formatNumber(total)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Rate Limited</div>
                  <div className="text-gray-800 font-semibold">
                    {formatNumber(limited)}{" "}
                    <span className="text-xs text-gray-500">
                      ({pct.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Last Request</div>
                  <div className="text-gray-800">
                    {formatDateTime(item.last_request_timestamp)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Last Rate Limit</div>
                  <div className="text-gray-800">
                    {formatDateTime(item.last_rate_limited_timestamp)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
