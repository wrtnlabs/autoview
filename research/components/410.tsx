import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsActionsSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.organization_actions_secret[];
        }
    }
    /**
     * Secrets for GitHub Actions for an organization.
     *
     * @title Actions Secret for an Organization
    */
    export interface organization_actions_secret {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsActionsSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center text-gray-800">
          <LucideReact.Lock size={20} className="mr-2 text-gray-600" />
          Secrets
        </h2>
        <span className="text-sm text-gray-500">
          {value.total_count} total
        </span>
      </div>

      {value.total_count === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={32} className="mb-2" />
          <span>No secrets available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {value.secrets.map((secret) => (
            <li
              key={secret.name}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-100"
            >
              <div className="flex items-center mb-2 md:mb-0">
                <LucideReact.Key size={16} className="text-indigo-500 mr-2" />
                <span className="font-medium text-gray-800 truncate">
                  {secret.name}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-500">
                <div className="flex items-center mb-1 sm:mb-0">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>Created {formatDate(secret.created_at)}</span>
                </div>
                <div className="flex items-center mb-1 sm:mb-0">
                  <LucideReact.RefreshCw size={16} className="mr-1" />
                  <span>Updated {formatDate(secret.updated_at)}</span>
                </div>
                <div className="flex items-center">
                  {secret.visibility === 'all' && (
                    <LucideReact.Globe
                      size={16}
                      className="text-green-500 mr-1"
                      aria-label="All repositories"
                    />
                  )}
                  {secret.visibility === 'private' && (
                    <LucideReact.Lock
                      size={16}
                      className="text-yellow-500 mr-1"
                      aria-label="Private repositories"
                    />
                  )}
                  {secret.visibility === 'selected' && (
                    <LucideReact.ListChecks
                      size={16}
                      className="text-blue-500 mr-1"
                      aria-label="Selected repositories"
                    />
                  )}
                  <span className="capitalize text-gray-700">
                    {secret.visibility}
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
