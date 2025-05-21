import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Secrets for GitHub Dependabot for an organization.
     *
     * @title Dependabot Secret for an Organization
    */
    export type organization_dependabot_secret = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_dependabot_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formattedUpdatedAt = updatedDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const visibilityMap = {
    all: { label: 'All repositories', color: 'bg-green-100 text-green-800' },
    private: { label: 'Private repositories', color: 'bg-red-100 text-red-800' },
    selected: { label: 'Selected repositories', color: 'bg-yellow-100 text-yellow-800' },
  } as const;
  const visibility = visibilityMap[value.visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">{value.name}</h2>
      <span
        className={
          `inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ` +
          visibility.color
        }
      >
        {visibility.label}
      </span>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-4 text-sm">
        <div className="flex flex-col">
          <dt className="text-gray-500">Created at</dt>
          <dd className="text-gray-700">{formattedCreatedAt}</dd>
        </div>
        <div className="flex flex-col">
          <dt className="text-gray-500">Updated at</dt>
          <dd className="text-gray-700">{formattedUpdatedAt}</dd>
        </div>
        {value.visibility === 'selected' && value.selected_repositories_url && (
          <div className="sm:col-span-2 flex flex-col">
            <dt className="text-gray-500">Repositories URL</dt>
            <dd className="text-gray-700">
              <p className="truncate">{value.selected_repositories_url}</p>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
