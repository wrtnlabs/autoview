import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRunners = value.total_count;
  const formattedCount = totalRunners.toLocaleString();

  // Helper to capitalize strings
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900">
          Self-Hosted Runners
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Total Runners: {formattedCount}
        </p>
      </div>

      {/* Runner List */}
      <div className="grid grid-cols-1 gap-4">
        {value.runners.map((runner) => {
          // Derive badges
          const statusBadgeColor =
            runner.status.toLowerCase() === "online"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800";
          const busyBadgeColor = runner.busy
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800";

          return (
            <div
              key={runner.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg shadow"
            >
              {/* Main Info */}
              <div className="min-w-0 flex-1">
                <h3 className="text-md font-medium text-gray-900 truncate">
                  {runner.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 truncate">
                  OS: {runner.os}
                </p>
              </div>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap items-center gap-2 md:mt-0">
                <span
                  className={`${statusBadgeColor} px-2 py-1 text-xs font-semibold rounded`}
                >
                  {capitalize(runner.status)}
                </span>
                <span
                  className={`${busyBadgeColor} px-2 py-1 text-xs font-semibold rounded`}
                >
                  {runner.busy ? "Busy" : "Idle"}
                </span>
                {runner.ephemeral && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-semibold rounded">
                    Ephemeral
                  </span>
                )}
                {runner.labels.map((label) => (
                  <span
                    key={label.name}
                    className="bg-gray-100 text-gray-800 px-2 py-1 text-xs font-medium rounded"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
