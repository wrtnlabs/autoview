import LucideReact from "lucide-react";
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
  // 1. Data aggregation/transformation
  const totalRequests = value.total_request_count ?? 0;
  const rateLimitedRequests = value.rate_limited_request_count ?? 0;
  const hasData =
    value.total_request_count !== undefined ||
    value.rate_limited_request_count !== undefined;

  const rateLimitedPercent =
    totalRequests > 0 ? (rateLimitedRequests / totalRequests) * 100 : 0;
  const rateLimitedDisplay = `${rateLimitedPercent.toFixed(1)}%`;

  // 2. Compose visual structure
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={32} />
        <span className="mt-2 text-sm">No usage data available</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <LucideReact.BarChart2 size={20} className="text-gray-700" />
        <span>API Insights Summary</span>
      </h2>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.Server size={16} className="text-indigo-500" />
          <span className="text-gray-600">Total Requests</span>
        </div>
        <span className="font-medium text-gray-800">
          {totalRequests.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.AlertTriangle size={16} className="text-red-500" />
          <span className="text-gray-600">Rate Limited</span>
        </div>
        <span className="font-medium text-gray-800">
          {rateLimitedRequests.toLocaleString()}
        </span>
      </div>

      {totalRequests > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Rate Limited %</span>
            <span className="font-medium text-gray-800">
              {rateLimitedDisplay}
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={Math.round(rateLimitedPercent)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-red-500"
              style={{ width: `${rateLimitedPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
