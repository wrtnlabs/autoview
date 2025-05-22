import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Organization Full
   *
   * @title Organization Full
   */
  export type organization_full = {
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
    type: string;
    total_private_repos?: number & tags.Type<"int32">;
    owned_private_repos?: number & tags.Type<"int32">;
    private_gists?: (number & tags.Type<"int32">) | null;
    disk_usage?: (number & tags.Type<"int32">) | null;
    /**
     * The number of collaborators on private repositories.
     *
     * This field may be null if the number of private repositories is over 50,000.
     */
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
    /**
     * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
     *
     * Whether GitHub Advanced Security is enabled for new repositories and repositories transferred to this organization.
     *
     * This field is only visible to organization owners or members of a team with the security manager role.
     *
     * @deprecated
     */
    advanced_security_enabled_for_new_repositories?: boolean;
    /**
     * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
     *
     * Whether Dependabot alerts are automatically enabled for new repositories and repositories transferred to this organization.
     *
     * This field is only visible to organization owners or members of a team with the security manager role.
     *
     * @deprecated
     */
    dependabot_alerts_enabled_for_new_repositories?: boolean;
    /**
     * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
     *
     * Whether Dependabot security updates are automatically enabled for new repositories and repositories transferred to this organization.
     *
     * This field is only visible to organization owners or members of a team with the security manager role.
     *
     * @deprecated
     */
    dependabot_security_updates_enabled_for_new_repositories?: boolean;
    /**
     * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
     *
     * Whether dependency graph is automatically enabled for new repositories and repositories transferred to this organization.
     *
     * This field is only visible to organization owners or members of a team with the security manager role.
     *
     * @deprecated
     */
    dependency_graph_enabled_for_new_repositories?: boolean;
    /**
     * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
     *
     * Whether secret scanning is automatically enabled for new repositories and repositories transferred to this organization.
     *
     * This field is only visible to organization owners or members of a team with the security manager role.
     *
     * @deprecated
     */
    secret_scanning_enabled_for_new_repositories?: boolean;
    /**
     * **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.
     *
     * Whether secret scanning push protection is automatically enabled for new repositories and repositories transferred to this organization.
     *
     * This field is only visible to organization owners or members of a team with the security manager role.
     *
     * @deprecated
     */
    secret_scanning_push_protection_enabled_for_new_repositories?: boolean;
    /**
     * Whether a custom link is shown to contributors who are blocked from pushing a secret by push protection.
     */
    secret_scanning_push_protection_custom_link_enabled?: boolean;
    /**
     * An optional URL string to display to contributors who are blocked from pushing a secret.
     */
    secret_scanning_push_protection_custom_link?: string | null;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    archived_at: (string & tags.Format<"date-time">) | null;
    /**
     * Controls whether or not deploy keys may be added and used for repositories in the organization.
     */
    deploy_keys_enabled_for_repositories?: boolean;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_full;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define derived constants for display.
  const displayName = value.name ?? value.login;
  const description = value.description ?? "No description available.";
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  const avatarSrc = value.avatar_url;
  const stats = [
    {
      label: "Repositories",
      value: value.public_repos,
      icon: (
        <LucideReact.GitBranch
          size={16}
          className="text-gray-500"
          aria-label="Repositories"
        />
      ),
    },
    {
      label: "Gists",
      value: value.public_gists,
      icon: (
        <LucideReact.Code
          size={16}
          className="text-gray-500"
          aria-label="Gists"
        />
      ),
    },
    {
      label: "Followers",
      value: value.followers,
      icon: (
        <LucideReact.Users
          size={16}
          className="text-gray-500"
          aria-label="Followers"
        />
      ),
    },
    {
      label: "Following",
      value: value.following,
      icon: (
        <LucideReact.UserPlus
          size={16}
          className="text-gray-500"
          aria-label="Following"
        />
      ),
    },
  ];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatarSrc}
          alt={`${displayName} avatar`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                displayName,
              )}&background=0D8ABC&color=fff`;
          }}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Main Info */}
      <div className="mt-4 md:mt-0 md:ml-6 flex-1">
        {/* Name and Verification */}
        <div className="flex items-center justify-center md:justify-start">
          <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
          {value.is_verified && (
            <LucideReact.CheckCircle
              size={16}
              className="ml-2 text-blue-500"
              aria-label="Verified"
            />
          )}
        </div>

        {/* Description */}
        <p className="mt-2 text-gray-700 line-clamp-3">{description}</p>

        {/* Contact & Meta */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
          {value.location && (
            <div className="flex items-center gap-1">
              <LucideReact.MapPin
                size={16}
                className="text-gray-400"
                aria-label="Location"
              />
              <span className="truncate">{value.location}</span>
            </div>
          )}
          {value.email && (
            <div className="flex items-center gap-1">
              <LucideReact.Mail
                size={16}
                className="text-gray-400"
                aria-label="Email"
              />
              <span className="truncate">{value.email}</span>
            </div>
          )}
          {value.blog && (
            <div className="flex items-center gap-1">
              <LucideReact.Link
                size={16}
                className="text-gray-400"
                aria-label="Blog"
              />
              <a
                href={value.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-500 hover:underline"
              >
                {value.blog}
              </a>
            </div>
          )}
          {value.twitter_username && (
            <div className="flex items-center gap-1">
              <LucideReact.Twitter
                size={16}
                className="text-blue-400"
                aria-label="Twitter"
              />
              <a
                href={`https://twitter.com/${value.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-blue-500 hover:underline"
              >
                @{value.twitter_username}
              </a>
            </div>
          )}
          <div className="flex items-center gap-1 col-span-full">
            <LucideReact.Calendar
              size={16}
              className="text-gray-400"
              aria-label="Joined"
            />
            <span>Joined {formattedDate}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-4 border-t border-gray-200 pt-4 flex justify-between text-gray-700">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              {stat.icon}
              <span className="mt-1 text-sm font-medium">{stat.value}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
