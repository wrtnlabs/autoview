import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Private registry configuration for an organization
     *
     * @title Organization private registry
    */
    export type org_private_registry_configuration = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.org_private_registry_configuration;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const registryTypeLabel =
    value.registry_type === "maven_repository"
      ? "Maven Repository"
      : value.registry_type;
  const visibilityLabels: Record<AutoViewInput["visibility"], string> = {
    all: "All Repositories",
    private: "Private Repositories",
    selected: "Selected Repositories",
  };
  const visibilityLabel = visibilityLabels[value.visibility] ?? value.visibility;
  const authLabel = value.username ? value.username : "No Authentication";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <span className="mt-2 sm:mt-0 inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {registryTypeLabel}
        </span>
      </header>

      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-600">
        <div>
          <dt className="font-medium text-gray-700">Visibility</dt>
          <dd>{visibilityLabel}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-700">Authentication</dt>
          <dd className="truncate">{authLabel}</dd>
        </div>
      </dl>

      <footer className="mt-4 border-t border-gray-200 pt-4 text-xs text-gray-500 grid grid-cols-1 sm:grid-cols-2 gap-y-2">
        <div>
          <span className="font-medium">Created:</span> {formattedCreatedAt}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {formattedUpdatedAt}
        </div>
      </footer>
    </div>
  );
}
