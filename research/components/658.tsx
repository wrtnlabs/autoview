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
  const startDate = value.started_at ? new Date(value.started_at) : null;
  const endDate = value.completed_at ? new Date(value.completed_at) : null;
  const formattedStart = startDate ? startDate.toLocaleString() : "—";
  const formattedEnd = endDate ? endDate.toLocaleString() : "—";
  const duration =
    startDate && endDate
      ? `${((endDate.getTime() - startDate.getTime()) / 1000).toFixed(1)}s`
      : null;

  const summary =
    value.output.title || value.output.summary || "No summary available.";

  // Determine status icon and color
  let StatusIcon: JSX.Element;
  switch (value.status) {
    case "completed":
      switch (value.conclusion) {
        case "success":
          StatusIcon = (
            <LucideReact.CheckCircle
              size={16}
              className="text-green-500"
              aria-label="Success"
            />
          );
          break;
        case "failure":
        case "timed_out":
          StatusIcon = (
            <LucideReact.XCircle
              size={16}
              className="text-red-500"
              aria-label="Failure"
            />
          );
          break;
        case "neutral":
        case "skipped":
          StatusIcon = (
            <LucideReact.MinusCircle
              size={16}
              className="text-gray-400"
              aria-label="Neutral"
            />
          );
          break;
        case "cancelled":
          StatusIcon = (
            <LucideReact.AlertTriangle
              size={16}
              className="text-amber-500"
              aria-label="Cancelled"
            />
          );
          break;
        case "action_required":
          StatusIcon = (
            <LucideReact.AlertTriangle
              size={16}
              className="text-yellow-500"
              aria-label="Action required"
            />
          );
          break;
        default:
          StatusIcon = (
            <LucideReact.CheckCircle
              size={16}
              className="text-gray-400"
              aria-label={value.conclusion || "Completed"}
            />
          );
      }
      break;
    default:
      // queued, in_progress, waiting, requested, pending
      StatusIcon = (
        <LucideReact.Clock
          size={16}
          className="text-amber-500"
          aria-label={value.status}
        />
      );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article
      role="region"
      aria-labelledby="check-run-name"
      className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto"
    >
      <header className="flex items-center gap-2">
        {StatusIcon}
        <h2
          id="check-run-name"
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </header>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div>
          <dt className="flex items-center gap-1">
            <LucideReact.Activity size={14} className="text-gray-400" />
            <span>Status</span>
          </dt>
          <dd className="ml-5 capitalize">{value.status}</dd>
        </div>

        <div>
          <dt className="flex items-center gap-1">
            <LucideReact.Flag size={14} className="text-gray-400" />
            <span>Conclusion</span>
          </dt>
          <dd className="ml-5 capitalize">{value.conclusion || "—"}</dd>
        </div>

        <div>
          <dt className="flex items-center gap-1">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>Started</span>
          </dt>
          <dd className="ml-5">{formattedStart}</dd>
        </div>

        <div>
          <dt className="flex items-center gap-1">
            <LucideReact.Calendar size={14} className="text-gray-400" />
            <span>Completed</span>
          </dt>
          <dd className="ml-5">{formattedEnd}</dd>
        </div>

        {duration && (
          <div className="col-span-2">
            <dt className="flex items-center gap-1">
              <LucideReact.Timer size={14} className="text-gray-400" />
              <span>Duration</span>
            </dt>
            <dd className="ml-5">{duration}</dd>
          </div>
        )}

        <div>
          <dt className="flex items-center gap-1">
            <LucideReact.Edit3 size={14} className="text-gray-400" />
            <span>Annotations</span>
          </dt>
          <dd className="ml-5">{value.output.annotations_count}</dd>
        </div>

        <div>
          <dt className="flex items-center gap-1">
            <LucideReact.MenuSquare size={14} className="text-gray-400" />
            <span>App</span>
          </dt>
          <dd className="ml-5">{value.app?.name || "—"}</dd>
        </div>

        <div>
          <dt className="flex items-center gap-1">
            <LucideReact.Users size={14} className="text-gray-400" />
            <span>Pull Requests</span>
          </dt>
          <dd className="ml-5">{value.pull_requests.length}</dd>
        </div>

        {value.deployment && (
          <div className="col-span-2">
            <dt className="flex items-center gap-1">
              <LucideReact.Box size={14} className="text-gray-400" />
              <span>Deployment</span>
            </dt>
            <dd className="ml-5 capitalize">{value.deployment.environment}</dd>
          </div>
        )}
      </dl>

      <section className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-1">Summary</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{summary}</p>
      </section>
    </article>
  );
}
