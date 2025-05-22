import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    status:
      | "queued"
      | "in_progress"
      | "completed"
      | "waiting"
      | "requested"
      | "pending";
    /**
     * The outcome of the job.
     */
    conclusion:
      | "success"
      | "failure"
      | "neutral"
      | "cancelled"
      | "skipped"
      | "timed_out"
      | "action_required"
      | null;
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
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposActionsRunsAttemptsJobs.GetResponse;

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformations and helpers
  const jobs = value.jobs;
  const total = value.total_count;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

  const formatDuration = (job: AutoViewInput["jobs"][number]): string => {
    if (!job.started_at || !job.completed_at) return "";
    const start = new Date(job.started_at).getTime();
    const end = new Date(job.completed_at).getTime();
    const diff = Math.max(0, end - start);
    const totalSec = Math.floor(diff / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  const getStatusIcon = (job: AutoViewInput["jobs"][number]): JSX.Element => {
    switch (job.status) {
      case "in_progress":
        return (
          <LucideReact.Loader
            className="animate-spin text-blue-500"
            size={16}
          />
        );
      case "queued":
      case "waiting":
      case "requested":
      case "pending":
        return <LucideReact.Clock className="text-amber-500" size={16} />;
      case "completed":
        switch (job.conclusion) {
          case "success":
            return (
              <LucideReact.CheckCircle className="text-green-500" size={16} />
            );
          case "failure":
            return <LucideReact.XCircle className="text-red-500" size={16} />;
          case "cancelled":
            return (
              <LucideReact.XOctagon className="text-yellow-500" size={16} />
            );
          default:
            return <LucideReact.Circle className="text-gray-500" size={16} />;
        }
      default:
        return <LucideReact.Circle className="text-gray-500" size={16} />;
    }
  };

  // 2. Handle empty state
  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No jobs available</p>
      </div>
    );
  }

  // 3. Compose the visual structure
  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LucideReact.ListChecks className="text-gray-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">
            Jobs ({total})
          </h2>
        </div>
      </div>

      {/* Job list */}
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-4"
          >
            {/* Title & Status */}
            <div className="flex items-center space-x-2">
              {getStatusIcon(job)}
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-gray-900 truncate">
                  {job.name}
                </span>
                <span className="text-sm text-gray-500 truncate">
                  {job.head_branch ?? "Branch unknown"}
                </span>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <LucideReact.Calendar className="text-gray-400" size={16} />
                <time dateTime={job.created_at}>
                  {formatDate(job.created_at)}
                </time>
              </div>
              {job.completed_at && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Timer className="text-gray-400" size={16} />
                  <span>{formatDuration(job)}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <LucideReact.User className="text-gray-400" size={16} />
                <span>{job.runner_name ?? "Unassigned"}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
