import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface secret_scanning_scan_history {
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
    }
    /**
     * Information on a single scan performed by secret scanning on the repository
    */
    export interface secret_scanning_scan {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.secret_scanning_scan_history;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation and transformation
  const incremental = value.incremental_scans ?? [];
  const patternUpdates = value.pattern_update_scans ?? [];
  const backfills = value.backfill_scans ?? [];
  const customBackfills = value.custom_pattern_backfill_scans ?? [];

  type Counts = { pending: number; running: number; completed: number; other: number };
  const countByStatus = (scans: Array<{ status?: string }>): Counts =>
    scans.reduce<Counts>(
      (acc, scan) => {
        switch (scan.status) {
          case 'pending':
            acc.pending++;
            break;
          case 'running':
            acc.running++;
            break;
          case 'completed':
            acc.completed++;
            break;
          default:
            acc.other++;
        }
        return acc;
      },
      { pending: 0, running: 0, completed: 0, other: 0 },
    );

  const incCounts = countByStatus(incremental);
  const patCounts = countByStatus(patternUpdates);
  const backCounts = countByStatus(backfills);

  const fmtDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : '-';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Secret Scanning History
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Incremental Scans */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-gray-700">
            Incremental Scans
          </h4>
          <div className="mt-1 text-sm text-gray-600">
            {incremental.length} total
          </div>
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <LucideReact.CheckCircle
                className="text-green-500"
                size={16}
                aria-label="Completed"
                role="img"
              />
              <span>{incCounts.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Loader
                className="animate-spin text-blue-500"
                size={16}
                aria-label="Running"
                role="img"
              />
              <span>{incCounts.running} running</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Clock
                className="text-amber-500"
                size={16}
                aria-label="Pending"
                role="img"
              />
              <span>{incCounts.pending} pending</span>
            </div>
            {incCounts.other > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.AlertTriangle
                  className="text-red-500"
                  size={16}
                  aria-label="Other"
                  role="img"
                />
                <span>{incCounts.other} other</span>
              </div>
            )}
          </div>
        </div>
        {/* Pattern Update Scans */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-gray-700">
            Pattern Update Scans
          </h4>
          <div className="mt-1 text-sm text-gray-600">
            {patternUpdates.length} total
          </div>
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <LucideReact.CheckCircle
                className="text-green-500"
                size={16}
                aria-label="Completed"
                role="img"
              />
              <span>{patCounts.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Loader
                className="animate-spin text-blue-500"
                size={16}
                aria-label="Running"
                role="img"
              />
              <span>{patCounts.running} running</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Clock
                className="text-amber-500"
                size={16}
                aria-label="Pending"
                role="img"
              />
              <span>{patCounts.pending} pending</span>
            </div>
            {patCounts.other > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.AlertTriangle
                  className="text-red-500"
                  size={16}
                  aria-label="Other"
                  role="img"
                />
                <span>{patCounts.other} other</span>
              </div>
            )}
          </div>
        </div>
        {/* Backfill Scans */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-gray-700">Backfill Scans</h4>
          <div className="mt-1 text-sm text-gray-600">
            {backfills.length} total
          </div>
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <LucideReact.CheckCircle
                className="text-green-500"
                size={16}
                aria-label="Completed"
                role="img"
              />
              <span>{backCounts.completed} completed</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Loader
                className="animate-spin text-blue-500"
                size={16}
                aria-label="Running"
                role="img"
              />
              <span>{backCounts.running} running</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Clock
                className="text-amber-500"
                size={16}
                aria-label="Pending"
                role="img"
              />
              <span>{backCounts.pending} pending</span>
            </div>
            {backCounts.other > 0 && (
              <div className="flex items-center gap-1">
                <LucideReact.AlertTriangle
                  className="text-red-500"
                  size={16}
                  aria-label="Other"
                  role="img"
                />
                <span>{backCounts.other} other</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Custom Pattern Backfill Scans Details */}
      {customBackfills.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Custom Pattern Backfill Scans
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {customBackfills.map((scan, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-gray-50 rounded"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">
                    {scan.pattern_name ?? scan.type ?? 'Unnamed'}
                  </div>
                  <div className="flex flex-wrap items-center text-xs text-gray-500 gap-2 mt-1">
                    <span>{scan.pattern_scope ?? 'Scope N/A'}</span>
                    <span>Started: {fmtDate(scan.started_at)}</span>
                    <span>Completed: {fmtDate(scan.completed_at)}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {scan.status === 'completed' ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={20}
                      aria-label="Completed"
                      role="img"
                    />
                  ) : scan.status === 'running' ? (
                    <LucideReact.Loader
                      className="animate-spin text-blue-500"
                      size={20}
                      aria-label="Running"
                      role="img"
                    />
                  ) : scan.status === 'pending' ? (
                    <LucideReact.Clock
                      className="text-amber-500"
                      size={20}
                      aria-label="Pending"
                      role="img"
                    />
                  ) : (
                    <LucideReact.AlertTriangle
                      className="text-red-500"
                      size={20}
                      aria-label="Unknown"
                      role="img"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
