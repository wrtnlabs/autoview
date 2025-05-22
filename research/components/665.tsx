import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A suite of checks performed on the code of a given code change
   *
   * @title CheckSuite
   */
  export type check_suite = {
    id: number & tags.Type<"int32">;
    node_id: string;
    head_branch: string | null;
    /**
     * The SHA of the head commit that is being checked.
     */
    head_sha: string;
    /**
     * The phase of the lifecycle that the check suite is currently in. Statuses of waiting, requested, and pending are reserved for GitHub Actions check suites.
     */
    status:
      | "queued"
      | "in_progress"
      | "completed"
      | "waiting"
      | "requested"
      | "pending"
      | null;
    conclusion:
      | "success"
      | "failure"
      | "neutral"
      | "cancelled"
      | "skipped"
      | "timed_out"
      | "action_required"
      | "startup_failure"
      | "stale"
      | null;
    url: string | null;
    before: string | null;
    after: string | null;
    pull_requests: AutoViewInputSubTypes.pull_request_minimal[] | null;
    app: AutoViewInputSubTypes.nullable_integration;
    repository: AutoViewInputSubTypes.minimal_repository;
    created_at: (string & tags.Format<"date-time">) | null;
    updated_at: (string & tags.Format<"date-time">) | null;
    head_commit: AutoViewInputSubTypes.simple_commit;
    latest_check_runs_count: number & tags.Type<"int32">;
    check_runs_url: string;
    rerequestable?: boolean;
    runs_rerequestable?: boolean;
  };
  /**
   * @title Pull Request Minimal
   */
  export type pull_request_minimal = {
    id: number & tags.Type<"int32">;
    number: number & tags.Type<"int32">;
    url: string;
    head: {
      ref: string;
      sha: string;
      repo: {
        id: number & tags.Type<"int32">;
        url: string;
        name: string;
      };
    };
    base: {
      ref: string;
      sha: string;
      repo: {
        id: number & tags.Type<"int32">;
        url: string;
        name: string;
      };
    };
  };
  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   *
   * @title GitHub app
   */
  export type nullable_integration = {
    /**
     * Unique identifier of the GitHub app
     */
    id: number & tags.Type<"int32">;
    /**
     * The slug name of the GitHub app
     */
    slug?: string;
    node_id: string;
    client_id?: string;
    owner: AutoViewInputSubTypes.simple_user | AutoViewInputSubTypes.enterprise;
    /**
     * The name of the GitHub app
     */
    name: string;
    description: string | null;
    external_url: string & tags.Format<"uri">;
    html_url: string & tags.Format<"uri">;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    /**
     * The set of permissions for the GitHub app
     */
    permissions: {
      [key: string]: string;
    };
    /**
     * The list of events for the GitHub app
     */
    events: string[];
    /**
     * The number of installations associated with the GitHub app
     */
    installations_count?: number & tags.Type<"int32">;
    client_secret?: string;
    webhook_secret?: string | null;
    pem?: string;
  } | null;
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
   * An enterprise on GitHub.
   *
   * @title Enterprise
   */
  export type enterprise = {
    /**
     * A short description of the enterprise.
     */
    description?: string | null;
    html_url: string & tags.Format<"uri">;
    /**
     * The enterprise's website URL.
     */
    website_url?: (string & tags.Format<"uri">) | null;
    /**
     * Unique identifier of the enterprise
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * The name of the enterprise.
     */
    name: string;
    /**
     * The slug url identifier for the enterprise.
     */
    slug: string;
    created_at: (string & tags.Format<"date-time">) | null;
    updated_at: (string & tags.Format<"date-time">) | null;
    avatar_url: string & tags.Format<"uri">;
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
  /**
   * A commit.
   *
   * @title Simple Commit
   */
  export type simple_commit = {
    /**
     * SHA for the commit
     */
    id: string;
    /**
     * SHA for the commit's tree
     */
    tree_id: string;
    /**
     * Message describing the purpose of the commit
     */
    message: string;
    /**
     * Timestamp of the commit
     */
    timestamp: string;
    /**
     * Information about the Git author
     */
    author: {
      /**
       * Name of the commit's author
       */
      name: string;
      /**
       * Git email address of the commit's author
       */
      email: string;
    } | null;
    /**
     * Information about the Git committer
     */
    committer: {
      /**
       * Name of the commit's committer
       */
      name: string;
      /**
       * Git email address of the commit's committer
       */
      email: string;
    } | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.check_suite;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived values
  const branch = value.head_branch ?? "N/A";
  const commitSha = value.head_sha.substring(0, 7);
  const prCount = value.pull_requests?.length ?? 0;
  const prLabel =
    prCount === 0
      ? "No pull requests"
      : prCount === 1
        ? "1 pull request"
        : `${prCount} pull requests`;
  const createdAt = value.created_at
    ? new Date(value.created_at).toLocaleString()
    : "N/A";
  const updatedAt = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : "N/A";

  // Status & conclusion icon logic
  let statusIcon = (
    <LucideReact.Clock
      size={16}
      className="text-amber-500"
      aria-label={value.status ?? "Unknown status"}
    />
  );
  let statusLabel = value.status ?? "Unknown";
  if (value.status === "completed") {
    switch (value.conclusion) {
      case "success":
        statusIcon = (
          <LucideReact.CheckCircle
            size={16}
            className="text-green-500"
            aria-label="Success"
          />
        );
        statusLabel = "Success";
        break;
      case "failure":
      case "cancelled":
      case "timed_out":
      case "startup_failure":
        statusIcon = (
          <LucideReact.XCircle
            size={16}
            className="text-red-500"
            aria-label="Failure"
          />
        );
        statusLabel = value.conclusion
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        break;
      case "neutral":
      case "skipped":
        statusIcon = (
          <LucideReact.MinusCircle
            size={16}
            className="text-gray-500"
            aria-label={statusLabel}
          />
        );
        statusLabel =
          value.conclusion.charAt(0).toUpperCase() + value.conclusion.slice(1);
        break;
      case "action_required":
        statusIcon = (
          <LucideReact.AlertTriangle
            size={16}
            className="text-yellow-500"
            aria-label="Action Required"
          />
        );
        statusLabel = "Action Required";
        break;
      case "stale":
        statusIcon = (
          <LucideReact.Clock
            size={16}
            className="text-gray-500"
            aria-label="Stale"
          />
        );
        statusLabel = "Stale";
        break;
      default:
        statusIcon = (
          <LucideReact.HelpCircle
            size={16}
            className="text-gray-500"
            aria-label="Unknown conclusion"
          />
        );
        statusLabel = "Unknown";
    }
  }

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Repository Header */}
      <div className="flex items-center mb-3">
        <LucideReact.Code
          size={20}
          className="text-gray-500 mr-2"
          aria-label="Repository"
        />
        <span className="font-semibold text-gray-800 truncate">
          {value.repository.full_name}
        </span>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <LucideReact.GitBranch
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Branch"
          />
          <span className="truncate">{branch}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.GitCommit
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Commit SHA"
          />
          <span>{commitSha}</span>
        </div>
        <div className="flex items-center">
          {statusIcon}
          <span className="ml-1 capitalize">{statusLabel}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.GitPullRequest
            size={16}
            className="text-gray-400 mr-1"
            aria-label="Pull Requests"
          />
          <span>{prLabel}</span>
        </div>
      </div>

      {/* Commit Message */}
      <div className="mb-4 text-gray-700 text-sm line-clamp-2">
        {value.head_commit.message}
      </div>

      {/* Timestamps */}
      <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar
            size={14}
            className="text-gray-400 mr-1"
            aria-label="Created at"
          />
          <span>Created: {createdAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar
            size={14}
            className="text-gray-400 mr-1"
            aria-label="Updated at"
          />
          <span>Updated: {updatedAt}</span>
        </div>
      </div>
    </div>
  );
}
