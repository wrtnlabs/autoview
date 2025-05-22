import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsDependabotSecretsRepositories {
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
  AutoViewInputSubTypes.IApiOrgsDependabotSecretsRepositories.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRepos = value.total_count;
  const repos = value.repositories;
  const formatNumber = (num?: number): string =>
    num != null ? num.toLocaleString() : "-";
  const placeholderAvatar = (login: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
      <div className="flex items-center mb-4">
        <LucideReact.GitBranch className="text-gray-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-700">
          Repositories ({totalRepos.toLocaleString()})
        </h2>
      </div>
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start sm:items-center">
              <img
                src={repo.owner.avatar_url}
                alt={repo.owner.login}
                onError={(e) => {
                  e.currentTarget.src = placeholderAvatar(repo.owner.login);
                }}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 overflow-hidden">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {repo.full_name}
                </h3>
                {repo.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {repo.description}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 sm:mt-0 flex flex-wrap items-center space-x-3 text-xs text-gray-600">
              {repo.private ? (
                <div className="flex items-center">
                  <LucideReact.Lock size={14} />
                  <span className="ml-1">Private</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <LucideReact.Unlock size={14} />
                  <span className="ml-1">Public</span>
                </div>
              )}
              {repo.stargazers_count != null && (
                <div className="flex items-center">
                  <LucideReact.Star size={14} className="text-yellow-400" />
                  <span className="ml-1">
                    {formatNumber(repo.stargazers_count)}
                  </span>
                </div>
              )}
              {repo.watchers_count != null && (
                <div className="flex items-center">
                  <LucideReact.Eye size={14} className="text-gray-500" />
                  <span className="ml-1">
                    {formatNumber(repo.watchers_count)}
                  </span>
                </div>
              )}
              {(repo.forks_count != null || repo.forks != null) && (
                <div className="flex items-center">
                  <LucideReact.GitBranch size={14} className="text-gray-500" />
                  <span className="ml-1">
                    {formatNumber(repo.forks_count ?? repo.forks)}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
