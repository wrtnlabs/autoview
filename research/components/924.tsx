import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A team's access to a repository.
   *
   * @title Team Repository
   */
  export type team_repository = {
    /**
     * Unique identifier of the repository
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The name of the repository.
     */
    name: string;
    full_name: string;
    license: AutoViewInputSubTypes.nullable_license_simple;
    forks: number & tags.Type<"int32">;
    permissions?: {
      admin: boolean;
      pull: boolean;
      triage?: boolean;
      push: boolean;
      maintain?: boolean;
    };
    role_name?: string;
    owner: AutoViewInputSubTypes.nullable_simple_user;
    /**
     * Whether the repository is private or public.
     */
    private: boolean;
    html_url: string & tags.Format<"uri">;
    description: string | null;
    fork: boolean;
    url: string & tags.Format<"uri">;
    archive_url: string;
    assignees_url: string;
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string & tags.Format<"uri">;
    deployments_url: string & tags.Format<"uri">;
    downloads_url: string & tags.Format<"uri">;
    events_url: string & tags.Format<"uri">;
    forks_url: string & tags.Format<"uri">;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string & tags.Format<"uri">;
    merges_url: string & tags.Format<"uri">;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string & tags.Format<"uri">;
    statuses_url: string;
    subscribers_url: string & tags.Format<"uri">;
    subscription_url: string & tags.Format<"uri">;
    tags_url: string & tags.Format<"uri">;
    teams_url: string & tags.Format<"uri">;
    trees_url: string;
    clone_url: string;
    mirror_url: (string & tags.Format<"uri">) | null;
    hooks_url: string & tags.Format<"uri">;
    svn_url: string & tags.Format<"uri">;
    homepage: (string & tags.Format<"uri">) | null;
    language: string | null;
    forks_count: number & tags.Type<"int32">;
    stargazers_count: number & tags.Type<"int32">;
    watchers_count: number & tags.Type<"int32">;
    size: number & tags.Type<"int32">;
    /**
     * The default branch of the repository.
     */
    default_branch: string;
    open_issues_count: number & tags.Type<"int32">;
    /**
     * Whether this repository acts as a template that can be used to generate new repositories.
     */
    is_template?: boolean;
    topics?: string[];
    /**
     * Whether issues are enabled.
     */
    has_issues: boolean;
    /**
     * Whether projects are enabled.
     */
    has_projects: boolean;
    /**
     * Whether the wiki is enabled.
     */
    has_wiki: boolean;
    has_pages: boolean;
    /**
     * Whether downloads are enabled.
     */
    has_downloads: boolean;
    /**
     * Whether the repository is archived.
     */
    archived: boolean;
    /**
     * Returns whether or not this repository disabled.
     */
    disabled: boolean;
    /**
     * The repository visibility: public, private, or internal.
     */
    visibility?: string & tags.Default<"public">;
    pushed_at: (string & tags.Format<"date-time">) | null;
    created_at: (string & tags.Format<"date-time">) | null;
    updated_at: (string & tags.Format<"date-time">) | null;
    /**
     * Whether to allow rebase merges for pull requests.
     */
    allow_rebase_merge?: boolean;
    temp_clone_token?: string;
    /**
     * Whether to allow squash merges for pull requests.
     */
    allow_squash_merge?: boolean;
    /**
     * Whether to allow Auto-merge to be used on pull requests.
     */
    allow_auto_merge?: boolean;
    /**
     * Whether to delete head branches when pull requests are merged
     */
    delete_branch_on_merge?: boolean;
    /**
     * Whether to allow merge commits for pull requests.
     */
    allow_merge_commit?: boolean;
    /**
     * Whether to allow forking this repo
     */
    allow_forking?: boolean;
    /**
     * Whether to require contributors to sign off on web-based commits
     */
    web_commit_signoff_required?: boolean;
    subscribers_count?: number & tags.Type<"int32">;
    network_count?: number & tags.Type<"int32">;
    open_issues: number & tags.Type<"int32">;
    watchers: number & tags.Type<"int32">;
    master_branch?: string;
  };
  /**
   * License Simple
   *
   * @title License Simple
   */
  export type nullable_license_simple = {
    key: string;
    name: string;
    url: (string & tags.Format<"uri">) | null;
    spdx_id: string | null;
    node_id: string;
    html_url?: string & tags.Format<"uri">;
  } | null;
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type nullable_simple_user = {
    name?: string | null;
    email?: string | null;
    login: string;
    id: number & tags.Type<"int32">;
    node_id: string;
    avatar_url: string & tags.Format<"uri">;
    gravatar_id: string | null;
    url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    followers_url: string & tags.Format<"uri">;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string & tags.Format<"uri">;
    organizations_url: string & tags.Format<"uri">;
    repos_url: string & tags.Format<"uri">;
    events_url: string;
    received_events_url: string & tags.Format<"uri">;
    type: string;
    site_admin: boolean;
    starred_at?: string;
    user_view_type?: string;
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.team_repository;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants for display
  const avatarFallback = value.owner?.login
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(value.owner.login)}&background=0D8ABC&color=fff`
    : "https://placehold.co/40x40?text=?";
  const avatarSrc = value.owner?.avatar_url || avatarFallback;
  const updatedDate = new Date(
    value.updated_at ?? value.pushed_at ?? value.created_at ?? "",
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const descriptionText = value.description || "No description provided.";
  const topics = Array.isArray(value.topics) ? value.topics : [];
  const displayedTopics = topics.slice(0, 5);

  // 2. JSX structure
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition">
      {/* Header: Owner avatar and repository identity */}
      <div className="flex items-center space-x-3">
        <img
          src={avatarSrc}
          alt={value.owner?.login ?? "Owner"}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = avatarFallback;
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {value.full_name}
            </h2>
            {value.private ? (
              <LucideReact.Lock size={16} className="text-gray-500" />
            ) : (
              <LucideReact.Unlock size={16} className="text-gray-500" />
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">
            @{value.owner?.login}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-700 text-sm line-clamp-2">
        {descriptionText}
      </p>

      {/* Topics / Tags */}
      {displayedTopics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {displayedTopics.map((topic) => (
            <span
              key={topic}
              className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
            >
              {topic}
            </span>
          ))}
          {topics.length > displayedTopics.length && (
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
              +{topics.length - displayedTopics.length} more
            </span>
          )}
        </div>
      )}

      {/* Statistics */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600 text-sm">
        <div className="flex items-center space-x-1">
          <LucideReact.Star size={16} className="text-yellow-400" />
          <span>{value.stargazers_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.GitBranch size={16} />
          <span>{value.forks_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Eye size={16} />
          <span>{value.watchers_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.AlertCircle size={16} className="text-red-400" />
          <span>{value.open_issues_count}</span>
        </div>
        {value.language && (
          <div className="flex items-center space-x-1">
            <LucideReact.Code size={16} />
            <span>{value.language}</span>
          </div>
        )}
        {value.license?.name && (
          <div className="flex items-center space-x-1">
            <LucideReact.FileText size={16} />
            <span>{value.license.name}</span>
          </div>
        )}
      </div>

      {/* Footer: Last updated timestamp */}
      <div className="flex items-center mt-4 text-xs text-gray-500">
        <LucideReact.Calendar size={14} />
        <span className="ml-1">Updated on {updatedDate}</span>
      </div>
    </div>
  );
}
