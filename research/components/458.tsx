import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * API Insights usage route stats for an actor
   *
   * @title Route Stats
   */
  export type api_insights_route_stats = {
    /**
     * The HTTP method
     */
    http_method?: string;
    /**
     * The API path's route template
     */
    api_route?: string;
    /**
     * The total number of requests within the queried time period
     */
    total_request_count?: number & tags.Type<"int32">;
    /**
     * The total number of requests that were rate limited within the queried time period
     */
    rate_limited_request_count?: number & tags.Type<"int32">;
    last_rate_limited_timestamp?: string | null;
    last_request_timestamp?: string;
  }[];
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_route_stats;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stats = Array.isArray(value) ? value : [];
  const formatNumber = (num?: number): string =>
    num != null ? num.toLocaleString() : "-";
  const formatDate = (iso?: string | null): string => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-x-auto">
      <div className="flex items-center mb-4">
        <LucideReact.List size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">API Route Stats</h2>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Method
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Route
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rate Limited
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Request
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Limited
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stats.map((stat, idx) => {
            const total = stat.total_request_count ?? 0;
            const limited = stat.rate_limited_request_count ?? 0;
            const percent =
              total > 0 ? ((limited / total) * 100).toFixed(1) + "%" : "0%";
            return (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm font-medium text-gray-700">
                  {(stat.http_method ?? "-").toUpperCase()}
                </td>
                <td className="px-3 py-2 text-sm text-blue-600 truncate max-w-xs">
                  {stat.api_route ?? "-"}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700 text-right">
                  {formatNumber(stat.total_request_count)}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <span>{formatNumber(stat.rate_limited_request_count)}</span>
                    <span className="text-xs text-gray-500">({percent})</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Calendar size={14} className="text-gray-400" />
                    <span>{formatDate(stat.last_request_timestamp)}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Calendar size={14} className="text-gray-400" />
                    <span>{formatDate(stat.last_rate_limited_timestamp)}</span>
                  </div>
                </td>
              </tr>
            );
          })}
          {stats.length === 0 && (
            <tr>
              <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                <LucideReact.AlertCircle size={24} className="mx-auto mb-2" />
                <span>No data available</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
