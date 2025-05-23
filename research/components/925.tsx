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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const teams = value;
  // Helper to derive active permission labels
  const getActivePermissions = (perms: AutoViewInputSubTypes.team["permissions"] | undefined): string[] => {
    if (!perms) return [];
    return (Object.entries(perms) as [keyof typeof perms, boolean][])
      .filter(([, granted]) => granted)
      .map(([perm]) => perm.charAt(0).toUpperCase() + perm.slice(1));
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!teams || teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="text-gray-300" />
        <span className="mt-2 text-sm">No teams available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => {
        const activePerms = getActivePermissions(team.permissions);
        const privacy = team.privacy;
        const privacyClasses = privacy
          ? privacy.toLowerCase().includes("secret") || privacy.toLowerCase().includes("closed")
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800"
          : "";
        return (
          <div
            key={team.id}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              {/* Team Title */}
              <div className="flex items-center gap-2">
                <LucideReact.Users size={20} className="text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900 truncate">{team.name}</h3>
              </div>
              {/* Slug */}
              <div className="flex items-center text-sm text-gray-500">
                <LucideReact.Tag size={16} />
                <span className="ml-1 truncate">{team.slug}</span>
              </div>
              {/* Description */}
              {team.description && (
                <p className="text-sm text-gray-700 line-clamp-2">{team.description}</p>
              )}
              {/* Main Permission & Privacy */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                  {team.permission.charAt(0).toUpperCase() + team.permission.slice(1)}
                </span>
                {privacy && (
                  <span
                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${privacyClasses}`}
                  >
                    {privacy.charAt(0).toUpperCase() + privacy.slice(1)}
                  </span>
                )}
              </div>
              {/* Detailed Permissions */}
              {activePerms.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {activePerms.map((perm) => (
                    <span
                      key={perm}
                      className="bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              )}
              {/* Notification Setting */}
              {team.notification_setting && (
                <div className="flex items-center text-xs text-gray-500">
                  <LucideReact.Bell size={14} />
                  <span className="ml-1 truncate">{team.notification_setting}</span>
                </div>
              )}
              {/* Parent Team */}
              {team.parent && (
                <div className="flex items-center text-xs text-gray-500">
                  <LucideReact.ArrowUpRight size={14} />
                  <span className="ml-1 truncate">Parent: {team.parent.name}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
