import { tags } from "typia";
import React from "react";
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
  const dataList = Array.isArray(value) ? value : [];
  // Sort users by total request count descending
  const sortedData = [...dataList].sort(
    (a, b) => (b.total_request_count ?? 0) - (a.total_request_count ?? 0),
  );

  // Helper to format ISO timestamps
  const formatDate = (iso?: string | null): string => {
    if (!iso) return 'N/A';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {sortedData.map((item, idx) => {
        const name = item.actor_name || `User ${item.actor_id ?? 'Unknown'}`;
        const type = item.actor_type;
        const total = item.total_request_count ?? 0;
        const limited = item.rate_limited_request_count ?? 0;
        const percent = total > 0 ? Math.round((limited / total) * 100) : 0;
        const lastReq = formatDate(item.last_request_timestamp);
        const lastLimited = formatDate(item.last_rate_limited_timestamp);

        return (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between"
          >
            <header>
              <h3 className="text-lg font-semibold text-gray-900 truncate">{name}</h3>
              {type && (
                <p className="text-sm text-gray-500 truncate">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </p>
              )}
            </header>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-medium">Total Requests:</span>{' '}
                {total.toLocaleString()}
              </li>
              <li>
                <span className="font-medium">Rate-Limited:</span>{' '}
                {limited.toLocaleString()} ({percent}%)
              </li>
              <li>
                <span className="font-medium">Last Request:</span> {lastReq}
              </li>
              {item.last_rate_limited_timestamp && (
                <li>
                  <span className="font-medium">Last Rate-Limited:</span>{' '}
                  {lastLimited}
                </li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
