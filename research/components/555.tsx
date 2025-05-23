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
  // If there are no teams, show a placeholder
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <span className="mt-2 text-sm">No teams available</span>
      </div>
    );
  }

  // Render a responsive grid of team cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {value.map((team) => (
        <div
          key={team.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-4">
            {/* Team Name */}
            <div className="flex items-center space-x-2">
              <LucideReact.Users
                className="text-gray-600"
                size={20}
                aria-hidden="true"
              />
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {team.name}
              </h3>
            </div>
            {/* Slug */}
            <p className="mt-1 text-sm text-gray-500 truncate">
              @{team.slug}
            </p>

            {/* Description */}
            {team.description && (
              <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                {team.description}
              </p>
            )}

            {/* Badges: Permission & Privacy */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="flex items-center px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                <LucideReact.Key className="mr-1" size={14} aria-hidden="true" />
                {team.permission.charAt(0).toUpperCase() + team.permission.slice(1)}
              </span>
              {team.privacy && (
                <span className="flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {(team.privacy === "secret" || team.privacy === "closed") ? (
                    <LucideReact.Lock className="mr-1" size={14} aria-hidden="true" />
                  ) : (
                    <LucideReact.Eye className="mr-1" size={14} aria-hidden="true" />
                  )}
                  {team.privacy.charAt(0).toUpperCase() + team.privacy.slice(1)}
                </span>
              )}
            </div>

            {/* Parent Team */}
            {team.parent && (
              <div className="mt-3 flex items-center text-sm text-gray-600">
                <LucideReact.CornerLeftUp
                  className="mr-1"
                  size={16}
                  aria-hidden="true"
                />
                <span className="truncate">
                  Parent: <span className="font-medium">{team.parent.name}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
