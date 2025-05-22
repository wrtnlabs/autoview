import { tags } from "typia";
import React from "react";
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
        url: string & tags.Format<"uri">;
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
  if (!Array.isArray(value) || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No teams available.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((team) => {
        const {
          id,
          name,
          slug,
          description,
          privacy,
          permission,
          permissions,
          parent,
        } = team;

        // Prepare description text
        const descText = description && description.trim() !== ""
          ? description
          : "No description provided.";

        // Derive granted permissions list if available
        const grantedPermissions = permissions
          ? (
              (Object.entries(permissions) as [keyof typeof permissions, boolean][])
                .filter(([, allowed]) => allowed)
                .map(([perm]) => perm.charAt(0).toUpperCase() + perm.slice(1))
            )
          : [];

        // Parent team name, if exists
        const parentName = parent && parent.name
          ? parent.name
          : null;

        return (
          <article
            key={id}
            className="bg-white rounded-lg shadow p-5 flex flex-col space-y-3"
          >
            <header className="flex flex-col">
              <h2
                className="text-lg font-semibold text-gray-800 truncate"
                title={name}
              >
                {name}
              </h2>
              <span className="text-sm text-gray-500 truncate" title={slug}>
                @{slug}
              </span>
            </header>

            <p className="text-gray-600 text-sm line-clamp-2">
              {descText}
            </p>

            <div className="flex flex-wrap gap-2">
              {privacy && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
                </span>
              )}
              {permission && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </span>
              )}
            </div>

            {grantedPermissions.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {grantedPermissions.map((perm) => (
                  <span
                    key={perm}
                    className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            )}

            {parentName && (
              <div className="mt-auto pt-3 border-t border-gray-200">
                <span className="text-xs font-medium text-gray-500">
                  Parent Team:&nbsp;
                </span>
                <span className="text-xs text-gray-700 truncate" title={parentName}>
                  {parentName}
                </span>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
