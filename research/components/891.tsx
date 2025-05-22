import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team
   */
  export type team = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    slug: string;
    description: string | null;
    privacy?: string;
    notification_setting?: string;
    permission: string;
    permissions?: {
      pull: boolean;
      triage: boolean;
      push: boolean;
      maintain: boolean;
      admin: boolean;
    };
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    members_url: string;
    repositories_url: string & tags.Format<"uri">;
    parent: AutoViewInputSubTypes.nullable_team_simple;
  };
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team Simple
   */
  export type nullable_team_simple = {
    /**
     * Unique identifier of the team
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the team
     */
    url: string;
    members_url: string;
    /**
     * Name of the team
     */
    name: string;
    /**
     * Description of the team
     */
    description: string | null;
    /**
     * Permission that the team will have for its repositories
     */
    permission: string;
    /**
     * The level of privacy this team should have
     */
    privacy?: string;
    /**
     * The notification setting the team has set
     */
    notification_setting?: string;
    html_url: string & tags.Format<"uri">;
    repositories_url: string & tags.Format<"uri">;
    slug: string;
    /**
     * Distinguished Name (DN) that team maps to within LDAP environment
     */
    ldap_dn?: string;
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.team[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const teams = Array.isArray(value) ? value : [];

  // Helper to format permission badges
  const renderPermissionBadges = (
    perms?: AutoViewInputSubTypes.team["permissions"],
  ) => {
    if (!perms) return null;
    const granted = (Object.entries(perms) as [keyof typeof perms, boolean][])
      .filter(([, allowed]) => allowed)
      .map(([key]) => key);
    if (granted.length === 0) return null;
    return (
      <div className="mt-2 flex flex-wrap gap-1">
        {granted.map((perm) => (
          <span
            key={perm}
            className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded"
          >
            {perm.charAt(0).toUpperCase() + perm.slice(1)}
          </span>
        ))}
      </div>
    );
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={24} aria-hidden="true" />
        <span className="mt-2 text-sm">No teams available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {teams.map((team) => {
        const {
          id,
          name,
          slug,
          description,
          privacy,
          notification_setting,
          permission,
          permissions,
          parent,
        } = team;
        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-2">
              <LucideReact.Users
                size={20}
                className="text-blue-500"
                aria-hidden="true"
              />
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {name}
              </h3>
            </div>

            <div className="mt-1 flex items-center text-sm text-gray-500 space-x-2">
              <LucideReact.Tag size={16} aria-hidden="true" />
              <span className="truncate">{slug}</span>
            </div>

            {description && (
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                {description}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <LucideReact.ShieldCheck
                  size={16}
                  className="mr-1 text-gray-500"
                  aria-hidden="true"
                />
                <span>
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </span>
              </div>

              {privacy && (
                <div className="flex items-center text-gray-600">
                  <LucideReact.Lock
                    size={16}
                    className="mr-1 text-gray-500"
                    aria-hidden="true"
                  />
                  <span>{privacy}</span>
                </div>
              )}

              {notification_setting && (
                <div className="flex items-center text-gray-600">
                  <LucideReact.Bell
                    size={16}
                    className="mr-1 text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="capitalize">{notification_setting}</span>
                </div>
              )}
            </div>

            {renderPermissionBadges(permissions)}

            {parent && (
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <LucideReact.Link
                  size={16}
                  className="mr-1 text-gray-500"
                  aria-hidden="true"
                />
                <span className="truncate">Parent: {parent.name}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
