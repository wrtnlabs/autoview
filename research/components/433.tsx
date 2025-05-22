import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsCodespacesSecrets {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      secrets: AutoViewInputSubTypes.codespaces_org_secret[];
    };
  }
  /**
   * Secrets for a GitHub Codespace.
   *
   * @title Codespaces Secret
   */
  export type codespaces_org_secret = {
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
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsCodespacesSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, secrets } = value;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (secrets.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No secrets available.</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center mb-4">
        <LucideReact.Key className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-700">
          {total_count} Secret{total_count !== 1 ? "s" : ""}
        </h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {secrets.map((secret) => (
          <li key={secret.name} className="py-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex items-center">
                <LucideReact.Key className="text-indigo-500" size={16} />
                <span className="ml-2 text-gray-800 font-medium truncate">
                  {secret.name}
                </span>
              </div>
              <span
                className={`mt-2 sm:mt-0 text-sm px-2 py-0.5 rounded-full ${
                  secret.visibility === "all"
                    ? "bg-green-100 text-green-800"
                    : secret.visibility === "private"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {secret.visibility === "all"
                  ? "All repositories"
                  : secret.visibility === "private"
                    ? "Private repositories"
                    : "Selected repositories"}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
              <div className="flex items-center">
                <LucideReact.Calendar size={14} className="mr-1" />
                <span>Created: {formatDate(secret.created_at)}</span>
              </div>
              <div className="flex items-center">
                <LucideReact.RefreshCw size={14} className="mr-1" />
                <span>Updated: {formatDate(secret.updated_at)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
