import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiUserCodespacesSecretsRepositories {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      repositories: AutoViewInputSubTypes.minimal_repository[];
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiUserCodespacesSecretsRepositories.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Repositories ({value.total_count})
        </h2>
        {value.total_count === 0 && (
          <div className="flex items-center text-gray-500 gap-1">
            <LucideReact.AlertCircle size={20} />
            <span>No repositories found</span>
          </div>
        )}
      </div>

      {value.total_count > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.repositories.map((repo) => (
            <li
              key={repo.id}
              className="flex flex-col bg-gray-50 border border-gray-200 rounded-lg p-4"
            >
              {/* Owner & Privacy */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          repo.owner.login,
                        )}&background=0D8ABC&color=fff`;
                    }}
                  />
                  <span className="text-gray-700 font-medium truncate">
                    {repo.owner.login}
                  </span>
                </div>
                {repo.private ? (
                  <LucideReact.Lock
                    className="text-gray-500"
                    size={16}
                    aria-label="Private repository"
                  />
                ) : (
                  <LucideReact.Unlock
                    className="text-gray-500"
                    size={16}
                    aria-label="Public repository"
                  />
                )}
              </div>

              {/* Repository Info */}
              <div className="mb-2">
                <h3 className="text-blue-600 font-semibold truncate">
                  {repo.name}
                </h3>
                <p className="text-gray-500 text-sm truncate">
                  {repo.full_name}
                </p>
              </div>

              {/* Description */}
              {repo.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {repo.description}
                </p>
              )}

              {/* Stats & Topics */}
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <LucideReact.Star size={16} />
                  <span>{repo.stargazers_count ?? 0}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <LucideReact.GitBranch size={16} />
                  <span>{repo.forks_count ?? repo.forks ?? 0}</span>
                </div>
                {(repo.watchers_count ?? repo.watchers) !== undefined && (
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <LucideReact.Eye size={16} />
                    <span>{repo.watchers_count ?? repo.watchers}</span>
                  </div>
                )}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Last Updated */}
              <div className="mt-3 flex items-center gap-1 text-gray-400 text-xs">
                <LucideReact.Calendar size={14} />
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
