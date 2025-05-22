import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type code_scanning_alert_instance = {
    ref?: AutoViewInputSubTypes.code_scanning_ref;
    analysis_key?: AutoViewInputSubTypes.code_scanning_analysis_analysis_key;
    environment?: AutoViewInputSubTypes.code_scanning_alert_environment;
    category?: AutoViewInputSubTypes.code_scanning_analysis_category;
    state?: AutoViewInputSubTypes.code_scanning_alert_state;
    commit_sha?: string;
    message?: {
      text?: string;
    };
    location?: AutoViewInputSubTypes.code_scanning_alert_location;
    html_url?: string;
    /**
     * Classifications that have been applied to the file that triggered the alert.
     * For example identifying it as documentation, or a generated file.
     */
    classifications?: AutoViewInputSubTypes.code_scanning_alert_classification[];
  };
  /**
   * The Git reference, formatted as `refs/pull/<number>/merge`, `refs/pull/<number>/head`,
   * `refs/heads/<branch name>` or simply `<branch name>`.
   */
  export type code_scanning_ref = string;
  /**
   * Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name.
   */
  export type code_scanning_analysis_analysis_key = string;
  /**
   * Identifies the variable values associated with the environment in which the analysis that generated this alert instance was performed, such as the language that was analyzed.
   */
  export type code_scanning_alert_environment = string;
  /**
   * Identifies the configuration under which the analysis was executed. Used to distinguish between multiple analyses for the same tool and commit, but performed on different languages or different parts of the code.
   */
  export type code_scanning_analysis_category = string;
  /**
   * State of a code scanning alert.
   */
  export type code_scanning_alert_state = "open" | "dismissed" | "fixed" | null;
  /**
   * Describe a region within a file for the alert.
   */
  export type code_scanning_alert_location = {
    path?: string;
    start_line?: number & tags.Type<"int32">;
    end_line?: number & tags.Type<"int32">;
    start_column?: number & tags.Type<"int32">;
    end_column?: number & tags.Type<"int32">;
  };
  /**
   * A classification of the file. For example to identify it as generated.
   */
  export type code_scanning_alert_classification =
    | "source"
    | "generated"
    | "test"
    | "library"
    | null;
}
export type AutoViewInput =
  AutoViewInputSubTypes.code_scanning_alert_instance[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const alerts = value;
  // Handle empty state
  if (!alerts || alerts.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="ml-2">No alerts available</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {alerts.map((alert, idx) => {
        const {
          state,
          category,
          environment,
          commit_sha,
          message,
          location,
          classifications,
          ref,
          html_url,
        } = alert;

        // Shorten the commit SHA for display
        const shortSha = commit_sha ? commit_sha.slice(0, 7) : null;
        // Format file location
        const locText = location?.path
          ? `${location.path}:${location.start_line ?? ""}${
              location.end_line ? `-${location.end_line}` : ""
            }`
          : null;

        return (
          <div key={idx} className="p-4 bg-white rounded-lg shadow">
            {/* Header: Status, Category, Environment */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-sm font-medium text-gray-800">
                {state === "open" && (
                  <LucideReact.AlertTriangle
                    className="text-amber-500"
                    size={16}
                  />
                )}
                {state === "fixed" && (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                )}
                {state === "dismissed" && (
                  <LucideReact.XCircle className="text-gray-500" size={16} />
                )}
                {state == null && (
                  <LucideReact.Circle className="text-gray-300" size={16} />
                )}
                <span className="ml-1 capitalize">{state ?? "unknown"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                {category && (
                  <div className="flex items-center">
                    <LucideReact.Tag size={14} />
                    <span className="ml-1">{category}</span>
                  </div>
                )}
                {environment && (
                  <div className="flex items-center">
                    <LucideReact.Server size={14} />
                    <span className="ml-1">{environment}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Message Text */}
            {message?.text && (
              <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                {message.text}
              </p>
            )}

            {/* Metadata: Location, SHA, Ref, URL */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-2">
              {locText && (
                <div className="flex items-center">
                  <LucideReact.FileText size={14} />
                  <span className="ml-1">{locText}</span>
                </div>
              )}
              {shortSha && (
                <div className="flex items-center">
                  <LucideReact.Code size={14} />
                  <span className="ml-1">{shortSha}</span>
                </div>
              )}
              {ref && (
                <div className="flex items-center">
                  <LucideReact.GitBranch size={14} />
                  <span className="ml-1 truncate">{ref}</span>
                </div>
              )}
              {html_url && (
                <div className="flex items-center">
                  <LucideReact.Link size={14} />
                  <span className="ml-1 truncate">{html_url}</span>
                </div>
              )}
            </div>

            {/* Classifications Badges */}
            {classifications && classifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {classifications.map((cls, i) =>
                  cls ? (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {cls}
                    </span>
                  ) : null,
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
