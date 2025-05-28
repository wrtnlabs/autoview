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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived values
  const startedDate = value.started_at ? new Date(value.started_at) : null;
  const completedDate = value.completed_at ? new Date(value.completed_at) : null;
  const formattedStarted = startedDate ? startedDate.toLocaleString() : "N/A";
  const formattedCompleted = completedDate ? completedDate.toLocaleString() : "N/A";
  const duration =
    startedDate && completedDate
      ? `${Math.round((completedDate.getTime() - startedDate.getTime()) / 1000)}s`
      : null;

  // Determine status icon and label
  let statusIcon: JSX.Element;
  let statusLabel = value.status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  if (value.status === "completed") {
    switch (value.conclusion) {
      case "success":
        statusIcon = <LucideReact.CheckCircle size={20} className="text-green-500" />;
        statusLabel = "Success";
        break;
      case "failure":
        statusIcon = <LucideReact.XCircle size={20} className="text-red-500" />;
        statusLabel = "Failure";
        break;
      case "neutral":
        statusIcon = <LucideReact.MinusCircle size={20} className="text-gray-500" />;
        statusLabel = "Neutral";
        break;
      case "cancelled":
        statusIcon = <LucideReact.XCircle size={20} className="text-gray-400" />;
        statusLabel = "Cancelled";
        break;
      case "skipped":
        statusIcon = <LucideReact.SkipForward size={20} className="text-yellow-500" />;
        statusLabel = "Skipped";
        break;
      case "timed_out":
        statusIcon = <LucideReact.Clock size={20} className="text-amber-500" />;
        statusLabel = "Timed Out";
        break;
      case "action_required":
        statusIcon = <LucideReact.AlertTriangle size={20} className="text-red-600" />;
        statusLabel = "Action Required";
        break;
      default:
        statusIcon = <LucideReact.HelpCircle size={20} className="text-gray-400" />;
        statusLabel = "Completed";
    }
  } else {
    statusIcon = <LucideReact.Clock size={20} className="text-amber-500" />;
  }

  // 2. Visual structure
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: name and status */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
        <div className="flex items-center space-x-1">
          {statusIcon}
          <span className="text-sm font-medium text-gray-700">{statusLabel}</span>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Started:</span>
          <span className="ml-1">{formattedStarted}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Completed:</span>
          <span className="ml-1">{formattedCompleted}</span>
        </div>
        {duration && (
          <div className="flex items-center col-span-2">
            <LucideReact.Clock size={16} className="text-gray-400 mr-1" />
            <span className="font-medium text-gray-700">Duration:</span>
            <span className="ml-1">{duration}</span>
          </div>
        )}
        {value.app && (
          <div className="flex items-center col-span-2">
            <LucideReact.GitBranch size={16} className="text-gray-400 mr-1" />
            <span className="font-medium text-gray-700">App:</span>
            <span className="ml-1 truncate">{value.app.name}</span>
          </div>
        )}
      </div>

      {/* Output section */}
      {(value.output.title || value.output.summary) && (
        <div className="mb-4">
          {value.output.title && (
            <h3 className="text-md font-semibold text-gray-700 mb-1 truncate">{value.output.title}</h3>
          )}
          {value.output.summary && (
            <p className="text-sm text-gray-600 line-clamp-3">{value.output.summary}</p>
          )}
        </div>
      )}

      {/* Pull requests */}
      {value.pull_requests.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-700 mb-2">
            <LucideReact.GitPullRequest size={16} className="text-gray-400 mr-1" />
            <span className="font-medium">Pull Requests</span>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {value.pull_requests.map((pr) => (
              <li key={pr.id}>
                #{pr.number} in <span className="font-medium">{pr.head.repo.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deployment info */}
      {value.deployment && (
        <div className="flex items-center text-sm text-gray-700">
          <LucideReact.Truck size={16} className="text-gray-400 mr-1" />
          <span className="font-medium">Deployment:</span>
          <span className="ml-1">{value.deployment.environment}</span>
        </div>
      )}
    </div>
  );
}
