import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCodespacesSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.repo_codespaces_secret[];
        };
    }
    /**
     * Set repository secrets for GitHub Codespaces.
     *
     * @title Codespaces Secret
    */
    export type repo_codespaces_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespacesSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalSecrets = value.total_count;
  // Sort secrets by creation date descending so the newest appear first
  const sortedSecrets = [...value.secrets].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  // Format ISO date-time string into a human-readable form
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return (
      date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) +
      ', ' +
      date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Repository Secrets ({totalSecrets})
      </h2>

      {totalSecrets === 0 ? (
        <p className="text-gray-500">No secrets available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sortedSecrets.map((secret) => (
            <li
              key={secret.name}
              className="py-3 flex flex-col sm:flex-row sm:justify-between"
            >
              <span className="font-medium text-gray-900 truncate">{secret.name}</span>
              <div className="mt-1 sm:mt-0 text-sm text-gray-500 flex flex-col sm:items-end">
                <span>Created: {formatDate(secret.created_at)}</span>
                <span>Updated: {formatDate(secret.updated_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
