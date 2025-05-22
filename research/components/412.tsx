import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Secrets for GitHub Actions for an organization.
     *
     * @title Actions Secret for an Organization
    */
    export type organization_actions_secret = {
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
export type AutoViewInput = AutoViewInputSubTypes.organization_actions_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const visibilityLabel =
    value.visibility.charAt(0).toUpperCase() + value.visibility.slice(1);
  const badgeClasses = {
    all: "bg-green-100 text-green-700",
    private: "bg-red-100 text-red-700",
    selected: "bg-yellow-100 text-yellow-700",
  }[value.visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${badgeClasses}`}
        >
          {visibilityLabel}
        </span>
      </div>
      <dl className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <dt className="font-medium">Created</dt>
          <dd>{createdDate}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Updated</dt>
          <dd>{updatedDate}</dd>
        </div>
        {value.visibility === "selected" && value.selected_repositories_url && (
          <div>
            <dt className="font-medium">Repositories URL</dt>
            <dd className="mt-1 truncate break-all text-blue-600">
              {value.selected_repositories_url}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
