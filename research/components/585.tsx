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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive normalized values
  const githubOwnedAllowed = value.github_owned_allowed ?? false;
  const verifiedAllowed = value.verified_allowed ?? false;
  const patterns = value.patterns_allowed ?? [];

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Selected Actions</h2>
      <div className="space-y-4">
        {/* GitHub-owned actions status */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700">
            <LucideReact.Github size={16} className="text-gray-500" />
            GitHub-owned actions
          </span>
          {githubOwnedAllowed ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
        </div>

        {/* Verified marketplace actions status */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-700">
            <LucideReact.ShieldCheck size={16} className="text-gray-500" />
            Verified marketplace actions
          </span>
          {verifiedAllowed ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
        </div>

        {/* Allowed patterns list */}
        <div>
          <span className="flex items-center gap-2 text-gray-700">
            <LucideReact.Tag size={16} className="text-gray-500" />
            Allowed patterns
          </span>
          {patterns.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {patterns.map((pattern, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-800 px-2 py-1 text-sm rounded"
                >
                  {pattern}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No specific patterns allowed.</p>
          )}
        </div>
      </div>
    </div>
  );
}
