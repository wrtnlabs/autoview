import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsSecrets {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      secrets: AutoViewInputSubTypes.actions_secret[];
    };
  }
  /**
   * Set secrets for GitHub Actions.
   *
   * @title Actions Secret
   */
  export type actions_secret = {
    /**
     * The name of the secret.
     */
    name: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format ISO date strings into a human-friendly format.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  //    Sort secrets by most recently updated first.
  const sortedSecrets = [...value.secrets].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={24} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Secrets ({value.total_count})
        </h2>
      </div>

      {sortedSecrets.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2 text-sm">No secrets available</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {sortedSecrets.map((secret) => (
            <li
              key={secret.name}
              className="py-3 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center">
                <LucideReact.Key size={16} className="text-gray-500" />
                <span className="ml-2 text-sm font-medium text-gray-700 truncate">
                  {secret.name}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-2 sm:mt-0 space-y-1 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span className="ml-1">
                    Created: {formatDate(secret.created_at)}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.RefreshCw size={16} className="text-gray-400" />
                  <span className="ml-1">
                    Updated: {formatDate(secret.updated_at)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
