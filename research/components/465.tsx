import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
  const stats = Array.isArray(value) ? value : [];

  const totalRequestsSum = stats.reduce(
    (sum, item) => sum + (item.total_request_count ?? 0),
    0
  );
  const rateLimitedSum = stats.reduce(
    (sum, item) => sum + (item.rate_limited_request_count ?? 0),
    0
  );
  const rateLimitedPct =
    totalRequestsSum > 0 ? (rateLimitedSum / totalRequestsSum) * 100 : 0;

  const sortedStats = [...stats].sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return ta - tb;
  });

  const formatDate = (iso?: string): string => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatNumber = (num: number): string => num.toLocaleString();

  const formatPercent = (num: number): string => `${num.toFixed(2)}%`;

  // 2. Handle empty state
  if (stats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle
          size={48}
          className="text-gray-400"
          aria-hidden="true"
        />
        <span className="mt-4 text-lg">No data available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.Server
            size={20}
            className="text-blue-500"
            aria-hidden="true"
          />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Total Requests</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatNumber(totalRequestsSum)}
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.AlertTriangle
            size={20}
            className="text-red-500"
            aria-hidden="true"
          />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Rate Limited</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatNumber(rateLimitedSum)}
            </div>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.Percent
            size={20}
            className="text-green-500"
            aria-hidden="true"
          />
          <div className="ml-3">
            <div className="text-sm text-gray-500">Rate Limit %</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatPercent(rateLimitedPct)}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Rate Limited</th>
              <th className="px-4 py-2">% Rate Limit</th>
            </tr>
          </thead>
          <tbody>
            {sortedStats.map((item, idx) => {
              const total = item.total_request_count ?? 0;
              const limited = item.rate_limited_request_count ?? 0;
              const pct = total > 0 ? (limited / total) * 100 : 0;
              return (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="px-4 py-2">{formatNumber(total)}</td>
                  <td className="px-4 py-2">{formatNumber(limited)}</td>
                  <td className="px-4 py-2">{formatPercent(pct)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
