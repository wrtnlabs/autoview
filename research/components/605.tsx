import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposActionsRunsJobs {
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
  AutoViewInputSubTypes.IApiReposActionsRunsJobs.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string | null | undefined): string =>
    dateStr ? new Date(dateStr).toLocaleString() : "-";

  const formatDuration = (start?: string, end?: string | null): string => {
    if (!start || !end) return "-";
    const diff = new Date(end).getTime() - new Date(start).getTime();
    if (isNaN(diff) || diff < 0) return "-";
    const seconds = Math.floor(diff / 1000);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const getStatusIcon = (job: AutoViewInputSubTypes.job): JSX.Element => {
    if (job.status !== "completed") {
      switch (job.status) {
        case "queued":
        case "waiting":
        case "pending":
        case "requested":
          return <LucideReact.Clock className="text-amber-500" size={16} />;
        case "in_progress":
          return (
            <LucideReact.Loader
              className="animate-spin text-blue-500"
              size={16}
            />
          );
        default:
          return <LucideReact.Circle className="text-gray-400" size={16} />;
      }
    } else {
      switch (job.conclusion) {
        case "success":
          return (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          );
        case "failure":
          return <LucideReact.XCircle className="text-red-500" size={16} />;
        case "neutral":
          return (
            <LucideReact.MinusCircle className="text-gray-500" size={16} />
          );
        case "cancelled":
          return <LucideReact.XCircle className="text-amber-500" size={16} />;
        case "skipped":
          return (
            <LucideReact.SkipForward className="text-gray-400" size={16} />
          );
        case "timed_out":
          return (
            <LucideReact.AlertTriangle className="text-red-500" size={16} />
          );
        case "action_required":
          return (
            <LucideReact.AlertTriangle className="text-amber-500" size={16} />
          );
        default:
          return <LucideReact.Circle className="text-gray-400" size={16} />;
      }
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Jobs ({value.total_count})
      </h2>
      <div className="space-y-4">
        {value.jobs.map((job: AutoViewInputSubTypes.job) => {
          const shortSha = job.head_sha.slice(0, 7);
          return (
            <div key={job.id} className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 truncate">
                  {getStatusIcon(job)}
                  <div className="truncate">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {job.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      Branch: {job.head_branch || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  Run #{job.run_id}
                  {job.run_attempt && job.run_attempt > 1
                    ? ` (Attempt ${job.run_attempt})`
                    : ""}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span>Created: {formatDate(job.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Clock size={16} className="text-gray-400" />
                    <span>Started: {formatDate(job.started_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Clock size={16} className="text-gray-400" />
                    <span>
                      Duration:{" "}
                      {formatDuration(job.started_at, job.completed_at)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <LucideReact.GitBranch
                      size={16}
                      className="text-gray-400"
                    />
                    <span>SHA: {shortSha}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.User size={16} className="text-gray-400" />
                    <span>Runner: {job.runner_name || "Unassigned"}</span>
                  </div>
                  {job.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {job.labels.map((label) => (
                        <span
                          key={label}
                          className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
