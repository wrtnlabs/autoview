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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const teams = value ?? [];
  const teamCount = teams.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (teamCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={32} className="mb-2" />
        <span className="text-sm">No teams available</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.Users size={20} className="text-gray-800 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Teams ({teamCount})
        </h2>
      </div>

      {/* Team Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => {
          // Prepare permission badges
          const permKeys = team.permissions
            ? (
                Object.entries(team.permissions) as [
                  keyof typeof team.permissions,
                  boolean,
                ][]
              )
                .filter(([, allowed]) => allowed)
                .map(([key]) => key)
            : [];
          const badgeList =
            permKeys.length > 0 ? permKeys : [team.permission as string];

          return (
            <li
              key={team.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              {/* Team Name */}
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-1">
                <LucideReact.Users size={18} className="text-blue-500 mr-1" />
                <span className="truncate">{team.name}</span>
              </h3>

              {/* Slug */}
              <div className="flex items-center text-sm text-gray-500 mb-2 truncate">
                <LucideReact.Tag size={16} className="mr-1" />
                <span>{team.slug}</span>
              </div>

              {/* Description */}
              {team.description && (
                <p className="text-gray-700 text-sm line-clamp-2 mb-3">
                  {team.description}
                </p>
              )}

              {/* Privacy & Permissions */}
              <div className="flex flex-wrap gap-2 mb-3">
                {team.privacy && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {team.privacy}
                  </span>
                )}
                {badgeList.map((perm) => (
                  <span
                    key={perm}
                    className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                  >
                    {perm}
                  </span>
                ))}
              </div>

              {/* Parent Team */}
              {team.parent && (
                <div className="mt-auto text-sm text-gray-500">
                  <span className="font-medium">Parent:</span>{" "}
                  <span>{team.parent.name}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
