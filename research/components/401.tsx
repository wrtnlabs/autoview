import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersGenerateJitconfig {
        export type PostResponse = {
            runner: AutoViewInputSubTypes.runner;
            /**
             * The base64 encoded runner configuration.
            */
            encoded_jit_config: string;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersGenerateJitconfig.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { runner, encoded_jit_config } = value;
  const {
    name,
    os,
    status,
    busy,
    ephemeral,
    labels,
    runner_group_id,
  } = runner;

  // Capitalize status
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Runner Header */}
      <div className="mb-4">
        <h2
          className="text-xl font-semibold text-gray-800 truncate"
          title={name}
        >
          {name}
        </h2>
        <div className="flex flex-wrap items-center space-x-2 mt-2">
          <span className="text-sm text-gray-500">{os}</span>
          <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded">
            {formattedStatus}
          </span>
          {busy && (
            <span className="px-2 py-0.5 text-xs font-medium text-red-800 bg-red-100 rounded">
              Busy
            </span>
          )}
          {ephemeral && (
            <span className="px-2 py-0.5 text-xs font-medium text-purple-800 bg-purple-100 rounded">
              Ephemeral
            </span>
          )}
        </div>
      </div>

      {/* Runner Group ID */}
      {runner_group_id != null && (
        <div className="mb-4 text-sm text-gray-600">
          <span className="font-medium">Group ID:</span> {runner_group_id}
        </div>
      )}

      {/* Labels */}
      {labels.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {labels.map((label) => (
            <span
              key={label.id ?? label.name}
              className="px-2 py-0.5 text-xs font-medium text-gray-800 bg-gray-200 rounded"
              title={label.type ?? "custom"}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Encoded JIT Config */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">
          Encoded JIT Config
        </h3>
        <div className="bg-gray-100 rounded p-2 overflow-x-auto text-xs font-mono text-gray-800">
          {encoded_jit_config}
        </div>
      </div>
    </div>
  );
}
