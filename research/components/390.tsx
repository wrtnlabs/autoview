import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  const githubAllowed = value.github_owned_allowed ?? false;
  const verifiedAllowed = value.verified_allowed ?? false;
  const patterns = value.patterns_allowed ?? [];
  const maxPatternsToShow = 5;
  const displayedPatterns = patterns.slice(0, maxPatternsToShow);
  const remainingCount = patterns.length - displayedPatterns.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-gray-800 max-w-md mx-auto">
      <header className="flex items-center mb-4">
        <LucideReact.GitBranch className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold">
          Selected Actions Settings
        </h2>
      </header>
      <dl className="space-y-4">
        <div className="flex items-center justify-between">
          <dt className="font-medium">GitHub-owned Actions</dt>
          <dd className="flex items-center">
            {githubAllowed ? (
              <>
                <LucideReact.CheckCircle className="text-green-600" size={18} />
                <span className="ml-1 text-green-700">Allowed</span>
              </>
            ) : (
              <>
                <LucideReact.XCircle className="text-red-600" size={18} />
                <span className="ml-1 text-red-700">Not allowed</span>
              </>
            )}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="font-medium">Verified Marketplace Actions</dt>
          <dd className="flex items-center">
            {verifiedAllowed ? (
              <>
                <LucideReact.CheckCircle className="text-green-600" size={18} />
                <span className="ml-1 text-green-700">Allowed</span>
              </>
            ) : (
              <>
                <LucideReact.XCircle className="text-red-600" size={18} />
                <span className="ml-1 text-red-700">Not allowed</span>
              </>
            )}
          </dd>
        </div>
        <div>
          <dt className="font-medium">Allowed Patterns</dt>
          {patterns.length === 0 ? (
            <div className="mt-1 flex items-center text-gray-500">
              <LucideReact.AlertCircle size={18} />
              <span className="ml-1">No patterns specified</span>
            </div>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-2">
              {displayedPatterns.map((pattern, idx) => (
                <li
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-sm rounded-lg truncate"
                  title={pattern}
                >
                  {pattern}
                </li>
              ))}
              {remainingCount > 0 && (
                <li className="px-2 py-1 bg-gray-100 text-sm rounded-lg">
                  +{remainingCount} more
                </li>
              )}
            </ul>
          )}
        </div>
      </dl>
    </div>
  );
}
