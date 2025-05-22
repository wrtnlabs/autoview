import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * API Insights usage subject stats for an organization
   *
   * @title Subject Stats
   */
  export type api_insights_subject_stats = {
    subject_type?: string;
    subject_name?: string;
    subject_id?: number & tags.Type<"int32">;
    total_request_count?: number & tags.Type<"int32">;
    rate_limited_request_count?: number & tags.Type<"int32">;
    last_rate_limited_timestamp?: string | null;
    last_request_timestamp?: string;
  }[];
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_subject_stats;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const stats = value ?? [];

  // Show placeholder when no data
  if (stats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No API subject stats available</span>
      </div>
    );
  }

  // Aggregate totals
  const totalRequestsAll = stats.reduce(
    (sum, item) => sum + (item.total_request_count ?? 0),
    0,
  );
  const rateLimitedRequestsAll = stats.reduce(
    (sum, item) => sum + (item.rate_limited_request_count ?? 0),
    0,
  );
  const overallRateLimitPercent =
    totalRequestsAll > 0
      ? ((rateLimitedRequestsAll * 100) / totalRequestsAll).toFixed(1)
      : "0";

  // Date formatter
  function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2 text-gray-800">
          <LucideReact.Users size={20} className="text-indigo-500" />
          <span className="text-lg font-semibold">{stats.length} subjects</span>
        </div>
        <div className="flex items-center space-x-4 mt-3 sm:mt-0 text-gray-700">
          <div className="flex items-center space-x-1">
            <LucideReact.Activity size={16} />
            <span>Total: {totalRequestsAll.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.AlertTriangle size={16} className="text-red-500" />
            <span>
              Rate Limited: {rateLimitedRequestsAll.toLocaleString()} (
              {overallRateLimitPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Subject cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, idx) => {
          const total = item.total_request_count ?? 0;
          const limited = item.rate_limited_request_count ?? 0;
          const ratePercent =
            total > 0 ? ((limited * 100) / total).toFixed(1) : "0";
          const title =
            item.subject_name ?? `Subject ${item.subject_id ?? idx + 1}`;

          return (
            <div
              key={item.subject_id ?? idx}
              className="p-4 bg-white rounded-lg shadow"
            >
              <div className="flex items-center space-x-2 mb-2">
                <LucideReact.FileText size={20} className="text-indigo-500" />
                <h3 className="text-md font-semibold text-gray-800 truncate">
                  {title}
                </h3>
              </div>

              {item.subject_type && (
                <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded uppercase">
                  {item.subject_type}
                </span>
              )}

              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total Requests</span>
                  <span className="font-medium">{total.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Rate Limited</span>
                  <span className="font-medium">
                    {limited.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Rate Limit %</span>
                  <span className="font-medium">{ratePercent}%</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Calendar size={14} />
                    <span>Last Request</span>
                  </div>
                  <span className="font-medium">
                    {formatDate(item.last_request_timestamp)}
                  </span>
                </div>

                {item.last_rate_limited_timestamp && (
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <LucideReact.AlertTriangle
                        size={14}
                        className="text-red-500"
                      />
                      <span>Last Rate Limit</span>
                    </div>
                    <span className="font-medium">
                      {formatDate(item.last_rate_limited_timestamp)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
