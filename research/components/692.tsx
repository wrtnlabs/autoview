import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposCodespacesSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedSecrets = value.secrets.map((secret) => ({
    ...secret,
    createdAt: new Date(secret.created_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    updatedAt: new Date(secret.updated_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-gray-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">
          Codespaces Secrets ({value.total_count})
        </h2>
      </div>

      {value.secrets.length === 0 ? (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={24} className="mr-2" />
          <span>No secrets available</span>
        </div>
      ) : (
        <ul className="space-y-3">
          {formattedSecrets.map((secret) => (
            <li
              key={secret.name}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-md"
            >
              <div className="flex items-center truncate">
                <LucideReact.Lock
                  size={16}
                  className="text-gray-400 mr-2 flex-shrink-0"
                />
                <span className="font-medium text-gray-800 truncate">
                  {secret.name}
                </span>
              </div>
              <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>Created: {secret.createdAt}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.RefreshCw size={16} className="mr-1" />
                  <span>Updated: {secret.updatedAt}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
