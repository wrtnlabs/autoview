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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isPrivate = value.private;
  const visibilityIcon = isPrivate ? (
    <LucideReact.Lock className="text-gray-500" size={16} />
  ) : (
    <LucideReact.Unlock className="text-gray-500" size={16} />
  );
  const licenseName = value.license?.name || "No license";
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";
  const topics = Array.isArray(value.topics) ? value.topics : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Name and Privacy */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-600 truncate">
          {value.full_name}
        </h2>
        {visibilityIcon}
      </div>

      {/* Role and Owner */}
      <div className="flex items-center space-x-2 mt-1">
        {value.role_name && (
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded">
            {value.role_name}
          </span>
        )}
        {value.owner && (
          <div className="flex items-center space-x-1">
            <img
              src={value.owner.avatar_url}
              alt={value.owner.login + " avatar"}
              className="w-5 h-5 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    value.owner?.login || "?",
                  )}&background=ddd&color=333`;
              }}
            />
            <span className="text-gray-600 text-sm truncate">
              {value.owner.login}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-2 mt-3">
        {value.description || "No description provided."}
      </p>

      {/* Topics */}
      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <LucideReact.Star size={16} className="text-yellow-500" />
          <span>{value.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} />
          <span>{value.forks_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Eye size={16} />
          <span>{value.watchers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.AlertCircle size={16} />
          <span>{value.open_issues.toLocaleString()}</span>
        </div>
      </div>

      {/* Footer: License and Updated */}
      <div className="flex items-center justify-between mt-4 text-gray-500 text-xs">
        <div className="flex items-center gap-1">
          <LucideReact.FileText size={14} />
          <span>{licenseName}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Updated {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
