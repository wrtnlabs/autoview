import React from "react";
export namespace AutoViewInputSubTypes {
    export type code_scanning_autofix_commits_response = {
        /**
         * The Git reference of target branch for the commit. For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation.
        */
        target_ref?: string;
        /**
         * SHA of commit with autofix.
        */
        sha?: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_autofix_commits_response;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const branch = value.target_ref?.trim() || "Unknown branch";
  const fullSha = value.sha?.trim() || "";
  const truncatedSha = fullSha ? fullSha.slice(0, 7) : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Autofix Commit</h3>
      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex items-center">
          <span className="font-medium">Branch:</span>
          <span
            className="ml-2 font-mono text-indigo-600 truncate"
            title={branch}
          >
            {branch}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Commit SHA:</span>
          <span className="ml-2 font-mono text-indigo-600">{truncatedSha}</span>
        </div>
      </div>
    </div>
  );
}
