import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const teams = value;
  // Show placeholder when no data is available
  if (!teams || teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No teams available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100"
        >
          {/* Header: Team name and slug */}
          <div className="flex items-center gap-2">
            <LucideReact.Users size={20} className="text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {team.name}
            </h2>
            <span className="ml-auto text-sm text-gray-500">{team.slug}</span>
          </div>

          {/* Description (truncated) */}
          {team.description !== null && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {team.description}
            </p>
          )}

          {/* Core details: permission, privacy, notification, parent */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <LucideReact.Shield size={16} className="text-gray-500" />
              <span className="capitalize">{team.permission}</span>
            </div>
            {team.privacy && (
              <div className="flex items-center gap-1">
                <LucideReact.Lock size={16} className="text-gray-500" />
                <span className="capitalize">{team.privacy}</span>
              </div>
            )}
            {team.notification_setting && (
              <div className="flex items-center gap-1">
                <LucideReact.Bell size={16} className="text-gray-500" />
                <span className="capitalize">{team.notification_setting}</span>
              </div>
            )}
            {team.parent && (
              <div className="flex items-center gap-1">
                <LucideReact.Folder size={16} className="text-gray-500" />
                <span className="truncate">{team.parent.name}</span>
              </div>
            )}
          </div>

          {/* Detailed permission flags */}
          {team.permissions && (
            <div className="flex flex-wrap gap-1 mt-3">
              {Object.entries(team.permissions)
                .filter(([, enabled]) => enabled)
                .map(([perm]) => (
                  <span
                    key={perm}
                    className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs capitalize"
                  >
                    {perm}
                  </span>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
