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
  // Filter out entries without timestamps
  const stats = value.filter((item) => item.timestamp);
  // Parse dates and sort ascending
  const sortedStats = [...stats].sort(
    (a, b) =>
      new Date(a.timestamp as string).getTime() -
      new Date(b.timestamp as string).getTime(),
  );
  // Take the last 5 entries for display
  const latestStats = sortedStats.slice(-5).reverse();

  // Compute overall totals
  const totalRequests = stats.reduce(
    (sum, item) => sum + (item.total_request_count ?? 0),
    0,
  );
  const totalRateLimited = stats.reduce(
    (sum, item) => sum + (item.rate_limited_request_count ?? 0),
    0,
  );
  const rateLimitedPct =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  // Formatters
  const nf = new Intl.NumberFormat();
  const pf = new Intl.NumberFormat(undefined, {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (stats.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-gray-700 text-center">
        <p className="text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
      <h2 className="text-xl font-semibold mb-4">API Insights: Time Stats</h2>

      {/* Summary */}
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <dt className="text-sm text-gray-500">Total Requests</dt>
          <dd className="text-lg font-medium">{nf.format(totalRequests)}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Rate-Limited</dt>
          <dd className="text-lg font-medium">
            {nf.format(totalRateLimited)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Rate-Limit %</dt>
          <dd className="text-lg font-medium">
            {pf.format(rateLimitedPct / 100)}
          </dd>
        </div>
      </dl>

      {/* Latest entries list */}
      <ul className="divide-y divide-gray-200">
        {latestStats.map((item, idx) => {
          const time = new Date(item.timestamp as string);
          const formattedTime = time.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          });
          return (
            <li
              key={idx}
              className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <span className="text-gray-600 text-sm sm:w-1/3">
                {formattedTime}
              </span>
              <span className="text-gray-800 text-sm sm:w-1/3">
                Requests:{" "}
                <span className="font-medium">
                  {nf.format(item.total_request_count ?? 0)}
                </span>
              </span>
              <span className="text-gray-800 text-sm sm:w-1/3">
                Rate-Limited:{" "}
                <span className="font-medium">
                  {nf.format(item.rate_limited_request_count ?? 0)}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
