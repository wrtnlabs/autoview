import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const busyCount = value.runners.filter(r => r.busy).length;
  const idleCount = value.runners.length - busyCount;
  const ephemeralCount = value.runners.filter(r => r.ephemeral).length;
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Self-Hosted Runners ({value.total_count})
        </h2>
        <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            Busy: {busyCount}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Idle: {idleCount}
          </span>
          {ephemeralCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Ephemeral: {ephemeralCount}
            </span>
          )}
        </div>
      </div>

      {/* Runners List */}
      <ul className="mt-4 space-y-4">
        {value.runners.map(runner => (
          <li
            key={runner.id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {runner.name}
              </h3>
              <div className="mt-2 sm:mt-0 flex flex-wrap gap-2 text-sm text-gray-600">
                <span>OS: {capitalize(runner.os)}</span>
                <span>Status: {capitalize(runner.status)}</span>
                {runner.busy ? (
                  <span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 rounded-full">
                    Busy
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded-full">
                    Idle
                  </span>
                )}
                {runner.ephemeral && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                    Ephemeral
                  </span>
                )}
              </div>
            </div>
            {runner.labels.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {runner.labels.map(label => (
                  <span
                    key={label.id ?? label.name}
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      label.type === "read-only"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
