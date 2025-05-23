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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Normalize input array
  const dataArray = Array.isArray(value) ? value : [];

  // Empty state
  if (dataArray.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={24} strokeWidth={1.5} />
        <span className="mt-2 text-sm">No data available</span>
      </div>
    );
  }

  // Derive clean data points
  const points = dataArray.map((item) => {
    const total = item.total_request_count ?? 0;
    const rateLimited = item.rate_limited_request_count ?? 0;
    const dateObj = item.timestamp ? new Date(item.timestamp) : null;
    const label = dateObj
      ? dateObj.toLocaleDateString("default", { month: "short", day: "numeric" })
      : "";
    return { total, rateLimited, label };
  });

  // Aggregate metrics
  const totalRequests = points.reduce((sum, p) => sum + p.total, 0);
  const totalRateLimited = points.reduce((sum, p) => sum + p.rateLimited, 0);
  const rateLimitPerc = totalRequests
    ? Math.round((totalRateLimited / totalRequests) * 100)
    : 0;
  const maxTotal = Math.max(...points.map((p) => p.total), 0) || 1;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">API Usage Overview</h2>
        <div className="flex flex-wrap gap-4 mt-2 sm:mt-0 text-sm text-gray-600">
          <div className="flex items-center">
            <LucideReact.BarChart2 className="text-blue-500" size={16} strokeWidth={2} />
            <span className="ml-1">Total: {totalRequests.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.AlertTriangle className="text-red-500" size={16} strokeWidth={2} />
            <span className="ml-1">
              Rate-Limited: {totalRateLimited.toLocaleString()} ({rateLimitPerc}%)
            </span>
          </div>
        </div>
      </div>

      {/* Sparkline bar chart */}
      <div className="relative w-full h-32">
        <div className="flex items-end h-full space-x-1">
          {points.map((p, idx) => {
            const successHeight = ((p.total - p.rateLimited) / maxTotal) * 100;
            const rateHeight = (p.rateLimited / maxTotal) * 100;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col justify-end"
                aria-label={`${p.label}: ${p.total.toLocaleString()} total, ${p.rateLimited.toLocaleString()} rate-limited`}
              >
                <div
                  className="bg-blue-500"
                  style={{ height: `${successHeight}%` }}
                />
                <div
                  className="bg-red-500"
                  style={{ height: `${rateHeight}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {points.map((p, idx) => (
          <span key={idx} className="truncate">
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}
