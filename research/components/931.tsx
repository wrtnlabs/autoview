import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiUserCodespacesSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, secrets } = value;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const getVisibilityIcon = (
    visibility: AutoViewInputSubTypes.codespaces_secret["visibility"],
  ): JSX.Element => {
    switch (visibility) {
      case "all":
        return <LucideReact.Users className="text-blue-500" size={16} />;
      case "private":
        return <LucideReact.Lock className="text-red-500" size={16} />;
      case "selected":
        return <LucideReact.Tag className="text-yellow-500" size={16} />;
      default:
        return <></>;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Secrets</h2>
        <div className="flex items-center text-gray-600">
          <LucideReact.Database size={20} className="mr-1" />
          <span className="font-medium">{total_count}</span>
        </div>
      </div>

      {/* Empty State */}
      {secrets.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2 text-sm">No secrets available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {secrets.map((secret) => (
            <li
              key={secret.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <h3
                  className="text-md font-medium text-gray-900 truncate"
                  title={secret.name}
                >
                  {secret.name}
                </h3>
                <div className="flex items-center text-gray-600">
                  {getVisibilityIcon(secret.visibility)}
                  <span className="ml-1 capitalize text-sm">
                    {secret.visibility}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex flex-col sm:flex-row sm:space-x-6 text-gray-500 text-sm">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="mr-1" />
                  <span>Created: {formatDate(secret.created_at)}</span>
                </div>
                <div className="flex items-center mt-1 sm:mt-0">
                  <LucideReact.Calendar size={16} className="mr-1" />
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
