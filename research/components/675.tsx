import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_analysis {
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
    }
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
    export interface code_scanning_analysis_tool {
        name?: AutoViewInputSubTypes.code_scanning_analysis_tool_name;
        version?: AutoViewInputSubTypes.code_scanning_analysis_tool_version;
        guid?: AutoViewInputSubTypes.code_scanning_analysis_tool_guid;
    }
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((analysis) => {
        const {
          tool,
          created_at,
          category,
          commit_sha,
          results_count,
          rules_count,
          warning,
          error,
          url,
        } = analysis;
        const toolName = tool.name ?? "Code Analysis";
        const toolVersion = tool.version ? ` v${tool.version}` : "";
        const shortSha = commit_sha.slice(0, 7);

        return (
          <div
            key={analysis.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center mb-2">
              <LucideReact.ShieldCheck
                size={20}
                className="text-blue-500 flex-shrink-0"
              />
              <h3 className="ml-2 text-lg font-semibold truncate">
                {toolName}
                {toolVersion}
              </h3>
            </div>
            <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-2">
              <div className="flex items-center">
                <LucideReact.Calendar
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="ml-1">{formatDate(created_at)}</span>
              </div>
              {category && (
                <div className="flex items-center">
                  <LucideReact.Tag
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                  <span className="ml-1">{category}</span>
                </div>
              )}
              <div className="flex items-center">
                <LucideReact.Hash
                  size={16}
                  className="text-gray-400 flex-shrink-0"
                />
                <span className="ml-1 font-mono">{shortSha}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-700">
              <div className="flex items-center">
                <LucideReact.AlertTriangle
                  size={16}
                  className="text-red-500 flex-shrink-0"
                />
                <span className="ml-1">{results_count}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.FileText
                  size={16}
                  className="text-gray-500 flex-shrink-0"
                />
                <span className="ml-1">{rules_count}</span>
              </div>
            </div>
            {warning && (
              <div className="flex items-center text-amber-600 text-sm mb-1">
                <LucideReact.AlertTriangle
                  size={16}
                  className="flex-shrink-0"
                />
                <span className="ml-1 truncate">{warning}</span>
              </div>
            )}
            {error && (
              <div className="flex items-center text-red-600 text-sm mb-2">
                <LucideReact.AlertCircle
                  size={16}
                  className="flex-shrink-0"
                />
                <span className="ml-1 truncate">{error}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-400 truncate">
              <LucideReact.Link
                size={16}
                className="flex-shrink-0"
              />
              <span className="ml-1 break-all">{url}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
