import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCheckSuitesCheckRuns {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            check_runs: AutoViewInputSubTypes.check_run[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCheckSuitesCheckRuns.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRuns = value.total_count;
  const runs = value.check_runs;

  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const renderStatusIcon = (
    run: AutoViewInputSubTypes.check_run
  ): JSX.Element => {
    if (run.status !== "completed") {
      return (
        <LucideReact.Clock
          className="text-amber-500"
          size={16}
          aria-label={run.status}
        />
      );
    }
    switch (run.conclusion) {
      case "success":
        return (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={16}
            aria-label="Success"
          />
        );
      case "failure":
        return (
          <LucideReact.XCircle
            className="text-red-500"
            size={16}
            aria-label="Failure"
          />
        );
      case "neutral":
        return (
          <LucideReact.Minus
            className="text-gray-500"
            size={16}
            aria-label="Neutral"
          />
        );
      case "cancelled":
        return (
          <LucideReact.XCircle
            className="text-yellow-500"
            size={16}
            aria-label="Cancelled"
          />
        );
      case "skipped":
        return (
          <LucideReact.SkipForward
            className="text-gray-400"
            size={16}
            aria-label="Skipped"
          />
        );
      case "timed_out":
        return (
          <LucideReact.AlertTriangle
            className="text-red-500"
            size={16}
            aria-label="Timed Out"
          />
        );
      case "action_required":
        return (
          <LucideReact.AlertOctagon
            className="text-red-500"
            size={16}
            aria-label="Action Required"
          />
        );
      default:
        return (
          <LucideReact.HelpCircle
            className="text-gray-400"
            size={16}
            aria-label="No Conclusion"
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full overflow-x-auto">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4 text-lg font-semibold text-gray-800">
          <LucideReact.CheckSquare
            className="mr-2 text-blue-500"
            size={20}
            aria-label="Check Runs"
          />
          <span>Check Runs ({totalRuns})</span>
        </div>
        {runs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <LucideReact.AlertCircle size={24} />
            <span className="mt-2">No check runs available</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {runs.map((run) => (
              <div
                key={run.id}
                className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {run.name}
                  </div>
                  <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {run.output.summary ?? run.output.text ?? "No summary"}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2 md:mt-0">
                  <div className="flex items-center gap-1">
                    {renderStatusIcon(run)}
                    <span>{run.status.replace(/_/g, " ")}</span>
                  </div>
                  {run.status === "completed" && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar size={16} aria-label="Completed At" />
                      <span>{formatDate(run.completed_at)}</span>
                    </div>
                  )}
                  {run.pull_requests.length > 0 && (
                    <div className="flex items-center gap-1">
                      <LucideReact.GitPullRequest
                        size={16}
                        aria-label="Pull Requests"
                      />
                      <span>{run.pull_requests.length}</span>
                    </div>
                  )}
                  {run.app && (
                    <div className="flex items-center gap-1">
                      <LucideReact.User size={16} aria-label="App Name" />
                      <span className="truncate max-w-xs">{run.app.name}</span>
                    </div>
                  )}
                  {run.deployment && (
                    <div className="flex items-center gap-1">
                      <LucideReact.Package
                        size={16}
                        aria-label="Deployment Environment"
                      />
                      <span>{run.deployment.environment}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
