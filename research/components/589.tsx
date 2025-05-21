import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersGenerateJitconfig {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersGenerateJitconfig.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { runner, encoded_jit_config } = value;
  const statusLabel = runner.status.charAt(0).toUpperCase() + runner.status.slice(1);
  const busyLabel = runner.busy ? "Busy" : "Idle";
  const busyClasses = runner.busy ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
  const decodedConfig = React.useMemo(() => {
    try {
      return atob(encoded_jit_config);
    } catch {
      return encoded_jit_config;
    }
  }, [encoded_jit_config]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Runner Details</h2>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-6">
        <dt className="font-medium">ID</dt>
        <dd>{runner.id}</dd>

        {runner.runner_group_id != null && (
          <>
            <dt className="font-medium">Group ID</dt>
            <dd>{runner.runner_group_id}</dd>
          </>
        )}

        <dt className="font-medium">Name</dt>
        <dd className="truncate">{runner.name}</dd>

        <dt className="font-medium">OS</dt>
        <dd>{runner.os}</dd>

        <dt className="font-medium">Status</dt>
        <dd>{statusLabel}</dd>

        <dt className="font-medium">Busy</dt>
        <dd>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${busyClasses}`}>
            {busyLabel}
          </span>
        </dd>

        {runner.ephemeral && (
          <>
            <dt className="font-medium">Type</dt>
            <dd>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Ephemeral
              </span>
            </dd>
          </>
        )}

        <dt className="font-medium">Labels</dt>
        <dd className="flex flex-wrap">
          {runner.labels.map((lbl) => (
            <span
              key={lbl.name}
              className="px-2 py-0.5 mr-1 mb-1 rounded text-xs bg-gray-100 text-gray-800 truncate"
            >
              {lbl.name}
            </span>
          ))}
        </dd>
      </dl>

      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-2">JIT Configuration</h3>
        <pre className="font-mono text-xs bg-gray-50 text-gray-800 p-3 rounded overflow-auto max-h-48 whitespace-pre-wrap">
          {decodedConfig}
        </pre>
      </section>
    </div>
  );
}
