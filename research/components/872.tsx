import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type secret_scanning_scan_history = {
    incremental_scans?: AutoViewInputSubTypes.secret_scanning_scan[];
    pattern_update_scans?: AutoViewInputSubTypes.secret_scanning_scan[];
    backfill_scans?: AutoViewInputSubTypes.secret_scanning_scan[];
    custom_pattern_backfill_scans?: {
      /**
       * The type of scan
       */
      type?: string;
      /**
       * The state of the scan. Either "completed", "running", or "pending"
       */
      status?: string;
      /**
       * The time that the scan was completed. Empty if the scan is running
       */
      completed_at?: (string & tags.Format<"date-time">) | null;
      /**
       * The time that the scan was started. Empty if the scan is pending
       */
      started_at?: (string & tags.Format<"date-time">) | null;
      /**
       * Name of the custom pattern for custom pattern scans
       */
      pattern_name?: string;
      /**
       * Level at which the custom pattern is defined, one of "repository", "organization", or "enterprise"
       */
      pattern_scope?: string;
    }[];
  };
  /**
   * Information on a single scan performed by secret scanning on the repository
   */
  export type secret_scanning_scan = {
    /**
     * The type of scan
     */
    type?: string;
    /**
     * The state of the scan. Either "completed", "running", or "pending"
     */
    status?: string;
    /**
     * The time that the scan was completed. Empty if the scan is running
     */
    completed_at?: (string & tags.Format<"date-time">) | null;
    /**
     * The time that the scan was started. Empty if the scan is pending
     */
    started_at?: (string & tags.Format<"date-time">) | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_scan_history;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sections = [
    { label: "Incremental Scans", scans: value.incremental_scans ?? [] },
    { label: "Pattern Update Scans", scans: value.pattern_update_scans ?? [] },
    { label: "Backfill Scans", scans: value.backfill_scans ?? [] },
  ];

  const customScans = value.custom_pattern_backfill_scans ?? [];

  const formatDate = (iso: string | null | undefined): string => {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStatusIcon = (status?: string) => {
    switch (status) {
      case "completed":
        return (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={16}
            aria-label="Completed"
          />
        );
      case "running":
        return (
          <LucideReact.Loader
            className="animate-spin text-blue-500"
            size={16}
            aria-label="Running"
          />
        );
      case "pending":
        return (
          <LucideReact.Clock
            className="text-amber-500"
            size={16}
            aria-label="Pending"
          />
        );
      default:
        return (
          <LucideReact.HelpCircle
            className="text-gray-400"
            size={16}
            aria-label="Unknown status"
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Secret Scanning History
      </h2>
      <div className="space-y-6">
        {sections.map(({ label, scans }) => {
          const total = scans.length;
          const completed = scans.filter(
            (s) => s.status === "completed",
          ).length;
          const running = scans.filter((s) => s.status === "running").length;
          const pending = scans.filter((s) => s.status === "pending").length;
          // find most recent completed_at
          const lastCompletedDates = scans
            .map((s) => s.completed_at)
            .filter((d): d is string => typeof d === "string")
            .map((d) => new Date(d))
            .sort((a, b) => b.getTime() - a.getTime());
          const lastCompleted = lastCompletedDates[0]
            ? new Date(lastCompletedDates[0]).toISOString()
            : null;

          return (
            <div
              key={label}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-md"
            >
              <div className="text-gray-700 font-medium mb-2 sm:mb-0">
                {label}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  {renderStatusIcon("completed")}
                  <span>{completed}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStatusIcon("running")}
                  <span>{running}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {renderStatusIcon("pending")}
                  <span>{pending}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar className="text-gray-400" size={16} />
                  <span className="whitespace-nowrap">
                    Last: {formatDate(lastCompleted)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Users className="text-gray-400" size={16} />
                  <span>{total} total</span>
                </div>
              </div>
            </div>
          );
        })}

        {customScans.length > 0 && (
          <div>
            <div className="text-gray-700 font-medium mb-2">
              Custom Pattern Backfill Scans
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-700">
              <div className="font-semibold">Pattern</div>
              <div className="font-semibold">Scope</div>
              <div className="font-semibold">Status</div>
              <div className="font-semibold">Timestamp</div>
            </div>
            <div className="divide-y divide-gray-200">
              {customScans.slice(0, 3).map((scan, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-2 py-2 items-center text-sm"
                >
                  <span className="truncate">{scan.pattern_name || "—"}</span>
                  <span className="truncate">{scan.pattern_scope || "—"}</span>
                  <div className="flex items-center">
                    {renderStatusIcon(scan.status)}
                    <span className="ml-1 capitalize">
                      {scan.status || "unknown"}
                    </span>
                  </div>
                  <span>
                    {scan.completed_at || scan.started_at
                      ? formatDate(scan.completed_at || scan.started_at)
                      : "—"}
                  </span>
                </div>
              ))}
              {customScans.length > 3 && (
                <div className="p-2 text-center text-sm text-gray-500">
                  +{customScans.length - 3} more...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
