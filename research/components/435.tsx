import LucideReact from "lucide-react";
import React, { JSX } from "react";

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

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedCreated = createdDate.toLocaleString(undefined, dateOptions);
  const formattedUpdated = updatedDate.toLocaleString(undefined, dateOptions);

  const visibilityMap: Record<
    AutoViewInput["visibility"],
    { label: string; icon: JSX.Element }
  > = {
    all: {
      label: "All Repositories",
      icon: <LucideReact.Globe size={16} className="text-green-500" />,
    },
    private: {
      label: "Private",
      icon: <LucideReact.Lock size={16} className="text-red-500" />,
    },
    selected: {
      label: "Selected Repositories",
      icon: <LucideReact.List size={16} className="text-amber-500" />,
    },
  };
  const { label: visibilityLabel, icon: visibilityIcon } =
    visibilityMap[value.visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Secret Title */}
      <div className="flex items-center gap-2 mb-4">
        <LucideReact.Key size={20} className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Timestamps */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Edit2 size={16} />
          <span>Updated: {formattedUpdated}</span>
        </div>
      </div>

      {/* Visibility */}
      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
        {visibilityIcon}
        <span>{visibilityLabel}</span>
      </div>

      {/* Selected Repositories URL (if applicable) */}
      {value.visibility === "selected" && value.selected_repositories_url && (
        <div className="mt-2 flex items-center gap-1 text-sm text-blue-600 break-all">
          <LucideReact.Link size={16} />
          <span className="truncate">{value.selected_repositories_url}</span>
        </div>
      )}
    </div>
  );
}
