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
  // Render a responsive grid of team cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {value.map((team) => {
        // Count how many permission flags are granted
        const perms = team.permissions ?? {};
        const grantedCount = Object.values(perms).filter(Boolean).length;

        return (
          <div
            key={team.id}
            className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3"
          >
            {/* Header: Team name and slug */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {team.name}
              </h2>
              <span className="text-sm text-gray-500">{team.slug}</span>
            </div>

            {/* Description (truncated) */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {team.description ?? (
                <span className="italic text-gray-400">No description</span>
              )}
            </p>

            {/* Badges: permission, privacy, notification */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                {team.permission}
              </span>
              {team.privacy && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                  {team.privacy}
                </span>
              )}
              {team.notification_setting && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                  {team.notification_setting}
                </span>
              )}
            </div>

            {/* Summary of granted permissions */}
            {team.permissions && (
              <div className="flex items-center text-sm text-gray-700">
                <LucideReact.Shield
                  size={16}
                  className="mr-1 text-gray-500"
                />
                <span>{grantedCount} permissions granted</span>
              </div>
            )}

            {/* Links: HTML URL and Repositories URL */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-gray-500 overflow-hidden">
                <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
                <span className="truncate">{team.html_url}</span>
              </div>
              <div className="flex items-center text-gray-500 overflow-hidden">
                <LucideReact.GitBranch
                  size={16}
                  className="mr-1 flex-shrink-0"
                />
                <span className="truncate">{team.repositories_url}</span>
              </div>
            </div>

            {/* Parent team if exists */}
            {team.parent && (
              <div className="flex items-center text-sm text-gray-600">
                <LucideReact.ArrowRight
                  size={16}
                  className="mr-1 text-gray-400"
                />
                <span>Parent team: {team.parent.name}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
