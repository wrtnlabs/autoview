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
  // If no repositories are provided, show an empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No repositories available</span>
      </div>
    );
  }

  // Helper to format dates (e.g., "Jan 5, 2024")
  const formatDate = (dateString?: string | null): string => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString("default", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((repo) => {
        const {
          id,
          name,
          full_name,
          description,
          owner,
          private: isPrivate,
          archived,
          language,
          stargazers_count,
          forks_count,
          open_issues_count,
          topics,
          updated_at,
        } = repo;

        // Fallback avatar URL if loading fails
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          owner.login,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
          >
            {/* Header: Repo name and visibility */}
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isPrivate ? (
                  <LucideReact.Lock size={16} className="text-gray-500" />
                ) : (
                  <LucideReact.Unlock size={16} className="text-gray-500" />
                )}
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {name}
                </h2>
              </div>
              {archived && (
                <div className="flex items-center space-x-1 text-gray-500">
                  <LucideReact.Archive size={16} />
                  <span className="text-sm">Archived</span>
                </div>
              )}
            </div>

            {/* Body: Description */}
            {description && (
              <p className="px-4 py-2 text-gray-700 text-sm line-clamp-2">
                {description}
              </p>
            )}

            {/* Footer: Stats, owner, language, updated date */}
            <div className="mt-auto px-4 py-3 border-t border-gray-200 flex flex-col space-y-2">
              <div className="flex items-center justify-between text-gray-600 text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <LucideReact.Star size={16} className="text-yellow-500" />
                    <span>{stargazers_count ?? 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideReact.GitBranch
                      size={16}
                      className="text-gray-500"
                    />
                    <span>{forks_count ?? 0}</span>
                  </div>
                  {open_issues_count !== undefined && (
                    <div className="flex items-center space-x-1">
                      <LucideReact.AlertCircle
                        size={16}
                        className="text-red-500"
                      />
                      <span>{open_issues_count}</span>
                    </div>
                  )}
                </div>
                {language && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.Tag size={16} className="text-blue-500" />
                    <span>{language}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-gray-500 text-xs">
                <div className="flex items-center space-x-2">
                  <img
                    src={owner.avatar_url}
                    alt={`${owner.login}'s avatar`}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = avatarFallback;
                    }}
                  />
                  <span className="truncate">{owner.login}</span>
                </div>
                {updated_at && (
                  <div className="flex items-center space-x-1">
                    <LucideReact.Calendar size={14} />
                    <span>Updated {formatDate(updated_at)}</span>
                  </div>
                )}
              </div>

              {/* Topics as badges */}
              {topics && topics.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {topics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
