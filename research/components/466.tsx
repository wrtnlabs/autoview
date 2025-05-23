import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stats = Array.isArray(value) ? value : [];
  const totalRequests: number = stats.reduce(
    (sum, item) => sum + (item.total_request_count ?? 0),
    0,
  );
  const totalRateLimited: number = stats.reduce(
    (sum, item) => sum + (item.rate_limited_request_count ?? 0),
    0,
  );
  const rateLimitedPercent: number =
    totalRequests > 0 ? (totalRateLimited / totalRequests) * 100 : 0;

  const formatDate = (dateStr?: string | null): string =>
    dateStr ? new Date(dateStr).toLocaleString() : 'N/A';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Aggregated Summary */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex items-center">
          <LucideReact.Database className="text-gray-500" size={20} />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Total Requests</div>
            <div className="text-lg font-semibold text-gray-900">
              {totalRequests}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.AlertTriangle className="text-gray-500" size={20} />
          <div className="ml-2">
            <div className="text-sm text-gray-500">
              Rate-Limited Requests
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {totalRateLimited}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.PieChart className="text-indigo-500" size={20} />
          <div className="ml-2">
            <div className="text-sm text-gray-500">Rate Limited %</div>
            <div className="text-lg font-semibold text-gray-900">
              {rateLimitedPercent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Individual Actor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, idx) => (
          <div
            key={item.actor_id ?? idx}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center mb-2">
              <LucideReact.User className="text-gray-500" size={16} />
              <span className="ml-2 text-base font-medium text-gray-800">
                {item.actor_name || 'Unknown Actor'}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <LucideReact.Tag className="text-gray-500" size={16} />
              <span className="ml-2 text-sm text-gray-600">
                {item.actor_type || 'N/A'}
              </span>
            </div>
            <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Total Requests:</dt>
                <dd>{item.total_request_count ?? 0}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Rate-Limited:</dt>
                <dd>{item.rate_limited_request_count ?? 0}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center">
                  <LucideReact.Calendar className="text-gray-400" size={14} />
                  <span className="ml-1">Last Request</span>
                </dt>
                <dd>{formatDate(item.last_request_timestamp)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex items-center">
                  <LucideReact.AlertTriangle
                    className="text-gray-400"
                    size={14}
                  />
                  <span className="ml-1">Last Rate-Limited</span>
                </dt>
                <dd>{formatDate(item.last_rate_limited_timestamp)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
