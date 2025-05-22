import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposCheckSuitesCheckRuns {
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
  AutoViewInputSubTypes.IApiReposCheckSuitesCheckRuns.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "—";

  const getStatusIcon = (
    status: AutoViewInputSubTypes.check_run["status"],
    conclusion: AutoViewInputSubTypes.check_run["conclusion"],
  ): JSX.Element => {
    if (
      status === "in_progress" ||
      status === "pending" ||
      status === "requested" ||
      status === "waiting" ||
      status === "queued"
    ) {
      return <LucideReact.Clock className="text-amber-500" size={16} />;
    }
    if (status === "completed") {
      if (conclusion === "success" || conclusion === "neutral") {
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      }
      return <LucideReact.AlertTriangle className="text-red-500" size={16} />;
    }
    return <LucideReact.HelpCircle className="text-gray-400" size={16} />;
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Check Runs</h2>
        <div className="flex items-center text-gray-600">
          <LucideReact.ListChecks className="mr-1" size={16} />
          <span>{value.total_count}</span>
        </div>
      </div>
      <div className="space-y-3">
        {value.check_runs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <LucideReact.AlertCircle size={24} />
            <span className="mt-2">No check runs available</span>
          </div>
        ) : (
          value.check_runs.map((run) => (
            <div key={run.id} className="border-b last:border-b-0 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(run.status, run.conclusion)}
                  <span className="text-gray-800 font-medium truncate">
                    {run.name}
                  </span>
                </div>
                {run.conclusion && (
                  <span
                    className={`text-sm font-medium capitalize ${
                      run.conclusion === "success"
                        ? "text-green-600"
                        : run.conclusion === "failure"
                          ? "text-red-600"
                          : "text-gray-600"
                    }`}
                  >
                    {run.conclusion}
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm text-gray-500 flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex items-center truncate">
                  <LucideReact.Calendar className="mr-1" size={14} />
                  <span>Started: {formatDate(run.started_at)}</span>
                </div>
                <div className="flex items-center truncate mt-1 sm:mt-0">
                  <LucideReact.Calendar className="mr-1" size={14} />
                  <span>Completed: {formatDate(run.completed_at)}</span>
                </div>
              </div>
              {run.output.summary && (
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {run.output.summary}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
