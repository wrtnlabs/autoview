import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnerGroupsRunners {
        export interface GetResponse {
            total_count: number;
            runners: AutoViewInputSubTypes.runner[];
        }
    }
    /**
     * A self hosted runner
     *
     * @title Self hosted runners
    */
    export interface runner {
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
    }
    /**
     * A label for a self hosted runner
     *
     * @title Self hosted runner label
    */
    export interface runner_label {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnerGroupsRunners.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, runners } = value;
  const busyCount = runners.filter((r) => r.busy).length;
  const ephemeralCount = runners.filter((r) => r.ephemeral === true).length;

  // Map runner.status to an icon
  function getStatusIcon(status: string): JSX.Element {
    switch (status.toLowerCase()) {
      case "online":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "offline":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      case "busy":
        return <LucideReact.Clock className="text-yellow-500" size={16} />;
      case "error":
        return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      default:
        return <LucideReact.Circle className="text-gray-400" size={12} />;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary Header */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center text-lg font-semibold text-gray-800">
          <LucideReact.Users className="mr-2 text-gray-600" size={20} />
          {total_count} Runners
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <LucideReact.Activity className="mr-1 text-yellow-500" size={16} />
            <span>{busyCount} Busy</span>
          </div>
          {ephemeralCount > 0 && (
            <div className="flex items-center">
              <LucideReact.Loader className="mr-1 text-blue-500 animate-spin" size={16} />
              <span>{ephemeralCount} Ephemeral</span>
            </div>
          )}
        </div>
      </div>

      {/* Runner List */}
      <div className="divide-y divide-gray-200">
        {runners.map((runner) => (
          <div
            key={runner.id}
            className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Name and Labels */}
            <div className="flex-1">
              <div className="flex items-center text-gray-800 font-medium truncate">
                <LucideReact.Cpu className="mr-2 text-gray-500" size={16} />
                {runner.name}
                {runner.ephemeral && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded">
                    Ephemeral
                  </span>
                )}
              </div>
              {runner.labels.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {runner.labels.map((label) => (
                    <span
                      key={label.name}
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

            {/* OS, Status, Busy */}
            <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Monitor className="mr-1" size={14} />
                <span>{runner.os}</span>
              </div>
              <div className="flex items-center">
                {getStatusIcon(runner.status)}
                <span className="ml-1 capitalize">{runner.status}</span>
              </div>
              {runner.busy && (
                <div className="flex items-center">
                  <LucideReact.Clock className="mr-1 text-yellow-500" size={14} />
                  <span>Busy</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
