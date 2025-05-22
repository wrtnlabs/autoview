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
  // 1. Data transformation and aggregation
  const totalRequests = value.reduce(
    (sum, e) => sum + (e.total_request_count ?? 0),
    0,
  );
  const totalRateLimited = value.reduce(
    (sum, e) => sum + (e.rate_limited_request_count ?? 0),
    0,
  );
  const rateLimitedPercent =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;
  const numberFormatter = new Intl.NumberFormat();

  // Prepare entries with valid timestamps, calculate per-entry rate limit percentage
  const entries = value
    .filter((e) => e.timestamp)
    .map((e) => {
      const date = new Date(e.timestamp!);
      const total = e.total_request_count ?? 0;
      const rateLimited = e.rate_limited_request_count ?? 0;
      const percent = total > 0 ? (rateLimited / total) * 100 : 0;
      return { date, total, percent };
    })
    .filter((e) => !isNaN(e.date.getTime()))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const recent = entries.slice(0, 5);

  // 2. Handle empty data state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No data available</span>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="flex-1 bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
          <LucideReact.Server className="text-indigo-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-xl font-semibold text-gray-900">
              {numberFormatter.format(totalRequests)}
            </p>
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
          <LucideReact.AlertTriangle className="text-red-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Rate-Limited</p>
            <p className="text-xl font-semibold text-gray-900">
              {numberFormatter.format(totalRateLimited)}
            </p>
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-4 rounded-lg flex items-center space-x-3">
          <LucideReact.Percent className="text-green-500" size={24} />
          <div>
            <p className="text-sm text-gray-500">Rate-Limit %</p>
            <p className="text-xl font-semibold text-gray-900">
              {rateLimitedPercent.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Recent Entries List */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Recent Stats</h3>
        {recent.length === 0 ? (
          <div className="text-gray-400 text-sm">
            No recent timestamped data
          </div>
        ) : (
          <div className="divide-y divide-gray-200 overflow-y-auto max-h-48">
            {recent.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-1">
                  <LucideReact.Clock className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">
                    {item.date.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-800">
                    {numberFormatter.format(item.total)}
                  </span>
                  <span className="text-sm text-gray-800">
                    {item.percent.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
