import React from "react";
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
        "protected": boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.branch_short[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Sort branches alphabetically and count total
  const branches = [...value].sort((a, b) => a.name.localeCompare(b.name));
  const totalBranches = branches.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Branches</h2>
        <span className="text-sm text-gray-500">
          {totalBranches} {totalBranches === 1 ? 'branch' : 'branches'}
        </span>
      </div>
      <div className="space-y-3">
        {totalBranches > 0 ? (
          branches.map((branch) => {
            const shortSha = branch.commit.sha.slice(0, 7);
            return (
              <div
                key={branch.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="font-medium text-gray-900 truncate">
                    {branch.name}
                  </span>
                  {branch.protected && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      Protected
                    </span>
                  )}
                </div>
                <span className="text-sm font-mono text-gray-600">
                  {shortSha}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500 italic">
            No branches available.
          </p>
        )}
      </div>
    </div>
  );
}
