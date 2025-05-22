import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Thread
   *
   * @title Thread
   */
  export type thread = {
    id: string;
    repository: AutoViewInputSubTypes.minimal_repository;
    subject: {
      title: string;
      url: string;
      latest_comment_url: string;
      type: string;
    };
    reason: string;
    unread: boolean;
    updated_at: string;
    last_read_at: string | null;
    url: string;
    subscription_url: string;
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
export type AutoViewInput = AutoViewInputSubTypes.thread;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived values
  const { repository, subject, reason, unread, updated_at, last_read_at } =
    value;

  const formattedUpdatedAt = new Date(updated_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedLastRead = last_read_at
    ? new Date(last_read_at).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const subjectIcon = subject.type.toLowerCase().includes("pull") ? (
    <LucideReact.GitPullRequest className="text-gray-500" size={16} />
  ) : subject.type.toLowerCase().includes("issue") ? (
    <LucideReact.AlertCircle className="text-gray-500" size={16} />
  ) : (
    <LucideReact.FileText className="text-gray-500" size={16} />
  );

  const badgeColor =
    reason === "mention"
      ? "bg-blue-100 text-blue-800"
      : reason === "review_requested"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-gray-100 text-gray-800";

  // 2. JSX structure
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all max-w-lg w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {unread && (
            <span
              className="inline-block h-2 w-2 bg-blue-500 rounded-full"
              aria-label="Unread"
              title="Unread"
            />
          )}
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={repository.owner.avatar_url}
            alt={`${repository.owner.login} avatar`}
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                repository.owner.login,
              )}&background=ccc&color=fff`;
            }}
          />
          <span className="text-sm font-medium text-gray-700 truncate">
            {repository.full_name}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 text-xs font-medium rounded ${badgeColor}`}
        >
          {reason.charAt(0).toUpperCase() + reason.slice(1)}
        </span>
      </div>

      <div className="mt-3 flex items-start space-x-2">
        {subjectIcon}
        <p className="text-gray-800 font-semibold line-clamp-2 break-words">
          {subject.title}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center text-gray-500 text-xs space-x-4">
        <div className="flex items-center space-x-1">
          <LucideReact.Clock size={14} />
          <span>Updated {formattedUpdatedAt}</span>
        </div>
        {formattedLastRead && (
          <div className="flex items-center space-x-1">
            <LucideReact.CheckCircle className="text-green-500" size={14} />
            <span>Last read {formattedLastRead}</span>
          </div>
        )}
      </div>
    </div>
  );
}
