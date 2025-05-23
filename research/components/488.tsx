import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The Relationship a Team has with a role.
     *
     * @title A Role Assignment for a Team
    */
    export interface team_role_assignment {
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
export type AutoViewInput = AutoViewInputSubTypes.team_role_assignment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Data transformations & helpers
  const assignments = value;
  const truncate = (text: string, length = 100) =>
    text.length > length ? text.slice(0, length) + "…" : text;

  const getAssignmentIcon = (type?: "direct" | "indirect" | "mixed") => {
    switch (type) {
      case "direct":
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case "indirect":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case "mixed":
        return <LucideReact.GitMerge className="text-blue-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
    }
  };

  const renderPermissionIcons = (
    perms?: AutoViewInputSubTypes.team_role_assignment["permissions"]
  ) => {
    if (!perms) return null;
    const icons: React.ReactNode[] = [];
    if (perms.pull)
      icons.push(
        <LucideReact.Eye
          key="pull"
          className="text-gray-500"
          size={16}
        />
      );
    if (perms.triage)
      icons.push(
        <LucideReact.Tag
          key="triage"
          className="text-indigo-500"
          size={16}
        />
      );
    if (perms.push)
      icons.push(
        <LucideReact.Upload
          key="push"
          className="text-blue-500"
          size={16}
        />
      );
    if (perms.maintain)
      icons.push(
        <LucideReact.Settings
          key="maintain"
          className="text-yellow-500"
          size={16}
        />
      );
    if (perms.admin)
      icons.push(
        <LucideReact.Shield
          key="admin"
          className="text-red-500"
          size={16}
        />
      );
    return <div className="flex items-center gap-2">{icons}</div>;
  };

  // Empty state
  if (!assignments || assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-4" />
        <span>No team role assignments available</span>
      </div>
    );
  }

  // Main render
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {assignments.map((item) => (
        <div key={item.id} className="p-4 bg-white rounded-lg shadow">
          {/* Header */}
          <h3 className="text-lg font-semibold flex items-center gap-2 truncate">
            <LucideReact.Users size={20} className="text-gray-600" />
            <span title={item.name}>{item.name}</span>
          </h3>

          {/* Description */}
          {item.description && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {truncate(item.description, 120)}
            </p>
          )}

          {/* Assignment Type & Primary Permission */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {getAssignmentIcon(item.assignment)}
              <span className="capitalize">{item.assignment ?? "Unknown"}</span>
            </div>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded">
              {item.permission}
            </span>
          </div>

          {/* Granular Permissions */}
          <div className="mt-2">{renderPermissionIcons(item.permissions)}</div>

          {/* Parent Team Info */}
          {item.parent && (
            <div className="mt-3 flex items-center text-sm text-gray-600">
              <LucideReact.Building2 size={16} className="mr-1" />
              <span className="truncate" title={item.parent.name}>
                {item.parent.name}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
