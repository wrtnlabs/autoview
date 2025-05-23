import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.runner;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusNormalized = value.status.toLowerCase();
  const statusText = value.status.charAt(0).toUpperCase() + value.status.slice(1);
  let StatusIcon = LucideReact.Circle;
  let statusColor = 'text-amber-500';
  if (['online', 'active', 'idle'].includes(statusNormalized)) {
    StatusIcon = LucideReact.CheckCircle;
    statusColor = 'text-green-500';
  } else if (['offline', 'inactive'].includes(statusNormalized)) {
    StatusIcon = LucideReact.XCircle;
    statusColor = 'text-red-500';
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      {/* Header: Runner Name & Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center overflow-hidden">
          <LucideReact.Server size={20} className="mr-2 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h3>
        </div>
        <span role="img" aria-label={`Status: ${statusText}`}>
          <StatusIcon size={18} strokeWidth={2} className={statusColor} />
        </span>
      </div>

      {/* Metadata: OS, Busy/Idle, Ephemeral */}
      <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-4">
        <div className="flex items-center truncate">
          <LucideReact.Computer size={16} className="mr-1 text-gray-500" />
          <span className="truncate">{value.os}</span>
        </div>
        <div className="flex items-center">
          {value.busy ? (
            <>
              <LucideReact.Loader size={16} strokeWidth={2} className="mr-1 text-amber-500 animate-spin" />
              <span>Busy</span>
            </>
          ) : (
            <>
              <LucideReact.CheckCircle size={16} strokeWidth={2} className="mr-1 text-green-500" />
              <span>Idle</span>
            </>
          )}
        </div>
        {value.ephemeral && (
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Ephemeral</span>
        )}
      </div>

      {/* Labels Section */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Labels</h4>
        {value.labels.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {value.labels.map((label) => (
              <span
                key={label.id ?? label.name}
                className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs truncate"
              >
                {label.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center text-sm text-gray-400">
            <LucideReact.AlertCircle size={16} className="mr-1" />
            <span>No labels</span>
          </div>
        )}
      </div>
    </div>
  );
}
