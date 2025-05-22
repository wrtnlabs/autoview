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
  //    Sort teams alphabetically by name for consistent display.
  const teams = [...value].sort((a, b) => a.name.localeCompare(b.name));

  //    Helper to render granular permission badges from the permissions object.
  const renderPermissionBadges = (
    permissions?: AutoViewInputSubTypes.team['permissions'],
  ) => {
    if (!permissions) return null;
    return Object.entries(permissions)
      .filter(([, allowed]) => allowed)
      .map(([key]) => (
        <span
          key={key}
          className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mr-1 px-2 py-0.5 rounded-full capitalize"
        >
          {key}
        </span>
      ));
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return teams.length === 0 ? (
    <p className="text-center text-gray-500">No teams available.</p>
  ) : (
    <ul className="space-y-4">
      {teams.map((team) => (
        <li key={team.id} className="p-4 bg-white rounded-lg shadow">
          {/* Header: Team name and slug */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {team.name}
              </h2>
              <span className="text-sm text-gray-500">@{team.slug}</span>
            </div>
            <div className="mt-2 sm:mt-0 flex flex-wrap items-center">
              {/* Primary permission badge */}
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full capitalize">
                {team.permission}
              </span>
              {/* Optional privacy and notification badges */}
              {team.privacy && (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full capitalize">
                  {team.privacy}
                </span>
              )}
              {team.notification_setting && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full capitalize">
                  {team.notification_setting}
                </span>
              )}
            </div>
          </div>

          {/* Description (truncated to two lines) */}
          {team.description && (
            <p className="mt-2 text-gray-700 text-sm line-clamp-2">
              {team.description}
            </p>
          )}

          {/* Granular GitHub permissions */}
          {team.permissions && (
            <div className="mt-3">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Access Rights:
              </h3>
              <div className="flex flex-wrap">
                {renderPermissionBadges(team.permissions)}
              </div>
            </div>
          )}

          {/* Parent team, if exists */}
          {team.parent && (
            <p className="mt-3 text-gray-600 text-sm">
              Parent Team:
              <span className="ml-1 font-medium text-gray-800">
                {team.parent.name}
              </span>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
