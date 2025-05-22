import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput = AutoViewInputSubTypes.job;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const shortSha = value.head_sha.slice(0, 7);
  const stepsCount = value.steps?.length ?? 0;
  const runnerName = value.runner_name || "Unassigned";
  const workflowName = value.workflow_name || "—";
  const branchName = value.head_branch || "—";

  const formatDate = (iso?: string | null): string => {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleString();
  };

  // Determine status icon and label
  let StatusIcon: JSX.Element;
  let statusLabel: string;
  switch (value.status) {
    case "queued":
      StatusIcon = <LucideReact.Clock className="text-amber-500" size={16} />;
      statusLabel = "Queued";
      break;
    case "in_progress":
      StatusIcon = (
        <LucideReact.Loader className="animate-spin text-blue-500" size={16} />
      );
      statusLabel = "In Progress";
      break;
    case "completed":
      switch (value.conclusion) {
        case "success":
          StatusIcon = (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          );
          statusLabel = "Success";
          break;
        case "failure":
          StatusIcon = (
            <LucideReact.AlertTriangle className="text-red-500" size={16} />
          );
          statusLabel = "Failure";
          break;
        case "cancelled":
        case "timed_out":
        case "action_required":
          StatusIcon = (
            <LucideReact.AlertTriangle className="text-yellow-500" size={16} />
          );
          statusLabel = value.conclusion
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          break;
        case "neutral":
        case "skipped":
          StatusIcon = (
            <LucideReact.MinusCircle className="text-gray-500" size={16} />
          );
          statusLabel =
            value.conclusion.charAt(0).toUpperCase() +
            value.conclusion.slice(1);
          break;
        default:
          StatusIcon = (
            <LucideReact.Circle className="text-gray-400" size={16} />
          );
          statusLabel = "Completed";
          break;
      }
      break;
    default:
      StatusIcon = (
        <LucideReact.HelpCircle className="text-gray-400" size={16} />
      );
      statusLabel =
        value.status.charAt(0).toUpperCase() + value.status.slice(1);
      break;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header: Job Name and Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
        <div className="flex items-center gap-1">
          {StatusIcon}
          <span className="text-sm font-medium text-gray-700">
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Metadata: Workflow, Attempt */}
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <LucideReact.Activity size={16} />
          <span>{workflowName}</span>
        </div>
        {value.run_attempt && value.run_attempt > 1 && (
          <span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded">
            Attempt {value.run_attempt}
          </span>
        )}
      </div>

      {/* Core Details Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-1">
          <LucideReact.GitBranch size={16} className="text-gray-500" />
          <span className="truncate">{branchName}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.GitCommit size={16} className="text-gray-500" />
          <span className="font-mono">{shortSha}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Cpu size={16} className="text-gray-500" />
          <span className="truncate">{runnerName}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.ListOrdered size={16} className="text-gray-500" />
          <span>
            {stepsCount} step{stepsCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Labels */}
      {value.labels.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {value.labels.map((lbl, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded"
            >
              {lbl}
            </span>
          ))}
        </div>
      )}

      {/* Timestamps */}
      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>Created: {formatDate(value.created_at)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.PlayCircle size={14} />
          <span>Started: {formatDate(value.started_at)}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.CheckSquare size={14} />
          <span>Completed: {formatDate(value.completed_at)}</span>
        </div>
      </div>
    </div>
  );
}
