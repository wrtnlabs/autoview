import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * API Insights usage stats for a user
   *
   * @title User Stats
   */
  export type api_insights_user_stats = {
    actor_type?: string;
    actor_name?: string;
    actor_id?: number & tags.Type<"int32">;
    integration_id?: (number & tags.Type<"int32">) | null;
    oauth_application_id?: (number & tags.Type<"int32">) | null;
    total_request_count?: number & tags.Type<"int32">;
    rate_limited_request_count?: number & tags.Type<"int32">;
    last_rate_limited_timestamp?: string | null;
    last_request_timestamp?: string;
  }[];
}
export type AutoViewInput = AutoViewInputSubTypes.api_insights_user_stats;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle empty data state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No API usage data available.</p>
      </div>
    );
  }

  // 1. Aggregate overall metrics
  const totalRequests = value.reduce(
    (sum, v) => sum + (v.total_request_count ?? 0),
    0,
  );
  const totalRateLimited = value.reduce(
    (sum, v) => sum + (v.rate_limited_request_count ?? 0),
    0,
  );
  const rateLimitedPercent =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  // Determine the most recent request timestamp
  const lastRequestTimes = value
    .map((v) => v.last_request_timestamp)
    .filter(Boolean)
    .map((ts) => new Date(ts as string).getTime());
  const latestRequestTimestamp =
    lastRequestTimes.length > 0 ? Math.max(...lastRequestTimes) : null;
  const formattedLastRequest = latestRequestTimestamp
    ? new Date(latestRequestTimestamp).toLocaleString()
    : "N/A";

  // 2. Prepare per-actor breakdown
  const actors = value.map((v) => {
    const total = v.total_request_count ?? 0;
    const limited = v.rate_limited_request_count ?? 0;
    const successPct = total > 0 ? ((total - limited) / total) * 100 : 0;
    const label = v.actor_name
      ? v.actor_name
      : v.actor_type
        ? `${v.actor_type} #${v.actor_id}`
        : `Actor ${v.actor_id}`;
    const lastReq = v.last_request_timestamp
      ? new Date(v.last_request_timestamp).toLocaleString()
      : "N/A";
    return { label, total, limited, successPct, lastReq };
  });

  // 3. Compose the visual structure
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
        <LucideReact.BarChart2 size={20} className="text-gray-700 mr-2" />
        API Usage Overview
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center">
          <LucideReact.Eye size={20} className="text-blue-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Total Requests</div>
            <div className="font-medium text-gray-800">
              {totalRequests.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.AlertTriangle size={20} className="text-red-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Rate Limited</div>
            <div className="font-medium text-gray-800">
              {totalRateLimited.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.Percent size={20} className="text-yellow-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Rate Limit %</div>
            <div className="font-medium text-gray-800">
              {rateLimitedPercent.toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={20} className="text-gray-500" />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Last Request</div>
            <div className="font-medium text-gray-800">
              {formattedLastRequest}
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Breakdown by Actor
      </h3>
      <div className="space-y-3">
        {actors.map((actor, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center mb-2 sm:mb-0">
              <LucideReact.User size={16} className="text-gray-500" />
              <span className="ml-2 font-medium text-gray-800">
                {actor.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <div className="flex items-center">
                <LucideReact.Eye size={16} className="text-blue-500" />
                <span className="ml-1">{actor.total.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.AlertTriangle size={16} className="text-red-500" />
                <span className="ml-1">{actor.limited.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Percent size={16} className="text-yellow-500" />
                <span className="ml-1">{actor.successPct.toFixed(1)}%</span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span className="ml-1">{actor.lastReq}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
