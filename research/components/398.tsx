import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsRunnerGroupsRunners {
    export type GetResponse = {
      total_count: number;
      runners: AutoViewInputSubTypes.runner[];
    };
  }
  /**
   * A self hosted runner
   *
   * @title Self hosted runners
   */
  export type runner = {
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
  };
  /**
   * A label for a self hosted runner
   *
   * @title Self hosted runner label
   */
  export type runner_label = {
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
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsRunnerGroupsRunners.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count;
  const busyCount = value.runners.filter((r) => r.busy).length;
  const ephemeralCount = value.runners.filter((r) => r.ephemeral).length;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "online":
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case "offline":
        return <LucideReact.XCircle size={16} className="text-red-500" />;
      case "idle":
        return <LucideReact.Clock size={16} className="text-amber-500" />;
      default:
        return <LucideReact.Circle size={16} className="text-gray-400" />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex items-center gap-2">
          <LucideReact.Users size={20} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Total: {totalCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Zap size={20} className="text-amber-500" />
          <span className="text-sm font-medium text-gray-700">
            Busy: {busyCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LucideReact.Clock size={20} className="text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">
            Ephemeral: {ephemeralCount}
          </span>
        </div>
      </div>

      {/* Runners list */}
      {value.runners.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <LucideReact.AlertCircle size={48} className="text-gray-300" />
          <p className="mt-4 text-gray-500">No runners available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.runners.map((runner) => (
            <div
              key={runner.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-3 hover:shadow-sm transition"
            >
              {/* Name */}
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 truncate">
                <LucideReact.User size={18} className="text-gray-500" />
                <span>{runner.name}</span>
              </div>

              {/* OS */}
              <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                <LucideReact.Monitor size={16} className="text-gray-400" />
                <span>{runner.os}</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-sm">
                {getStatusIcon(runner.status)}
                <span className="capitalize text-gray-700">
                  {runner.status}
                </span>
              </div>

              {/* Busy */}
              {runner.busy && (
                <div className="flex items-center gap-2 text-sm">
                  <LucideReact.Zap size={16} className="text-amber-500" />
                  <span className="text-gray-700">Busy</span>
                </div>
              )}

              {/* Ephemeral */}
              {runner.ephemeral && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded">
                  <LucideReact.Clock size={14} />
                  <span>Ephemeral</span>
                </div>
              )}

              {/* Labels */}
              {runner.labels.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {runner.labels.map((lbl, idx) => {
                    const isReadOnly = lbl.type === "read-only";
                    const base = isReadOnly
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800";
                    return (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded ${base}`}
                      >
                        <LucideReact.Tag size={12} />
                        {lbl.name}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
