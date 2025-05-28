import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.job;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatLabel = (s: string): string =>
    s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const formattedDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const shortSha = value.head_sha.slice(0, 7);

  const getStatusIcon = (): JSX.Element => {
    const commonProps = { size: 16, className: 'flex-shrink-0' };
    if (value.status !== 'completed') {
      switch (value.status) {
        case 'in_progress':
          return <LucideReact.Loader {...commonProps} className="animate-spin text-blue-500" />;
        case 'queued':
        case 'waiting':
        case 'requested':
        case 'pending':
          return <LucideReact.Clock {...commonProps} className="text-amber-500" />;
        default:
          return <LucideReact.HelpCircle {...commonProps} className="text-gray-400" />;
      }
    } else {
      switch (value.conclusion) {
        case 'success':
          return <LucideReact.CheckCircle {...commonProps} className="text-green-500" />;
        case 'failure':
          return <LucideReact.XCircle {...commonProps} className="text-red-500" />;
        case 'neutral':
          return <LucideReact.MinusCircle {...commonProps} className="text-gray-500" />;
        case 'cancelled':
          return <LucideReact.XOctagon {...commonProps} className="text-gray-500" />;
        case 'skipped':
          return <LucideReact.SkipForward {...commonProps} className="text-gray-500" />;
        case 'timed_out':
          return <LucideReact.Clock {...commonProps} className="text-orange-500" />;
        case 'action_required':
          return <LucideReact.AlertTriangle {...commonProps} className="text-red-500" />;
        default:
          return <LucideReact.HelpCircle {...commonProps} className="text-gray-400" />;
      }
    }
  };

  const statusText =
    value.status !== 'completed'
      ? formatLabel(value.status)
      : formatLabel(value.conclusion ?? 'unknown');

  let durationText: string | null = null;
  if (value.started_at && value.completed_at) {
    const start = new Date(value.started_at).getTime();
    const end = new Date(value.completed_at).getTime();
    const diff = Math.max(0, end - start);
    const secs = Math.floor(diff / 1000);
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const rem = secs % 60;
    durationText = hrs > 0
      ? `${hrs}h ${mins}m`
      : mins > 0
        ? `${mins}m ${rem}s`
        : `${rem}s`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h2>
        <div className="flex items-center space-x-1">
          {getStatusIcon()}
          <span className="text-sm font-medium text-gray-600">{statusText}</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
        {value.workflow_name && (
          <div className="flex items-center space-x-1">
            <LucideReact.GitBranch size={16} className="text-gray-400 flex-shrink-0" />
            <span>{value.workflow_name}</span>
          </div>
        )}
        {value.head_branch && (
          <div className="flex items-center space-x-1">
            <LucideReact.GitBranch size={16} className="text-gray-400 flex-shrink-0" />
            <span>{value.head_branch}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <LucideReact.Hash size={16} className="text-gray-400 flex-shrink-0" />
          <span>{shortSha}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400 flex-shrink-0" />
          <span>Created:</span>
          <span className="font-medium">{formattedDate(value.created_at)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Play size={16} className="text-gray-400 flex-shrink-0" />
          <span>Started:</span>
          <span className="font-medium">{formattedDate(value.started_at)}</span>
        </div>
        {value.completed_at && (
          <div className="flex items-center space-x-1">
            <LucideReact.CheckSquare size={16} className="text-gray-400 flex-shrink-0" />
            <span>Completed:</span>
            <span className="font-medium">{formattedDate(value.completed_at)}</span>
          </div>
        )}
        {durationText && (
          <div className="flex items-center space-x-1">
            <LucideReact.Clock size={16} className="text-gray-400 flex-shrink-0" />
            <span>Duration:</span>
            <span className="font-medium">{durationText}</span>
          </div>
        )}
      </div>

      {value.runner_name && (
        <div className="mt-4 flex items-center text-sm text-gray-600">
          <LucideReact.User size={16} className="text-gray-400 flex-shrink-0" />
          <span className="ml-1">{value.runner_name}</span>
        </div>
      )}

      {value.labels && value.labels.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {value.labels.map(label => (
            <span
              key={label}
              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
