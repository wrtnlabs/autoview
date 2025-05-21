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
  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No teams available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((team) => {
        const {
          id,
          name,
          description,
          permission,
          privacy,
          notification_setting,
          permissions,
          parent,
        } = team;

        // Derive list of granular permissions if provided
        const grantedActions = permissions
          ? (Object.entries(permissions) as [keyof typeof permissions, boolean][])
              .filter(([, allowed]) => allowed)
              .map(([action]) => capitalize(action))
          : [];

        return (
          <article
            key={id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
          >
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {name}
              </h2>
              {description ? (
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                  {description}
                </p>
              ) : (
                <p className="mt-2 italic text-gray-400 text-sm">
                  No description available.
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {capitalize(permission)}
                </span>
                {privacy && (
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {capitalize(privacy)}
                  </span>
                )}
                {notification_setting && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {capitalize(notification_setting.replace(/_/g, " "))}
                  </span>
                )}
              </div>
              {grantedActions.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {grantedActions.map((act) => (
                    <span
                      key={act}
                      className="text-xs text-white bg-indigo-500 px-1.5 py-0.5 rounded"
                    >
                      {act}
                    </span>
                  ))}
                </div>
              )}
              {parent && parent.name && (
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Parent Team: <span className="font-medium">{parent.name}</span>
                </p>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
