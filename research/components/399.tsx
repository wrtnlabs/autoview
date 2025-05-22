import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsRunners {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
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
  AutoViewInputSubTypes.IApiOrgsActionsRunners.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, runners } = value;
  const busyCount = runners.filter((r) => r.busy).length;
  const idleCount = total_count - busyCount;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <LucideReact.Users size={20} className="text-gray-600" />
          <span>Runners</span>
          <span className="text-gray-500 text-sm">({total_count})</span>
        </h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle size={16} className="text-green-500" />
            <span>{idleCount} idle</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Loader
              size={16}
              className="animate-spin text-yellow-500"
            />
            <span>{busyCount} busy</span>
          </div>
        </div>
      </div>

      {runners.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} />
          <span>No runners available</span>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {runners.map((runner) => (
            <li
              key={runner.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <LucideReact.Server size={20} className="text-blue-500" />
                  <span className="font-medium text-gray-800 truncate">
                    {runner.name}
                  </span>
                </div>
                {runner.ephemeral && (
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                    Ephemeral
                  </span>
                )}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <LucideReact.Cpu size={16} className="mr-1" />
                <span>{runner.os}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span>Status:</span>
                {runner.status === "online" ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="ml-1 text-green-500"
                  />
                ) : runner.status === "offline" ? (
                  <LucideReact.XCircle
                    size={16}
                    className="ml-1 text-red-500"
                  />
                ) : (
                  <LucideReact.HelpCircle
                    size={16}
                    className="ml-1 text-gray-400"
                  />
                )}
                <span className="ml-1 capitalize">{runner.status}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-auto">
                {runner.labels.map((label) => (
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
