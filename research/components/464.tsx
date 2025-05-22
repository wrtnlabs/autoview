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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformation
  const data = Array.isArray(value) ? value : [];
  const totalRequests = data.reduce(
    (sum, item) => sum + (item.total_request_count ?? 0),
    0,
  );
  const totalRateLimited = data.reduce(
    (sum, item) => sum + (item.rate_limited_request_count ?? 0),
    0,
  );
  const rateLimitPercentage =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;
  const averageRequests = data.length > 0 ? totalRequests / data.length : 0;
  // Sort by timestamp ascending and pick last 5 entries
  const recentEntries = [...data]
    .filter((item) => item.timestamp)
    .sort(
      (a, b) =>
        new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime(),
    )
    .slice(-5);

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.BarChart
          size={20}
          className="mr-2 text-indigo-500"
          aria-hidden="true"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          API Usage Time Stats
        </h2>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <LucideReact.Server
            size={24}
            className="text-blue-500 mr-3"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-xl font-medium text-gray-800">
              {totalRequests.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <LucideReact.AlertTriangle
            size={24}
            className="text-red-500 mr-3"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm text-gray-500">Rate-Limited</p>
            <p className="text-xl font-medium text-gray-800">
              {totalRateLimited.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <LucideReact.PieChart
            size={24}
            className="text-purple-500 mr-3"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm text-gray-500">Limit Rate</p>
            <p className="text-xl font-medium text-gray-800">
              {rateLimitPercentage.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <LucideReact.TrendingUp
            size={24}
            className="text-green-500 mr-3"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm text-gray-500">Avg. per Entry</p>
            <p className="text-xl font-medium text-gray-800">
              {averageRequests.toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      {recentEntries.length > 0 ? (
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-2">
            Recent Stats
          </h3>
          <ul className="divide-y divide-gray-200">
            {recentEntries.map((item, idx) => {
              const date = item.timestamp
                ? new Date(item.timestamp).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })
                : "—";
              const total = item.total_request_count ?? 0;
              const limited = item.rate_limited_request_count ?? 0;
              const percent =
                total > 0 ? ((limited / total) * 100).toFixed(1) : "0.0";
              return (
                <li
                  key={idx}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center space-x-2">
                    <LucideReact.Calendar
                      size={16}
                      className="text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-gray-600 truncate">
                      {date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">
                      {total.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      (
                      <span className="font-medium text-gray-700">
                        {limited}
                      </span>
                      , {percent}%)
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <p className="text-sm">No data available</p>
        </div>
      )}
    </div>
  );
}
