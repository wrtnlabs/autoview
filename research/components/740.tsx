import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposEnvironmentsSecrets {
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
  AutoViewInputSubTypes.IApiReposEnvironmentsSecrets.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sortedSecrets = React.useMemo(
    () =>
      [...value.secrets].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      ),
    [value.secrets],
  );

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Secrets ({value.total_count})
        </h2>
      </div>

      {value.total_count === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={32} />
          <span className="mt-2">No secrets available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {sortedSecrets.map((secret) => (
            <li
              key={secret.name}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-800 truncate">
                {secret.name}
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-2 sm:mt-0">
                <div className="flex items-center sm:mr-4">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span className="ml-1">
                    Created: {formatDate(secret.created_at)}
                  </span>
                </div>
                <div className="flex items-center mt-1 sm:mt-0">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
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
