import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunners {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            runners: AutoViewInputSubTypes.runner[];
        }
    }
    /**
     * A self hosted runner
     *
     * @title Self hosted runners
    */
    export interface runner {
        /**
         * The ID of the runner.
        */
        id: number & tags.Type<"int32">;
        /**
         * The ID of the runner group.
        */
        runner_group_id?: number & tags.Type<"int32">;
        /**
         * The name of the runner.
        */
        name: string;
        /**
         * The Operating System of the runner.
        */
        os: string;
        /**
         * The status of the runner.
        */
        status: string;
        busy: boolean;
        labels: AutoViewInputSubTypes.runner_label[];
        ephemeral?: boolean;
    }
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export interface runner_label {
        /**
         * Unique identifier of the label.
        */
        id?: number & tags.Type<"int32">;
        /**
         * Name of the label.
        */
        name: string;
        /**
         * The type of label. Read-only labels are applied automatically when the runner is configured.
        */
        type?: "read-only" | "custom";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived statistics
  const total = value.total_count;
  const busyCount = value.runners.filter(r => r.busy).length;
  const idleCount = total - busyCount;
  const ephemeralCount = value.runners.filter(r => r.ephemeral).length;

  // 2. Visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Server className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Self-hosted Runners</h2>
      </div>

      {/* Summary Stats */}
      <div className="flex flex-wrap items-center mb-4 text-sm text-gray-700 space-x-6">
        <div className="flex items-center space-x-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span>Total: {total}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Loader size={16} className="animate-spin text-amber-500" />
          <span>Busy: {busyCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.CheckCircle size={16} className="text-green-500" />
          <span>Idle: {idleCount}</span>
        </div>
        {ephemeralCount > 0 && (
          <div className="flex items-center space-x-1">
            <LucideReact.Zap size={16} className="text-yellow-500" aria-label="Ephemeral" />
            <span>Ephemeral: {ephemeralCount}</span>
          </div>
        )}
      </div>

      {/* Runners List */}
      <ul role="list" className="divide-y divide-gray-200">
        {value.runners.map(runner => {
          const visibleLabels = runner.labels.slice(0, 3);
          const extraCount = runner.labels.length - visibleLabels.length;
          const statusKey = runner.status.toLowerCase();
          const statusText = runner.busy
            ? "Busy"
            : runner.status.charAt(0).toUpperCase() + runner.status.slice(1);

          // Status icon component
          const StatusIcon = runner.busy
            ? () => <LucideReact.Loader size={16} className="animate-spin text-amber-500" aria-label="Busy" />
            : statusKey === "online"
            ? () => <LucideReact.CheckCircle size={16} className="text-green-500" aria-label="Online" />
            : statusKey === "offline"
            ? () => <LucideReact.XCircle size={16} className="text-red-500" aria-label="Offline" />
            : () => <LucideReact.AlertTriangle size={16} className="text-gray-500" aria-label="Unknown status" />;

          return (
            <li key={runner.id} className="py-3">
              <div className="flex justify-between items-start">
                {/* Runner Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <LucideReact.Monitor size={16} className="text-gray-500" />
                    <span className="font-medium text-gray-800 truncate">{runner.name}</span>
                    {runner.ephemeral && (
                      <LucideReact.Zap size={16} className="text-yellow-500" aria-label="Ephemeral" />
                    )}
                  </div>

                  {/* Labels */}
                  {runner.labels.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {visibleLabels.map(label => (
                        <span
                          key={label.name}
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            label.type === "read-only"
                              ? "bg-gray-200 text-gray-700"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {label.name}
                        </span>
                      ))}
                      {extraCount > 0 && (
                        <span className="text-xs text-gray-500">+{extraCount} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="flex-shrink-0 ml-4 flex items-center space-x-1">
                  <StatusIcon />
                  <span className="text-sm text-gray-600">{statusText}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
