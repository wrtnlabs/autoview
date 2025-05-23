import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Private registry configuration for an organization
     *
     * @title Organization private registry
    */
    export interface org_private_registry_configuration_with_selected_repositories {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.org_private_registry_configuration_with_selected_repositories;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedDate = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const typeLabel = value.registry_type
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");

  let visibilityLabel: string;
  let VisibilityIcon: JSX.Element;
  const count = value.selected_repository_ids?.length ?? 0;
  switch (value.visibility) {
    case "all":
      visibilityLabel = "All repositories";
      VisibilityIcon = (
        <LucideReact.Users size={16} className="text-gray-500 mr-1" />
      );
      break;
    case "private":
      visibilityLabel = "Private";
      VisibilityIcon = (
        <LucideReact.Lock size={16} className="text-gray-500 mr-1" />
      );
      break;
    case "selected":
      visibilityLabel = `Selected (${count})`;
      VisibilityIcon = (
        <LucideReact.Tag size={16} className="text-gray-500 mr-1" />
      );
      break;
    default:
      visibilityLabel = value.visibility;
      VisibilityIcon = <LucideReact.EyeOff size={16} className="text-gray-500 mr-1" />;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-1">
        <div className="flex items-center">
          <LucideReact.Package size={16} className="text-gray-500 mr-1" />
          <span>{typeLabel}</span>
        </div>
        {value.username && (
          <div className="flex items-center">
            <LucideReact.User size={16} className="text-gray-500 mr-1" />
            <span>{value.username}</span>
          </div>
        )}
        <div className="flex items-center">
          {VisibilityIcon}
          <span>{visibilityLabel}</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500 mr-1" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500 mr-1" />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>
    </div>
  );
}
