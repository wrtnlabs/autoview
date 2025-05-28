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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // If no teams to display, show an empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mr-2" />
        <span>No teams available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {value.map((team) => (
        <div
          key={team.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          {/* Team Header */}
          <div className="flex items-center mb-2">
            <LucideReact.Users size={20} className="text-blue-500" />
            <h2 className="ml-2 text-lg font-semibold text-gray-800 truncate">
              {team.name}
            </h2>
          </div>

          {/* Slug */}
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <LucideReact.Tag size={16} className="mr-1" />
            <span className="truncate">{team.slug}</span>
          </div>

          {/* Description */}
          {team.description ? (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {team.description}
            </p>
          ) : (
            <p className="text-gray-400 italic text-sm mb-3">
              No description provided
            </p>
          )}

          {/* Badges: Permission, Privacy, Notification */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
              <LucideReact.Key size={12} className="mr-1" />
              {team.permission.charAt(0).toUpperCase() + team.permission.slice(1)}
            </span>
            {team.privacy && (
              <span className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                <LucideReact.Lock size={12} className="mr-1" />
                {team.privacy.charAt(0).toUpperCase() + team.privacy.slice(1)}
              </span>
            )}
            {team.notification_setting && (
              <span className="flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                <LucideReact.Bell size={12} className="mr-1" />
                {team.notification_setting
                  .split('_')
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')}
              </span>
            )}
          </div>

          {/* Parent Team */}
          {team.parent && (
            <div className="flex items-center text-sm text-gray-700">
              <LucideReact.CornerDownRight size={16} className="text-gray-400" />
              <span className="ml-1 truncate">Parent: {team.parent.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
