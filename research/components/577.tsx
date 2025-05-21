import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.job;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  const createdAt = formatDate(value.created_at);
  const startedAt = formatDate(value.started_at);
  const completedAt = formatDate(value.completed_at);

  const duration =
    value.started_at && value.completed_at
      ? (() => {
          const diff =
            new Date(value.completed_at!).getTime() -
            new Date(value.started_at).getTime();
          const secTotal = Math.floor(diff / 1000);
          const mins = Math.floor(secTotal / 60);
          const secs = secTotal % 60;
          return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        })()
      : "—";

  const statusMap: Record<AutoViewInput["status"], string> = {
    queued: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    waiting: "bg-indigo-100 text-indigo-800",
    requested: "bg-purple-100 text-purple-800",
    pending: "bg-yellow-100 text-yellow-800",
  };
  const conclusionMap: Record<NonNullable<AutoViewInput["conclusion"]>, string> = {
    success: "bg-green-100 text-green-800",
    failure: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-800",
    cancelled: "bg-yellow-100 text-yellow-800",
    skipped: "bg-gray-100 text-gray-800",
    timed_out: "bg-red-100 text-red-800",
    action_required: "bg-orange-100 text-orange-800",
  };

  const statusClass = statusMap[value.status] ?? "bg-gray-100 text-gray-800";
  const conclusionClass =
    value.conclusion != null
      ? conclusionMap[value.conclusion] ?? "bg-gray-100 text-gray-800"
      : "";

  const workflow = value.workflow_name ?? "—";
  const branch = value.head_branch ?? "—";
  const runner = value.runner_name ?? "—";
  const stepCount = value.steps?.length ?? 0;
  const labels = value.labels ?? [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${statusClass}`}
        >
          {value.status.replace(/_/g, " ")}
        </span>
      </div>

      {value.conclusion && (
        <div className="flex justify-end">
          <span
            className={`px-2 py-1 text-sm font-medium rounded ${conclusionClass}`}
          >
            {value.conclusion.replace(/_/g, " ")}
          </span>
        </div>
      )}

      <div className="text-sm text-gray-600 space-y-1">
        <div>
          <span className="font-medium">Workflow:</span> {workflow}
        </div>
        <div>
          <span className="font-medium">Branch:</span> {branch}
        </div>
        <div>
          <span className="font-medium">Runner:</span> {runner}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created:</span> {createdAt}
        </div>
        <div>
          <span className="font-medium">Started:</span> {startedAt}
        </div>
        <div>
          <span className="font-medium">Completed:</span> {completedAt}
        </div>
        <div>
          <span className="font-medium">Duration:</span> {duration}
        </div>
      </div>

      {labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <span
              key={label}
              className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {stepCount > 0 && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Steps:</span> {stepCount}
        </div>
      )}
    </div>
  );
}
