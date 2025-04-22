import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunsAttemptsJobs {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            jobs: Schema.job[];
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
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunsAttemptsJobs.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { total_count, jobs } = input;

  // Helper to format duration between two ISO timestamps
  const formatDuration = (start?: string, end?: string): string => {
    if (!start || !end) return "N/A";
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (isNaN(s) || isNaN(e) || e < s) return "N/A";
    const diff = e - s;
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor(diff / 1000 / 60);
    return `${minutes}m ${seconds}s`;
  };

  // Map job.status to chip color
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    queued: "warning",
    in_progress: "info",
    completed: "success",
    waiting: "secondary",
    requested: "secondary",
    pending: "secondary",
  };
  // Map job.conclusion to chip color
  const conclusionColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    success: "success",
    failure: "error",
    neutral: "primary",
    cancelled: "warning",
    skipped: "info",
    timed_out: "error",
    action_required: "error",
    "null": "gray",
  };

  // Build DataListItem for each job
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = jobs.map((job) => {
    // Status chip
    const statusChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: job.status,
      color: statusColorMap[job.status] || "gray",
      variant: "filled",
      size: "small",
    };
    // Conclusion chip
    const conclusionLabel = job.conclusion ?? "pending";
    const conclusionChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: conclusionLabel,
      color: conclusionColorMap[String(job.conclusion)] || "gray",
      variant: "outlined",
      size: "small",
    };
    // Duration text
    const durationText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: `Duration: ${formatDuration(job.started_at, job.completed_at ?? undefined)}`,
      variant: "body2",
      color: "tertiary",
    };
    // View button linking to the job run in GitHub
    const viewButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View",
      startElement: {
        type: "Icon",
        id: "external-link",
        size: 16,
      },
      href: job.html_url ?? job.url,
      variant: "text",
      size: "small",
    };

    return {
      type: "DataListItem",
      // Label shows job name and ID
      label: [
        {
          type: "Text",
          content: `${job.name} (#${job.id})`,
          variant: "subtitle1",
        },
      ],
      // Value shows status, conclusion, duration, and action button
      value: [
        statusChip,
        conclusionChip,
        durationText,
        viewButton,
      ],
    };
  });

  // If no jobs, show a markdown message
  const contentChildren = dataListItems.length
    ? ({ type: "DataList", childrenProps: dataListItems } as IAutoView.IAutoViewDataListProps)
    : ({
        type: "Markdown",
        content: "### No jobs found\nThere are currently no job executions to display.",
      } as IAutoView.IAutoViewMarkdownProps);

  // Assemble into a VerticalCard for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: `Jobs Summary: ${total_count}`,
        description: `Displaying ${jobs.length} job record${jobs.length !== 1 ? "s" : ""}.`,
      },
      {
        type: "CardContent",
        childrenProps: contentChildren,
      },
    ],
  };
}
