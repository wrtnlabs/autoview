import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The Relationship a Team has with a role.
     *
     * @title A Role Assignment for a Team
    */
    export type team_role_assignment = {
        /**
         * Determines if the team has a direct, indirect, or mixed relationship to a role
        */
        assignment?: "direct" | "indirect" | "mixed";
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
export type AutoViewInput = AutoViewInputSubTypes.team_role_assignment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to capitalize strings
  const capitalize = (s?: string): string =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : 'N/A';

  if (!value || value.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No role assignments available.
      </div>
    );
  }

  const assignmentColors: Record<string, string> = {
    direct: 'bg-green-100 text-green-800',
    indirect: 'bg-yellow-100 text-yellow-800',
    mixed: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {value.map((item) => {
        const assignmentType = item.assignment ?? 'N/A';
        const assignmentClass =
          assignmentColors[item.assignment ?? ''] ?? 'bg-gray-100 text-gray-800';

        const grantedPermissions = item.permissions
          ? (Object.entries(item.permissions) as [keyof typeof item.permissions, boolean][])
              .filter(([, allowed]) => allowed)
              .map(([key]) => capitalize(key))
          : [];

        return (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${assignmentClass}`}
              >
                {capitalize(assignmentType)}
              </span>
            </div>
            {item.description && (
              <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                {item.description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                {capitalize(item.permission)}
              </span>
              {grantedPermissions.map((perm) => (
                <span
                  key={perm}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded"
                >
                  {perm}
                </span>
              ))}
            </div>
            {item.parent && (
              <div className="text-gray-600 text-sm">
                <span className="font-medium">Parent Team:</span>{' '}
                <span className="truncate">{item.parent.name}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
