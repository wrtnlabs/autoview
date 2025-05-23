import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunsAttemptsJobs {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            jobs: AutoViewInputSubTypes.job[];
        }
    }
    /**
     * Information of a job execution in a workflow run
     *
     * @title Job
    */
    export interface job {
        /**
         * The id of the job.
        */
        id: number & tags.Type<"int32">;
        /**
         * The id of the associated workflow run.
        */
        run_id: number & tags.Type<"int32">;
        run_url: string;
        /**
         * Attempt number of the associated workflow run, 1 for first attempt and higher if the workflow was re-run.
        */
        run_attempt?: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The SHA of the commit that is being run.
        */
        head_sha: string;
        url: string;
        html_url: string | null;
        /**
         * The phase of the lifecycle that the job is currently in.
        */
        status: "queued" | "in_progress" | "completed" | "waiting" | "requested" | "pending";
        /**
         * The outcome of the job.
        */
        conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required" | null;
        /**
         * The time that the job created, in ISO 8601 format.
        */
        created_at: string;
        /**
         * The time that the job started, in ISO 8601 format.
        */
        started_at: string;
        /**
         * The time that the job finished, in ISO 8601 format.
        */
        completed_at: (string & tags.Format<"date-time">) | null;
        /**
         * The name of the job.
        */
        name: string;
        /**
         * Steps in this job.
        */
        steps?: {
            /**
             * The phase of the lifecycle that the job is currently in.
            */
            status: "queued" | "in_progress" | "completed";
            /**
             * The outcome of the job.
            */
            conclusion: string | null;
            /**
             * The name of the job.
            */
            name: string;
            number: number & tags.Type<"int32">;
            /**
             * The time that the step started, in ISO 8601 format.
            */
            started_at?: (string & tags.Format<"date-time">) | null;
            /**
             * The time that the job finished, in ISO 8601 format.
            */
            completed_at?: (string & tags.Format<"date-time">) | null;
        }[];
        check_run_url: string;
        /**
         * Labels for the workflow job. Specified by the "runs_on" attribute in the action's workflow file.
        */
        labels: string[];
        /**
         * The ID of the runner to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)
        */
        runner_id: (number & tags.Type<"int32">) | null;
        /**
         * The name of the runner to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)
        */
        runner_name: string | null;
        /**
         * The ID of the runner group to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)
        */
        runner_group_id: (number & tags.Type<"int32">) | null;
        /**
         * The name of the runner group to which this job has been assigned. (If a runner hasn't yet been assigned, this will be null.)
        */
        runner_group_name: string | null;
        /**
         * The name of the workflow.
        */
        workflow_name: string | null;
        /**
         * The name of the current branch.
        */
        head_branch: string | null;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunsAttemptsJobs.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, jobs } = value;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  const formatDuration = (start: string, end: string): string => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    if (diff <= 0) return '0s';
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  };

  const getStatusIcon = (
    status: AutoViewInputSubTypes.job['status'],
    conclusion: AutoViewInputSubTypes.job['conclusion']
  ): JSX.Element => {
    if (status !== 'completed') {
      if (status === 'in_progress') {
        return (
          <LucideReact.Loader
            className="animate-spin text-blue-500"
            size={16}
            aria-label="In progress"
          />
        );
      }
      return (
        <LucideReact.Clock
          className="text-amber-500"
          size={16}
          aria-label={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      );
    }
    switch (conclusion) {
      case 'success':
        return (
          <LucideReact.CheckCircle
            className="text-green-500"
            size={16}
            aria-label="Success"
          />
        );
      case 'failure':
        return (
          <LucideReact.XCircle
            className="text-red-500"
            size={16}
            aria-label="Failure"
          />
        );
      case 'neutral':
        return (
          <LucideReact.MinusCircle
            className="text-gray-500"
            size={16}
            aria-label="Neutral"
          />
        );
      case 'skipped':
        return (
          <LucideReact.SkipForward
            className="text-gray-500"
            size={16}
            aria-label="Skipped"
          />
        );
      case 'cancelled':
        return (
          <LucideReact.XCircle
            className="text-gray-400"
            size={16}
            aria-label="Cancelled"
          />
        );
      case 'timed_out':
        return (
          <LucideReact.AlertTriangle
            className="text-red-400"
            size={16}
            aria-label="Timed out"
          />
        );
      case 'action_required':
        return (
          <LucideReact.AlertCircle
            className="text-red-600"
            size={16}
            aria-label="Action required"
          />
        );
      default:
        return (
          <LucideReact.HelpCircle
            className="text-gray-400"
            size={16}
            aria-label="Unknown status"
          />
        );
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Jobs ({total_count})
        </h2>
      </header>

      {jobs.length > 0 ? (
        <ul className="space-y-4">
          {jobs.map((job) => {
            const started = job.started_at;
            const completed = job.completed_at;
            const duration =
              started && completed ? formatDuration(started, completed) : null;
            return (
              <li key={job.id}>
                <div className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(job.status, job.conclusion)}
                    <div>
                      <h3 className="font-medium text-gray-900 truncate">
                        {job.name}
                      </h3>
                      {job.head_branch && (
                        <div className="mt-1 text-gray-500 text-sm flex items-center gap-1">
                          <LucideReact.GitBranch size={14} />
                          <span className="truncate">{job.head_branch}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-4 text-gray-600 text-sm">
                    {job.run_attempt && job.run_attempt > 1 && (
                      <div className="flex items-center gap-1">
                        <LucideReact.Hash size={14} />
                        <span>Attempt {job.run_attempt}</span>
                      </div>
                    )}
                    {job.runner_name && (
                      <div className="flex items-center gap-1">
                        <LucideReact.User size={14} />
                        <span className="truncate">{job.runner_name}</span>
                      </div>
                    )}
                    {duration ? (
                      <div className="flex items-center gap-1">
                        <LucideReact.Clock size={14} />
                        <span>{duration}</span>
                      </div>
                    ) : (
                      started && (
                        <div className="flex items-center gap-1">
                          <LucideReact.Calendar size={14} />
                          <span>{formatDate(started)}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="py-12 text-center text-gray-400">
          <LucideReact.AlertCircle size={48} />
          <p className="mt-2">No jobs found.</p>
        </div>
      )}
    </div>
  );
}
