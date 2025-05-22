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
  // 1. Data aggregation/transformation
  const {
    name,
    status,
    conclusion,
    started_at,
    completed_at,
    output,
    pull_requests,
    app,
  } = value;

  const startDate = started_at ? new Date(started_at) : null;
  const endDate = completed_at ? new Date(completed_at) : null;

  const startDateStr = startDate?.toLocaleString();
  const endDateStr = endDate?.toLocaleString();

  let durationStr: string | undefined;
  if (startDate && endDate) {
    const diffMs = endDate.getTime() - startDate.getTime();
    const totalSec = Math.round(diffMs / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    durationStr = `${minutes}m ${seconds}s`;
  }

  // Determine badge text and color
  const badgeInfo = (() => {
    if (status !== "completed") {
      const map: Record<string, { text: string; color: string }> = {
        queued: { text: "Queued", color: "text-orange-800 bg-orange-100" },
        waiting: { text: "Waiting", color: "text-orange-800 bg-orange-100" },
        pending: { text: "Pending", color: "text-orange-800 bg-orange-100" },
        requested: { text: "Requested", color: "text-yellow-800 bg-yellow-100" },
        in_progress: { text: "In Progress", color: "text-blue-800 bg-blue-100" },
      };
      return map[status] || { text: status.replace(/_/g, " "), color: "text-gray-800 bg-gray-100" };
    } else {
      // Completed → use conclusion
      if (conclusion === "success") {
        return { text: "Success", color: "text-green-800 bg-green-100" };
      }
      if (conclusion === "failure") {
        return { text: "Failure", color: "text-red-800 bg-red-100" };
      }
      if (conclusion === "neutral") {
        return { text: "Neutral", color: "text-gray-800 bg-gray-100" };
      }
      // other conclusions
      return { text: conclusion ? conclusion.replace(/_/g, " ") : "Completed", color: "text-yellow-800 bg-yellow-100" };
    }
  })();

  // 2. Compose visual structure
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
        <span className={`px-2 py-1 text-xs font-semibold rounded ${badgeInfo.color}`}>
          {badgeInfo.text}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-4 space-y-1">
        {startDateStr && <div>Started: {startDateStr}</div>}
        {endDateStr && <div>Completed: {endDateStr}</div>}
        {durationStr && <div>Duration: {durationStr}</div>}
      </div>

      {output.title && (
        <h3 className="text-md font-medium text-gray-700 mb-1 truncate">{output.title}</h3>
      )}

      {output.summary && (
        <p className="text-sm text-gray-600 mb-4 overflow-hidden line-clamp-3">
          {output.summary}
        </p>
      )}

      <div className="flex flex-wrap text-sm text-gray-700 space-x-4">
        <div>Annotations: {output.annotations_count}</div>
        {pull_requests.length > 0 && <div>PRs: {pull_requests.length}</div>}
        {app && <div>App: {app.name}</div>}
      </div>
    </div>
  );
}
