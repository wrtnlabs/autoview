import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export interface team_simple {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.team_simple[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Utility to truncate long text
  const truncate = (text: string, maxLength: number = 120): string =>
    text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text;

  const teams = value;

  // Empty state placeholder
  if (!teams || teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No teams available</span>
      </div>
    );
  }

  // Main render: responsive grid of team cards
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {teams.map((team) => {
        const rawDesc = team.description ?? "No description provided.";
        const description = truncate(rawDesc, 120);

        return (
          <div
            key={team.id}
            className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Team name */}
            <div className="flex items-center gap-2">
              <LucideReact.Users size={20} className="text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {team.name}
              </h3>
            </div>

            {/* Description */}
            <p className="mt-2 text-gray-600 text-sm">{description}</p>

            {/* Metadata: permission, slug, privacy */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <LucideReact.Lock size={16} className="text-gray-400" />
                <span className="capitalize">{team.permission}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Tag size={16} className="text-gray-400" />
                <span>{team.slug}</span>
              </div>
              {team.privacy && (
                <div className="flex items-center gap-1">
                  <LucideReact.EyeOff size={16} className="text-gray-400" />
                  <span className="capitalize">{team.privacy}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
