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
  // 1. Helper to capitalize words
  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {value.map((team) => (
        <div
          key={team.id}
          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150"
        >
          {/* Header: Team icon and name */}
          <div className="flex items-center gap-2">
            <LucideReact.Users size={20} className="text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {team.name}
            </h3>
          </div>

          {/* Subheader: slug and optional parent team */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-500 text-sm">@{team.slug}</span>
            {team.parent && (
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                {team.parent.name}
              </span>
            )}
          </div>

          {/* Description (truncated) */}
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {team.description || "No description provided."}
          </p>

          {/* Footer: privacy and default permission */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <LucideReact.Lock size={16} />
              <span>{team.privacy ? capitalize(team.privacy) : "Visible"}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <LucideReact.Shield size={16} />
              <span>{capitalize(team.permission)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
