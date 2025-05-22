import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCommitsCheckRuns.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Format ISO date-time to locale string
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Compute duration between two ISO timestamps
  const formatDuration = (startIso: string | null, endIso: string | null): string => {
    if (!startIso || !endIso) return "-";
    const diffMs = new Date(endIso).getTime() - new Date(startIso).getTime();
    if (diffMs <= 0) return "-";
    const totalSeconds = Math.round(diffMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  // Derive badge styling based on status/conclusion
  const getBadge = (
    status: AutoViewInputSubTypes.check_run["status"],
    conclusion: AutoViewInputSubTypes.check_run["conclusion"],
  ): { label: string; bg: string; text: string } => {
    if (status !== "completed") {
      const map: Record<string, { label: string; bg: string; text: string }> = {
        queued: { label: "Queued", bg: "bg-purple-100", text: "text-purple-800" },
        in_progress: { label: "In Progress", bg: "bg-blue-100", text: "text-blue-800" },
        waiting: { label: "Waiting", bg: "bg-gray-100", text: "text-gray-800" },
        requested: { label: "Requested", bg: "bg-gray-100", text: "text-gray-800" },
        pending: { label: "Pending", bg: "bg-yellow-100", text: "text-yellow-800" },
      };
      return map[status] ?? { label: status, bg: "bg-gray-100", text: "text-gray-800" };
    }
    // completed: show conclusion
    const mapConclusion: Record<
      NonNullable<typeof conclusion>,
      { label: string; bg: string; text: string }
    > = {
      success: { label: "Success", bg: "bg-green-100", text: "text-green-800" },
      failure: { label: "Failure", bg: "bg-red-100", text: "text-red-800" },
      neutral: { label: "Neutral", bg: "bg-gray-100", text: "text-gray-800" },
      cancelled: { label: "Cancelled", bg: "bg-yellow-100", text: "text-yellow-800" },
      skipped: { label: "Skipped", bg: "bg-gray-100", text: "text-gray-800" },
      timed_out: { label: "Timed Out", bg: "bg-red-100", text: "text-red-800" },
      action_required: { label: "Action Required", bg: "bg-yellow-100", text: "text-yellow-800" },
    };
    return conclusion && mapConclusion[conclusion]
      ? mapConclusion[conclusion]
      : { label: "Completed", bg: "bg-gray-100", text: "text-gray-800" };
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Total Check Runs: {value.total_count}
      </h2>
      <ul className="divide-y divide-gray-200">
        {value.check_runs.map((run) => {
          const badge = getBadge(run.status, run.conclusion);
          const duration = formatDuration(run.started_at, run.completed_at);
          const started = run.started_at ? formatDate(run.started_at) : "–";
          return (
            <li key={run.id} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">{run.name}</h3>
                {run.output.title && (
                  <p className="text-sm text-gray-600 truncate mt-1">{run.output.title}</p>
                )}
                {run.output.summary && (
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{run.output.summary}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Started: {started}
                </p>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 flex items-center space-x-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}
                >
                  {badge.label}
                </span>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">{duration}</span>
                  <span className="ml-1 text-gray-500">duration</span>
                </div>
                <div className="text-sm text-gray-600">
                  🖋️ {run.output.annotations_count}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
