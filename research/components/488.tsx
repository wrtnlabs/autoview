import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput = AutoViewInputSubTypes.team_role_assignment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const assignments = value ?? [];
  const count = assignments.length;

  // Utility to truncate or provide fallback
  const truncate = (text: string, max = 100) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span className="text-sm">No team role assignments available.</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center text-lg font-semibold text-gray-800">
        <LucideReact.Users size={20} className="mr-2 text-gray-600" />
        <span>Team Role Assignments ({count})</span>
      </div>
      <div className="space-y-4">
        {assignments.map((item) => {
          const {
            id,
            name,
            assignment,
            description,
            parent,
            permission,
            permissions,
          } = item;

          // Determine assignment icon and label
          const getAssignment = () => {
            switch (assignment) {
              case "direct":
                return (
                  <div className="flex items-center text-sm text-green-600">
                    <LucideReact.CheckCircle size={16} className="mr-1" />
                    Direct
                  </div>
                );
              case "indirect":
                return (
                  <div className="flex items-center text-blue-600">
                    <LucideReact.ArrowDownRight size={16} className="mr-1" />
                    Indirect
                  </div>
                );
              case "mixed":
                return (
                  <div className="flex items-center text-purple-600">
                    <LucideReact.Shuffle size={16} className="mr-1" />
                    Mixed
                  </div>
                );
              default:
                return (
                  <div className="flex items-center text-gray-400">
                    <LucideReact.HelpCircle size={16} className="mr-1" />
                    N/A
                  </div>
                );
            }
          };

          // Map flag permissions to icons and labels
          const flagMap: Record<
            keyof typeof permissions,
            { icon: React.ReactNode; label: string }
          > = {
            pull: {
              icon: <LucideReact.Download size={14} />,
              label: "Pull",
            },
            triage: {
              icon: <LucideReact.Gavel size={14} />,
              label: "Triage",
            },
            push: {
              icon: <LucideReact.Upload size={14} />,
              label: "Push",
            },
            maintain: {
              icon: <LucideReact.Settings size={14} />,
              label: "Maintain",
            },
            admin: {
              icon: <LucideReact.Shield size={14} />,
              label: "Admin",
            },
          };

          return (
            <div
              key={id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-md font-medium text-gray-900 truncate">
                  {name}
                </h3>
                {getAssignment()}
              </div>
              {description ? (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {truncate(description, 120)}
                </p>
              ) : null}
              {parent && parent.name ? (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <LucideReact.Folder
                    size={16}
                    className="mr-1 text-gray-400"
                  />
                  Parent: <span className="ml-1">{parent.name}</span>
                </div>
              ) : null}
              <div className="mt-3 flex items-center text-sm text-gray-700">
                <LucideReact.Tag size={16} className="mr-1 text-gray-500" />
                Primary permission:
                <span className="ml-1 font-medium capitalize">
                  {permission}
                </span>
              </div>
              {permissions ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(Object.keys(permissions) as Array<keyof typeof permissions>)
                    .filter((key) => permissions[key])
                    .map((key) => (
                      <span
                        key={key}
                        className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                      >
                        {flagMap[key].icon}
                        {flagMap[key].label}
                      </span>
                    ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
