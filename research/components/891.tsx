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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const permissionColors: Record<string, string> = {
    pull: 'bg-green-100 text-green-800',
    triage: 'bg-amber-100 text-amber-800',
    push: 'bg-blue-100 text-blue-800',
    maintain: 'bg-purple-100 text-purple-800',
    admin: 'bg-red-100 text-red-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((team) => {
        const colorClass = permissionColors[team.permission] || 'bg-gray-100 text-gray-800';
        return (
          <div
            key={team.id}
            className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-2">
              <LucideReact.Users size={20} className="text-indigo-500 mr-2" />
              <h3
                className="text-lg font-semibold text-gray-800 truncate"
                title={team.name}
              >
                {team.name}
              </h3>
            </div>
            <p
              className="text-sm text-gray-500 mb-2 truncate"
              title={team.slug}
            >
              @{team.slug}
            </p>
            {team.description && (
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {team.description}
              </p>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-sm font-medium ${colorClass}`}
              >
                {team.permission.charAt(0).toUpperCase() + team.permission.slice(1)}
              </span>
              {team.privacy && (
                <div className="flex items-center text-sm text-gray-500">
                  <LucideReact.Lock size={14} className="mr-1" />
                  {team.privacy.charAt(0).toUpperCase() + team.privacy.slice(1)}
                </div>
              )}
              {team.notification_setting && (
                <div className="flex items-center text-sm text-gray-500">
                  <LucideReact.Bell size={14} className="mr-1" />
                  {team.notification_setting}
                </div>
              )}
            </div>
            {team.parent && (
              <div className="mt-3 text-sm text-gray-600 flex items-center">
                <LucideReact.ArrowUpLeft size={14} className="mr-1" />
                Parent: {team.parent.name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
