import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Private registry configuration for an organization
     *
     * @title Organization private registry
    */
    export interface org_private_registry_configuration {
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
        username?: string | null;
        /**
         * Which type of organization repositories have access to the private registry.
        */
        visibility: "all" | "private" | "selected";
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.org_private_registry_configuration;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    registry_type,
    username,
    visibility,
    created_at,
    updated_at,
  } = value;

  // Human-readable registry type
  const registryTypeLabel = registry_type
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  // Format dates for display
  const formattedCreatedAt = new Date(created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
  const formattedUpdatedAt = new Date(updated_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  // Visibility icon and label
  let visibilityIcon: JSX.Element;
  let visibilityLabel: string;
  switch (visibility) {
    case 'all':
      visibilityIcon = <LucideReact.Users className="text-blue-500" size={16} />;
      visibilityLabel = 'All';
      break;
    case 'private':
      visibilityIcon = <LucideReact.Lock className="text-red-500" size={16} />;
      visibilityLabel = 'Private';
      break;
    case 'selected':
      visibilityIcon = <LucideReact.UserCheck className="text-green-500" size={16} />;
      visibilityLabel = 'Selected';
      break;
    default:
      visibilityIcon = <LucideReact.AlertTriangle className="text-gray-400" size={16} />;
      visibilityLabel = visibility;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{name}</h2>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Database className="mr-1 text-gray-500" size={16} />
          <span>{registryTypeLabel}</span>
        </div>
      </div>

      {/* Details */}
      <dl className="grid grid-cols-1 gap-3 text-gray-700 text-sm">
        {/* Username */}
        <div className="flex items-center">
          <LucideReact.User className="mr-2 text-gray-500" size={16} />
          <span>{username ?? <span className="italic text-gray-400">No user</span>}</span>
        </div>

        {/* Visibility */}
        <div className="flex items-center">
          {visibilityIcon}
          <span className="ml-2">{visibilityLabel}</span>
        </div>

        {/* Created At */}
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-2 text-gray-500" size={16} />
          <span>Created: {formattedCreatedAt}</span>
        </div>

        {/* Updated At */}
        <div className="flex items-center">
          <LucideReact.Calendar className="mr-2 text-gray-500" size={16} />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
      </dl>
    </div>
  );
}
