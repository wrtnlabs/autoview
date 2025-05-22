import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A check performed on the code of a given code change
   *
   * @title CheckRun
   */
  export type check_run = {
    /**
     * The id of the check.
     */
    id: number & tags.Type<"int32">;
    /**
     * The SHA of the commit that is being checked.
     */
    head_sha: string;
    node_id: string;
    external_id: string | null;
    url: string;
    html_url: string | null;
    details_url: string | null;
    /**
     * The phase of the lifecycle that the check is currently in. Statuses of waiting, requested, and pending are reserved for GitHub Actions check runs.
     */
    status:
      | "queued"
      | "in_progress"
      | "completed"
      | "waiting"
      | "requested"
      | "pending";
    conclusion:
      | "success"
      | "failure"
      | "neutral"
      | "cancelled"
      | "skipped"
      | "timed_out"
      | "action_required"
      | null;
    started_at: (string & tags.Format<"date-time">) | null;
    completed_at: (string & tags.Format<"date-time">) | null;
    output: {
      title: string | null;
      summary: string | null;
      text: string | null;
      annotations_count: number & tags.Type<"int32">;
      annotations_url: string & tags.Format<"uri">;
    };
    /**
     * The name of the check.
     */
    name: string;
    check_suite: {
      id: number & tags.Type<"int32">;
    } | null;
    app: AutoViewInputSubTypes.nullable_integration;
    /**
     * Pull requests that are open with a `head_sha` or `head_branch` that matches the check. The returned pull requests do not necessarily indicate pull requests that triggered the check.
     */
    pull_requests: AutoViewInputSubTypes.pull_request_minimal[];
    deployment?: AutoViewInputSubTypes.deployment_simple;
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
   * A deployment created as the result of an Actions check run from a workflow that references an environment
   *
   * @title Deployment
   */
  export type deployment_simple = {
    url: string & tags.Format<"uri">;
    /**
     * Unique identifier of the deployment
     */
    id: number & tags.Type<"int32">;
    node_id: string;
    /**
     * Parameter to specify a task to execute
     */
    task: string;
    original_environment?: string;
    /**
     * Name for the target deployment environment.
     */
    environment: string;
    description: string | null;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
    statuses_url: string & tags.Format<"uri">;
    repository_url: string & tags.Format<"uri">;
    /**
     * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
     */
    transient_environment?: boolean;
    /**
     * Specifies if the given environment is one that end-users directly interact with. Default: false.
     */
    production_environment?: boolean;
    performed_via_github_app?: AutoViewInputSubTypes.nullable_integration;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.check_run;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const startedAt = value.started_at
    ? new Date(value.started_at).toLocaleString()
    : "N/A";
  const completedAt = value.completed_at
    ? new Date(value.completed_at).toLocaleString()
    : "—";

  function formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  }

  const duration =
    value.started_at && value.completed_at
      ? formatDuration(
          new Date(value.completed_at).getTime() -
            new Date(value.started_at).getTime(),
        )
      : null;

  // Status and conclusion mapping to icons and labels
  const statusConfig = (() => {
    switch (value.status) {
      case "queued":
      case "waiting":
      case "requested":
      case "pending":
        return {
          icon: (
            <LucideReact.Clock
              className="text-amber-500"
              size={16}
              aria-label="Pending"
            />
          ),
          label: value.status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        };
      case "in_progress":
        return {
          icon: (
            <LucideReact.Loader
              className="animate-spin text-blue-500"
              size={16}
              aria-label="In Progress"
            />
          ),
          label: "In Progress",
        };
      case "completed":
        switch (value.conclusion) {
          case "success":
            return {
              icon: (
                <LucideReact.CheckCircle
                  className="text-green-500"
                  size={16}
                  aria-label="Success"
                />
              ),
              label: "Success",
            };
          case "failure":
            return {
              icon: (
                <LucideReact.XCircle
                  className="text-red-500"
                  size={16}
                  aria-label="Failure"
                />
              ),
              label: "Failure",
            };
          case "neutral":
            return {
              icon: (
                <LucideReact.CheckCircle
                  className="text-gray-500"
                  size={16}
                  aria-label="Neutral"
                />
              ),
              label: "Neutral",
            };
          case "cancelled":
            return {
              icon: (
                <LucideReact.XCircle
                  className="text-red-400"
                  size={16}
                  aria-label="Cancelled"
                />
              ),
              label: "Cancelled",
            };
          case "skipped":
            return {
              icon: (
                <LucideReact.CheckCircle
                  className="text-yellow-500"
                  size={16}
                  aria-label="Skipped"
                />
              ),
              label: "Skipped",
            };
          case "timed_out":
            return {
              icon: (
                <LucideReact.AlertTriangle
                  className="text-red-500"
                  size={16}
                  aria-label="Timed Out"
                />
              ),
              label: "Timed Out",
            };
          case "action_required":
            return {
              icon: (
                <LucideReact.AlertTriangle
                  className="text-red-500"
                  size={16}
                  aria-label="Action Required"
                />
              ),
              label: "Action Required",
            };
          default:
            return {
              icon: (
                <LucideReact.HelpCircle
                  className="text-gray-400"
                  size={16}
                  aria-label="Completed"
                />
              ),
              label: "Completed",
            };
        }
      default:
        return {
          icon: (
            <LucideReact.HelpCircle
              className="text-gray-400"
              size={16}
              aria-label="Unknown"
            />
          ),
          label: value.status,
        };
    }
  })();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-full">
      {/* Header: Check name and status */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <div className="flex items-center gap-1">
          {statusConfig.icon}
          <span className="text-sm font-medium text-gray-700">
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Started: {startedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Completed: {completedAt}</span>
        </div>
        {duration && (
          <div className="flex items-center gap-1">
            <LucideReact.Clock size={16} className="text-gray-400" />
            <span>Duration: {duration}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <LucideReact.FileText size={16} className="text-gray-400" />
          <span>Annotations: {value.output.annotations_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitPullRequest size={16} className="text-gray-400" />
          <span>Pull Requests: {value.pull_requests.length}</span>
        </div>
        {value.app && (
          <div className="flex items-center gap-1">
            <LucideReact.Package size={16} className="text-gray-400" />
            <span>Triggered by: {value.app.name}</span>
          </div>
        )}
      </div>

      {/* Output summary */}
      {value.output.title && (
        <div className="mt-4">
          <p className="text-md font-medium text-gray-800">
            {value.output.title}
          </p>
          {value.output.summary && (
            <p className="mt-1 text-sm text-gray-700 line-clamp-3">
              {value.output.summary}
            </p>
          )}
        </div>
      )}

      {/* Details URL (non-interactive) */}
      {value.details_url && (
        <div className="mt-4 flex items-center gap-1 text-sm text-blue-600 truncate">
          <LucideReact.Link size={16} className="text-blue-400" />
          <span title={value.details_url}>{value.details_url}</span>
        </div>
      )}
    </div>
  );
}
