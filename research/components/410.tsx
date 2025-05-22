import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.organization_actions_secret[];
        };
    }
    /**
     * Secrets for GitHub Actions for an organization.
     *
     * @title Actions Secret for an Organization
    */
    export type organization_actions_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Visibility of a secret
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalSecrets = value.total_count;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const visibilityConfig = {
    all: { label: 'All Repositories', color: 'bg-green-100 text-green-800' },
    private: { label: 'Private', color: 'bg-yellow-100 text-yellow-800' },
    selected: { label: 'Selected Repositories', color: 'bg-blue-100 text-blue-800' },
  } as const;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Organization Actions Secrets ({totalSecrets})
      </h2>
      <ul className="space-y-4">
        {value.secrets.map((secret) => {
          const vis = visibilityConfig[secret.visibility];
          return (
            <li
              key={secret.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-md"
            >
              <div className="flex-1 min-w-0">
                <p className="text-md font-medium text-gray-800 truncate">
                  {secret.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Created:{' '}
                  <span className="font-semibold text-gray-700">
                    {formatDate(secret.created_at)}
                  </span>{' '}
                  | Updated:{' '}
                  <span className="font-semibold text-gray-700">
                    {formatDate(secret.updated_at)}
                  </span>
                </p>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0">
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${vis.color}`}
                >
                  {vis.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
