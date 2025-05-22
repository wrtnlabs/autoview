import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Combined Commit Status
   *
   * @title Combined Commit Status
   */
  export type combined_commit_status = {
    state: string;
    statuses: AutoViewInputSubTypes.simple_commit_status[];
    sha: string;
    total_count: number & tags.Type<"int32">;
    repository: AutoViewInputSubTypes.minimal_repository;
    commit_url: string & tags.Format<"uri">;
    url: string & tags.Format<"uri">;
  };
  /**
   * @title Simple Commit Status
   */
  export type simple_commit_status = {
    description: string | null;
    id: number & tags.Type<"int32">;
    node_id: string;
    state: string;
    context: string;
    target_url: (string & tags.Format<"uri">) | null;
    required?: boolean | null;
    avatar_url: (string & tags.Format<"uri">) | null;
    url: string & tags.Format<"uri">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
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
export type AutoViewInput = AutoViewInputSubTypes.combined_commit_status;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const shortSha = value.sha.slice(0, 7);

  // Icon mapper for commit status
  function getStatusIcon(state: string, size = 16): React.ReactNode {
    switch (state.toLowerCase()) {
      case "success":
        return (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={size}
            aria-label="Success"
          />
        );
      case "failure":
      case "error":
        return (
          <LucideReact.AlertTriangle
            className="text-red-500"
            size={size}
            aria-label="Error"
          />
        );
      case "pending":
      case "in_progress":
        return (
          <LucideReact.Clock
            className="text-amber-500"
            size={size}
            aria-label="Pending"
          />
        );
      default:
        return (
          <LucideReact.Info
            className="text-gray-500"
            size={size}
            aria-label={state}
          />
        );
    }
  }

  // Fallback avatar URL for owner
  const ownerInitials = encodeURIComponent(value.repository.owner.login);
  const avatarFallback = `https://ui-avatars.com/api/?name=${ownerInitials}&background=ddd&color=555`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4 max-w-full">
      {/* Header: Repository + Commit + Overall State */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={value.repository.owner.avatar_url}
              alt={value.repository.owner.login}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = avatarFallback;
              }}
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-gray-900 truncate">
              {value.repository.full_name}
            </span>
            <span className="text-sm text-gray-500 truncate">
              Commit {shortSha}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(value.state, 20)}
          <span className="font-medium capitalize text-gray-800">
            {value.state}
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600">
        <LucideReact.ListChecks
          className="inline-block mr-1 text-gray-500"
          size={14}
        />
        Total statuses: {value.total_count}
      </div>

      {/* Detailed statuses */}
      <div className="border border-gray-100 rounded divide-y divide-gray-100">
        {value.statuses.map((status) => (
          <div key={status.id} className="flex items-start p-3 space-x-3">
            <div className="flex-shrink-0">{getStatusIcon(status.state)}</div>
            <div className="flex flex-col w-full space-y-1 overflow-hidden">
              <span className="font-medium text-gray-800 truncate">
                {status.context}
              </span>
              {status.description && (
                <span className="text-sm text-gray-600 line-clamp-2">
                  {status.description}
                </span>
              )}
              {status.target_url && (
                <div className="flex items-center text-sm text-blue-500 truncate">
                  <LucideReact.Link className="mr-1 shrink-0" size={14} />
                  <span className="truncate max-w-xs">{status.target_url}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
