import * as LucideReact from "lucide-react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <ul className="space-y-6">
      {value.map((repo) => (
        <li
          key={repo.id}
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-start space-x-4">
            <img
              src={repo.owner.avatar_url}
              alt={`${repo.owner.login} avatar`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    repo.owner.login,
                  )}&background=0D8ABC&color=fff`;
              }}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {repo.full_name}
                </h2>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2 text-sm">
                  {repo.private ? (
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                      Private
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                      Public
                    </span>
                  )}
                  {repo.fork && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                      Fork
                    </span>
                  )}
                </div>
              </div>
              {repo.description && (
                <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                  {repo.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center space-x-1">
                  <LucideReact.Star size={16} className="text-yellow-500" />
                  <span>{repo.stargazers_count ?? 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.GitBranch size={16} className="text-gray-500" />
                  <span>{repo.forks_count ?? 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.GitPullRequest
                    size={16}
                    className="text-gray-500"
                  />
                  <span>{repo.open_issues_count ?? 0}</span>
                </div>
                {repo.watchers_count !== undefined && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.Eye size={16} className="text-gray-500" />
                    <span>{repo.watchers_count}</span>
                  </div>
                )}
                {repo.language && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                    {repo.language}
                  </span>
                )}
                {repo.license && repo.license.name && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.FileText size={16} className="text-gray-500" />
                    <span>{repo.license.name}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </div>
              {repo.topics && repo.topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
      {value.length === 0 && (
        <li className="flex flex-col items-center py-8 text-gray-500">
          <LucideReact.AlertCircle size={36} />
          <span className="mt-2">No repositories to display</span>
        </li>
      )}
    </ul>
  );
}
