import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiUserCodespacesSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.codespaces_secret[];
        };
    }
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export type codespaces_secret = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiUserCodespacesSecrets.GetResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived constants
  const totalSecrets: number = value.total_count;
  const secrets: AutoViewInputSubTypes.codespaces_secret[] = value.secrets;

  // Helper to format ISO dates to a short, readable form
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Map visibility to badge color classes
  const getVisibilityClasses = (
    visibility: AutoViewInputSubTypes.codespaces_secret['visibility'],
  ): string => {
    switch (visibility) {
      case 'all':
        return 'text-green-800 bg-green-100';
      case 'private':
        return 'text-yellow-800 bg-yellow-100';
      case 'selected':
        return 'text-blue-800 bg-blue-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  // Render
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Codespaces Secrets ({totalSecrets})
      </h2>
      <ul className="space-y-4">
        {secrets.map((secret) => {
          const { name, created_at, updated_at, visibility } = secret;
          return (
            <li
              key={name}
              className="p-4 border border-gray-200 rounded-md hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-md font-medium text-gray-800 truncate">
                  {name}
                </span>
                <span
                  className={`mt-2 sm:mt-0 inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${getVisibilityClasses(
                    visibility,
                  )}`}
                >
                  {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <div>
                  Created:{' '}
                  <time dateTime={created_at}>{formatDate(created_at)}</time>
                </div>
                <div>
                  Updated:{' '}
                  <time dateTime={updated_at}>{formatDate(updated_at)}</time>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
