import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Team Simple
   */
  export type team_simple = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.team_simple[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation / derived constants
  const teams = Array.isArray(value) ? value : [];

  // Empty state handling
  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <p className="text-sm">No teams available.</p>
      </div>
    );
  }

  // 2. Visual structure
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <div key={team.id} className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {team.name}
          </h3>

          {team.description && (
            <p className="text-gray-600 mt-2 text-sm line-clamp-3">
              {team.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-gray-500">
            <div className="flex items-center">
              <LucideReact.GitBranch size={16} className="mr-1" />
              <span>{team.permission}</span>
            </div>

            {team.privacy && (
              <div className="flex items-center">
                <LucideReact.Lock size={16} className="mr-1" />
                <span className="capitalize">{team.privacy}</span>
              </div>
            )}

            {team.notification_setting && (
              <div className="flex items-center">
                <LucideReact.Bell size={16} className="mr-1" />
                <span className="capitalize">
                  {team.notification_setting.replace(/_/g, " ")}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
