import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunsAttemptsJobs {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            jobs: AutoViewInputSubTypes.job[];
        };
    }
    /**
     * Information of a job execution in a workflow run
     *
     * @title Job
    */
    export type job = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunsAttemptsJobs.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, jobs } = value;

  // Format an ISO date string to "MMM d, yyyy, h:mm a"
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  // Compute duration between two ISO date strings
  const getDuration = (start: string, end: string): string => {
    const ms = new Date(end).getTime() - new Date(start).getTime();
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  // Determine badge appearance and text based on status/conclusion
  const getBadge = (status: string, conclusion: string | null) => {
    let label = status.replace('_', ' ');
    let bg = 'bg-gray-100';
    let textColor = 'text-gray-800';

    if (status !== 'completed') {
      if (status === 'queued') {
        bg = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        label = 'Queued';
      } else if (status === 'in_progress') {
        bg = 'bg-blue-100';
        textColor = 'text-blue-800';
        label = 'In Progress';
      }
    } else {
      // completed: use conclusion for color
      switch (conclusion) {
        case 'success':
          bg = 'bg-green-100';
          textColor = 'text-green-800';
          label = 'Success';
          break;
        case 'failure':
          bg = 'bg-red-100';
          textColor = 'text-red-800';
          label = 'Failure';
          break;
        case 'neutral':
          bg = 'bg-gray-100';
          textColor = 'text-gray-800';
          label = 'Neutral';
          break;
        case 'cancelled':
          bg = 'bg-orange-100';
          textColor = 'text-orange-800';
          label = 'Cancelled';
          break;
        case 'skipped':
          bg = 'bg-indigo-100';
          textColor = 'text-indigo-800';
          label = 'Skipped';
          break;
        default:
          label = 'Completed';
      }
    }

    return { label, bg, textColor };
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Jobs ({total_count})
      </h2>
      <div className="space-y-4">
        {jobs.map((job) => {
          const { label, bg, textColor } = getBadge(job.status, job.conclusion);
          const started = formatDate(job.started_at);
          const duration =
            job.started_at && job.completed_at
              ? getDuration(job.started_at, job.completed_at)
              : null;

          return (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <h3
                  className="text-lg font-medium text-gray-900 truncate"
                  title={job.name}
                >
                  {job.name}
                </h3>
                <div className="mt-1 text-sm text-gray-600">
                  <span>Runner: {job.runner_name ?? 'Auto'}</span>
                  <span className="mx-2">·</span>
                  <span>Started: {started}</span>
                  {duration && (
                    <>
                      <span className="mx-2">·</span>
                      <span>Duration: {duration}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-wrap items-center gap-2">
                {job.labels.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                <span
                  className={`${bg} ${textColor} text-xs font-semibold px-2 py-1 rounded`}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
