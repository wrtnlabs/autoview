import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_alert_instance {
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
    }
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
    export interface code_scanning_alert_location {
        path?: string;
        start_line?: number & tags.Type<"int32">;
        end_line?: number & tags.Type<"int32">;
        start_column?: number & tags.Type<"int32">;
        end_column?: number & tags.Type<"int32">;
    }
    /**
     * A classification of the file. For example to identify it as generated.
    */
    export type code_scanning_alert_classification = "source" | "generated" | "test" | "library" | null;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_alert_instance[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const totalAlerts = value.length;
  const counts: Record<'open' | 'fixed' | 'dismissed' | 'unknown', number> = {
    open: 0,
    fixed: 0,
    dismissed: 0,
    unknown: 0,
  };
  value.forEach((alert) => {
    const s = alert.state ?? 'unknown';
    if (s === 'open' || s === 'fixed' || s === 'dismissed') {
      counts[s]++;
    } else {
      counts.unknown++;
    }
  });

  // 2. Early return for no data
  if (totalAlerts === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={32} />
        <p className="mt-2 text-sm">No code scanning alerts found.</p>
      </div>
    );
  }

  // Helper to pick icon and color by state
  const getStateIcon = (
    state: AutoViewInputSubTypes.code_scanning_alert_state | undefined
  ): JSX.Element => {
    if (state === 'open') {
      return <LucideReact.AlertTriangle className="text-amber-500" size={16} />;
    }
    if (state === 'fixed') {
      return <LucideReact.CheckCircle className="text-green-500" size={16} />;
    }
    if (state === 'dismissed') {
      return <LucideReact.XCircle className="text-gray-500" size={16} />;
    }
    return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
  };

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Code Scanning Alerts</h2>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <LucideReact.AlertTriangle className="text-amber-500" size={16} />
            <span>{counts.open} Open</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle className="text-green-500" size={16} />
            <span>{counts.fixed} Fixed</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.XCircle className="text-gray-500" size={16} />
            <span>{counts.dismissed} Dismissed</span>
          </div>
          {counts.unknown > 0 && (
            <div className="flex items-center gap-1">
              <LucideReact.HelpCircle className="text-gray-400" size={16} />
              <span>{counts.unknown} Unknown</span>
            </div>
          )}
        </div>
      </div>

      {/* Alerts List */}
      <ul className="space-y-4">
        {value.map((alert, idx) => {
          const message = alert.message?.text?.trim() || 'No description';
          const filePath = alert.location?.path ?? 'Unknown file';
          const line = alert.location?.start_line != null ? `:${alert.location.start_line}` : '';
          const category = alert.category;
          const classifications = Array.isArray(alert.classifications)
            ? alert.classifications.filter(
                (c): c is AutoViewInputSubTypes.code_scanning_alert_classification =>
                  c !== null
              )
            : [];

          return (
            <li
              key={idx}
              className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 bg-gray-50 rounded-lg"
            >
              {/* State Icon */}
              <div className="flex-shrink-0">{getStateIcon(alert.state)}</div>

              {/* Main Content */}
              <div className="flex-1 space-y-1">
                {/* Message */}
                <p className="text-sm text-gray-800 line-clamp-2">{message}</p>

                {/* File & Location */}
                <div className="flex items-center text-xs text-gray-600">
                  <LucideReact.FileText size={14} className="mr-1" />
                  <span className="font-mono truncate">
                    {filePath}
                    {line}
                  </span>
                </div>

                {/* Category & Classifications */}
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {category && (
                    <div className="flex items-center text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                      <LucideReact.Tag size={12} className="mr-1" />
                      <span className="uppercase">{category}</span>
                    </div>
                  )}
                  {classifications.map((cls, ci) => (
                    <span
                      key={ci}
                      className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
