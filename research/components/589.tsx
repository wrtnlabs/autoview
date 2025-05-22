import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsRunnersGenerateJitconfig.PostResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive decoded configuration from Base64
  const decodedConfig = React.useMemo(() => {
    try {
      return atob(value.encoded_jit_config);
    } catch {
      return value.encoded_jit_config;
    }
  }, [value.encoded_jit_config]);

  // 2. Helper to map status text to an icon
  const getStatusIcon = (status: string) => {
    const key = status.toLowerCase();
    if (key.includes("online") || key.includes("active")) {
      return <LucideReact.CheckCircle size={14} className="text-green-500" />;
    }
    if (
      key.includes("offline") ||
      key.includes("error") ||
      key.includes("fail")
    ) {
      return <LucideReact.XCircle size={14} className="text-red-500" />;
    }
    return <LucideReact.Clock size={14} className="text-amber-500" />;
  };

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-full">
      {/* Runner Title */}
      <div className="flex items-center space-x-2">
        <LucideReact.Cpu size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.runner.name}
        </h2>
      </div>

      {/* Runner Attributes */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
        {/* Operating System */}
        <div className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
          <LucideReact.Monitor size={14} className="mr-1" />
          <span>{value.runner.os}</span>
        </div>

        {/* Status */}
        <div className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
          {getStatusIcon(value.runner.status)}
          <span className="ml-1">{value.runner.status}</span>
        </div>

        {/* Busy / Idle */}
        <div className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
          {value.runner.busy ? (
            <LucideReact.Loader
              size={14}
              className="mr-1 animate-spin text-blue-500"
            />
          ) : (
            <LucideReact.CheckCircle
              size={14}
              className="mr-1 text-green-500"
            />
          )}
          <span>{value.runner.busy ? "Busy" : "Idle"}</span>
        </div>

        {/* Ephemeral Indicator */}
        {value.runner.ephemeral && (
          <div className="flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 rounded-full">
            <LucideReact.Flag size={14} className="mr-1 text-purple-500" />
            <span>Ephemeral</span>
          </div>
        )}
      </div>

      {/* Labels */}
      {value.runner.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.runner.labels.map((label) => (
            <span
              key={label.name}
              className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 rounded-full"
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* JIT Configuration Block */}
      <div className="mt-4">
        <div className="flex items-center text-sm font-medium text-gray-700">
          <LucideReact.Code
            size={16}
            className="mr-1 text-gray-500"
            aria-hidden="true"
          />
          <span>JIT Configuration</span>
        </div>
        <pre className="mt-2 bg-gray-50 rounded-md p-4 font-mono text-xs text-gray-800 overflow-auto max-h-48 whitespace-pre-wrap break-all">
          {decodedConfig}
        </pre>
      </div>
    </div>
  );
}
