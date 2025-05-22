import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsCodespacesSecrets.GetResponse;



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
      minute: "numeric",
    });

  const visibilityMap: Record<
    AutoViewInputSubTypes.codespaces_org_secret["visibility"],
    { label: string; classes: string }
  > = {
    all: { label: "All repositories", classes: "bg-green-100 text-green-800" },
    private: { label: "Private repositories", classes: "bg-yellow-100 text-yellow-800" },
    selected: { label: "Selected repositories", classes: "bg-blue-100 text-blue-800" },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full p-4 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Secrets ({total_count})
      </h2>
      <div className="divide-y divide-gray-200">
        {secrets.length > 0 ? (
          secrets.map((secret) => {
            const vis = visibilityMap[secret.visibility];
            return (
              <div key={secret.name} className="py-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800 truncate">
                    {secret.name}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${vis.classes}`}
                  >
                    {vis.label}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <span>Created: {formatDate(secret.created_at)}</span>
                  <span className="mx-2">•</span>
                  <span>Updated: {formatDate(secret.updated_at)}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-3 text-sm text-gray-500">
            No secrets available.
          </div>
        )}
      </div>
    </div>
  );
}
