import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A check performed on the code of a given code change
     *
     * @title CheckRun
    */
    export interface check_run {
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
        status: "queued" | "in_progress" | "completed" | "waiting" | "requested" | "pending";
        conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required" | null;
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
    }
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
    export interface simple_user {
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
    }
    /**
     * An enterprise on GitHub.
     *
     * @title Enterprise
    */
    export interface enterprise {
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
    }
    /**
     * @title Pull Request Minimal
    */
    export interface pull_request_minimal {
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
    }
    /**
     * A deployment created as the result of an Actions check run from a workflow that references an environment
     *
     * @title Deployment
    */
    export interface deployment_simple {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.check_run;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    status,
    conclusion,
    started_at,
    completed_at,
    head_sha,
    name,
    output,
    app,
    pull_requests,
  } = value;

  // Determine display status (use conclusion when completed)
  const isCompleted = status === "completed" && conclusion;
  const rawStatus = isCompleted ? conclusion! : status;
  const statusText = rawStatus
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Select appropriate status icon
  const statusIcon = (() => {
    if (isCompleted) {
      switch (conclusion) {
        case "success":
          return <LucideReact.CheckCircle className="text-green-500" size={20} />;
        case "failure":
          return <LucideReact.XCircle className="text-red-500" size={20} />;
        case "neutral":
          return <LucideReact.MinusCircle className="text-gray-500" size={20} />;
        case "cancelled":
          return <LucideReact.XCircle className="text-yellow-500" size={20} />;
        case "skipped":
          return <LucideReact.SkipForward className="text-gray-500" size={20} />;
        case "timed_out":
        case "action_required":
          return <LucideReact.AlertTriangle className="text-orange-500" size={20} />;
        default:
          return <LucideReact.Circle className="text-gray-400" size={20} />;
      }
    } else {
      switch (status) {
        case "queued":
        case "waiting":
        case "requested":
        case "pending":
          return <LucideReact.Clock className="text-amber-500" size={20} />;
        case "in_progress":
          return <LucideReact.Loader className="animate-spin text-blue-500" size={20} />;
        default:
          return <LucideReact.Circle className="text-gray-400" size={20} />;
      }
    }
  })();

  // Format dates
  const formattedStarted = started_at
    ? new Date(started_at).toLocaleString()
    : null;
  const formattedCompleted = completed_at
    ? new Date(completed_at).toLocaleString()
    : null;

  // Calculate duration
  let duration: string | null = null;
  if (started_at && completed_at) {
    const diff = new Date(completed_at).getTime() - new Date(started_at).getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    duration = `${minutes}m ${seconds}s`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {statusIcon}
          <span className="text-lg font-semibold text-gray-800">{statusText}</span>
        </div>
        {duration && <span className="text-sm text-gray-500">{duration}</span>}
      </div>

      {/* Core Details */}
      <div className="space-y-2">
        <div className="flex items-center space-x-1 text-gray-700">
          <LucideReact.Tag size={16} />
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <LucideReact.Hash size={16} />
          <span>{head_sha.slice(0, 7)}</span>
        </div>
        {formattedStarted && (
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <LucideReact.Calendar size={16} />
            <span>Started: {formattedStarted}</span>
          </div>
        )}
        {formattedCompleted && (
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <LucideReact.Calendar size={16} />
            <span>Completed: {formattedCompleted}</span>
          </div>
        )}
      </div>

      {/* Output Summary */}
      {(output.title || output.summary) && (
        <div className="space-y-1">
          {output.title && (
            <p className="text-gray-800 font-medium">{output.title}</p>
          )}
          {output.summary && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {output.summary}
            </p>
          )}
        </div>
      )}

      {/* App & Pull Requests */}
      <div className="flex flex-wrap gap-4 text-sm">
        {app && (
          <div className="flex items-center space-x-1 text-gray-700">
            <LucideReact.Package size={16} />
            <span>{app.name}</span>
          </div>
        )}
        {pull_requests.length > 0 && (
          <div className="flex items-center space-x-1 text-gray-700">
            <LucideReact.GitPullRequest size={16} />
            <span>
              {pull_requests.map((pr) => `#${pr.number}`).join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
