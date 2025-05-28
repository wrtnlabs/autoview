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
  const totalRequests = value.total_request_count ?? 0;
  const rateLimitedRequests = value.rate_limited_request_count ?? 0;
  const rateLimitPercent =
    totalRequests > 0 ? (rateLimitedRequests / totalRequests) * 100 : 0;

  const formattedTotal = new Intl.NumberFormat().format(totalRequests);
  const formattedRateLimited = new Intl.NumberFormat().format(rateLimitedRequests);
  const formattedPercent = rateLimitPercent.toFixed(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Total Requests Card */}
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        <LucideReact.Activity className="text-blue-500" size={24} strokeWidth={1.5} />
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-500">Total Requests</div>
          <div className="text-2xl font-semibold text-gray-900">{formattedTotal}</div>
        </div>
      </div>

      {/* Rate Limited Requests Card */}
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        <LucideReact.AlertTriangle className="text-amber-500" size={24} strokeWidth={1.5} />
        <div className="ml-4 w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Rate Limited Requests
            </span>
            <span className="text-sm font-medium text-gray-500">
              {formattedPercent}%
            </span>
          </div>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">
              {formattedRateLimited}
            </span>
          </div>
          {/* Linear progress indicator */}
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500"
              style={{ width: `${rateLimitPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
