import { tags } from "typia";
import React from "react";
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
  const incremental = value.incremental_scans ?? [];
  const patternUpdates = value.pattern_update_scans ?? [];
  const backfills = value.backfill_scans ?? [];
  const custom = value.custom_pattern_backfill_scans ?? [];

  const formatDateTime = (dateStr?: string | null): string => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const summarize = (
    scans: Array<{ started_at?: string | null; completed_at?: string | null }>
  ) => {
    let lastStarted: string | null = null;
    let lastCompleted: string | null = null;
    scans.forEach((s) => {
      if (s.started_at) {
        if (!lastStarted || new Date(s.started_at) > new Date(lastStarted)) {
          lastStarted = s.started_at;
        }
      }
      if (s.completed_at) {
        if (!lastCompleted || new Date(s.completed_at) > new Date(lastCompleted)) {
          lastCompleted = s.completed_at;
        }
      }
    });
    return { count: scans.length, lastStarted, lastCompleted };
  };

  const incSummary = summarize(incremental);
  const updSummary = summarize(patternUpdates);
  const backSummary = summarize(backfills);

  const statusCounts: Record<string, number> = { completed: 0, running: 0, pending: 0 };
  let customLastStarted: string | null = null;
  let customLastCompleted: string | null = null;
  custom.forEach((s) => {
    const st = s.status ?? "pending";
    if (statusCounts[st] !== undefined) statusCounts[st]++;
    if (s.started_at && (!customLastStarted || new Date(s.started_at) > new Date(customLastStarted))) {
      customLastStarted = s.started_at;
    }
    if (
      s.completed_at &&
      (!customLastCompleted || new Date(s.completed_at) > new Date(customLastCompleted))
    ) {
      customLastCompleted = s.completed_at;
    }
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Secret Scanning History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Incremental Scans */}
        <div className="p-4 bg-white rounded-lg shadow flex flex-col space-y-2">
          <h3 className="text-lg font-medium text-gray-700">Incremental Scans</h3>
          <p className="text-sm text-gray-600">Total: {incSummary.count}</p>
          <p className="text-sm text-gray-600">
            Last Started: {formatDateTime(incSummary.lastStarted)}
          </p>
          <p className="text-sm text-gray-600">
            Last Completed: {formatDateTime(incSummary.lastCompleted)}
          </p>
        </div>

        {/* Pattern Update Scans */}
        <div className="p-4 bg-white rounded-lg shadow flex flex-col space-y-2">
          <h3 className="text-lg font-medium text-gray-700">Pattern Update Scans</h3>
          <p className="text-sm text-gray-600">Total: {updSummary.count}</p>
          <p className="text-sm text-gray-600">
            Last Started: {formatDateTime(updSummary.lastStarted)}
          </p>
          <p className="text-sm text-gray-600">
            Last Completed: {formatDateTime(updSummary.lastCompleted)}
          </p>
        </div>

        {/* Backfill Scans */}
        <div className="p-4 bg-white rounded-lg shadow flex flex-col space-y-2">
          <h3 className="text-lg font-medium text-gray-700">Backfill Scans</h3>
          <p className="text-sm text-gray-600">Total: {backSummary.count}</p>
          <p className="text-sm text-gray-600">
            Last Started: {formatDateTime(backSummary.lastStarted)}
          </p>
          <p className="text-sm text-gray-600">
            Last Completed: {formatDateTime(backSummary.lastCompleted)}
          </p>
        </div>

        {/* Custom Pattern Backfill */}
        <div className="p-4 bg-white rounded-lg shadow flex flex-col space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Custom Pattern Backfill</h3>
          <p className="text-sm text-gray-600">Total: {custom.length}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
              {statusCounts.completed} Completed
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
              {statusCounts.running} Running
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
              {statusCounts.pending} Pending
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Last Started: {formatDateTime(customLastStarted)}
          </p>
          <p className="text-sm text-gray-600">
            Last Completed: {formatDateTime(customLastCompleted)}
          </p>
        </div>
      </div>
    </div>
  );
}
