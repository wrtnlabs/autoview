import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsPrivateRegistries {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      configurations: AutoViewInputSubTypes.org_private_registry_configuration[];
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsPrivateRegistries.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, configurations } = value;

  // Format created/updated timestamps for readability
  const formattedConfigs = configurations.map((config) => ({
    ...config,
    createdAt: new Date(config.created_at).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    updatedAt: new Date(config.updated_at).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  }));

  // Helper to pick an icon for visibility
  function getVisibilityIcon(
    vis: AutoViewInputSubTypes.org_private_registry_configuration["visibility"],
  ) {
    switch (vis) {
      case "all":
        return (
          <LucideReact.Globe
            className="text-gray-500"
            size={16}
            aria-label="All access"
          />
        );
      case "private":
        return (
          <LucideReact.Lock
            className="text-gray-500"
            size={16}
            aria-label="Private access"
          />
        );
      case "selected":
        return (
          <LucideReact.Users
            className="text-gray-500"
            size={16}
            aria-label="Selected access"
          />
        );
      default:
        return null;
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with total count */}
      <div className="flex items-center mb-4">
        <LucideReact.Database
          className="mr-2 text-indigo-500"
          size={20}
          aria-label="Registries"
        />
        <h2 className="text-lg font-semibold text-gray-800">
          Private Registries ({total_count})
        </h2>
      </div>

      {formattedConfigs.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={24} className="mb-2" />
          <span>No private registry configurations found.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {formattedConfigs.map((cfg, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              {/* Left section: Name, type, username, visibility */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <LucideReact.Package
                    className="text-gray-600 mr-2"
                    size={16}
                    aria-label="Repository type"
                  />
                  <span className="text-gray-800 font-medium truncate">
                    {cfg.name}
                  </span>
                </div>
                {cfg.username && (
                  <div className="flex items-center text-gray-600 text-sm mb-1">
                    <LucideReact.User
                      className="mr-1"
                      size={14}
                      aria-label="Username"
                    />
                    <span className="truncate">{cfg.username}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600 text-sm">
                  {getVisibilityIcon(cfg.visibility)}
                  <span className="ml-1 capitalize">{cfg.visibility}</span>
                </div>
              </div>

              {/* Right section: created/updated timestamps */}
              <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-col text-gray-500 text-sm">
                <div className="flex items-center mb-1">
                  <LucideReact.Calendar
                    className="mr-1"
                    size={14}
                    aria-label="Created at"
                  />
                  <span>Created:</span>
                  <span className="ml-1">{cfg.createdAt}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar
                    className="mr-1"
                    size={14}
                    aria-label="Updated at"
                  />
                  <span>Updated:</span>
                  <span className="ml-1">{cfg.updatedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
