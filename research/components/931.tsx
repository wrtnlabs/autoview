import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiUserCodespacesSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.codespaces_secret[];
        }
    }
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export interface codespaces_secret {
        /**
         * The name of the secret
        */
        name: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the secret was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The type of repositories in the organization that the secret is visible to
        */
        visibility: "all" | "private" | "selected";
        /**
         * The API URL at which the list of repositories this secret is visible to can be retrieved
        */
        selected_repositories_url: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiUserCodespacesSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, secrets } = value;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getVisibilityIcon = (visibility: AutoViewInputSubTypes.codespaces_secret['visibility']) => {
    switch (visibility) {
      case 'all':
        return <LucideReact.Globe className="text-blue-500" size={16} aria-label="Public" />;
      case 'private':
        return <LucideReact.Lock className="text-red-500" size={16} aria-label="Private" />;
      case 'selected':
        return <LucideReact.ListChecks className="text-amber-500" size={16} aria-label="Selected" />;
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center text-gray-700">
        <LucideReact.Lock className="mr-2" size={20} />
        <span className="font-semibold">Total Secrets:</span>
        <span className="ml-1 text-indigo-600">{total_count}</span>
      </div>

      {/* Secrets List */}
      <ul className="space-y-4">
        {secrets.map((secret) => (
          <li
            key={secret.name}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            {/* Header: Name & Visibility */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center truncate">
                <LucideReact.Key className="text-gray-700 mr-2" size={18} />
                <span className="font-medium text-gray-800 truncate">{secret.name}</span>
              </div>
              <div>{getVisibilityIcon(secret.visibility)}</div>
            </div>

            {/* Metadata: Created, Updated, Selected Repos URL */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar className="mr-1" size={14} />
                <span>Created: {formatDate(secret.created_at)}</span>
              </div>
              <div className="flex items-center mt-2 sm:mt-0">
                <LucideReact.Clock className="mr-1" size={14} />
                <span>Updated: {formatDate(secret.updated_at)}</span>
              </div>
              {secret.visibility === 'selected' && (
                <div className="flex items-center mt-2 sm:mt-0 max-w-xs">
                  <LucideReact.Link className="mr-1" size={14} />
                  <span
                    className="truncate"
                    title={secret.selected_repositories_url}
                  >
                    {secret.selected_repositories_url}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
