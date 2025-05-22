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
  const teams = value;
  // If there are no teams, show an empty state
  if (!teams || teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} aria-hidden="true" />
        <span className="mt-3 text-sm">No teams available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="flex flex-col md:flex-row md:justify-between bg-white p-4 rounded-lg shadow-sm"
        >
          {/* Primary Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <LucideReact.Users
                size={20}
                className="text-indigo-500"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold text-gray-800">
                {team.name}
              </span>
              <span className="text-sm text-gray-500 truncate">
                ({team.slug})
              </span>
            </div>
            <p className="mt-2 text-gray-600 line-clamp-2">
              {team.description ?? "No description provided."}
            </p>
          </div>

          {/* Metadata */}
          <div className="mt-4 md:mt-0 flex flex-col space-y-2 md:items-end">
            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.Lock size={16} className="mr-1" aria-hidden="true" />
              <span>{team.privacy ?? "N/A"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <LucideReact.Shield
                size={16}
                className="mr-1"
                aria-hidden="true"
              />
              <span>{team.permission}</span>
            </div>
            {team.parent && (
              <div className="flex items-center text-sm text-gray-500">
                <LucideReact.CornerUpLeft
                  size={16}
                  className="mr-1"
                  aria-hidden="true"
                />
                <span>{team.parent.name}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-500 max-w-xs truncate">
              <LucideReact.Link size={16} className="mr-1" aria-hidden="true" />
              <span className="truncate">{team.html_url}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
