import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export type code_scanning_analysis = {
    ref: AutoViewInputSubTypes.code_scanning_ref;
    commit_sha: AutoViewInputSubTypes.code_scanning_analysis_commit_sha;
    analysis_key: AutoViewInputSubTypes.code_scanning_analysis_analysis_key;
    environment: AutoViewInputSubTypes.code_scanning_analysis_environment;
    category?: AutoViewInputSubTypes.code_scanning_analysis_category;
    error: string;
    created_at: AutoViewInputSubTypes.code_scanning_analysis_created_at;
    /**
     * The total number of results in the analysis.
     */
    results_count: number & tags.Type<"int32">;
    /**
     * The total number of rules used in the analysis.
     */
    rules_count: number & tags.Type<"int32">;
    /**
     * Unique identifier for this analysis.
     */
    id: number & tags.Type<"int32">;
    url: AutoViewInputSubTypes.code_scanning_analysis_url;
    sarif_id: AutoViewInputSubTypes.code_scanning_analysis_sarif_id;
    tool: AutoViewInputSubTypes.code_scanning_analysis_tool;
    deletable: boolean;
    /**
     * Warning generated when processing the analysis
     */
    warning: string;
  };
  /**
   * The Git reference, formatted as `refs/pull/<number>/merge`, `refs/pull/<number>/head`,
   * `refs/heads/<branch name>` or simply `<branch name>`.
   */
  export type code_scanning_ref = string;
  /**
   * The SHA of the commit to which the analysis you are uploading relates.
   */
  export type code_scanning_analysis_commit_sha = string;
  /**
   * Identifies the configuration under which the analysis was executed. For example, in GitHub Actions this includes the workflow filename and job name.
   */
  export type code_scanning_analysis_analysis_key = string;
  /**
   * Identifies the variable values associated with the environment in which this analysis was performed.
   */
  export type code_scanning_analysis_environment = string;
  /**
   * Identifies the configuration under which the analysis was executed. Used to distinguish between multiple analyses for the same tool and commit, but performed on different languages or different parts of the code.
   */
  export type code_scanning_analysis_category = string;
  /**
   * The time that the analysis was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
   */
  export type code_scanning_analysis_created_at = string;
  /**
   * The REST API URL of the analysis resource.
   */
  export type code_scanning_analysis_url = string;
  /**
   * An identifier for the upload.
   */
  export type code_scanning_analysis_sarif_id = string;
  export type code_scanning_analysis_tool = {
    name?: AutoViewInputSubTypes.code_scanning_analysis_tool_name;
    version?: AutoViewInputSubTypes.code_scanning_analysis_tool_version;
    guid?: AutoViewInputSubTypes.code_scanning_analysis_tool_guid;
  };
  /**
   * The name of the tool used to generate the code scanning analysis.
   */
  export type code_scanning_analysis_tool_name = string;
  /**
   * The version of the tool used to generate the code scanning analysis.
   */
  export type code_scanning_analysis_tool_version = string | null;
  /**
   * The GUID of the tool used to generate the code scanning analysis, if provided in the uploaded SARIF data.
   */
  export type code_scanning_analysis_tool_guid = string | null;
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_analysis[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define derived values for formatting dates and truncating commit SHAs
  const formattedAnalyses = value.map((analysis) => {
    const date = new Date(analysis.created_at);
    const formattedDate = date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
    const commitShaShort = analysis.commit_sha.slice(0, 7);
    return { analysis, formattedDate, commitShaShort };
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {formattedAnalyses.map(({ analysis, formattedDate, commitShaShort }) => (
        <div
          key={analysis.id}
          className="flex flex-col p-4 bg-white rounded-lg shadow-md space-y-3"
        >
          {/* Header: Tool Name & Version */}
          <div className="flex items-center space-x-2">
            <LucideReact.Code className="text-indigo-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {analysis.tool.name ?? "Unknown Tool"}
              {analysis.tool.version && (
                <span className="ml-1 text-sm text-gray-500">
                  v{analysis.tool.version}
                </span>
              )}
            </h3>
          </div>

          {/* Meta Info: Commit SHA, Date, Category */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-3">
            <div className="flex items-center space-x-1">
              <LucideReact.GitCommit size={16} />
              <span className="truncate">{commitShaShort}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar size={16} />
              <span>{formattedDate}</span>
            </div>
            {analysis.category && (
              <div className="flex items-center space-x-1">
                <LucideReact.Tag size={16} />
                <span className="truncate">{analysis.category}</span>
              </div>
            )}
          </div>

          {/* Counts: Results & Rules */}
          <div className="flex flex-wrap items-center text-sm space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <LucideReact.Bug size={16} />
              <span>{analysis.results_count}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <LucideReact.Hash size={16} />
              <span>{analysis.rules_count}</span>
            </div>
          </div>

          {/* Alerts: Error & Warning */}
          {(analysis.error || analysis.warning) && (
            <div className="flex flex-col space-y-1">
              {analysis.error && (
                <div className="flex items-start space-x-2 text-red-600">
                  <LucideReact.AlertCircle size={16} className="mt-0.5" />
                  <p className="text-sm line-clamp-2">{analysis.error}</p>
                </div>
              )}
              {analysis.warning && (
                <div className="flex items-start space-x-2 text-amber-600">
                  <LucideReact.AlertTriangle size={16} className="mt-0.5" />
                  <p className="text-sm line-clamp-2">{analysis.warning}</p>
                </div>
              )}
            </div>
          )}

          {/* Non-deletable indicator */}
          {!analysis.deletable && (
            <div className="mt-auto flex items-center space-x-1 text-gray-400 text-sm">
              <LucideReact.Lock size={16} />
              <span>Read-only</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
