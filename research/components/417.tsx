import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Organization variable for GitHub Actions.
   *
   * @title Actions Variable for an Organization
   */
  export type organization_actions_variable = {
    /**
     * The name of the variable.
     */
    name: string;
    /**
     * The value of the variable.
     */
    value: string;
    /**
     * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
     */
    created_at: string;
    /**
     * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
     */
    updated_at: string;
    /**
     * Visibility of a variable
     */
    visibility: "all" | "private" | "selected";
    selected_repositories_url?: string & tags.Format<"uri">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_actions_variable;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt: string = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
  const updatedAt: string = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  // Derive badge styles and icon for visibility
  let visibilityIcon: React.ReactNode;
  let visibilityClasses: string;
  switch (value.visibility) {
    case "all":
      visibilityIcon = (
        <LucideReact.Eye size={16} className="text-green-500" aria-hidden />
      );
      visibilityClasses = "bg-green-100 text-green-800";
      break;
    case "private":
      visibilityIcon = (
        <LucideReact.EyeOff size={16} className="text-red-500" aria-hidden />
      );
      visibilityClasses = "bg-red-100 text-red-800";
      break;
    case "selected":
      visibilityIcon = (
        <LucideReact.List size={16} className="text-blue-500" aria-hidden />
      );
      visibilityClasses = "bg-blue-100 text-blue-800";
      break;
    default:
      visibilityIcon = null;
      visibilityClasses = "bg-gray-100 text-gray-800";
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
        <LucideReact.Tag size={20} className="text-gray-500" aria-hidden />
        <span className="truncate">{value.name}</span>
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Variable value is sensitive: masked display */}
        <div className="flex items-center gap-2">
          <LucideReact.Key size={16} className="text-gray-500" aria-hidden />
          <span className="ml-1 font-mono text-gray-700">••••••••</span>
        </div>

        {/* Visibility badge */}
        <div className="flex items-center gap-2">
          {visibilityIcon}
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${visibilityClasses}`}
          >
            {value.visibility.charAt(0).toUpperCase() +
              value.visibility.slice(1)}
          </span>
        </div>

        {/* Creation timestamp */}
        <div className="flex items-center gap-2">
          <LucideReact.Calendar
            size={16}
            className="text-gray-500"
            aria-hidden
          />
          <span className="text-gray-600 text-sm">Created: {createdAt}</span>
        </div>

        {/* Update timestamp */}
        <div className="flex items-center gap-2">
          <LucideReact.RefreshCw
            size={16}
            className="text-gray-500"
            aria-hidden
          />
          <span className="text-gray-600 text-sm">Updated: {updatedAt}</span>
        </div>

        {/* Selected repositories URL (if applicable) */}
        {value.visibility === "selected" && value.selected_repositories_url && (
          <div className="sm:col-span-2 flex items-center gap-2">
            <LucideReact.Link size={16} className="text-gray-500" aria-hidden />
            <span className="ml-1 text-blue-600 text-sm truncate">
              {value.selected_repositories_url}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
