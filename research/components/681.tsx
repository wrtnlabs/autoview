import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Configuration for code scanning default setup.
   */
  export type code_scanning_default_setup = {
    /**
     * Code scanning default setup has been configured or not.
     */
    state?: "configured" | "not-configured";
    /**
     * Languages to be analyzed.
     */
    languages?: (
      | "actions"
      | "c-cpp"
      | "csharp"
      | "go"
      | "java-kotlin"
      | "javascript-typescript"
      | "javascript"
      | "python"
      | "ruby"
      | "typescript"
      | "swift"
    )[];
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_default_setup;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isConfigured = value.state === "configured";
  const stateIcon = isConfigured ? (
    <LucideReact.CheckCircle
      className="text-green-500"
      size={20}
      strokeWidth={2}
    />
  ) : (
    <LucideReact.AlertTriangle
      className="text-red-500"
      size={20}
      strokeWidth={2}
    />
  );

  const languagesList = Array.isArray(value.languages) ? value.languages : [];

  const runnerInfo =
    value.runner_type != null
      ? value.runner_type === "labeled"
        ? `Runner: Labeled${value.runner_label ? ` (${value.runner_label})` : ""}`
        : "Runner: Standard"
      : null;

  const querySuiteLabel = value.query_suite
    ? `${value.query_suite.charAt(0).toUpperCase() + value.query_suite.slice(1)}`
    : null;

  const formattedUpdatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Not available";

  const scheduleLabel = value.schedule === "weekly" ? "Weekly" : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      {/* State */}
      <div className="flex items-center mb-4">
        {stateIcon}
        <span className="ml-2 text-lg font-semibold text-gray-900">
          {isConfigured ? "Configured" : "Not Configured"}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-700">
        {/* Languages */}
        {languagesList.length > 0 && (
          <div>
            <div className="flex items-center mb-1">
              <LucideReact.Tag size={16} className="text-gray-500" />
              <span className="ml-1 font-medium">Languages:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {languagesList.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Runner Type */}
        {runnerInfo && (
          <div className="flex items-center">
            <LucideReact.Server size={16} className="text-gray-500" />
            <span className="ml-1">{runnerInfo}</span>
          </div>
        )}

        {/* Query Suite */}
        {querySuiteLabel && (
          <div className="flex items-center">
            <LucideReact.List size={16} className="text-gray-500" />
            <span className="ml-1">Query Suite: {querySuiteLabel}</span>
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="ml-1">Last Updated: {formattedUpdatedAt}</span>
        </div>

        {/* Schedule */}
        {scheduleLabel && (
          <div className="flex items-center">
            <LucideReact.Clock size={16} className="text-gray-500" />
            <span className="ml-1">Schedule: {scheduleLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
