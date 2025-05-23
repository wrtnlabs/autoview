import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsPrivateRegistries {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            configurations: AutoViewInputSubTypes.org_private_registry_configuration[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsPrivateRegistries.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants and helper functions
  const { total_count, configurations } = value;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getVisibilityIcon = (
    vis: AutoViewInputSubTypes.org_private_registry_configuration["visibility"]
  ): React.ReactNode => {
    switch (vis) {
      case "all":
        return (
          <LucideReact.Globe
            size={16}
            className="text-blue-500"
            aria-label="All repositories"
          />
        );
      case "private":
        return (
          <LucideReact.Lock
            size={16}
            className="text-red-500"
            aria-label="Private only"
          />
        );
      case "selected":
        return (
          <LucideReact.Users
            size={16}
            className="text-green-500"
            aria-label="Selected repositories"
          />
        );
      default:
        return null;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <div className="flex items-center mb-4">
        <LucideReact.Database size={20} className="text-gray-600" />
        <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
          Total Registries: {total_count}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {configurations.map((config) => {
          const created = formatDate(config.created_at);
          const updated = formatDate(config.updated_at);
          return (
            <div
              key={config.name}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium text-gray-900 truncate">
                  {config.name}
                </h3>
                <div className="flex items-center text-sm text-gray-700">
                  {getVisibilityIcon(config.visibility)}
                  <span className="ml-1 capitalize">{config.visibility}</span>
                </div>
              </div>
              {config.username && (
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <LucideReact.User size={16} className="text-gray-400" />
                  <span className="ml-1 truncate">{config.username}</span>
                </div>
              )}
              <div className="flex items-center mt-3 space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span className="ml-1">{created}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.RefreshCw size={16} className="text-gray-400" />
                  <span className="ml-1">{updated}</span>
                </div>
              </div>
            </div>
          );
        })}
        {configurations.length === 0 && (
          <div className="flex flex-col items-center py-8 text-gray-400">
            <LucideReact.AlertCircle size={24} />
            <span className="mt-2">No configurations available</span>
          </div>
        )}
      </div>
    </div>
  );
}
