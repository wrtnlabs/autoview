import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsDependabotSecrets {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.organization_dependabot_secret[];
        };
    }
    /**
     * Secrets for GitHub Dependabot for an organization.
     *
     * @title Dependabot Secret for an Organization
    */
    export type organization_dependabot_secret = {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsDependabotSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getVisibilityMeta = (
    vis: AutoViewInputSubTypes.organization_dependabot_secret['visibility'],
  ): { label: string; colorClasses: string } => {
    switch (vis) {
      case 'all':
        return { label: 'All Repositories', colorClasses: 'bg-green-100 text-green-800' };
      case 'private':
        return { label: 'Private', colorClasses: 'bg-red-100 text-red-800' };
      case 'selected':
        return { label: 'Selected', colorClasses: 'bg-yellow-100 text-yellow-800' };
      default:
        return { label: vis, colorClasses: 'bg-gray-100 text-gray-800' };
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Dependabot Secrets{' '}
        <span className="text-gray-600">({value.total_count})</span>
      </h2>
      <ul className="space-y-4">
        {value.secrets.map(
          (
            secret: AutoViewInputSubTypes.organization_dependabot_secret,
          ) => {
            const { label, colorClasses } = getVisibilityMeta(
              secret.visibility,
            );
            return (
              <li
                key={secret.name + secret.created_at}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 p-3 rounded"
              >
                <div className="space-y-1">
                  <p className="text-gray-900 font-medium truncate">
                    {secret.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Created: {formatDate(secret.created_at)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Updated: {formatDate(secret.updated_at)}
                  </p>
                </div>
                <span
                  className={`${colorClasses} mt-2 md:mt-0 px-2 py-1 rounded-full text-xs font-semibold`}
                >
                  {label}
                </span>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
}
