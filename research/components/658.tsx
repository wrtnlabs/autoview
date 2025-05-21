import { tags } from "typia";
import React from "react";
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
        owner: any | any;
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
    export type simple_user = any;
    export type enterprise = any;
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



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data derivations and formatting
  const shortSha = value.head_sha.slice(0, 7);
  const started = value.started_at
    ? new Date(value.started_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : 'N/A';
  const duration =
    value.started_at && value.completed_at
      ? (() => {
          const ms =
            new Date(value.completed_at).getTime() - new Date(value.started_at).getTime();
          const m = Math.floor(ms / 60000);
          const s = Math.floor((ms % 60000) / 1000);
          return `${m > 0 ? `${m}m ` : ''}${s}s`;
        })()
      : null;

  // Badge mapping
  let statusLabel = '';
  let badgeBg = '';
  let badgeText = '';
  if (value.status === 'completed') {
    switch (value.conclusion) {
      case 'success':
        statusLabel = 'Success';
        badgeBg = 'bg-green-100';
        badgeText = 'text-green-800';
        break;
      case 'failure':
        statusLabel = 'Failure';
        badgeBg = 'bg-red-100';
        badgeText = 'text-red-800';
        break;
      case 'neutral':
        statusLabel = 'Neutral';
        badgeBg = 'bg-gray-100';
        badgeText = 'text-gray-800';
        break;
      case 'cancelled':
        statusLabel = 'Cancelled';
        badgeBg = 'bg-gray-100';
        badgeText = 'text-gray-800';
        break;
      case 'skipped':
        statusLabel = 'Skipped';
        badgeBg = 'bg-gray-100';
        badgeText = 'text-gray-800';
        break;
      case 'timed_out':
        statusLabel = 'Timed Out';
        badgeBg = 'bg-red-100';
        badgeText = 'text-red-800';
        break;
      case 'action_required':
        statusLabel = 'Action Required';
        badgeBg = 'bg-red-100';
        badgeText = 'text-red-800';
        break;
      default:
        statusLabel = 'Completed';
        badgeBg = 'bg-gray-100';
        badgeText = 'text-gray-800';
    }
  } else {
    const map: Record<string, { label: string; bg: string; text: string }> = {
      queued: { label: 'Queued', bg: 'bg-gray-100', text: 'text-gray-800' },
      in_progress: { label: 'In Progress', bg: 'bg-blue-100', text: 'text-blue-800' },
      waiting: { label: 'Waiting', bg: 'bg-yellow-100', text: 'text-yellow-800' },
      requested: { label: 'Requested', bg: 'bg-yellow-100', text: 'text-yellow-800' },
      pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800' },
    };
    const entry = map[value.status] || {
      label: value.status,
      bg: 'bg-gray-100',
      text: 'text-gray-800',
    };
    statusLabel = entry.label;
    badgeBg = entry.bg;
    badgeText = entry.text;
  }

  // Summary or title
  const displaySummary =
    value.output.summary ?? value.output.title ?? 'No details available';

  // Pull requests display
  const prCount = value.pull_requests.length;
  const prLabels = value.pull_requests.slice(0, 3).map((pr) => `#${pr.number}`);
  const prDisplay =
    prLabels.join(', ') + (prCount > 3 ? ` +${prCount - 3} more` : '');

  // 2. JSX structure with Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {value.name}
          </h3>
          <div className="text-sm text-gray-500 mt-1 truncate">
            Commit: {shortSha}
          </div>
        </div>
        <span
          className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${badgeBg} ${badgeText}`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="text-sm text-gray-500 mb-1">Started: {started}</div>
      {duration && (
        <div className="text-sm text-gray-500 mb-3">Duration: {duration}</div>
      )}
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{displaySummary}</p>
      <div className="flex flex-wrap text-sm text-gray-600 space-x-4">
        <div>Annotations: {value.output.annotations_count}</div>
        {prCount > 0 && <div>PRs: {prDisplay}</div>}
        {value.app && <div>App: {value.app.name}</div>}
        {value.deployment && <div>Env: {value.deployment.environment}</div>}
      </div>
    </div>
  );
}
