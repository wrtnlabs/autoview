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
  // Derive lowercase status for consistent mapping
  const statusKey = value.status.toLowerCase();
  const isOnline = statusKey === "online";
  const isOffline = statusKey === "offline";

  // Map status to a semantically colored icon
  const StatusIcon = (): React.ReactNode => {
    if (isOnline) {
      return (
        <LucideReact.CheckCircle
          size={16}
          className="text-green-500"
          aria-label="Online"
        />
      );
    } else if (isOffline) {
      return (
        <LucideReact.XCircle
          size={16}
          className="text-red-500"
          aria-label="Offline"
        />
      );
    }
    return (
      <LucideReact.Clock
        size={16}
        className="text-amber-500"
        aria-label={value.status}
      />
    );
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Runner Name & Busy Indicator */}
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
        {value.busy && (
          <div className="flex items-center" title="Busy">
            <LucideReact.Loader
              size={16}
              className="animate-spin text-amber-500"
            />
          </div>
        )}
      </div>

      {/* Meta: Status, OS, Ephemeral Badge */}
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
        <div className="flex items-center space-x-1">
          <StatusIcon />
          <span className="capitalize">{statusKey}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Computer
            size={16}
            className="text-gray-400"
            aria-label="OS"
          />
          <span>{value.os}</span>
        </div>
        {value.ephemeral && (
          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
            Ephemeral
          </span>
        )}
      </div>

      {/* Labels as Pills */}
      {value.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.labels.map((label) => (
            <span
              key={label.id ?? label.name}
              className={`px-2 py-0.5 text-xs rounded-full ${
                label.type === "read-only"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-blue-100 text-blue-600"
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
