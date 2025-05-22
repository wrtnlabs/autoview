import React from "react";
export namespace AutoViewInputSubTypes {
    export type selected_actions = {
        /**
         * Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization.
        */
        github_owned_allowed?: boolean;
        /**
         * Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators.
        */
        verified_allowed?: boolean;
        /**
         * Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.
         *
         * > [!NOTE]
         * > The `patterns_allowed` setting only applies to public repositories.
        */
        patterns_allowed?: string[];
    };
}
export type AutoViewInput = AutoViewInputSubTypes.selected_actions;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const githubAllowed = Boolean(value.github_owned_allowed);
  const verifiedAllowed = Boolean(value.verified_allowed);
  const patterns = value.patterns_allowed ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Permissions</h2>
      <ul className="space-y-4">
        <li className="flex justify-between items-center">
          <span className="text-sm text-gray-700">GitHub-owned Actions</span>
          <span
            className={
              githubAllowed
                ? 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'
                : 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'
            }
          >
            {githubAllowed ? 'Allowed' : 'Not allowed'}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Verified Marketplace Actions</span>
          <span
            className={
              verifiedAllowed
                ? 'px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800'
                : 'px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800'
            }
          >
            {verifiedAllowed ? 'Allowed' : 'Not allowed'}
          </span>
        </li>
        <li>
          <span className="text-sm text-gray-700">Allowed Patterns</span>
          {patterns.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {patterns.map((pattern: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md truncate max-w-[200px]"
                >
                  {pattern}
                </span>
              ))}
            </div>
          ) : (
            <span className="block mt-1 text-sm text-gray-500">No patterns specified</span>
          )}
        </li>
      </ul>
    </div>
  );
}
