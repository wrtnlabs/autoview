import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.organization_dependabot_secret;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreated = new Date(value.created_at).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
  const formattedUpdated = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  // Determine icon and label for visibility
  let visibilityIcon: JSX.Element;
  let visibilityLabel: string;
  switch (value.visibility) {
    case "all":
      visibilityIcon = (
        <LucideReact.Users className="text-blue-500" size={16} />
      );
      visibilityLabel = "All Repositories";
      break;
    case "private":
      visibilityIcon = <LucideReact.Lock className="text-red-500" size={16} />;
      visibilityLabel = "Private";
      break;
    case "selected":
      visibilityIcon = (
        <LucideReact.List className="text-amber-500" size={16} />
      );
      visibilityLabel = "Selected";
      break;
    default:
      visibilityIcon = (
        <LucideReact.HelpCircle className="text-gray-400" size={16} />
      );
      visibilityLabel = value.visibility;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full p-4 bg-white rounded-lg shadow divide-y divide-gray-200">
      {/* Header: Secret Name */}
      <div className="pb-3">
        <h2 className="flex items-center text-lg font-semibold text-gray-800 truncate">
          <LucideReact.Key className="mr-2 text-gray-600" size={18} />
          <span>{value.name}</span>
        </h2>
      </div>

      {/* Details */}
      <div className="pt-3 space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-2 text-gray-400" size={16} />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-2 text-gray-400" size={16} />
          <span>Updated: {formattedUpdated}</span>
        </div>
        <div className="flex items-center">
          {visibilityIcon}
          <span className="ml-1">{visibilityLabel}</span>
        </div>
        {value.visibility === "selected" && value.selected_repositories_url && (
          <div className="flex items-center">
            <LucideReact.Link className="mr-2 text-gray-400" size={16} />
            <span className="truncate text-gray-700">
              {value.selected_repositories_url}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
