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
  // 1. Derived constants for display and percentage calculation
  const total = value.total_request_count ?? 0;
  const rateLimited = value.rate_limited_request_count ?? 0;
  const rateLimitedPct = total > 0 ? (rateLimited / total) * 100 : 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center text-gray-900 font-semibold">
        <LucideReact.BarChart2 size={20} className="text-blue-600" />
        <span className="ml-2">API Insights Summary</span>
      </div>

      {/* Metrics */}
      <div className="mt-4 space-y-4">
        {/* Total Requests */}
        <div className="flex items-center">
          <LucideReact.Server size={18} className="text-gray-500" />
          <div className="ml-3">
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-lg font-medium text-gray-800">
              {total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Rate Limited Requests */}
        <div className="flex items-start">
          <LucideReact.AlertTriangle size={18} className="text-red-500 mt-1" />
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-500">Rate Limited</p>
            <p className="text-lg font-medium text-red-600">
              {rateLimited.toLocaleString()}
            </p>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="bg-red-500 h-2"
                style={{ width: `${rateLimitedPct}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {rateLimitedPct.toFixed(1)}% of all requests
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
