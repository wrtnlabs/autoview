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
  const totalTeams = value.length;

  // Early return for empty dataset
  if (totalTeams === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No teams available.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold text-gray-900 mb-4">
        Teams ({totalTeams})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {value.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
            <div className="mb-2">
              <h2 className="text-lg font-medium text-gray-900 truncate">
                {team.name}
              </h2>
              <p className="text-sm text-gray-500 truncate">
                @{team.slug}
              </p>
            </div>

            {team.description && (
              <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                {team.description}
              </p>
            )}

            <div className="mt-auto flex flex-wrap gap-1">
              <span className="inline-block text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full px-2 py-0.5">
                {team.permission.charAt(0).toUpperCase() + team.permission.slice(1)}
              </span>
              {team.privacy && (
                <span className="inline-block text-xs font-semibold text-green-800 bg-green-100 rounded-full px-2 py-0.5">
                  {team.privacy.charAt(0).toUpperCase() + team.privacy.slice(1)}
                </span>
              )}
              {team.notification_setting && (
                <span className="inline-block text-xs font-semibold text-blue-800 bg-blue-100 rounded-full px-2 py-0.5">
                  {team.notification_setting.charAt(0).toUpperCase() + team.notification_setting.slice(1)}
                </span>
              )}
            </div>

            {team.parent && (
              <p className="text-xs text-gray-600 mt-2 truncate">
                Parent: {team.parent.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
