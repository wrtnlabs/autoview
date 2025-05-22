import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposActionsRunsJobs.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDuration = (startIso: string, endIso: string): string => {
    const start = new Date(startIso).getTime();
    const end = new Date(endIso).getTime();
    const diffSec = Math.max(0, Math.floor((end - start) / 1000));
    const m = Math.floor(diffSec / 60);
    const s = diffSec % 60;
    return `${m}m ${s}s`;
  };

  const getBorderColor = (statusOrConclusion: string | null): string => {
    switch (statusOrConclusion) {
      case "success":
        return "border-green-500";
      case "failure":
        return "border-red-500";
      case "neutral":
        return "border-gray-400";
      case "cancelled":
        return "border-yellow-400";
      case "timed_out":
        return "border-orange-400";
      case "action_required":
        return "border-purple-500";
      case "completed":
        return "border-blue-500";
      case "in_progress":
        return "border-blue-400";
      case "queued":
        return "border-yellow-300";
      case "pending":
        return "border-indigo-300";
      case "waiting":
        return "border-indigo-400";
      case "requested":
        return "border-indigo-500";
      default:
        return "border-gray-300";
    }
  };

  const capitalize = (str: string | null): string => {
    if (!str) return "N/A";
    return str
      .replace(/_/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6 text-xl font-semibold text-gray-700">
        Total Jobs: {value.total_count}
      </div>
      <div className="space-y-4">
        {value.jobs.map((job) => {
          const created = formatDate(job.created_at);
          const started = formatDate(job.started_at);
          const completed = job.completed_at
            ? formatDate(job.completed_at)
            : "—";
          const duration =
            job.completed_at && job.started_at
              ? getDuration(job.started_at, job.completed_at)
              : null;
          const borderColor = getBorderColor(job.conclusion ?? job.status);
          return (
            <div
              key={job.id}
              className={`p-4 bg-white rounded-lg shadow-sm border-l-4 ${borderColor}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {job.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 truncate">
                    {job.workflow_name ?? "Workflow"} / {job.head_branch ?? "Branch"}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 flex space-x-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {capitalize(job.status)}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                    {capitalize(job.conclusion)}
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Created:</span> {created}
                </div>
                <div>
                  <span className="font-medium">Started:</span> {started}
                </div>
                <div>
                  <span className="font-medium">Completed:</span> {completed}
                </div>
                {duration && (
                  <div>
                    <span className="font-medium">Duration:</span> {duration}
                  </div>
                )}
              </div>
              {job.labels.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.labels.map((lbl, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-200 text-gray-800 text-xs rounded"
                    >
                      {lbl}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 text-sm text-gray-600">
                <span className="font-medium">Runner:</span>{" "}
                {job.runner_name ?? "Unassigned"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
