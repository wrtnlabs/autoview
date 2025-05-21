import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsOrganizationSecrets.GetResponse;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived values and helpers
  const secretCountLabel = `${value.total_count} secret${value.total_count !== 1 ? "s" : ""}`;

  const sortedSecrets = React.useMemo(
    () =>
      [...value.secrets].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    [value.secrets]
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Organization Secrets ({secretCountLabel})
      </h2>
      <ul className="space-y-4">
        {sortedSecrets.map((secret) => (
          <li
            key={secret.name}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-3 rounded border border-gray-200"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {secret.name}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 flex space-x-4 text-sm text-gray-600">
              <span>Created: {formatDate(secret.created_at)}</span>
              <span>Updated: {formatDate(secret.updated_at)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
