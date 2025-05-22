import LucideReact from "lucide-react";
import React, { JSX } from "react";

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
export type AutoViewInput =
  AutoViewInputSubTypes.code_scanning_autofix_commits_response;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const branchName = value.target_ref ?? null;
  const fullSha = value.sha ?? null;
  const shortSha = fullSha ? fullSha.slice(0, 7) : null;
  const hasAnyData = Boolean(branchName || shortSha);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {hasAnyData ? (
        <div className="space-y-3">
          {branchName && (
            <div className="flex items-center gap-2 text-gray-700">
              <LucideReact.GitBranch
                size={16}
                className="text-gray-500"
                aria-hidden="true"
              />
              <span className="font-medium truncate">{branchName}</span>
            </div>
          )}
          {shortSha && (
            <div className="flex items-center gap-2 text-gray-700">
              <LucideReact.GitCommit
                size={16}
                className="text-gray-500"
                aria-hidden="true"
              />
              <span className="font-mono text-sm">{shortSha}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={24} aria-hidden="true" />
          <span className="mt-2 text-sm">No commit data available</span>
        </div>
      )}
    </div>
  );
}
