import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * API Insights usage summary stats for an organization
     *
     * @title Summary Stats
    */
    export interface api_insights_summary_stats {
        /**
         * The total number of requests within the queried time period
        */
        total_request_count?: number & tags.Type<"int32">;
        /**
         * The total number of requests that were rate limited within the queried time period
        */
        rate_limited_request_count?: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_summary_stats;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.total_request_count ?? 0;
  const rateLimited = value.rate_limited_request_count ?? 0;
  const rateLimitedPct = total > 0 ? (rateLimited / total) * 100 : 0;

  const formattedTotal = new Intl.NumberFormat().format(total);
  const formattedRateLimited = new Intl.NumberFormat().format(rateLimited);
  const formattedPct = rateLimitedPct.toFixed(1);

  // Handle empty state
  if (value.total_request_count == null && value.rate_limited_request_count == null) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <div className="mt-2 text-sm">No data available</div>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
      {/* Total Requests */}
      <div className="flex-1 flex items-center">
        <LucideReact.BarChart2
          className="text-gray-500 mr-3"
          size={24}
          aria-hidden="true"
        />
        <div>
          <div className="text-sm text-gray-500">Total Requests</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {formattedTotal}
          </div>
        </div>
      </div>

      {/* Rate Limited Requests */}
      <div className="flex-1">
        <div className="flex items-center">
          <LucideReact.AlertTriangle
            className="text-red-500 mr-3"
            size={24}
            aria-hidden="true"
          />
          <div className="text-sm text-gray-500">Rate Limited</div>
        </div>
        <div className="mt-1 text-2xl font-semibold text-gray-900">
          {formattedRateLimited} <span className="text-base font-medium text-gray-600">({formattedPct}%)</span>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-red-500 h-2"
            style={{ width: `${rateLimitedPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
