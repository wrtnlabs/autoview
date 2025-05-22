import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsOrganizationSecrets {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      secrets: AutoViewInputSubTypes.actions_secret[];
    };
  }
  /**
   * Set secrets for GitHub Actions.
   *
   * @title Actions Secret
   */
  export type actions_secret = {
    /**
     * The name of the secret.
     */
    name: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsOrganizationSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, secrets } = value;
  const formattedCount = total_count.toLocaleString();

  const formatDateTime = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Sort secrets by creation date descending for most recent first
  const sortedSecrets = [...secrets].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Header with total count */}
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-700">
          Secrets ({formattedCount})
        </h2>
      </div>

      {/* Empty state */}
      {sortedSecrets.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <p className="text-sm">No organization secrets found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {sortedSecrets.map((secret) => {
            const created = formatDateTime(secret.created_at);
            const updated = formatDateTime(secret.updated_at);

            return (
              <li
                key={secret.name}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:justify-between"
              >
                <div className="flex items-center mb-2 sm:mb-0">
                  <LucideReact.FileKey
                    size={20}
                    className="text-gray-500 mr-2"
                  />
                  <span className="text-gray-800 font-medium truncate">
                    {secret.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <LucideReact.Calendar size={16} className="mr-1" />
                    <time dateTime={secret.created_at}>{created}</time>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Clock size={16} className="mr-1" />
                    <time dateTime={secret.updated_at}>{updated}</time>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
