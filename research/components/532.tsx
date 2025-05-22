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

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="container mx-auto p-4">
      <div className="text-lg font-semibold mb-4">Teams ({totalTeams})</div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {value.map((team) => {
          const description = team.description ?? "No description provided";
          const parentName = team.parent?.name ?? "None";
          const activePermissions = team.permissions
            ? (Object.entries(team.permissions) as [keyof typeof team.permissions, boolean][])
                .filter(([, has]) => has)
                .map(([perm]) => perm)
            : [];

          return (
            <div key={team.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <div className="mb-2">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-gray-800 truncate">{team.name}</h2>
                  <span className="text-xs text-gray-500 truncate">({team.slug})</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
              </div>
              <div className="mt-auto space-y-2">
                <div className="flex flex-wrap space-x-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{team.permission}</span>
                  {team.privacy && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {team.privacy}
                    </span>
                  )}
                  {team.notification_setting && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {team.notification_setting}
                    </span>
                  )}
                </div>
                {activePermissions.length > 0 && (
                  <div className="text-sm text-gray-700">
                    Permissions: {activePermissions.join(", ")}
                  </div>
                )}
                <div className="text-sm text-gray-500">Parent: {parentName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
