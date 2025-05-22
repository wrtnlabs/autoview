import LucideReact from "lucide-react";
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

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <LucideReact.Settings size={20} className="text-gray-600" />
        Selected Actions Configuration
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">GitHub-owned actions</span>
          {githubAllowed ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-700">Marketplace verified actions</span>
          {verifiedAllowed ? (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          ) : (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
        </div>
      </div>

      <div className="mt-6">
        <span className="block text-gray-700 font-medium mb-2">
          Allowed Patterns
        </span>
        {patterns.length > 0 ? (
          <div className="flex flex-wrap">
            {patterns.map((pattern, idx) => (
              <span
                key={idx}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded-full mr-2 mb-2"
              >
                {pattern}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">No patterns specified</div>
        )}
      </div>
    </div>
  );
}
