import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Configuration for code scanning default setup.
    */
    export interface code_scanning_default_setup {
        /**
         * Code scanning default setup has been configured or not.
        */
        state?: "configured" | "not-configured";
        /**
         * Languages to be analyzed.
        */
        languages?: ("actions" | "c-cpp" | "csharp" | "go" | "java-kotlin" | "javascript-typescript" | "javascript" | "python" | "ruby" | "typescript" | "swift")[];
        /**
         * Runner type to be used.
        */
        runner_type?: "standard" | "labeled" | null;
        /**
         * Runner label to be used if the runner type is labeled.
        */
        runner_label?: string | null;
        /**
         * CodeQL query suite to be used.
        */
        query_suite?: "default" | "extended";
        /**
         * Timestamp of latest configuration update.
        */
        updated_at?: (string & tags.Format<"date-time">) | null;
        /**
         * The frequency of the periodic analysis.
        */
        schedule?: "weekly" | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_default_setup;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isConfigured = value.state === "configured";
  const updatedAt = value.updated_at ? new Date(value.updated_at).toLocaleString() : null;
  const languages = value.languages ?? [];
  const runnerType = value.runner_type;
  const runnerLabel = value.runner_label;
  const querySuite = value.query_suite;
  const schedule = value.schedule;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      {/* Configuration Status */}
      <div className="flex items-center mb-4">
        {isConfigured ? (
          <LucideReact.CheckCircle className="text-green-500" size={20} />
        ) : (
          <LucideReact.XCircle className="text-red-500" size={20} />
        )}
        <span className="ml-2 text-lg font-semibold text-gray-800">
          {isConfigured ? "Configured" : "Not Configured"}
        </span>
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-1">Languages:</div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Runner Type & Label */}
      {runnerType && (
        <div className="mb-4 flex items-center">
          <LucideReact.Cpu className="text-gray-500" size={16} />
          <span className="ml-2 text-sm text-gray-700">
            Runner:
            <span className="ml-1 font-medium">
              {runnerType === "labeled" && runnerLabel
                ? runnerLabel
                : runnerType}
            </span>
          </span>
        </div>
      )}

      {/* Query Suite */}
      {querySuite && (
        <div className="mb-4 flex items-center">
          <LucideReact.FileText className="text-gray-500" size={16} />
          <span className="ml-2 text-sm text-gray-700">
            Query Suite:
            <span className="ml-1 font-medium capitalize">{querySuite}</span>
          </span>
        </div>
      )}

      {/* Schedule */}
      {schedule && (
        <div className="mb-4 flex items-center">
          <LucideReact.Clock className="text-gray-500" size={16} />
          <span className="ml-2 text-sm text-gray-700">
            Schedule:
            <span className="ml-1 font-medium capitalize">{schedule}</span>
          </span>
        </div>
      )}

      {/* Last Updated */}
      {updatedAt && (
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-500" size={16} />
          <span className="ml-2 text-sm text-gray-500">
            Last Updated:
            <span className="ml-1 text-gray-700">{updatedAt}</span>
          </span>
        </div>
      )}
    </div>
  );
}
