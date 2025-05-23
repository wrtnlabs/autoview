import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_autofix_commits_response {
        /**
         * The Git reference of target branch for the commit. For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation.
        */
        target_ref?: string;
        /**
         * SHA of commit with autofix.
        */
        sha?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_autofix_commits_response;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const branch = value.target_ref;
  const sha = value.sha;
  const shortSha = sha ? sha.slice(0, 7) : "";

  // 2. Handle empty state when no meaningful data is present
  if (!branch && !sha) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No commit information available</span>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800">Autofix Commit</h2>
      <div className="mt-3 space-y-2">
        {branch && (
          <div className="flex items-center text-gray-700">
            <LucideReact.GitBranch size={16} className="mr-2 text-gray-500" />
            <span className="truncate">{branch}</span>
          </div>
        )}
        {sha && (
          <div className="flex items-center text-gray-700">
            <LucideReact.GitCommit size={16} className="mr-2 text-gray-500" />
            <span className="font-mono truncate" title={sha}>
              {shortSha}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
