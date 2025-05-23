import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCommitsCheckRuns {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCommitsCheckRuns.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalRuns = value.total_count;
  const runs = value.check_runs;

  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '';

  function getStatusIcon(
    status: AutoViewInputSubTypes.check_run['status'],
    conclusion: AutoViewInputSubTypes.check_run['conclusion']
  ): JSX.Element {
    switch (status) {
      case 'in_progress':
        return (
          <LucideReact.Loader
            size={16}
            className="animate-spin text-blue-500"
            aria-label="In progress"
          />
        );
      case 'queued':
      case 'waiting':
      case 'requested':
      case 'pending':
        return (
          <LucideReact.Clock
            size={16}
            className="text-amber-500"
            aria-label="Pending"
          />
        );
      case 'completed':
        switch (conclusion) {
          case 'success':
            return (
              <LucideReact.CheckCircle
                size={16}
                className="text-green-500"
                aria-label="Success"
              />
            );
          case 'failure':
            return (
              <LucideReact.XCircle
                size={16}
                className="text-red-500"
                aria-label="Failure"
              />
            );
          case 'neutral':
            return (
              <LucideReact.MinusCircle
                size={16}
                className="text-gray-500"
                aria-label="Neutral"
              />
            );
          case 'cancelled':
            return (
              <LucideReact.XCircle
                size={16}
                className="text-gray-400"
                aria-label="Cancelled"
              />
            );
          case 'skipped':
            return (
              <LucideReact.SkipBack
                size={16}
                className="text-gray-400"
                aria-label="Skipped"
              />
            );
          case 'timed_out':
          case 'action_required':
            return (
              <LucideReact.AlertTriangle
                size={16}
                className="text-red-500"
                aria-label="Attention required"
              />
            );
          default:
            return (
              <LucideReact.HelpCircle
                size={16}
                className="text-gray-400"
                aria-label="Unknown status"
              />
            );
        }
      default:
        return (
          <LucideReact.HelpCircle
            size={16}
            className="text-gray-400"
            aria-label="Unknown status"
          />
        );
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4 text-gray-800">
        <LucideReact.Package size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold">
          Check Runs ({totalRuns})
        </h3>
      </div>

      {runs.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-8">
          <LucideReact.AlertCircle size={32} />
          <span className="mt-2">No check runs available</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {runs.map((cr) => (
            <li key={cr.id} className="border-t pt-4 first:border-t-0">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(cr.status, cr.conclusion)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4
                      className="font-medium text-gray-800 truncate"
                      title={cr.name}
                    >
                      {cr.name}
                    </h4>
                    <span className="text-sm text-gray-500 capitalize">
                      {cr.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600 flex flex-wrap gap-3">
                    <div className="flex items-center gap-1">
                      <LucideReact.GitCommit
                        size={14}
                        className="text-gray-400"
                      />
                      <span className="font-mono">
                        {cr.head_sha.slice(0, 7)}
                      </span>
                    </div>
                    {cr.started_at && (
                      <div className="flex items-center gap-1">
                        <LucideReact.Calendar
                          size={14}
                          className="text-gray-400"
                        />
                        <span>Start: {formatDate(cr.started_at)}</span>
                      </div>
                    )}
                    {cr.completed_at && (
                      <div className="flex items-center gap-1">
                        <LucideReact.Calendar
                          size={14}
                          className="text-gray-400"
                        />
                        <span>Done: {formatDate(cr.completed_at)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <LucideReact.CheckSquare
                        size={14}
                        className="text-gray-400"
                      />
                      <span>
                        Annotations: {cr.output.annotations_count}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LucideReact.GitPullRequest
                        size={14}
                        className="text-gray-400"
                      />
                      <span>{cr.pull_requests.length} PR</span>
                    </div>
                  </div>
                  {cr.app?.name && (
                    <p className="mt-1 text-sm text-gray-500">
                      App: {cr.app.name}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
