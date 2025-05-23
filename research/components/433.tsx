import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsCodespacesSecrets {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            secrets: AutoViewInputSubTypes.codespaces_org_secret[];
        }
    }
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export interface codespaces_org_secret {
        /**
         * The name of the secret
        */
        name: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The type of repositories in the organization that the secret is visible to
        */
        visibility: "all" | "private" | "selected";
        /**
         * The API URL at which the list of repositories this secret is visible to can be retrieved
        */
        selected_repositories_url?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsCodespacesSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const totalSecrets = value.total_count;
  const secrets = value.secrets;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-gray-700 mr-2" aria-label="Secrets" />
        <h2 className="text-lg font-semibold text-gray-800">
          Organization Secrets ({totalSecrets})
        </h2>
      </div>

      {secrets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <LucideReact.AlertCircle size={24} className="mb-2" aria-label="No data" />
          <span>No secrets available</span>
        </div>
      ) : (
        <ul className="space-y-3">
          {secrets.map((secret: AutoViewInputSubTypes.codespaces_org_secret) => (
            <li
              key={secret.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 truncate">
                  {secret.name}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  {secret.visibility === 'all' && (
                    <LucideReact.Globe
                      size={16}
                      className="mr-1"
                      aria-label="Visible to all repositories"
                    />
                  )}
                  {secret.visibility === 'private' && (
                    <LucideReact.Lock
                      size={16}
                      className="mr-1"
                      aria-label="Visible to private repositories"
                    />
                  )}
                  {secret.visibility === 'selected' && (
                    <LucideReact.Tag
                      size={16}
                      className="mr-1"
                      aria-label="Visible to selected repositories"
                    />
                  )}
                  <span className="capitalize">{secret.visibility}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
                <div className="flex items-center mb-1 sm:mb-0">
                  <LucideReact.Calendar size={14} className="mr-1" aria-label="Created date" />
                  <span>Created: {formatDate(secret.created_at)}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.RefreshCcw size={14} className="mr-1" aria-label="Updated date" />
                  <span>Updated: {formatDate(secret.updated_at)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
