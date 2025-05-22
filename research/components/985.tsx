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
export type AutoViewInput = AutoViewInputSubTypes.team_full[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const teams = Array.isArray(value)
    ? [...value].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (teams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <LucideReact.AlertCircle className="text-gray-400" size={48} />
        <p className="mt-4 text-gray-500">No teams available</p>
      </div>
    );
  }

  return (
    <section className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col"
          >
            {/* Header: Team name and external link */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {team.name}
              </h2>
              <a
                href={team.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600"
                aria-label={`Visit ${team.name} on GitHub`}
              >
                <LucideReact.ExternalLink size={16} />
              </a>
            </div>
            {/* Slug */}
            <div className="text-sm text-gray-500 mb-2 truncate">
              @{team.slug}
            </div>
            {/* Description */}
            {team.description && (
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {team.description}
              </p>
            )}
            {/* Key statistics */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <LucideReact.Users size={16} className="mr-1" />
                {team.members_count}
              </div>
              <div className="flex items-center">
                <LucideReact.GitBranch size={16} className="mr-1" />
                {team.repos_count}
              </div>
              <div className="flex items-center">
                <LucideReact.Tag size={16} className="mr-1" />
                {team.permission}
              </div>
            </div>
            {/* Privacy & Notification badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {team.privacy === "secret" && (
                <div className="flex items-center bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                  <LucideReact.Lock size={12} className="mr-1" />
                  Secret
                </div>
              )}
              {team.privacy === "closed" && (
                <div className="flex items-center bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">
                  <LucideReact.LockOpen size={12} className="mr-1" />
                  Closed
                </div>
              )}
              {team.notification_setting === "notifications_enabled" && (
                <div className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                  <LucideReact.Bell size={12} className="mr-1" />
                  Notifications On
                </div>
              )}
              {team.notification_setting === "notifications_disabled" && (
                <div className="flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                  <LucideReact.BellOff size={12} className="mr-1" />
                  Notifications Off
                </div>
              )}
            </div>
            {/* Creation date */}
            <div className="mt-auto flex items-center text-xs text-gray-500">
              <LucideReact.Calendar size={14} className="mr-1" />
              Created: {formatDate(team.created_at)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
