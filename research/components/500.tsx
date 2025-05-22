import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.org_private_registry_configuration_with_selected_repositories;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const registryTypeMap: Record<AutoViewInput['registry_type'], string> = {
    maven_repository: 'Maven Repository',
  };
  const registryTypeLabel = registryTypeMap[value.registry_type] || value.registry_type;
  const registryBadgeColor = 'bg-blue-100 text-blue-800';

  const visibilityMap: Record<AutoViewInput['visibility'], { label: string; color: string }> = {
    all:    { label: 'All Repositories', color: 'bg-green-100 text-green-800' },
    private:{ label: 'Private',          color: 'bg-red-100 text-red-800' },
    selected:{ label: `Selected (${value.selected_repository_ids?.length ?? 0})`, color: 'bg-yellow-100 text-yellow-800' },
  };
  const visibilityData = visibilityMap[value.visibility];

  const createdAt = new Date(value.created_at).toLocaleString();
  const updatedAt = new Date(value.updated_at).toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h2>
        <span className={`px-2 py-1 text-xs font-medium rounded ${registryBadgeColor}`}>
          {registryTypeLabel}
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {value.username && (
          <div className="flex">
            <span className="font-medium text-gray-700 w-24">Username:</span>
            <span className="text-gray-900">{value.username}</span>
          </div>
        )}
        <div className="flex items-center">
          <span className="font-medium text-gray-700 w-24">Visibility:</span>
          <span className={`inline-flex items-center px-2 py-0.5 text-sm font-medium rounded ${visibilityData.color}`}>
            {visibilityData.label}
          </span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-24">Created:</span>
          <span className="text-gray-600 text-sm">{createdAt}</span>
        </div>
        <div className="flex">
          <span className="font-medium text-gray-700 w-24">Updated:</span>
          <span className="text-gray-600 text-sm">{updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
