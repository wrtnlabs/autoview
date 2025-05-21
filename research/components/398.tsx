import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnerGroupsRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, runners } = value;
  const ephemeralCount = runners.filter((r) => r.ephemeral).length;
  const busyCount = runners.filter((r) => r.busy).length;

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'bg-green-100 text-green-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const content = (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Runners ({total_count})
        </h2>
        <div className="text-sm text-gray-600">
          Ephemeral: {ephemeralCount} · Busy: {busyCount}
        </div>
      </div>
      <ul className="space-y-4">
        {runners.map((runner) => (
          <li
            key={runner.id}
            className="p-4 bg-gray-50 rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div className="flex-1">
              <h3 className="text-md font-medium text-gray-800">
                {runner.name}
              </h3>
              <div className="mt-1 flex flex-wrap gap-2">
                {runner.labels.map((label) => (
                  <span
                    key={label.name}
                    className="text-xs text-gray-700 bg-gray-200 px-2 py-0.5 rounded"
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 sm:mt-0 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-700 bg-gray-200 px-2 py-0.5 rounded">
                {runner.os}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded ${getStatusClasses(
                  runner.status,
                )}`}
              >
                {capitalize(runner.status)}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  runner.busy
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {runner.busy ? 'Busy' : 'Idle'}
              </span>
              {runner.ephemeral && (
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  Ephemeral
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  // 3. Return the React element.
  return content;
}
