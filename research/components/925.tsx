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
  const formatPrivacy = (privacy?: string): string =>
    privacy ? privacy.charAt(0).toUpperCase() + privacy.slice(1) : "Not specified";

  return (
    // 2. Compose the visual structure using JSX and Tailwind CSS.
    <div className="space-y-4">
      {value.map((team) => {
        const description = team.description ?? "No description available.";
        const privacyLabel = formatPrivacy(team.privacy);
        const grantedPermissions = team.permissions
          ? Object.entries(team.permissions)
              .filter(([, allowed]) => allowed)
              .map(([perm]) => perm.charAt(0).toUpperCase() + perm.slice(1))
              .join(", ")
          : "None";

        return (
          // Card container
          <div key={team.id} className="p-4 bg-white rounded-lg shadow-md">
            {/* Header: Name and slug */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{team.name}</h2>
              <span className="text-sm text-gray-500">{team.slug}</span>
            </div>

            {/* Description (clamped) */}
            <p className="mt-2 text-gray-700 line-clamp-2">{description}</p>

            {/* Badges: permission & privacy */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 text-xs font-medium rounded">
                {team.permission.charAt(0).toUpperCase() + team.permission.slice(1)}
              </span>
              <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 text-xs font-medium rounded">
                {privacyLabel}
              </span>
            </div>

            {/* Permissions summary */}
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Granted Permissions:</span> {grantedPermissions}
            </p>

            {/* Parent team if exists */}
            {team.parent && (
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-medium">Parent Team:</span> {team.parent.name}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
}
