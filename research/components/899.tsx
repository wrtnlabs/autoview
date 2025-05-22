import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Minimal Repository
   *
   * @title Minimal Repository
   */
  export type minimal_repository = {
    id: number & tags.Type<"int32">;
    node_id: string;
    name: string;
    full_name: string;
    owner: AutoViewInputSubTypes.simple_user;
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
    git_url?: string;
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
    ssh_url?: string;
    stargazers_url: string & tags.Format<"uri">;
    statuses_url: string;
    subscribers_url: string & tags.Format<"uri">;
    subscription_url: string & tags.Format<"uri">;
    tags_url: string & tags.Format<"uri">;
    teams_url: string & tags.Format<"uri">;
    trees_url: string;
    clone_url?: string;
    mirror_url?: string | null;
    hooks_url: string & tags.Format<"uri">;
    svn_url?: string;
    homepage?: string | null;
    language?: string | null;
    forks_count?: number & tags.Type<"int32">;
    stargazers_count?: number & tags.Type<"int32">;
    watchers_count?: number & tags.Type<"int32">;
    /**
     * The size of the repository, in kilobytes. Size is calculated hourly. When a repository is initially created, the size is 0.
     */
    size?: number & tags.Type<"int32">;
    default_branch?: string;
    open_issues_count?: number & tags.Type<"int32">;
    is_template?: boolean;
    topics?: string[];
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    has_pages?: boolean;
    has_downloads?: boolean;
    has_discussions?: boolean;
    archived?: boolean;
    disabled?: boolean;
    visibility?: string;
    pushed_at?: (string & tags.Format<"date-time">) | null;
    created_at?: (string & tags.Format<"date-time">) | null;
    updated_at?: (string & tags.Format<"date-time">) | null;
    permissions?: {
      admin?: boolean;
      maintain?: boolean;
      push?: boolean;
      triage?: boolean;
      pull?: boolean;
    };
    role_name?: string;
    temp_clone_token?: string;
    delete_branch_on_merge?: boolean;
    subscribers_count?: number & tags.Type<"int32">;
    network_count?: number & tags.Type<"int32">;
    code_of_conduct?: AutoViewInputSubTypes.code_of_conduct;
    license?: {
      key?: string;
      name?: string;
      spdx_id?: string;
      url?: string;
      node_id?: string;
    } | null;
    forks?: number & tags.Type<"int32">;
    open_issues?: number & tags.Type<"int32">;
    watchers?: number & tags.Type<"int32">;
    allow_forking?: boolean;
    web_commit_signoff_required?: boolean;
    security_and_analysis?: AutoViewInputSubTypes.security_and_analysis;
  };
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
  /**
   * Code Of Conduct
   *
   * @title Code Of Conduct
   */
  export type code_of_conduct = {
    key: string;
    name: string;
    url: string & tags.Format<"uri">;
    body?: string;
    html_url: (string & tags.Format<"uri">) | null;
  };
  export type security_and_analysis = {
    advanced_security?: {
      status?: "enabled" | "disabled";
    };
    code_security?: {
      status?: "enabled" | "disabled";
    };
    /**
     * Enable or disable Dependabot security updates for the repository.
     */
    dependabot_security_updates?: {
      /**
       * The enablement status of Dependabot security updates for the repository.
       */
      status?: "enabled" | "disabled";
    };
    secret_scanning?: {
      status?: "enabled" | "disabled";
    };
    secret_scanning_push_protection?: {
      status?: "enabled" | "disabled";
    };
    secret_scanning_non_provider_patterns?: {
      status?: "enabled" | "disabled";
    };
    secret_scanning_ai_detection?: {
      status?: "enabled" | "disabled";
    };
  } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.minimal_repository[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const repos = value;
  // Empty state
  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No repositories found</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => {
        // Derive a human-readable "updated" date
        const updatedAtRaw =
          repo.updated_at ?? repo.pushed_at ?? repo.created_at;
        const updatedDate = updatedAtRaw
          ? new Date(updatedAtRaw).toLocaleDateString()
          : "Unknown";

        // Fallback for very long or missing descriptions
        const description = repo.description?.trim() || "No description";

        // Topics array
        const topics = repo.topics ?? [];

        // Avatar fallback URL
        const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          repo.owner.login,
        )}&background=random`;

        return (
          <div key={repo.id} className="bg-white p-4 rounded-lg shadow">
            {/* Header: avatar, full name, visibility */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={repo.owner.avatar_url}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
                  }}
                  alt={`${repo.owner.login} avatar`}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800 truncate">
                  {repo.owner.login}/{repo.name}
                </span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  repo.private
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {repo.private ? "Private" : "Public"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {description}
            </p>

            {/* Stats: language, stars, forks, issues */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 mb-3">
              {repo.language && (
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 bg-gray-400 rounded-full mr-1" />
                  <span>{repo.language}</span>
                </div>
              )}
              {typeof repo.stargazers_count === "number" && (
                <div className="flex items-center">
                  <LucideReact.Star size={16} className="text-amber-400 mr-1" />
                  <span>{repo.stargazers_count}</span>
                </div>
              )}
              {typeof repo.forks_count === "number" && (
                <div className="flex items-center">
                  <LucideReact.GitFork
                    size={16}
                    className="text-gray-500 mr-1"
                  />
                  <span>{repo.forks_count}</span>
                </div>
              )}
              {typeof repo.open_issues_count === "number" && (
                <div className="flex items-center">
                  <LucideReact.AlertCircle
                    size={16}
                    className="text-red-500 mr-1"
                  />
                  <span>{repo.open_issues_count}</span>
                </div>
              )}
            </div>

            {/* Branch & update time */}
            <div className="flex justify-between items-center text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <LucideReact.GitBranch size={14} />
                <span>{repo.default_branch}</span>
              </div>
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar size={14} />
                <span>Updated {updatedDate}</span>
              </div>
            </div>

            {/* Topics */}
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
