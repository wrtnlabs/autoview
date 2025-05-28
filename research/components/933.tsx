import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export interface codespaces_secret {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.codespaces_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const createdAt = formatDate(value.created_at);
  const updatedAt = formatDate(value.updated_at);

  const visibilityMapping: Record<
    AutoViewInputSubTypes.codespaces_secret['visibility'],
    { label: string; icon: JSX.Element }
  > = {
    all: {
      label: 'All repositories',
      icon: <LucideReact.Globe size={16} className="text-gray-500" />,
    },
    private: {
      label: 'Private',
      icon: <LucideReact.Lock size={16} className="text-gray-500" />,
    },
    selected: {
      label: 'Selected repositories',
      icon: <LucideReact.Users size={16} className="text-gray-500" />,
    },
  };

  const visibilityInfo = visibilityMapping[value.visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow">
      <div className="flex items-center mb-4">
        <LucideReact.Key size={20} className="text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center">
          {visibilityInfo.icon}
          <span className="ml-2">{visibilityInfo.label}</span>
        </div>
        {value.visibility === 'selected' && (
          <div className="flex items-start">
            <LucideReact.Link size={16} className="text-gray-500 mt-0.5" />
            <span className="ml-2 break-all text-xs">{value.selected_repositories_url}</span>
          </div>
        )}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="ml-2">Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCw size={16} className="text-gray-500" />
          <span className="ml-2">Updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
