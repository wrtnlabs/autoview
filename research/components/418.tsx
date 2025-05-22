import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsActionsVariablesRepositories {
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
  AutoViewInputSubTypes.IApiOrgsActionsVariablesRepositories.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRepos = new Intl.NumberFormat().format(value.total_count);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
        <LucideReact.GitBranch size={20} className="text-gray-500 mr-2" />
        {totalRepos} Repositories
      </h2>

      {value.repositories.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-20">
          <LucideReact.AlertCircle size={48} />
          <span className="mt-2">No repositories found.</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {value.repositories.map((repo) => {
            const ownerName = repo.owner.name ?? repo.owner.login;
            const visibilityLabel = repo.private ? "Private" : "Public";

            return (
              <li
                key={repo.id}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-start justify-between">
                  {/* Owner & Title */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={repo.owner.avatar_url}
                      alt={`${ownerName} avatar`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          ownerName,
                        )}&background=0d8abc&color=fff`;
                      }}
                    />
                    <div className="flex flex-col">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline font-medium text-sm"
                      >
                        {repo.full_name}
                        <LucideReact.ExternalLink size={16} className="ml-1" />
                      </a>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        {repo.private ? (
                          <LucideReact.Lock size={14} className="mr-1" />
                        ) : (
                          <LucideReact.Globe size={14} className="mr-1" />
                        )}
                        <span>{visibilityLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats & Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs">
                    {typeof repo.stargazers_count === "number" && (
                      <div className="flex items-center">
                        <LucideReact.Star
                          size={14}
                          className="mr-1 text-amber-400"
                        />
                        <span>
                          {new Intl.NumberFormat().format(
                            repo.stargazers_count,
                          )}
                        </span>
                      </div>
                    )}
                    {typeof repo.forks_count === "number" && (
                      <div className="flex items-center">
                        <LucideReact.GitBranch size={14} className="mr-1" />
                        <span>
                          {new Intl.NumberFormat().format(repo.forks_count)}
                        </span>
                      </div>
                    )}
                    {typeof repo.watchers_count === "number" && (
                      <div className="flex items-center">
                        <LucideReact.Eye size={14} className="mr-1" />
                        <span>
                          {new Intl.NumberFormat().format(repo.watchers_count)}
                        </span>
                      </div>
                    )}
                    {repo.language && (
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-1" />
                        <span>{repo.language}</span>
                      </div>
                    )}
                    {repo.license?.name && (
                      <div className="flex items-center">
                        <LucideReact.FileText size={14} className="mr-1" />
                        <span>{repo.license.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-2 text-gray-700 text-sm line-clamp-2">
                  {repo.description ?? "No description provided."}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
