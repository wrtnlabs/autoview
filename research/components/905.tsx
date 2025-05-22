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
  const privacyLabel = value.privacy
    ? value.privacy.charAt(0).toUpperCase() + value.privacy.slice(1)
    : "Public";
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

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Team Name & Privacy */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded ${
            value.privacy === "secret"
              ? "text-red-800 bg-red-100"
              : "text-blue-800 bg-blue-100"
          }`}
        >
          {privacyLabel}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 text-gray-600 line-clamp-3">
        {value.description ?? "No description provided."}
      </p>

      {/* Stats: members, repos, dates */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
        <div className="flex items-center gap-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span>{value.members_count} members</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} className="text-gray-500" />
          <span>{value.repos_count} repos</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span>Created {createdDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span>Updated {updatedDate}</span>
        </div>
      </div>

      {/* Parent Team */}
      {value.parent && (
        <div className="mt-4 flex items-center text-gray-700">
          <LucideReact.Layers size={16} className="text-gray-500" />
          <span className="ml-1 truncate">
            Parent Team: {value.parent.name}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="mt-6 border-t border-gray-200"></div>

      {/* Organization Info */}
      <div className="mt-4 flex items-start">
        <img
          src={value.organization.avatar_url}
          alt={`${value.organization.login} avatar`}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                value.organization.login,
              )}&background=0D8ABC&color=fff`;
          }}
        />
        <div className="ml-3 flex-1 overflow-hidden">
          <a
            href={value.organization.html_url}
            className="text-sm font-medium text-blue-600 hover:underline truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value.organization.login}
          </a>
          {value.organization.description && (
            <p className="text-xs text-gray-500 truncate">
              {value.organization.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-4 text-gray-600 text-xs">
            <div className="flex items-center gap-1">
              <LucideReact.GitBranch size={12} />
              <span>{value.organization.public_repos} repos</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Users size={12} />
              <span>{value.organization.followers} followers</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.User size={12} />
              <span>{value.organization.following} following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
