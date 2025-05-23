import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface selected_actions {
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
    }
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
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Selected Actions Configuration
      </h2>
      <div className="space-y-4">
        {/* GitHub-owned actions status */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700">GitHub-owned Actions</span>
          {githubAllowed ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              aria-label="Allowed"
            />
          ) : (
            <LucideReact.XCircle
              className="text-red-500"
              size={16}
              aria-label="Not Allowed"
            />
          )}
        </div>

        {/* Verified actions status */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Marketplace Verified Actions</span>
          {verifiedAllowed ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              aria-label="Allowed"
            />
          ) : (
            <LucideReact.XCircle
              className="text-red-500"
              size={16}
              aria-label="Not Allowed"
            />
          )}
        </div>

        {/* Patterns listing */}
        <div>
          <span className="text-gray-700">Allowed Patterns</span>
          {patterns.length > 0 ? (
            <ul className="mt-2 space-y-1 max-h-40 overflow-auto">
              {patterns.map((pattern) => (
                <li
                  key={pattern}
                  className="flex items-center text-sm text-gray-600"
                >
                  <LucideReact.Tag
                    className="text-blue-400 mr-2"
                    size={14}
                    aria-label="Pattern"
                  />
                  <span className="truncate">{pattern}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <LucideReact.AlertCircle
                className="text-gray-400 mr-2"
                size={16}
                aria-label="No Patterns"
              />
              <span>No specific patterns allowed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
}
