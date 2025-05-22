import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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

  const formattedCreated = createdDate.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let visibilityLabel: string;
  let visibilityIcon: JSX.Element;
  switch (value.visibility) {
    case "all":
      visibilityLabel = "All Repositories";
      visibilityIcon = (
        <LucideReact.Globe size={16} className="text-blue-500" />
      );
      break;
    case "private":
      visibilityLabel = "Private Repositories";
      visibilityIcon = (
        <LucideReact.Lock size={16} className="text-yellow-500" />
      );
      break;
    case "selected":
      visibilityLabel = "Selected Repositories";
      visibilityIcon = (
        <LucideReact.ListChecks size={16} className="text-green-500" />
      );
      break;
    default:
      visibilityLabel = value.visibility;
      visibilityIcon = (
        <LucideReact.HelpCircle size={16} className="text-gray-400" />
      );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Secret Name */}
      <div className="flex items-center space-x-2">
        <LucideReact.Key size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-y-3 text-sm text-gray-700">
        {/* Visibility */}
        <div className="flex items-center space-x-2">
          {visibilityIcon}
          <span className="font-medium">{visibilityLabel}</span>
        </div>

        {/* Created At */}
        <div className="flex items-center space-x-2">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span>Created:</span>
          <span className="font-medium">{formattedCreated}</span>
        </div>

        {/* Updated At */}
        <div className="flex items-center space-x-2">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span>Updated:</span>
          <span className="font-medium">{formattedUpdated}</span>
        </div>

        {/* Selected Repositories URL */}
        {value.visibility === "selected" && (
          <div className="flex items-start space-x-2 break-all">
            <LucideReact.Link size={16} className="text-gray-500" />
            <span className="text-xs text-gray-600">
              {value.selected_repositories_url}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
