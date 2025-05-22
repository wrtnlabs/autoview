import LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  /**
   * Branch Short
   *
   * @title Branch Short
   */
  export type branch_short = {
    name: string;
    commit: {
      sha: string;
      url: string;
    };
    protected: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.branch_short[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort branches alphabetically by name and truncate commit SHA for display.
  const branches = React.useMemo(
    () => [...value].sort((a, b) => a.name.localeCompare(b.name)),
    [value],
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.GitBranch size={20} className="mr-2 text-gray-700" />
        Branches
      </h2>

      {branches.length === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No branches available</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {branches.map((branch) => {
            const shortSha = branch.commit.sha.slice(0, 7);
            return (
              <li
                key={branch.commit.sha}
                className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center mb-2 sm:mb-0">
                  {branch.protected ? (
                    <LucideReact.Lock
                      size={16}
                      className="text-blue-500 mr-2"
                    />
                  ) : (
                    <LucideReact.Unlock
                      size={16}
                      className="text-gray-400 mr-2"
                    />
                  )}
                  <span className="text-gray-900 font-medium truncate">
                    {branch.name}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <code className="bg-gray-100 px-1 py-px rounded font-mono text-sm">
                    {shortSha}
                  </code>
                  <LucideReact.Link size={16} className="ml-2 text-gray-400" />
                  <span className="ml-1 truncate">{branch.commit.url}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
  // 3. Return the React element.
}
