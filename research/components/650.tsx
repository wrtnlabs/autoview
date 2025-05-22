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
  // 1. Data preparation
  const teams = Array.isArray(value) ? value : [];

  // 2. Handle empty state
  if (teams.length === 0) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center text-gray-400">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <span className="mt-2 text-sm">No teams available</span>
      </div>
    );
  }

  // 3. Render team cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
        >
          <header className="flex items-center gap-2">
            <LucideReact.Users
              className="text-blue-500"
              size={20}
              aria-hidden="true"
            />
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {team.name}
            </h2>
          </header>

          {team.description && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {team.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.Tag className="mr-1" size={16} aria-hidden="true" />
              <span className="truncate">{team.slug}</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.ShieldCheck
                className="mr-1"
                size={16}
                aria-hidden="true"
              />
              <span>
                {team.permission.charAt(0).toUpperCase() +
                  team.permission.slice(1)}
              </span>
            </div>

            {team.privacy && (
              <div className="flex items-center text-sm text-gray-500">
                {team.privacy === "secret" ? (
                  <LucideReact.Lock
                    className="mr-1"
                    size={16}
                    aria-hidden="true"
                  />
                ) : (
                  <LucideReact.Globe
                    className="mr-1"
                    size={16}
                    aria-hidden="true"
                  />
                )}
                <span>{team.privacy}</span>
              </div>
            )}
          </div>

          {team.parent && (
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <LucideReact.CornerUpLeft
                className="mr-1"
                size={16}
                aria-hidden="true"
              />
              <span className="truncate">Parent: {team.parent.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
