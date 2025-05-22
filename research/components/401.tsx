import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsActionsRunnersGenerateJitconfig.PostResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedStatus = (() => {
    const s = value.runner.status || "";
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  })();

  const statusIcon = (() => {
    switch (formattedStatus.toLowerCase()) {
      case "online":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "offline":
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      case "busy":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-500" size={16} />;
    }
  })();

  const busyIndicator = value.runner.busy ? (
    <>
      <LucideReact.Loader className="animate-spin text-amber-500" size={16} />
      <span className="ml-1">Busy</span>
    </>
  ) : (
    <>
      <LucideReact.CheckCircle className="text-green-500" size={16} />
      <span className="ml-1">Idle</span>
    </>
  );

  const configText = React.useMemo(() => {
    try {
      return atob(value.encoded_jit_config);
    } catch {
      return value.encoded_jit_config;
    }
  }, [value.encoded_jit_config]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center gap-2">
        <LucideReact.Server className="text-blue-500" size={20} />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.runner.name}
        </h2>
      </div>

      {/* Runner Details */}
      <dl className="mt-4 space-y-2 text-gray-700">
        <div className="flex items-center gap-1">
          <LucideReact.Hash className="text-gray-500" size={16} />
          <dt className="font-medium">ID:</dt>
          <dd className="ml-1">{value.runner.id}</dd>
        </div>
        {value.runner.runner_group_id != null && (
          <div className="flex items-center gap-1">
            <LucideReact.PieChart className="text-gray-500" size={16} />
            <dt className="font-medium">Group:</dt>
            <dd className="ml-1">{value.runner.runner_group_id}</dd>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.Cpu className="text-gray-500" size={16} />
          <dt className="font-medium">OS:</dt>
          <dd className="ml-1">{value.runner.os}</dd>
        </div>
        <div className="flex items-center gap-1">
          {statusIcon}
          <dt className="font-medium ml-1">Status:</dt>
          <dd className="ml-1">{formattedStatus}</dd>
        </div>
        <div className="flex items-center gap-1">{busyIndicator}</div>
        {value.runner.ephemeral && (
          <div>
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
              Ephemeral
            </span>
          </div>
        )}
      </dl>

      {/* Labels */}
      {Array.isArray(value.runner.labels) && value.runner.labels.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Labels</h3>
          <div className="flex flex-wrap gap-2">
            {value.runner.labels.map((label) => (
              <span
                key={label.id ?? label.name}
                className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* JIT Configuration */}
      <div className="mt-6">
        <h3 className="flex items-center text-sm font-medium text-gray-600 mb-2">
          <LucideReact.Code className="text-gray-500 mr-1" size={16} />
          JIT Configuration
        </h3>
        <pre className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded text-xs text-gray-800 font-mono whitespace-pre-wrap break-all">
          {configText}
        </pre>
      </div>
    </div>
  );
}
