import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.runner;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const runnerName = value.name;
  const osLabel = value.os;

  const statusKey = value.status.trim().toLowerCase();
  const statusLabel = statusKey.charAt(0).toUpperCase() + statusKey.slice(1);
  const statusColorClass =
    statusKey === "online"
      ? "bg-green-500"
      : statusKey === "offline"
        ? "bg-red-500"
        : "bg-amber-500";

  const busyLabel = value.busy ? "Busy" : "Idle";
  const busyIcon = value.busy ? (
    <LucideReact.Loader
      className="animate-spin text-blue-500"
      size={16}
      aria-label="Busy"
    />
  ) : (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={16}
      aria-label="Idle"
    />
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
      {/* Header: Runner name */}
      <div className="flex items-center text-lg font-semibold text-gray-800">
        <LucideReact.Server size={20} className="text-gray-500 mr-2" />
        {runnerName}
      </div>

      {/* Meta info: OS, Status, Busy/Idle, Ephemeral */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Computer size={16} className="text-gray-400" />
          <span className="ml-1">{osLabel}</span>
        </div>

        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full ${statusColorClass}`} />
          <span className="ml-1">{statusLabel}</span>
        </div>

        <div className="flex items-center">
          {busyIcon}
          <span className="ml-1">{busyLabel}</span>
        </div>

        {value.ephemeral && (
          <div className="flex items-center">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span className="ml-1">Ephemeral</span>
          </div>
        )}
      </div>

      {/* Labels */}
      {value.labels.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.labels.map((label, idx) => (
            <span
              key={idx}
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                label.type === "read-only"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
