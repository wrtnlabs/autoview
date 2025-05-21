import { tags } from "typia";
import React from "react";
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
  const status = value.status.toLowerCase();
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
  let statusClass = "bg-blue-100 text-blue-800";
  if (status === "online") statusClass = "bg-green-100 text-green-800";
  else if (status === "offline") statusClass = "bg-gray-100 text-gray-800";
  else if (status === "idle") statusClass = "bg-yellow-100 text-yellow-800";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClass}`}>
            {statusLabel}
          </span>
          {value.busy && (
            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
              Busy
            </span>
          )}
          {value.ephemeral && (
            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
              Ephemeral
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap text-sm text-gray-600 space-x-4">
        <span>OS: {value.os}</span>
        {value.runner_group_id != null && <span>Group #{value.runner_group_id}</span>}
      </div>
      {value.labels.length > 0 && (
        <div className="flex flex-wrap mt-2">
          {value.labels.map((label) => (
            <span
              key={label.id != null ? label.id : label.name}
              className="mr-2 mb-2 px-2 py-1 text-xs text-gray-800 bg-gray-200 rounded-full truncate"
            >
              {label.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
