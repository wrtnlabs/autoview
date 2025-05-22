import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Private registry configuration for an organization
   *
   * @title Organization private registry
   */
  export type org_private_registry_configuration_with_selected_repositories = {
    /**
     * The name of the private registry configuration.
     */
    name: string;
    /**
     * The registry type.
     */
    registry_type: "maven_repository";
    /**
     * The username to use when authenticating with the private registry.
     */
    username?: string;
    /**
     * Which type of organization repositories have access to the private registry. `selected` means only the repositories specified by `selected_repository_ids` can access the private registry.
     */
    visibility: "all" | "private" | "selected";
    /**
     * An array of repository IDs that can access the organization private registry when `visibility` is set to `selected`.
     */
    selected_repository_ids?: (number & tags.Type<"int32">)[];
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.org_private_registry_configuration_with_selected_repositories;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();
  const selectedCount = value.selected_repository_ids?.length ?? 0;

  const visibilityMap: Record<
    AutoViewInput["visibility"],
    { label: string; icon: JSX.Element }
  > = {
    all: {
      label: "All Repositories",
      icon: <LucideReact.Users size={16} className="text-green-500" />,
    },
    private: {
      label: "Private",
      icon: <LucideReact.Lock size={16} className="text-yellow-500" />,
    },
    selected: {
      label: "Selected",
      icon: <LucideReact.CheckCircle size={16} className="text-blue-500" />,
    },
  };
  const visibilityInfo = visibilityMap[value.visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
      {/* Title */}
      <div className="flex items-center mb-4">
        <LucideReact.Tag size={20} className="text-indigo-500" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>

      {/* Details */}
      <dl className="space-y-3 text-sm text-gray-600">
        {/* Registry Type */}
        <div className="flex items-center">
          <LucideReact.Package size={16} className="text-gray-400" />
          <dt className="ml-2 capitalize">
            {value.registry_type.replace(/_/g, " ")}
          </dt>
        </div>

        {/* Username (if provided) */}
        {value.username && (
          <div className="flex items-center">
            <LucideReact.User size={16} className="text-gray-400" />
            <dt className="ml-2">{value.username}</dt>
          </div>
        )}

        {/* Visibility */}
        <div className="flex items-center">
          {visibilityInfo.icon}
          <dt className="ml-2">{visibilityInfo.label}</dt>
          {value.visibility === "selected" && (
            <span className="ml-1 text-gray-500">({selectedCount})</span>
          )}
        </div>

        {/* Created At */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <dt className="ml-2">Created:</dt>
          <dd className="ml-1">{createdAt}</dd>
        </div>

        {/* Updated At */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <dt className="ml-2">Updated:</dt>
          <dd className="ml-1">{updatedAt}</dd>
        </div>
      </dl>
    </div>
  );
}
