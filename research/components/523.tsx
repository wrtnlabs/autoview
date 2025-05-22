import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export type team_simple = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.team_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants
  const totalTeams = value.length;

  // 2. JSX structure
  return (
    <div className="max-w-full mx-auto p-4">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Teams ({totalTeams})
      </h1>
      {totalTeams === 0 ? (
        <p className="text-gray-500">No teams available.</p>
      ) : (
        <ul className="space-y-4">
          {value.map((team) => (
            <li
              key={team.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-medium text-gray-900 truncate">
                {team.name}
              </h2>
              {team.description && (
                <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                  {team.description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {team.permission}
                </span>
                {team.privacy && (
                  <span className="text-xs font-semibold uppercase bg-green-100 text-green-800 px-2 py-1 rounded">
                    {team.privacy}
                  </span>
                )}
                {team.notification_setting && (
                  <span className="text-xs font-semibold uppercase bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    {team.notification_setting}
                  </span>
                )}
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  Slug: {team.slug}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
