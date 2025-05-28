import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsRunnersGenerateJitconfig {
        export interface PostResponse {
            runner: AutoViewInputSubTypes.runner;
            /**
             * The base64 encoded runner configuration.
            */
            encoded_jit_config: string;
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsRunnersGenerateJitconfig.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformation
  const { runner, encoded_jit_config } = value;

  // Map runner.status to an icon and color
  const statusMap: Record<string, { icon: JSX.Element; color: string }> = {
    online: { icon: <LucideReact.CheckCircle size={16} />, color: "text-green-500" },
    offline: { icon: <LucideReact.XCircle size={16} />, color: "text-red-500" },
    busy: { icon: <LucideReact.Loader size={16} className="animate-spin" />, color: "text-yellow-500" },
    pending: { icon: <LucideReact.Clock size={16} />, color: "text-amber-500" },
    running: { icon: <LucideReact.PlayCircle size={16} />, color: "text-blue-500" },
  };
  const statusKey = runner.status.toLowerCase();
  const statusInfo = statusMap[statusKey] || { icon: <LucideReact.Circle size={16} />, color: "text-gray-500" };

  // Truncate long base64 config for preview
  const configPreview =
    encoded_jit_config.length > 80
      ? encoded_jit_config.slice(0, 40) + "…" + encoded_jit_config.slice(-40)
      : encoded_jit_config;

  // 2. Visual composition
  return (
    <div className="max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Runner Name */}
      <div className="flex items-center mb-4">
        <LucideReact.Computer size={20} className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{runner.name}</h2>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        {/* Operating System */}
        <div className="flex items-center">
          <LucideReact.Cpu size={16} className="text-gray-400 mr-1" />
          <span>{runner.os}</span>
        </div>

        {/* Status */}
        <div className="flex items-center">
          <span className="mr-1">Status:</span>
          <span className={`${statusInfo.color} flex items-center`}>
            {statusInfo.icon}
            <span className="ml-1 capitalize">{runner.status}</span>
          </span>
        </div>

        {/* Busy Indicator */}
        <div className="flex items-center">
          <span className="mr-1">Busy:</span>
          {runner.busy ? (
            <LucideReact.Loader size={16} className="animate-spin text-yellow-500" />
          ) : (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          )}
        </div>

        {/* Ephemeral Flag */}
        {runner.ephemeral && (
          <div className="flex items-center">
            <LucideReact.Clock size={16} className="text-indigo-500 mr-1" />
            <span>Ephemeral</span>
          </div>
        )}
      </div>

      {/* Labels */}
      {runner.labels.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Labels:</h3>
          <div className="flex flex-wrap gap-2">
            {runner.labels.map((label) => {
              const isReadOnly = label.type === "read-only";
              return (
                <span
                  key={label.id ?? label.name}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    isReadOnly ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {label.name}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Encoded JIT Configuration Preview */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">
          JIT Configuration (Base64)
        </h3>
        <pre className="max-h-32 overflow-auto break-all p-2 bg-gray-50 rounded text-xs font-mono text-gray-700">
          {configPreview}
        </pre>
      </div>
    </div>
  );
}
