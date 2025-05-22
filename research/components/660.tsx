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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const capitalize = (s: string) =>
    s
      .split(/[_\s]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  const statusColors: Record<string, string> = {
    queued: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    waiting: "bg-gray-100 text-gray-800",
    requested: "bg-indigo-100 text-indigo-800",
    pending: "bg-orange-100 text-orange-800",
  };

  const conclusionColors: Record<string, string> = {
    success: "bg-green-100 text-green-800",
    failure: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-800",
    cancelled: "bg-yellow-100 text-yellow-800",
    skipped: "bg-gray-200 text-gray-800",
    timed_out: "bg-red-200 text-red-800",
    action_required: "bg-red-100 text-red-800",
    null: "bg-gray-100 text-gray-800",
  };

  const formattedStarted = value.started_at
    ? new Date(value.started_at).toLocaleString()
    : "N/A";
  const formattedCompleted = value.completed_at
    ? new Date(value.completed_at).toLocaleString()
    : "N/A";

  let durationLabel = "N/A";
  if (value.started_at && value.completed_at) {
    const diff = new Date(value.completed_at).getTime() - new Date(value.started_at).getTime();
    if (diff >= 0) {
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      durationLabel = `${minutes}m ${seconds}s`;
    }
  }

  const title = value.output.title ?? "No Title";
  const summary = value.output.summary ?? "No summary available.";
  const shortSummary =
    summary.length > 200 ? summary.slice(0, 200).trim() + "…" : summary;

  const annotationCount = value.output.annotations_count;
  const prCount = value.pull_requests.length;
  const appName = value.app?.name ?? "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 truncate">{value.name}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
              statusColors[value.status] || statusColors.pending
            }`}
          >
            {capitalize(value.status)}
          </span>
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
              conclusionColors[String(value.conclusion)]
            }`}
          >
            {value.conclusion ? capitalize(value.conclusion) : "No Conclusion"}
          </span>
        </div>
      </header>

      <dl className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <dt className="font-medium">Started</dt>
          <dd>{formattedStarted}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Completed</dt>
          <dd>{formattedCompleted}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Duration</dt>
          <dd>{durationLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Annotations</dt>
          <dd>{annotationCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Pull Requests</dt>
          <dd>{prCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">GitHub App</dt>
          <dd className="truncate">{appName}</dd>
        </div>
      </dl>

      <section className="mt-4">
        <h3 className="text-sm font-medium text-gray-800">Output</h3>
        <p className="mt-1 text-base font-semibold text-gray-900">{title}</p>
        <p className="mt-2 text-gray-700 line-clamp-3">{shortSummary}</p>
      </section>
    </article>
  );
}
