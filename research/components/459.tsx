import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedStats = React.useMemo(() => {
    return [...value].sort(
      (a, b) =>
        (b.total_request_count ?? 0) - (a.total_request_count ?? 0),
    );
  }, [value]);

  const formatDate = (iso?: string | null): string => {
    if (!iso) return "–";
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const calculateRateLimitPercent = (
    total?: number,
    limited?: number,
  ): number => {
    if (!total || !limited) return 0;
    return Math.min(100, (limited / total) * 100);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (sortedStats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span>No usage data available.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedStats.map((stat, idx) => {
        const {
          subject_name,
          subject_type,
          subject_id,
          total_request_count,
          rate_limited_request_count,
          last_request_timestamp,
          last_rate_limited_timestamp,
        } = stat;

        const total = total_request_count ?? 0;
        const limited = rate_limited_request_count ?? 0;
        const ratePct = calculateRateLimitPercent(total, limited);

        const title =
          subject_name?.trim() ||
          (subject_type?.trim()
            ? `${subject_type} #${subject_id}`
            : `Subject #${subject_id ?? idx + 1}`);

        return (
          <div
            key={subject_id ?? idx}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col justify-between"
            aria-label={`${title}: ${total.toLocaleString()} total requests, ${limited.toLocaleString()} rate-limited (${ratePct.toFixed(
              1,
            )}%)`}
          >
            <div>
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {title}
              </h3>
              {subject_type && (
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {subject_type}
                </p>
              )}
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <LucideReact.Activity
                  size={16}
                  className="text-gray-500"
                />
                <span>
                  {total.toLocaleString()} total requests
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.AlertTriangle
                  size={16}
                  className="text-amber-500"
                />
                <span>
                  {limited.toLocaleString()} rate-limited (
                  {ratePct.toFixed(1)}%)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar
                  size={16}
                  className="text-gray-400"
                />
                <span>
                  Last request: {formatDate(last_request_timestamp)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar
                  size={16}
                  className="text-amber-400"
                />
                <span>
                  Last rate limit:{" "}
                  {formatDate(last_rate_limited_timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
