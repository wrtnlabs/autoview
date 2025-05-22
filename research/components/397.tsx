import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsRunnerGroupsRepositories {
    export type GetResponse = {
      total_count: number;
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
  AutoViewInputSubTypes.IApiOrgsActionsRunnerGroupsRepositories.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatNumber = (num: number): string =>
    num > 999 ? `${(num / 1000).toFixed(1)}k` : num.toString();

  const avatarFallback = (login: string): string =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      login,
    )}&background=random&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center mb-4">
        <LucideReact.List
          size={20}
          className="text-gray-500 mr-2"
          aria-label="Repositories"
        />
        <h2 className="text-lg font-semibold text-gray-700">
          Repositories ({formatNumber(value.total_count)})
        </h2>
      </div>

      {/* Empty state */}
      {value.repositories.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-10">
          <LucideReact.AlertCircle size={48} aria-label="No data" />
          <span className="mt-2">No repositories available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {value.repositories.map((repo) => (
            <li key={repo.id} className="flex space-x-4">
              {/* Avatar */}
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login} avatar`}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = avatarFallback(repo.owner.login);
                }}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />

              {/* Repository details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium truncate"
                  >
                    {repo.full_name}
                  </a>
                  {repo.private && (
                    <span className="px-1.5 py-0.5 text-xs font-semibold bg-gray-200 text-gray-600 rounded">
                      Private
                    </span>
                  )}
                  {repo.fork && (
                    <span className="px-1.5 py-0.5 text-xs font-semibold bg-gray-200 text-gray-600 rounded">
                      Fork
                    </span>
                  )}
                </div>

                {repo.description && (
                  <p className="text-gray-500 mt-1 text-sm line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center mt-2 text-gray-400 text-sm space-x-4">
                  {repo.language && (
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1" />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  {typeof repo.stargazers_count === "number" && (
                    <div className="flex items-center">
                      <LucideReact.Star
                        size={16}
                        className="mr-1"
                        aria-label="Stars"
                      />
                      <span>{formatNumber(repo.stargazers_count)}</span>
                    </div>
                  )}
                  {typeof repo.forks_count === "number" && (
                    <div className="flex items-center">
                      <LucideReact.GitBranch
                        size={16}
                        className="mr-1"
                        aria-label="Forks"
                      />
                      <span>{formatNumber(repo.forks_count)}</span>
                    </div>
                  )}
                  {typeof repo.open_issues_count === "number" && (
                    <div className="flex items-center">
                      <LucideReact.AlertCircle
                        size={16}
                        className="mr-1"
                        aria-label="Open Issues"
                      />
                      <span>{formatNumber(repo.open_issues_count)}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
