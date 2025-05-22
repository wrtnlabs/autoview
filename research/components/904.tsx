import * as LucideReact from "lucide-react";
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
  const formattedCreated = new Date(value.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const formattedUpdated = new Date(value.updated_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const org = value.organization;
  const placeholderOrgAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    org.name || org.login,
  )}&background=E2E8F0&color=1A202C`;
  const privacyClass =
    value.privacy === "secret"
      ? "px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded"
      : "px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      {/* Header: Team name, parent relationship */}
      <div className="flex items-center space-x-4">
        <img
          src={org.avatar_url}
          alt={org.login}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = placeholderOrgAvatar;
          }}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{value.name}</h2>
          {value.parent && (
            <p className="text-sm text-gray-500">Parent: {value.parent.name}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="mt-4 text-gray-600 line-clamp-3">{value.description}</p>
      )}

      {/* Privacy & Permission */}
      <div className="mt-4 flex flex-wrap gap-2">
        {value.privacy && <span className={privacyClass}>{value.privacy}</span>}
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
          {value.permission}
        </span>
      </div>

      {/* Statistics: members & repos */}
      <div className="mt-4 flex items-center space-x-6 text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} />
          <span>{value.members_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Package size={16} />
          <span>{value.repos_count}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6 text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center gap-1 mt-2 sm:mt-0">
          <LucideReact.Calendar size={16} />
          <span>Updated: {formattedUpdated}</span>
        </div>
      </div>

      {/* Organization */}
      <div className="mt-4 flex items-center gap-2 text-gray-700">
        <LucideReact.Building size={16} className="text-gray-500" />
        <span>{org.name || org.login}</span>
      </div>
    </div>
  );
}
