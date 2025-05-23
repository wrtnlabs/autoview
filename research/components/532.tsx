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
  // 1. Data transformation: derive privacy label and icon, handle empty state
  const teams = value;
  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <span className="mt-2 text-sm">No teams available</span>
      </div>
    );
  }

  // 2. Compose the visual structure
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {teams.map((team) => {
        const privacy = team.privacy ?? "public";
        const privacyIcon =
          privacy === "secret" ? (
            <LucideReact.Lock size={16} className="text-gray-500" />
          ) : (
            <LucideReact.Unlock size={16} className="text-gray-500" />
          );
        const parentName = team.parent?.name;

        return (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col space-y-3"
          >
            {/* Team Name */}
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <LucideReact.Users size={20} className="text-blue-500" />
              <span className="truncate">{team.name}</span>
            </div>

            {/* Description */}
            {team.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {team.description}
              </p>
            )}

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">
                {privacyIcon}
                <span className="capitalize">{privacy}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">
                <LucideReact.Tag size={16} className="text-gray-500" />
                <span>{team.permission}</span>
              </div>
              {parentName && (
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-700">
                  <LucideReact.ArrowUpLeft
                    size={16}
                    className="text-gray-500"
                  />
                  <span className="truncate">{parentName}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
