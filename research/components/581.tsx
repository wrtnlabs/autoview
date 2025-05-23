import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsOrganizationSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.actions_secret[];
        }
    }
    /**
     * Set secrets for GitHub Actions.
     *
     * @title Actions Secret
    */
    export interface actions_secret {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsOrganizationSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return dateString;
    }
  };

  // Sort secrets by most recently updated first
  const sortedSecrets = [...value.secrets].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <LucideReact.Lock size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Organization Secrets
          </h2>
        </div>
        <div className="flex items-center text-gray-500">
          <LucideReact.List size={18} className="mr-1" />
          <span>{value.total_count} secrets</span>
        </div>
      </div>

      {/* Empty state */}
      {value.secrets.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2">No secrets found.</span>
        </div>
      ) : (
        /* Secrets list */
        <ul className="space-y-4">
          {sortedSecrets.map((secret) => (
            <li
              key={secret.name}
              className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-gray-50 rounded-md"
            >
              <div className="flex items-center mb-2 md:mb-0">
                <LucideReact.Key size={18} className="text-indigo-500" />
                <span className="ml-2 font-medium text-gray-800 truncate">
                  {secret.name}
                </span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span className="ml-1">
                    Created: {formatDate(secret.created_at)}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.RefreshCw
                    size={16}
                    className="text-gray-400"
                  />
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
