import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.codespaces_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const formattedCreatedAt = createdDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const formattedUpdatedAt = updatedDate.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const visibilityLabels: Record<AutoViewInput["visibility"], string> = {
    all: "All repositories",
    private: "Private repositories",
    selected: "Selected repositories",
  };
  const visibilityLabel = visibilityLabels[value.visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-sm w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {value.name}
      </h2>
      <dl className="mt-3 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <dt className="font-medium">Created</dt>
          <dd>{formattedCreatedAt}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Updated</dt>
          <dd>{formattedUpdatedAt}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Visibility</dt>
          <dd>{visibilityLabel}</dd>
        </div>
        {value.visibility === "selected" && (
          <div>
            <dt className="font-medium">Repositories URL</dt>
            <dd className="mt-1 text-blue-600 break-all truncate">
              {value.selected_repositories_url}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
