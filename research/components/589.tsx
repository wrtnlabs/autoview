import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunnersGenerateJitconfig {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunnersGenerateJitconfig.PostResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Decode the base64-encoded configuration
  const decodedConfig = React.useMemo(() => {
    try {
      return atob(value.encoded_jit_config);
    } catch {
      return value.encoded_jit_config;
    }
  }, [value.encoded_jit_config]);

  // Truncate the configuration snippet for display
  const maxChars = 300;
  const isTruncated = decodedConfig.length > maxChars;
  const configSnippet = isTruncated
    ? decodedConfig.slice(0, maxChars) + "…"
    : decodedConfig;

  // Capitalize status text
  const statusLabel = value.runner.status
    .split(/[\s_-]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Runner Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.runner.name}
        </h2>
        {value.runner.ephemeral && (
          <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
            <LucideReact.Zap size={14} aria-hidden="true" />
            <span>Ephemeral</span>
          </div>
        )}
      </div>

      {/* Basic Info */}
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <LucideReact.Cpu size={16} className="text-gray-500" />
          <span>{value.runner.os}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Status:</span>
          {value.runner.busy ? (
            <LucideReact.Loader
              className="animate-spin text-yellow-500"
              size={16}
              aria-label="Busy"
            />
          ) : (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              aria-label="Idle"
            />
          )}
          <span className="ml-1">{statusLabel}</span>
        </div>
      </div>

      {/* Labels */}
      {value.runner.labels.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.runner.labels.map((lbl, idx) => {
            const bgColor =
              lbl.type === "read-only" ? "bg-gray-200" : "bg-blue-100";
            const textColor =
              lbl.type === "read-only" ? "text-gray-700" : "text-blue-800";
            return (
              <span
                key={idx}
                className={`${bgColor} ${textColor} px-2 py-0.5 rounded-full text-xs truncate`}
              >
                {lbl.name}
              </span>
            );
          })}
        </div>
      )}

      {/* Configuration Snippet */}
      <div className="mt-5">
        <h3 className="text-sm font-medium text-gray-800 mb-1">
          Runner Configuration
        </h3>
        <pre className="bg-gray-100 p-3 rounded text-xs font-mono max-h-48 overflow-y-auto whitespace-pre-wrap">
          {configSnippet}
        </pre>
        {isTruncated && (
          <p className="mt-1 text-xs text-gray-500">
            Configuration truncated for preview.
          </p>
        )}
      </div>
    </div>
  );
}
