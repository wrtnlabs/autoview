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
  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const descriptionText = value.description ?? "No description provided.";
  const privacyLabel = value.privacy
    ? value.privacy === "secret"
      ? "Secret"
      : "Closed"
    : "Default";
  const notificationLabel = value.notification_setting
    ? value.notification_setting === "notifications_enabled"
      ? "Notifications On"
      : "Notifications Off"
    : null;
  const permissionLabel =
    value.permission.charAt(0).toUpperCase() + value.permission.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header: Org avatar and Team title */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={value.organization.avatar_url}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/40x40?text=Org";
          }}
          alt={`${value.organization.login} avatar`}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {value.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">
            /{value.organization.login}/{value.slug}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {descriptionText}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Users size={16} className="mr-1" />
          <span>{value.members_count} members</span>
        </div>
        <div className="flex items-center">
          <LucideReact.GitBranch size={16} className="mr-1" />
          <span>{value.repos_count} repos</span>
        </div>
        <div className="flex items-center">
          <LucideReact.ShieldCheck size={16} className="mr-1" />
          <span>Permission: {permissionLabel}</span>
        </div>
        {value.privacy && (
          <div className="flex items-center">
            {value.privacy === "secret" ? (
              <LucideReact.Lock size={16} className="mr-1" />
            ) : (
              <LucideReact.Unlock size={16} className="mr-1" />
            )}
            <span>{privacyLabel}</span>
          </div>
        )}
        {notificationLabel && (
          <div className="flex items-center col-span-2">
            <LucideReact.Bell size={16} className="mr-1" />
            <span>{notificationLabel}</span>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="flex items-center text-sm text-gray-500 space-x-6 mb-4">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Created: {createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>Updated: {updatedDate}</span>
        </div>
      </div>

      {/* Parent Team */}
      {value.parent && (
        <div className="flex items-center text-sm text-blue-500">
          <LucideReact.ChevronLeft size={16} className="mr-1" />
          <span className="truncate">Parent: {value.parent.name}</span>
        </div>
      )}
    </div>
  );
}
