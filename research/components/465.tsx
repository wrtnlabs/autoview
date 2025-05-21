import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * API Insights usage time stats for an organization
     *
     * @title Time Stats
    */
    export type api_insights_time_stats = {
        timestamp?: string;
        total_request_count?: number & tags.Type<"int32">;
        rate_limited_request_count?: number & tags.Type<"int32">;
    }[];
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_time_stats;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Filter out entries without a valid timestamp and sort by newest first
  const entries = value
    .filter((e) => e.timestamp)
    .map((e) => ({
      timestamp: e.timestamp!,
      total: e.total_request_count ?? 0,
      rateLimited: e.rate_limited_request_count ?? 0,
    }))
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

  // Summary calculations
  const totalRequests = entries.reduce((sum, e) => sum + e.total, 0);
  const totalRateLimited = entries.reduce((sum, e) => sum + e.rateLimited, 0);
  const count = entries.length;
  const avgRequests = count > 0 ? totalRequests / count : 0;
  const errorRate = totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  // Recent entries (up to 5)
  const recentEntries = entries.slice(0, 5);

  // Number formatter
  const nf = new Intl.NumberFormat();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (count === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center text-gray-500">
        No usage data available.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        API Insights Usage
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Total Requests</p>
          <p className="text-2xl font-medium text-gray-900">
            {nf.format(totalRequests)}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Rate-Limited</p>
          <p className="text-2xl font-medium text-gray-900">
            {nf.format(totalRateLimited)}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Avg per Interval</p>
          <p className="text-2xl font-medium text-gray-900">
            {avgRequests.toFixed(1)}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Error Rate</p>
          <p className="text-2xl font-medium text-gray-900">
            {errorRate.toFixed(1)}%
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-2">
          Recent Stats
        </h3>
        <div className="flex justify-between text-xs font-medium text-gray-500 uppercase mb-1">
          <span>Date</span>
          <span>Total</span>
          <span>Rate-Ltd</span>
        </div>
        <ul>
          {recentEntries.map((entry, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center text-sm text-gray-600 py-2 border-b last:border-b-0"
            >
              <span className="truncate">
                {new Date(entry.timestamp).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span className="mx-2">{nf.format(entry.total)}</span>
              <span className="text-red-500">{nf.format(entry.rateLimited)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
