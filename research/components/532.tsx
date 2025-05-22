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
  const teams = value;

  // Helper to truncate long descriptions
  const hasDescription = (desc: string | null): desc is string =>
    typeof desc === "string" && desc.trim().length > 0;

  return (
    <>
      {teams.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          <LucideReact.AlertCircle
            className="mx-auto mb-2 text-gray-400"
            size={48}
          />
          <p>No teams available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => {
            const boolPerms = team.permissions
              ? (
                  Object.entries(team.permissions) as [
                    keyof typeof team.permissions,
                    boolean,
                  ][]
                )
                  .filter(([, v]) => v)
                  .map(([k]) => k)
              : [];
            return (
              <div
                key={team.id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-baseline justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {team.name}
                  </h2>
                  <span className="ml-2 text-sm text-gray-500 truncate">
                    #{team.slug}
                  </span>
                </div>

                {/* Description */}
                {hasDescription(team.description) && (
                  <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                    {team.description}
                  </p>
                )}

                {/* Core metadata */}
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  {/* Default permission */}
                  <div className="flex items-center">
                    <LucideReact.ShieldCheck className="mr-1" size={16} />
                    <span>{team.permission}</span>
                  </div>

                  {/* Privacy */}
                  {team.privacy && (
                    <div className="flex items-center">
                      <LucideReact.Lock className="mr-1" size={16} />
                      <span>{team.privacy}</span>
                    </div>
                  )}

                  {/* Notification setting */}
                  {team.notification_setting && (
                    <div className="flex items-center">
                      <LucideReact.Bell className="mr-1" size={16} />
                      <span>{team.notification_setting}</span>
                    </div>
                  )}
                </div>

                {/* Boolean permissions badges */}
                {boolPerms.length > 0 && (
                  <div className="mt-3">
                    <span className="text-sm font-medium text-gray-600">
                      Permissions:
                    </span>
                    <div className="inline-flex flex-wrap gap-1 ml-1">
                      {boolPerms.map((perm) => (
                        <span
                          key={perm}
                          className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
                        >
                          <LucideReact.CheckCircle
                            className="mr-0.5 text-green-500"
                            size={12}
                          />
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Parent team */}
                {team.parent && (
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <LucideReact.ArrowUp className="mr-1" size={16} />
                    <span>Parent: {team.parent.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
