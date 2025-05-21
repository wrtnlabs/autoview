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
  const githubAllowed = value.github_owned_allowed === true;
  const verifiedAllowed = value.verified_allowed === true;
  const patterns = value.patterns_allowed ?? [];

  const renderBadge = (allowed: boolean) => (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${
        allowed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {allowed ? 'Allowed' : 'Disabled'}
    </span>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Actions Policy</h3>
      <dl className="space-y-4">
        <div>
          <dt className="font-medium text-gray-700">GitHub-owned Actions</dt>
          <dd className="mt-1">{renderBadge(githubAllowed)}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Marketplace Verified Actions</dt>
          <dd className="mt-1">{renderBadge(verifiedAllowed)}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Specific Patterns Allowed</dt>
          <dd className="mt-2">
            {patterns.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {patterns.map((pattern) => (
                  <li
                    key={pattern}
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded truncate max-w-xs"
                  >
                    {pattern}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500 italic">None</span>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
