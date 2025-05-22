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
  const total = value.total_request_count ?? 0;
  const rateLimited = value.rate_limited_request_count ?? 0;
  const ratioPercent = total > 0 ? Math.round((rateLimited / total) * 100) : 0;
  const formattedTotal = new Intl.NumberFormat().format(total);
  const formattedRateLimited = new Intl.NumberFormat().format(rateLimited);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        API Insights Summary
      </h2>

      <div className="flex items-center mb-3">
        <LucideReact.Activity
          className="text-gray-500 mr-2"
          size={20}
          aria-hidden="true"
        />
        <span className="text-gray-700 font-medium">Total Requests:</span>
        <span className="ml-auto text-gray-900">{formattedTotal}</span>
      </div>

      <div className="flex items-center mb-4">
        <LucideReact.AlertTriangle
          className="text-red-500 mr-2"
          size={20}
          aria-hidden="true"
        />
        <span className="text-gray-700 font-medium">Rate Limited:</span>
        <span className="ml-auto text-gray-900">{formattedRateLimited}</span>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-700 font-medium">Limit Ratio</span>
          <span className="text-gray-900 font-semibold">{ratioPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-red-500 h-2"
            style={{ width: `${ratioPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
