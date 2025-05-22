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
  const busyStatus = value.busy ? "Busy" : "Idle";
  const busyBadgeClasses = value.busy
    ? "bg-red-100 text-red-800"
    : "bg-green-100 text-green-800";
  const statusText = value.status.charAt(0).toUpperCase() + value.status.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      {/* Header: Name and Ephemeral Badge */}
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-900 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
        {value.ephemeral && (
          <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded">
            Ephemeral
          </span>
        )}
      </div>

      {/* Runner Details */}
      <div className="flex flex-wrap text-sm text-gray-700 gap-4">
        <div className="flex items-center">
          <span className="font-medium">OS:</span>
          <span className="ml-1">{value.os}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Status:</span>
          <span className="ml-1 capitalize">{statusText}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">State:</span>
          <span className={`ml-1 px-1 rounded text-xs font-medium ${busyBadgeClasses}`}>
            {busyStatus}
          </span>
        </div>
      </div>

      {/* Labels */}
      {value.labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.labels.map((lbl, idx) => {
            const type = lbl.type === "read-only" ? "read-only" : "custom";
            const badgeColor =
              type === "read-only"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800";
            const key = lbl.id != null ? lbl.id : `${lbl.name}-${idx}`;
            return (
              <span
                key={key}
                className={`px-2 py-0.5 text-xs font-medium rounded ${badgeColor}`}
                title={lbl.name}
              >
                {lbl.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
