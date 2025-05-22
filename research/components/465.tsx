import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Parse and sort the incoming time stats
  const stats = Array.isArray(value) ? value : [];
  if (stats.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <span className="mt-2 text-sm">No data available</span>
      </div>
    );
  }

  type StatItem = { timestamp: Date; total: number; rateLimited: number };
  const parsedStats: StatItem[] = stats
    .map((item) => ({
      timestamp: item.timestamp ? new Date(item.timestamp) : new Date(0),
      total: item.total_request_count ?? 0,
      rateLimited: item.rate_limited_request_count ?? 0,
    }))
    .filter((s) => s.timestamp.getTime() > 0);

  parsedStats.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // 2. Aggregate overall metrics
  const totalRequests = parsedStats.reduce((sum, s) => sum + s.total, 0);
  const totalRateLimited = parsedStats.reduce(
    (sum, s) => sum + s.rateLimited,
    0,
  );
  const rateLimitPercent =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  // 3. Date formatting helper
  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 4. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with summary */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <LucideReact.Activity
            className="mr-2 text-blue-500"
            size={20}
            aria-hidden="true"
          />
          API Insights Time Stats
        </h2>
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0 text-gray-600 text-sm">
          <div className="flex items-center">
            <LucideReact.Server
              className="mr-1 text-gray-500"
              size={16}
              aria-hidden="true"
            />
            <span>
              Total:{" "}
              <span className="font-medium">
                {totalRequests.toLocaleString()}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.AlertOctagon
              className="mr-1 text-red-500"
              size={16}
              aria-hidden="true"
            />
            <span>
              Rate Limited:{" "}
              <span className="font-medium">
                {totalRateLimited.toLocaleString()}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            <LucideReact.Percent
              className="mr-1 text-gray-500"
              size={16}
              aria-hidden="true"
            />
            <span>
              % Rate Limited:{" "}
              <span className="font-medium">
                {rateLimitPercent.toFixed(2)}%
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Detailed table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Rate Limited
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                %
              </th>
            </tr>
          </thead>
          <tbody>
            {parsedStats.map((s, idx) => {
              const pct = s.total > 0 ? (s.rateLimited / s.total) * 100 : 0;
              const rowBg = idx % 2 === 0 ? "bg-white" : "bg-gray-50";
              return (
                <tr key={idx} className={rowBg}>
                  <td className="px-3 py-2 text-sm text-gray-700">
                    {formatDate(s.timestamp)}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-700 text-right">
                    {s.total.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-700 text-right">
                    {s.rateLimited.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-700 text-right">
                    {pct.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
