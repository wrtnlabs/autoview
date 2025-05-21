import { tags } from "typia";
import React from "react";
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
        url: string & tags.Format<"uri">;
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
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const formatActivePermissions = (perms?: AutoViewInputSubTypes.team["permissions"]) => {
    if (!perms) return [];
    return (Object.entries(perms) as [keyof typeof perms, boolean][])
      .filter(([, enabled]) => enabled)
      .map(([key]) => capitalize(key));
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {teams.map((team) => {
        const description = team.description ?? "No description provided.";
        const badges = [
          { label: team.permission, bg: "bg-green-100", text: "text-green-800" },
          team.privacy && { label: capitalize(team.privacy), bg: "bg-blue-100", text: "text-blue-800" },
          team.notification_setting && { label: capitalize(team.notification_setting), bg: "bg-indigo-100", text: "text-indigo-800" },
        ].filter(Boolean) as { label: string; bg: string; text: string }[];

        const activePerms = formatActivePermissions(team.permissions);

        return (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {team.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2 truncate">
                @{team.slug}
              </p>
              <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                {description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${b.bg} ${b.text}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
              {activePerms.length > 0 && (
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Permissions:</span>{" "}
                  {activePerms.join(", ")}
                </div>
              )}
              {team.parent && (
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Parent Team:</span>{" "}
                  {team.parent.name}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
