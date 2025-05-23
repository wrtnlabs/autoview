import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Branch Short
     *
     * @title Branch Short
    */
    export interface branch_short {
        name: string;
        commit: {
            sha: string;
            url: string;
        };
        "protected": boolean;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.branch_short[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const branches = value ?? [];
  const branchCount = branches.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const content = (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="px-4 py-3 bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Branches ({branchCount})
        </h2>
      </div>

      {branchCount > 0 ? (
        <ul className="divide-y divide-gray-200">
          {branches.map((branch, idx) => {
            const shortSha = branch.commit.sha.slice(0, 7);
            return (
              <li
                key={idx}
                className="px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <LucideReact.GitBranch
                    size={16}
                    className="text-gray-500"
                    aria-label="Branch icon"
                  />
                  <span
                    className="font-medium text-gray-800 truncate"
                    title={branch.name}
                  >
                    {branch.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <LucideReact.GitCommit
                      size={16}
                      className="text-gray-500"
                      aria-label="Commit SHA"
                    />
                    <span className="font-mono text-sm text-gray-600">
                      {shortSha}
                    </span>
                  </div>
                  {branch.commit.url && (
                    <LucideReact.Link
                      size={16}
                      className="text-blue-500"
                      aria-label="Commit URL available"
                    />
                  )}
                  {branch["protected"] && (
                    <LucideReact.Lock
                      size={16}
                      className="text-red-500"
                      aria-label="Protected branch"
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center justify-center p-4 text-gray-500">
          <LucideReact.AlertCircle
            size={24}
            className="flex-shrink-0"
            aria-label="No branches"
          />
          <span className="ml-2">No branches available</span>
        </div>
      )}
    </div>
  );

  // 3. Return the React element.
  return content;
}
