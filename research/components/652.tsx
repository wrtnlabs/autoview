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
  // Data transformation / helpers
  const teams = Array.isArray(value) ? value : [];
  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {teams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <LucideReact.AlertCircle className="mb-2" size={32} />
          <span className="text-sm">No teams available</span>
        </div>
      ) : (
        teams.map((team) => (
          <div
            key={team.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Team Header */}
            <div className="flex items-center mb-2">
              <LucideReact.Users className="text-blue-500 mr-2" size={20} />
              <h3
                className="text-lg font-medium text-gray-900 truncate"
                title={team.name}
              >
                {team.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {team.description ?? (
                <span className="italic text-gray-400">No description</span>
              )}
            </p>

            {/* Metadata Badges */}
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center px-2 py-1 bg-gray-100 rounded">
                <LucideReact.Tag className="text-gray-500 mr-1" size={14} />
                <span className="text-gray-700">
                  {capitalize(team.permission)}
                </span>
              </div>

              {team.privacy && (
                <div className="flex items-center px-2 py-1 bg-gray-100 rounded">
                  <LucideReact.Lock className="text-gray-500 mr-1" size={14} />
                  <span className="text-gray-700">
                    {capitalize(team.privacy)}
                  </span>
                </div>
              )}

              {team.notification_setting && (
                <div className="flex items-center px-2 py-1 bg-gray-100 rounded">
                  <LucideReact.Bell className="text-gray-500 mr-1" size={14} />
                  <span className="text-gray-700">
                    {capitalize(team.notification_setting)}
                  </span>
                </div>
              )}
            </div>

            {/* Parent Team */}
            {team.parent && (
              <div className="flex items-center mt-3 text-sm text-gray-500">
                <LucideReact.CornerUpLeft
                  className="text-gray-400 mr-1"
                  size={16}
                />
                <span title={team.parent.name}>Parent: {team.parent.name}</span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
