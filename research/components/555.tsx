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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation logic
  if (!value || value.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No teams available.
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="flex flex-col space-y-4">
      {value.map((team: AutoViewInputSubTypes.team) => {
        const enabledPermissionsCount: number = team.permissions
          ? Object.values(team.permissions).filter((flag) => flag).length
          : 0;
        const formattedPermission: string =
          team.permission.charAt(0).toUpperCase() + team.permission.slice(1);
        const parentName: string | undefined = team.parent?.name ?? undefined;

        return (
          <article key={team.id} className="p-4 bg-white rounded-lg shadow-md">
            <header className="flex justify-between items-start">
              <div className="overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{team.name}</h3>
                <p className="text-sm text-gray-500 truncate">{team.slug}</p>
              </div>
              <span className="text-sm font-medium text-white bg-blue-600 px-2 py-1 rounded">
                {formattedPermission}
              </span>
            </header>

            {team.description && (
              <p className="mt-2 text-gray-600 line-clamp-2">
                {team.description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {team.privacy && (
                <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded">
                  {team.privacy.charAt(0).toUpperCase() + team.privacy.slice(1)}
                </span>
              )}

              {team.notification_setting && (
                <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded">
                  {team.notification_setting.replace(/_/g, ' ')}
                </span>
              )}

              {enabledPermissionsCount > 0 && (
                <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded">
                  {enabledPermissionsCount} Permissions Enabled
                </span>
              )}

              {parentName && (
                <span className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded">
                  Parent: {parentName}
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
