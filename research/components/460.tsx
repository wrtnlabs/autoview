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
  const total = typeof value.total_request_count === "number" ? value.total_request_count : null;
  const rateLimited =
    typeof value.rate_limited_request_count === "number" ? value.rate_limited_request_count : null;

  // Formatter for numeric display
  const numberFormatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });

  // Derived percentage of rate‐limited requests
  const rateLimitPercent =
    total && rateLimited != null && total > 0
      ? Math.min((rateLimited / total) * 100, 100)
      : null;

  // Display strings with fallbacks
  const totalDisplay = total != null ? numberFormatter.format(total) : "—";
  const rateLimitedDisplay = rateLimited != null ? numberFormatter.format(rateLimited) : "—";
  const percentDisplay =
    rateLimitPercent != null ? `${Math.round(rateLimitPercent)}%` : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-5 py-4">
        <h2 className="text-gray-800 text-lg font-semibold mb-4">API Usage Summary</h2>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div>
            <dt className="text-sm text-gray-500">Total Requests</dt>
            <dd className="mt-1 text-xl font-bold text-gray-900 truncate">{totalDisplay}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Rate-Limited</dt>
            <dd className="mt-1 text-xl font-bold text-gray-900 truncate">{rateLimitedDisplay}</dd>
          </div>
        </dl>
        <div>
          <dt className="text-sm text-gray-500 mb-1">Rate-Limit %</dt>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: rateLimitPercent != null ? `${rateLimitPercent}%` : "0%" }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 mt-1 block">
            {percentDisplay}
          </span>
        </div>
      </div>
    </div>
  );
}
