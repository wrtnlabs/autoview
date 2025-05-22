import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Groups of organization members that gives permissions on specified repositories.
   *
   * @title Full Team
   */
  export type team_full = {
    /**
     * Unique identifier of the team
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * URL for the team
     */
    url: string;
    html_url: string & tags.Format<"uri">;
    /**
     * Name of the team
     */
    name: string;
    slug: string;
    description: string | null;
    /**
     * The level of privacy this team should have
     */
    privacy?: "closed" | "secret";
    /**
     * The notification setting the team has set
     */
    notification_setting?: "notifications_enabled" | "notifications_disabled";
    /**
     * Permission that the team will have for its repositories
     */
    permission: string;
    members_url: string;
    repositories_url: string & tags.Format<"uri">;
    parent?: AutoViewInputSubTypes.nullable_team_simple;
    members_count: number & tags.Type<"int32">;
    repos_count: number & tags.Type<"int32">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    organization: AutoViewInputSubTypes.team_organization;
    /**
     * Distinguished Name (DN) that team maps to within LDAP environment
     */
    ldap_dn?: string;
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
  /**
   * Team Organization
   *
   * @title Team Organization
   */
  export type team_organization = {
    login: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string & tags.Format<"uri">;
    hooks_url: string;
    issues_url: string;
    members_url: string;
    public_members_url: string;
    avatar_url: string;
    description: string | null;
    name?: string;
    company?: string;
    blog?: string & tags.Format<"uri">;
    location?: string;
    email?: string & tags.Format<"email">;
    twitter_username?: string | null;
    is_verified?: boolean;
    has_organization_projects: boolean;
    has_repository_projects: boolean;
    public_repos: number & tags.Type<"int32">;
    public_gists: number & tags.Type<"int32">;
    followers: number & tags.Type<"int32">;
    following: number & tags.Type<"int32">;
    html_url: string & tags.Format<"uri">;
    created_at: string & tags.Format<"date-time">;
    type: string;
    total_private_repos?: number & tags.Type<"int32">;
    owned_private_repos?: number & tags.Type<"int32">;
    private_gists?: (number & tags.Type<"int32">) | null;
    disk_usage?: (number & tags.Type<"int32">) | null;
    collaborators?: (number & tags.Type<"int32">) | null;
    billing_email?: (string & tags.Format<"email">) | null;
    plan?: {
      name: string;
      space: number & tags.Type<"int32">;
      private_repos: number & tags.Type<"int32">;
      filled_seats?: number & tags.Type<"int32">;
      seats?: number & tags.Type<"int32">;
    };
    default_repository_permission?: string | null;
    members_can_create_repositories?: boolean | null;
    two_factor_requirement_enabled?: boolean | null;
    members_allowed_repository_creation_type?: string;
    members_can_create_public_repositories?: boolean;
    members_can_create_private_repositories?: boolean;
    members_can_create_internal_repositories?: boolean;
    members_can_create_pages?: boolean;
    members_can_create_public_pages?: boolean;
    members_can_create_private_pages?: boolean;
    members_can_fork_private_repositories?: boolean | null;
    web_commit_signoff_required?: boolean;
    updated_at: string & tags.Format<"date-time">;
    archived_at: (string & tags.Format<"date-time">) | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.team_full;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const privacyLabel = value.privacy === "secret" ? "Secret" : "Closed";
  const privacyIcon =
    value.privacy === "secret" ? (
      <LucideReact.Key size={16} className="text-gray-500" />
    ) : (
      <LucideReact.Lock size={16} className="text-gray-500" />
    );
  const notificationLabel =
    value.notification_setting === "notifications_enabled"
      ? "Notifications On"
      : "Notifications Off";
  const notificationIcon =
    value.notification_setting === "notifications_enabled" ? (
      <LucideReact.Bell size={16} className="text-gray-500" />
    ) : (
      <LucideReact.BellOff size={16} className="text-gray-500" />
    );
  const createdAt = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedAt = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const memberCount = value.members_count.toLocaleString();
  const repoCount = value.repos_count.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md space-y-4">
      {/* Header: Team name and slug */}
      <div className="flex items-center space-x-3">
        <img
          src={value.organization.avatar_url}
          alt={`${value.organization.login} avatar`}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(value.organization.login)}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">{value.name}</h2>
          <span className="text-sm text-gray-500">@{value.slug}</span>
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-600 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Stats: Members and Repositories */}
      <div className="flex space-x-6">
        <div className="flex items-center text-sm text-gray-500 space-x-1">
          <LucideReact.Users size={16} />
          <span>{memberCount} members</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 space-x-1">
          <LucideReact.GitBranch size={16} />
          <span>{repoCount} repos</span>
        </div>
      </div>

      {/* Permission Badge */}
      <div>
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
          {value.permission}
        </span>
      </div>

      {/* Privacy & Notification Settings */}
      <div className="flex space-x-6 text-sm">
        <div className="flex items-center space-x-1 text-gray-500">
          {privacyIcon}
          <span>{privacyLabel}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500">
          {notificationIcon}
          <span>{notificationLabel}</span>
        </div>
      </div>

      {/* Parent Team */}
      {value.parent && (
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <LucideReact.ArrowUpLeft size={16} />
          <span>Parent: {value.parent.name}</span>
        </div>
      )}

      {/* LDAP DN */}
      {value.ldap_dn && (
        <div className="text-xs text-gray-400 truncate">
          DN: {value.ldap_dn}
        </div>
      )}

      {/* Dates */}
      <div className="flex space-x-4 text-xs text-gray-400">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={14} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Clock size={14} />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
