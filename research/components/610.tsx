import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsSecrets {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsSecrets.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount: number = value.total_count;
  const formattedTotalCount = totalCount.toLocaleString();

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Actions Secrets</h2>
        <span className="text-sm font-medium text-gray-600">
          Total: {formattedTotalCount}
        </span>
      </div>
      <ul className="mt-4 divide-y divide-gray-200">
        {value.secrets.map((secret, index) => {
          const created = formatDate(secret.created_at);
          const updated = formatDate(secret.updated_at);
          return (
            <li key={index} className="py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {secret.name}
                </p>
                <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500">
                  <span>Created: {created}</span>
                  <span>Updated: {updated}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
