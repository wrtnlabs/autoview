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
  const startedDate = value.started_at
    ? new Date(value.started_at).toLocaleString()
    : '—';
  const completedDate = value.completed_at
    ? new Date(value.completed_at).toLocaleString()
    : null;
  const duration =
    value.started_at && value.completed_at
      ? `${(
          (new Date(value.completed_at).getTime() -
            new Date(value.started_at).getTime()) /
          1000
        ).toFixed(1)}s`
      : null;

  const prCount = value.pull_requests.length;
  const displayedPRs = value.pull_requests.slice(0, 2).map((pr) => pr.number);
  const remainingPRs = prCount - displayedPRs.length;

  function getStatusIcon() {
    if (value.status !== 'completed') {
      return <LucideReact.Clock className="text-amber-500" size={16} />;
    }
    switch (value.conclusion) {
      case 'success':
        return <LucideReact.CheckCircle className="text-green-500" size={16} />;
      case 'failure':
        return <LucideReact.XCircle className="text-red-500" size={16} />;
      case 'neutral':
        return <LucideReact.MinusCircle className="text-gray-500" size={16} />;
      case 'cancelled':
        return <LucideReact.XCircle className="text-gray-500" size={16} />;
      case 'skipped':
        return <LucideReact.SkipForward className="text-indigo-500" size={16} />;
      case 'timed_out':
        return <LucideReact.AlertTriangle className="text-amber-500" size={16} />;
      case 'action_required':
        return <LucideReact.AlertCircle className="text-red-500" size={16} />;
      default:
        return <LucideReact.HelpCircle className="text-gray-500" size={16} />;
    }
  }

  function getStatusText() {
    if (value.status !== 'completed') {
      return value.status.replace(/_/g, ' ');
    }
    return value.conclusion ? value.conclusion.replace(/_/g, ' ') : 'completed';
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      {/* Header: Name and Status */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
          {value.name}
        </h3>
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Output Title & Summary */}
      {value.output.title && (
        <h4 className="mt-2 text-md font-semibold text-gray-800 dark:text-gray-200 truncate">
          {value.output.title}
        </h4>
      )}
      {value.output.summary && (
        <p className="mt-1 text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
          {value.output.summary}
        </p>
      )}

      {/* Metadata Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
        {/* Dates & Duration */}
        <div className="flex items-center gap-2">
          <LucideReact.Calendar size={16} />
          <span>{startedDate}</span>
          {completedDate && <span>— {completedDate}</span>}
          {duration && <span>({duration})</span>}
        </div>

        {/* Pull Requests */}
        {prCount > 0 && (
          <div className="flex items-center gap-1 overflow-hidden">
            <LucideReact.GitPullRequest size={16} />
            <span>
              {prCount} pull request{prCount !== 1 && 's'}
            </span>
            {displayedPRs.map((num) => (
              <span key={num} className="ml-1 font-mono">
                #{num}
              </span>
            ))}
            {remainingPRs > 0 && (
              <span className="ml-1">+{remainingPRs} more</span>
            )}
          </div>
        )}

        {/* Integration/App */}
        {value.app?.name && (
          <div className="flex items-center gap-1">
            <LucideReact.AppWindow size={16} />
            <a
              href={value.app.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline truncate"
            >
              {value.app.name}
            </a>
          </div>
        )}

        {/* Deployment */}
        {value.deployment && (
          <div className="flex items-center gap-1">
            <LucideReact.Archive size={16} />
            <span className="truncate">{value.deployment.environment}</span>
          </div>
        )}
      </div>

      {/* Details Link */}
      {value.details_url && (
        <div className="mt-4">
          <a
            href={value.details_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:underline text-xs"
          >
            <LucideReact.Link size={16} />
            <span>View Details</span>
          </a>
        </div>
      )}
    </div>
  );
}
