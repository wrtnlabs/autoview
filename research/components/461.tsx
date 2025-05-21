import { tags } from "typia";
import React from "react";
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
  const rateLimitedPct = total > 0 ? (rateLimited / total) * 100 : 0;

  const numberFormatter = new Intl.NumberFormat(undefined);

  const formattedTotal = numberFormatter.format(total);
  const formattedRateLimited = numberFormatter.format(rateLimited);
  const formattedPct = rateLimitedPct.toFixed(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        API Insights Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-600">
            {formattedTotal}
          </span>
          <span className="text-sm text-gray-500">Total Requests</span>
        </div>
        <div className="flex flex-col items-center w-full">
          <span className="text-2xl font-bold text-red-600">
            {formattedRateLimited}
          </span>
          <div className="flex items-baseline space-x-1">
            <span className="text-sm text-gray-500">Rate Limited</span>
            <span className="text-sm font-medium text-red-600">
              ({formattedPct}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
            <div
              className="bg-red-500 h-2"
              style={{ width: `${rateLimitedPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
