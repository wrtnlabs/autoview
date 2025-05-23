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
  const totalRequests = value.reduce(
    (sum, entry) => sum + (entry.total_request_count ?? 0),
    0,
  );
  const totalRateLimited = value.reduce(
    (sum, entry) => sum + (entry.rate_limited_request_count ?? 0),
    0,
  );
  const rateLimitedPercent =
    totalRequests > 0
      ? Math.round((totalRateLimited / totalRequests) * 10000) / 100
      : 0;

  const formatDate = (timestamp?: string): string => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Return early if there's no data
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={32} className="mb-2" />
        <span className="text-sm">No usage data available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h2 className="flex items-center text-lg font-semibold text-gray-800">
          <LucideReact.Clock className="mr-2 text-gray-500" size={20} />
          Time Stats Overview
        </h2>
        <span className="mt-2 sm:mt-0 text-sm text-gray-500">
          {value.length} entries
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.Server className="mr-3 text-blue-500" size={20} />
          <div>
            <p className="text-xs text-gray-500">Total Requests</p>
            <p className="text-lg font-medium text-gray-800">
              {totalRequests.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.AlertCircle className="mr-3 text-red-500" size={20} />
          <div>
            <p className="text-xs text-gray-500">Rate-Limited Requests</p>
            <p className="text-lg font-medium text-gray-800">
              {totalRateLimited.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.PieChart className="mr-3 text-green-500" size={20} />
          <div>
            <p className="text-xs text-gray-500">Rate Limited %</p>
            <p className="text-lg font-medium text-gray-800">
              {rateLimitedPercent}%
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Timestamp
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Requests
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Rate-Limited
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                % Rate-Limited
              </th>
            </tr>
          </thead>
          <tbody>
            {value.map((entry, idx) => {
              const req = entry.total_request_count ?? 0;
              const rl = entry.rate_limited_request_count ?? 0;
              const pct =
                req > 0 ? Math.round((rl / req) * 10000) / 100 + "%" : "-";
              return (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {formatDate(entry.timestamp)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-right">
                    {req.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-right">
                    {rl.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 text-right">
                    {pct}
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
