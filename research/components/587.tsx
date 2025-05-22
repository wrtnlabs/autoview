import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsRunners {
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
  AutoViewInputSubTypes.IApiReposActionsRunners.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRunners = value.total_count;
  const runners = value.runners;
  const onlineCount = runners.filter(
    (r) => r.status.toLowerCase() === "online",
  ).length;
  const offlineCount = runners.filter(
    (r) => r.status.toLowerCase() === "offline",
  ).length;
  const busyCount = runners.filter((r) => r.busy).length;
  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <LucideReact.Users size={20} className="text-gray-500" />
          <span className="text-lg font-semibold">
            {totalRunners} Runner{totalRunners !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <LucideReact.Circle size={16} className="text-green-500" />
            <span>{onlineCount} Online</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.Circle size={16} className="text-red-500" />
            <span>{offlineCount} Offline</span>
          </div>
          {busyCount > 0 && (
            <div className="flex items-center space-x-1">
              <LucideReact.Loader
                size={16}
                className="animate-spin text-yellow-500"
              />
              <span>{busyCount} Busy</span>
            </div>
          )}
        </div>
      </div>

      {/* Runner List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {runners.map((runner) => (
          <div
            key={runner.id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow transition-shadow flex flex-col"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-gray-800 truncate">
                {runner.name}
              </h3>
              {runner.ephemeral && (
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                  Ephemeral
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
              <LucideReact.Monitor size={16} className="text-gray-400" />
              <span className="truncate">{runner.os}</span>
            </div>

            <div className="mt-2 flex items-center space-x-2 text-sm">
              {runner.busy ? (
                <LucideReact.Loader
                  size={16}
                  className="animate-spin text-yellow-500"
                />
              ) : runner.status.toLowerCase() === "online" ? (
                <LucideReact.CheckCircle size={16} className="text-green-500" />
              ) : runner.status.toLowerCase() === "offline" ? (
                <LucideReact.XCircle size={16} className="text-red-500" />
              ) : (
                <LucideReact.Circle size={16} className="text-gray-500" />
              )}
              <span
                className={
                  runner.busy
                    ? "text-yellow-600"
                    : runner.status.toLowerCase() === "online"
                      ? "text-green-600"
                      : runner.status.toLowerCase() === "offline"
                        ? "text-red-600"
                        : "text-gray-600"
                }
              >
                {runner.busy ? "Busy" : capitalize(runner.status)}
              </span>
            </div>

            {runner.labels.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {runner.labels.map((label) => (
                  <span
                    key={label.name}
                    className={`text-xs px-2 py-0.5 rounded ${
                      label.type === "read-only"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
