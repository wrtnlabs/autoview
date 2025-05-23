import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team
    */
    export interface team {
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
    }
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
  // Derived constants
  const teams = value;
  const hasTeams = Array.isArray(teams) && teams.length > 0;

  // Empty state
  if (!hasTeams) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-lg">No teams available</p>
      </div>
    );
  }

  // Main rendering
  return (
    <div className="space-y-6">
      <header className="flex items-center">
        <LucideReact.Users size={24} className="text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Teams ({teams.length})
        </h2>
      </header>
      <ul className="space-y-4">
        {teams.map((team) => (
          <li
            key={team.id}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              {/* Team title and slug */}
              <div className="flex items-center">
                <LucideReact.Users size={20} className="text-indigo-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {team.name}
                </h3>
                <span className="ml-2 text-sm text-gray-500 truncate">
                  ({team.slug})
                </span>
              </div>
              {/* Badges: permission, privacy, notification */}
              <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  {team.permission}
                </span>
                {team.privacy && (
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                    <LucideReact.Lock size={14} className="mr-1" />
                    {team.privacy}
                  </span>
                )}
                {team.notification_setting && (
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                    <LucideReact.Bell size={14} className="mr-1" />
                    {team.notification_setting}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {team.description ?? "No description"}
            </p>

            {/* Parent team */}
            {team.parent && (
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <LucideReact.CornerUpLeft size={16} className="mr-1" />
                <span className="truncate">Parent: {team.parent.name}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
