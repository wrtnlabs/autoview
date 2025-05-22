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
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const createdAt = dateFormatter.format(createdDate);
  const updatedAt = dateFormatter.format(updatedDate);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div
      role="region"
      aria-labelledby="team-title"
      className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4"
    >
      {/* Header: Team name, slug, and organization avatar */}
      <header className="flex items-center space-x-4">
        <div className="w-12 h-12 flex-shrink-0">
          <img
            src={value.organization.avatar_url}
            alt={`${value.organization.login} avatar`}
            className="w-full h-full rounded-full object-cover"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "https://placehold.co/100x100?text=Org";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2
            id="team-title"
            className="text-lg font-semibold text-gray-900 truncate"
          >
            {value.name}
          </h2>
          <p className="text-sm text-gray-500 truncate">@{value.slug}</p>
        </div>
      </header>

      {/* Description */}
      {value.description && (
        <p className="text-gray-700 text-sm line-clamp-3">
          {value.description}
        </p>
      )}

      {/* Badges: permission, privacy, notifications */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
          {value.permission}
        </span>
        {value.privacy && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {value.privacy.charAt(0).toUpperCase() + value.privacy.slice(1)}
          </span>
        )}
        {value.notification_setting && (
          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
            {value.notification_setting.replace("notifications_", "")}
          </span>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.Users size={16} />
          <span>{value.members_count} members</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.Package size={16} />
          <span>{value.repos_count} repos</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.Calendar size={16} />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.Calendar size={16} />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>

      {/* Parent team if present */}
      {value.parent && (
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.ArrowUp size={16} />
          <span>Parent: {value.parent.name}</span>
        </div>
      )}

      {/* Organization summary */}
      <div className="border-t pt-4 grid grid-cols-3 gap-4">
        <div className="col-span-3 sm:col-span-1 flex items-center space-x-2">
          <img
            src={value.organization.avatar_url}
            alt={`${value.organization.login} avatar`}
            className="w-8 h-8 rounded-full object-cover"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "https://placehold.co/80x80?text=Org";
            }}
          />
          <div className="truncate">
            <p className="text-sm font-medium text-gray-800 truncate">
              {value.organization.login}
            </p>
            {value.organization.company && (
              <p className="text-xs text-gray-500 truncate">
                {value.organization.company}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.GitPullRequest size={16} />
          <span>{value.organization.public_repos} repos</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.Users size={16} />
          <span>{value.organization.followers} followers</span>
        </div>
      </div>
    </div>
  );
}
