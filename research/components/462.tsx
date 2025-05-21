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
  const totalRequests = value.total_request_count ?? 0;
  const rateLimitedRequests = value.rate_limited_request_count ?? 0;
  const rateLimitPercent = totalRequests > 0 ? (rateLimitedRequests / totalRequests) * 100 : 0;
  const formattedTotal = new Intl.NumberFormat('en-US').format(totalRequests);
  const formattedRateLimited = new Intl.NumberFormat('en-US').format(rateLimitedRequests);
  const formattedPercent = rateLimitPercent.toFixed(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const content = (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Summary Stats</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Total Requests</p>
          <p className="mt-1 text-xl font-medium text-gray-900">{formattedTotal}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Rate Limited</p>
          <p className="mt-1 text-xl font-medium text-gray-900">{formattedRateLimited}</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-500">Rate Limit %</span>
          <span className="text-sm font-medium text-gray-900">{formattedPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${rateLimitPercent}%` }}
          />
        </div>
      </div>
    </div>
  );

  // 3. Return the React element.
  return content;
}
