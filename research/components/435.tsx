import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.codespaces_org_secret;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and transformation
  const formattedCreatedAt = new Date(value.created_at).toLocaleString('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  
  const visibilityStyles: Record<AutoViewInput['visibility'], { label: string; classes: string }> = {
    all: { label: 'All Repositories', classes: 'bg-green-100 text-green-800' },
    private: { label: 'Private Repositories', classes: 'bg-blue-100 text-blue-800' },
    selected: { label: 'Selected Repositories', classes: 'bg-yellow-100 text-yellow-800' },
  };
  
  const { label: visibilityLabel, classes: visibilityColor } = visibilityStyles[value.visibility];

  // 2. Compose the visual structure
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${visibilityColor}`}>
          {visibilityLabel}
        </span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div>
          <span className="font-medium">Created:</span> {formattedCreatedAt}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {formattedUpdatedAt}
        </div>
      </div>
      {value.visibility === 'selected' && value.selected_repositories_url && (
        <div className="text-sm text-gray-600 break-all">
          <span className="font-medium">Repos URL:</span> {value.selected_repositories_url}
        </div>
      )}
    </div>
  );
}
