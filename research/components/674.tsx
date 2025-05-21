import { tags } from "typia";
import React from "react";
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
    export type code_scanning_alert_classification = "source" | "generated" | "test" | "library" | null;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert_instance[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Normalize the input array
  const alerts = Array.isArray(value) ? value : [];

  // Map alert state to display text and colors
  function getStateInfo(
    state: AutoViewInputSubTypes.code_scanning_alert_state,
  ): { text: string; bg: string; textColor: string } {
    switch (state) {
      case "open":
        return { text: "Open", bg: "bg-green-100", textColor: "text-green-800" };
      case "dismissed":
        return { text: "Dismissed", bg: "bg-gray-100", textColor: "text-gray-800" };
      case "fixed":
        return { text: "Fixed", bg: "bg-blue-100", textColor: "text-blue-800" };
      default:
        return { text: "Unknown", bg: "bg-gray-100", textColor: "text-gray-800" };
    }
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, idx) => {
        const stateInfo = getStateInfo(alert.state ?? null);
        const commitShort = alert.commit_sha ? alert.commit_sha.slice(0, 7) : undefined;
        const loc = alert.location?.path
          ? `${alert.location.path}${
              alert.location.start_line !== undefined ? `:${alert.location.start_line}` : ""
            }${
              alert.location.end_line !== undefined &&
              alert.location.end_line !== alert.location.start_line
                ? `-${alert.location.end_line}`
                : ""
            }`
          : undefined;
        const classifications = Array.isArray(alert.classifications)
          ? alert.classifications.filter((c) => c) as string[]
          : [];

        return (
          <div key={idx} className="p-4 bg-white rounded-lg shadow">
            {/* Header: Category/Analysis and State */}
            <header className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {alert.category ?? alert.analysis_key ?? "Alert"}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded ${stateInfo.bg} ${stateInfo.textColor}`}
              >
                {stateInfo.text}
              </span>
            </header>

            {/* Message Text (truncated) */}
            {alert.message?.text && (
              <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                {alert.message.text}
              </p>
            )}

            {/* Metadata Row */}
            <div className="flex flex-wrap text-xs text-gray-600 space-x-2">
              {commitShort && <span>Commit: {commitShort}</span>}
              {alert.ref && (
                <span>
                  Ref: <span className="truncate">{alert.ref}</span>
                </span>
              )}
              {loc && <span>Location: {loc}</span>}
              {alert.environment && <span>Env: {alert.environment}</span>}
            </div>

            {/* Classifications Badges */}
            {classifications.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center space-x-1">
                {classifications.map((cls, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-[10px] rounded"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
