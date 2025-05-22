import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  );
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  );
  const visibilityOptions: Record<
    AutoViewInput["visibility"],
    { label: string; bgClass: string; icon: React.ComponentType<any> }
  > = {
    all: {
      label: "All Repositories",
      bgClass: "bg-blue-100 text-blue-800",
      icon: LucideReact.Globe,
    },
    private: {
      label: "Private",
      bgClass: "bg-gray-100 text-gray-800",
      icon: LucideReact.Lock,
    },
    selected: {
      label: "Selected Repositories",
      bgClass: "bg-amber-100 text-amber-800",
      icon: LucideReact.List,
    },
  };
  const vis = visibilityOptions[value.visibility];
  const VisIcon = vis.icon;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Secret Name */}
      <div className="flex items-center mb-3">
        <LucideReact.Key size={20} className="text-gray-700 mr-2" />
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>

      {/* Details List */}
      <dl className="space-y-4">
        {/* Visibility */}
        <div className="flex items-center justify-between">
          <dt className="text-sm font-medium text-gray-500">Visibility</dt>
          <dd
            className={`inline-flex items-center text-xs font-medium ${vis.bgClass} px-2 py-0.5 rounded`}
          >
            <VisIcon size={14} className="mr-1" />
            {vis.label}
          </dd>
        </div>

        {/* Created At */}
        <div className="flex items-center justify-between">
          <dt className="flex items-center text-sm font-medium text-gray-500">
            <LucideReact.Calendar size={16} className="mr-1" />
            Created
          </dt>
          <dd className="text-sm text-gray-900">{formattedCreatedAt}</dd>
        </div>

        {/* Updated At */}
        <div className="flex items-center justify-between">
          <dt className="flex items-center text-sm font-medium text-gray-500">
            <LucideReact.RefreshCcw size={16} className="mr-1" />
            Updated
          </dt>
          <dd className="text-sm text-gray-900">{formattedUpdatedAt}</dd>
        </div>

        {/* Selected Repositories URL */}
        {value.visibility === "selected" && value.selected_repositories_url && (
          <div className="flex items-start justify-between">
            <dt className="flex items-center text-sm font-medium text-gray-500">
              <LucideReact.Link size={16} className="mr-1" />
              Repo Filter URL
            </dt>
            <dd className="text-sm text-blue-600 break-all">
              {value.selected_repositories_url}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
