import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.api_insights_summary_stats;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRequests = value.total_request_count ?? 0;
  const rateLimitedRequests = value.rate_limited_request_count ?? 0;
  const rateLimitPercentage =
    totalRequests > 0 ? (rateLimitedRequests / totalRequests) * 100 : 0;

  const formattedTotal = totalRequests.toLocaleString();
  const formattedRateLimited = rateLimitedRequests.toLocaleString();
  const formattedPercentage =
    totalRequests > 0 ? `${rateLimitPercentage.toFixed(1)}%` : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        API Insights Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.Activity
            className="text-blue-500"
            size={24}
            aria-hidden="true"
          />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-xl font-medium text-gray-800">
              {formattedTotal}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.AlertTriangle
            className="text-amber-500"
            size={24}
            aria-hidden="true"
          />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Rate Limited</p>
            <p className="text-xl font-medium text-gray-800">
              {formattedRateLimited}{" "}
              <span className="text-sm text-gray-500">
                ({formattedPercentage})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
