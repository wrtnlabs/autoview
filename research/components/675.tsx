import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const shorten = (str: string) => str.slice(0, 7);
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No analyses available.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {value.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.tool.name ?? "Code Scan Analysis"}
                {item.tool.version && (
                  <span className="ml-2 text-sm text-gray-500">
                    v{item.tool.version}
                  </span>
                )}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {formatDate(item.created_at)}
              </p>
            </div>
            <div className="mt-3 sm:mt-0 flex items-center space-x-2">
              {item.deletable ? (
                <span className="text-green-600 text-sm font-medium">
                  Deletable
                </span>
              ) : (
                <span className="text-red-600 text-sm font-medium">
                  Locked
                </span>
              )}
              <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded font-mono">
                {shorten(item.commit_sha)}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Results</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {item.results_count}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rules</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {item.rules_count}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Environment</p>
              <p className="mt-1 text-md text-gray-800 truncate">
                {item.environment}
              </p>
            </div>
            {item.category && (
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <span className="mt-1 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
            )}
          </div>

          {(item.error || item.warning) && (
            <div className="px-4 py-3 space-y-2">
              {item.error && (
                <div className="bg-red-50 text-red-700 text-sm px-3 py-2 rounded line-clamp-3">
                  {item.error}
                </div>
              )}
              {item.warning && (
                <div className="bg-yellow-50 text-yellow-700 text-sm px-3 py-2 rounded line-clamp-3">
                  {item.warning}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
