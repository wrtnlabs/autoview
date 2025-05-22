import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposCommitsCheckSuites {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      check_suites: AutoViewInputSubTypes.check_suite[];
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposCommitsCheckSuites.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const { total_count, check_suites } = value;

  // Format ISO date to locale string or placeholder
  const formatDate = (iso: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "—";

  // Render the lifecycle status with icon and label
  const renderStatus = (status: (typeof check_suites)[number]["status"]) => {
    switch (status) {
      case "queued":
      case "waiting":
      case "requested":
      case "pending":
        return (
          <div className="flex items-center gap-1">
            <LucideReact.Clock size={16} className="text-amber-500" />
            <span className="capitalize text-sm text-amber-600">{status}</span>
          </div>
        );
      case "in_progress":
        return (
          <div className="flex items-center gap-1">
            <LucideReact.Loader
              size={16}
              className="animate-spin text-blue-500"
            />
            <span className="capitalize text-sm text-blue-600">
              in progress
            </span>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-1">
            <LucideReact.CheckCircle size={16} className="text-green-500" />
            <span className="capitalize text-sm text-green-600">completed</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1">
            <LucideReact.HelpCircle size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">unknown</span>
          </div>
        );
    }
  };

  // Map conclusion to an icon
  const getConclusionIcon = (
    conclusion: NonNullable<(typeof check_suites)[number]["conclusion"]>,
  ) => {
    switch (conclusion) {
      case "success":
        return <LucideReact.CheckCircle size={16} className="text-green-500" />;
      case "failure":
        return <LucideReact.XCircle size={16} className="text-red-500" />;
      case "neutral":
        return <LucideReact.MinusCircle size={16} className="text-gray-500" />;
      case "cancelled":
        return <LucideReact.XCircle size={16} className="text-yellow-500" />;
      case "skipped":
        return <LucideReact.SkipForward size={16} className="text-gray-500" />;
      case "timed_out":
        return <LucideReact.Clock size={16} className="text-red-500" />;
      case "action_required":
      case "startup_failure":
      case "stale":
        return <LucideReact.AlertTriangle size={16} className="text-red-500" />;
      default:
        return <LucideReact.HelpCircle size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center mb-4">
        <LucideReact.List size={20} className="text-gray-600 mr-2" />
        <span className="text-lg font-semibold text-gray-700">
          {total_count} Check Suite{total_count !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-4">
        {check_suites.map((cs) => {
          const branchOrSha = cs.head_branch
            ? cs.head_branch
            : cs.head_sha.slice(0, 7);
          return (
            <div key={cs.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h3
                  className="font-medium text-gray-800 truncate"
                  title={branchOrSha}
                >
                  {branchOrSha}
                </h3>
                <div className="flex items-center gap-4">
                  {renderStatus(cs.status)}
                  {cs.status === "completed" && cs.conclusion && (
                    <div className="flex items-center gap-1">
                      {getConclusionIcon(cs.conclusion)}
                      <span className="capitalize text-sm text-gray-600">
                        {cs.conclusion.replace(/_/g, " ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {cs.head_commit.message}
              </p>

              <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-4">
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>{formatDate(cs.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.RefreshCw size={16} className="text-gray-400" />
                  <span>{formatDate(cs.updated_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.CheckSquare
                    size={16}
                    className="text-gray-400"
                  />
                  <span>{cs.latest_check_runs_count} runs</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideReact.Link size={16} className="text-gray-400" />
                  <span className="truncate">{cs.repository.full_name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
