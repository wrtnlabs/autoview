import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposCommitsCheckRuns {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      check_runs: AutoViewInputSubTypes.check_run[];
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposCommitsCheckRuns.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, check_runs } = value;

  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const renderStatusIcon = (
    run: AutoViewInputSubTypes.check_run,
  ): JSX.Element => {
    // Completed runs get an icon based on conclusion
    if (run.status === "completed") {
      switch (run.conclusion) {
        case "success":
          return (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={16}
              aria-label="Success"
            />
          );
        case "failure":
        case "timed_out":
        case "action_required":
          return (
            <LucideReact.AlertTriangle
              className="text-red-500"
              size={16}
              aria-label="Failure"
            />
          );
        case "skipped":
        case "cancelled":
          return (
            <LucideReact.XCircle
              className="text-orange-500"
              size={16}
              aria-label="Cancelled/Skipped"
            />
          );
        case "neutral":
          return (
            <LucideReact.MinusCircle
              className="text-gray-400"
              size={16}
              aria-label="Neutral"
            />
          );
        default:
          return (
            <LucideReact.Circle
              className="text-gray-400"
              size={16}
              aria-label="No conclusion"
            />
          );
      }
    }
    // In-progress
    if (run.status === "in_progress") {
      return (
        <LucideReact.Loader
          className="animate-spin text-blue-500"
          size={16}
          aria-label="In Progress"
        />
      );
    }
    // Queued or pending
    if (["queued", "waiting", "requested", "pending"].includes(run.status)) {
      return (
        <LucideReact.Clock
          className="text-amber-500"
          size={16}
          aria-label={run.status}
        />
      );
    }
    // Fallback
    return <LucideReact.Circle className="text-gray-400" size={16} />;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Check Runs ({total_count})
        </h2>
      </div>
      <div className="space-y-4">
        {check_runs.map((run) => (
          <div
            key={run.id}
            className="p-4 bg-gray-50 rounded-md shadow-sm hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                {renderStatusIcon(run)}
                <span className="font-medium text-gray-900 truncate">
                  {run.name}
                </span>
              </div>
              <span className="flex items-center text-sm text-gray-500">
                <LucideReact.Calendar size={16} className="mr-1" />
                {formatDate(run.started_at)}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Activity size={16} className="text-gray-400" />
                <span className="capitalize">
                  {run.status.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.CheckCircle size={16} className="text-gray-400" />
                <span>{run.conclusion ?? "—"}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.BookOpen size={16} className="text-gray-400" />
                <span>
                  {run.output.annotations_count} annotation
                  {run.output.annotations_count !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.GitPullRequest
                  size={16}
                  className="text-gray-400"
                />
                <span>
                  {run.pull_requests.length} PR
                  {run.pull_requests.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            {run.output.summary && (
              <p className="mt-3 text-gray-700 text-sm line-clamp-2">
                {run.output.summary}
              </p>
            )}
          </div>
        ))}
        {check_runs.length === 0 && (
          <div className="flex flex-col items-center py-8 text-gray-400">
            <LucideReact.AlertCircle size={24} className="mb-2" />
            <span>No check runs available.</span>
          </div>
        )}
      </div>
    </div>
  );
}
