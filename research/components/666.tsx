import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCheckSuitesCheckRuns.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, check_runs } = value;

  // Format date-time strings to a readable format
  const formatDate = (iso: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "–";

  // Compute duration between start and completion in minutes/seconds
  const formatDuration = (start: string | null, end: string | null): string => {
    if (!start || !end) return "–";
    const diff = new Date(end).getTime() - new Date(start).getTime();
    if (diff < 0) return "–";
    const secs = Math.floor(diff / 1000);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  // Calculate average duration across completed runs
  const durations = check_runs
    .map((run) => {
      if (run.started_at && run.completed_at) {
        return new Date(run.completed_at).getTime() - new Date(run.started_at).getTime();
      }
      return 0;
    })
    .filter((ms) => ms > 0);
  const avgDurationMs = durations.length
    ? durations.reduce((a, b) => a + b, 0) / durations.length
    : 0;
  const avgDuration = (() => {
    if (!avgDurationMs) return "–";
    const secs = Math.floor(avgDurationMs / 1000);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  })();

  // Determine badge colors
  const statusColor = (status: string): string => {
    switch (status) {
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "queued":
      case "waiting":
      case "requested":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const conclusionColor = (conc: string | null): string => {
    switch (conc) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failure":
      case "timed_out":
        return "bg-red-100 text-red-800";
      case "cancelled":
      case "action_required":
        return "bg-yellow-100 text-yellow-800";
      case "neutral":
      case "skipped":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-full mx-auto p-4 bg-white rounded-xl shadow-md">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Check Runs Summary
        </h2>
        <p className="text-sm text-gray-600">
          Total Runs: <span className="font-medium">{total_count}</span>{" "}
          • Avg Duration: <span className="font-medium">{avgDuration}</span>
        </p>
      </header>
      <ul className="space-y-4">
        {check_runs.map((run) => (
          <li
            key={run.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {run.name}
              </h3>
              {run.app && (
                <p className="text-sm text-gray-500">
                  App: <span className="font-medium">{run.app.name}</span>
                </p>
              )}
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {run.output.summary ?? run.output.title ?? "No summary available"}
              </p>
              <div className="mt-2 text-xs text-gray-500 space-x-2">
                <span>Started: {formatDate(run.started_at)}</span>
                <span>Completed: {formatDate(run.completed_at)}</span>
                <span>
                  Duration: {formatDuration(run.started_at, run.completed_at)}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Annotations:{" "}
                <span className="font-medium">{run.output.annotations_count}</span>
              </p>
            </div>
            <div className="flex-shrink-0 mt-3 sm:mt-0 sm:ml-4 flex space-x-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor(
                  run.status
                )}`}
              >
                {run.status.replace("_", " ").toUpperCase()}
              </span>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${conclusionColor(
                  run.conclusion
                )}`}
              >
                {(run.conclusion ?? "N/A").replace("_", " ").toUpperCase()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
