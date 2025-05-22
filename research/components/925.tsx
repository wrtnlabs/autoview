import LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalTeams = value.length;
  // Count teams by permission level
  const permissionCounts = value.reduce<Record<string, number>>((acc, team) => {
    acc[team.permission] = (acc[team.permission] || 0) + 1;
    return acc;
  }, {});

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center p-4 bg-white rounded-lg shadow">
        <LucideReact.Users size={24} className="text-indigo-500 mr-2" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {totalTeams} Teams
          </h2>
          <div className="flex flex-wrap text-sm text-gray-600 mt-1">
            {Object.entries(permissionCounts).map(([perm, count]) => (
              <span
                key={perm}
                className="mr-3 inline-flex items-center bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full"
              >
                <LucideReact.Tag size={14} className="mr-1" />
                {perm.charAt(0).toUpperCase() + perm.slice(1)}: {count}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {value.map((team) => (
          <div
            key={team.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Team Name */}
            <div className="flex items-center mb-2">
              <LucideReact.Users size={20} className="text-indigo-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {team.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {team.description ?? "No description available."}
            </p>

            {/* Metadata */}
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              {/* Permission */}
              <div className="flex items-center">
                <LucideReact.Tag size={16} className="text-gray-400 mr-1" />
                <span className="capitalize">{team.permission}</span>
              </div>

              {/* Privacy */}
              {team.privacy && (
                <div className="flex items-center">
                  <LucideReact.Lock size={16} className="text-gray-400 mr-1" />
                  <span>{team.privacy}</span>
                </div>
              )}

              {/* Notification Setting */}
              {team.notification_setting && (
                <div className="flex items-center">
                  <LucideReact.Bell size={16} className="text-gray-400 mr-1" />
                  <span>{team.notification_setting}</span>
                </div>
              )}

              {/* Parent Team */}
              {team.parent && (
                <div className="flex items-center">
                  <LucideReact.Link size={16} className="text-gray-400 mr-1" />
                  <span className="truncate">{team.parent.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
