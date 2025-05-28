import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposActionsRunsJobs {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunsJobs.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { total_count, jobs } = value;

  // Format an ISO date string to a user-friendly datetime
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Compute duration between start and end in "Xm Ys" format
  const formatDuration = (start: string, end: string | null | undefined): string => {
    if (!end) return "–";
    const ms = new Date(end).getTime() - new Date(start).getTime();
    if (ms < 0) return "–";
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}m ${sec}s`;
  };

  // Map status to an icon
  const renderStatusIcon = (status: AutoViewInputSubTypes.job["status"]) => {
    const commonProps = { size: 16, className: "inline-block" as const, role: "img" as const };
    switch (status) {
      case "queued":
      case "waiting":
      case "pending":
      case "requested":
        return <LucideReact.Clock {...commonProps} className="text-amber-500" aria-label={status} />;
      case "in_progress":
        return <LucideReact.Play {...commonProps} className="text-blue-500" aria-label={status} />;
      case "completed":
        return <LucideReact.CheckCircle {...commonProps} className="text-green-500" aria-label={status} />;
      default:
        return <LucideReact.HelpCircle {...commonProps} className="text-gray-400" aria-label={status} />;
    }
  };

  // Map conclusion to an icon
  const renderConclusionIcon = (conclusion: AutoViewInputSubTypes.job["conclusion"]) => {
    const commonProps = { size: 16, className: "inline-block" as const, role: "img" as const };
    switch (conclusion) {
      case "success":
        return <LucideReact.CheckCircle {...commonProps} className="text-green-500" aria-label="success" />;
      case "failure":
        return <LucideReact.XCircle {...commonProps} className="text-red-500" aria-label="failure" />;
      case "neutral":
        return <LucideReact.MinusCircle {...commonProps} className="text-gray-500" aria-label="neutral" />;
      case "cancelled":
        return <LucideReact.XOctagon {...commonProps} className="text-red-400" aria-label="cancelled" />;
      case "skipped":
        return <LucideReact.SkipForward {...commonProps} className="text-gray-400" aria-label="skipped" />;
      case "timed_out":
        return <LucideReact.AlertTriangle {...commonProps} className="text-yellow-500" aria-label="timed out" />;
      case "action_required":
        return <LucideReact.AlertTriangle {...commonProps} className="text-red-500" aria-label="action required" />;
      default:
        return <LucideReact.HelpCircle {...commonProps} className="text-gray-400" aria-label="unknown" />;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Summary header */}
      <div className="flex items-center text-gray-700">
        <LucideReact.List size={20} className="mr-2" />
        <span className="text-lg font-semibold">Jobs ({total_count})</span>
      </div>

      {/* Jobs list */}
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Job title & attempt */}
            <div className="flex justify-between items-center">
              <h3
                className="text-md font-medium text-gray-800 truncate"
                title={job.name}
              >
                {job.name}
              </h3>
              <span className="text-sm text-gray-600">
                Attempt {job.run_attempt ?? 1}
              </span>
            </div>

            {/* Status / Conclusion / Timing */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span>Status:</span>
                {renderStatusIcon(job.status)}
                <span className="capitalize">{job.status.replace("_", " ")}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Result:</span>
                {renderConclusionIcon(job.conclusion)}
                <span className="capitalize">{job.conclusion ?? "–"}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>Started: {formatDate(job.started_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>
                  Completed: {job.completed_at ? formatDate(job.completed_at) : "–"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Clock size={16} />
                <span>
                  Duration: {formatDuration(job.started_at, job.completed_at)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.GitBranch size={16} />
                <span>
                  Branch: <span className="truncate">{job.head_branch ?? "–"}</span>
                </span>
              </div>
            </div>

            {/* Labels */}
            {job.labels.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {job.labels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs truncate"
                    title={label}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {/* Runner info */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.User size={16} />
                <span>{job.runner_name ?? "Unassigned"}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Users size={16} />
                <span>
                  Group: {job.runner_group_name ?? "–"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
