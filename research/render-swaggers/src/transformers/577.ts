import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.job;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map job status to FontAwesome icon names
  const statusIconMap: Record<string, string> = {
    queued: "hourglass-start",
    in_progress: "spinner",
    waiting: "pause",
    requested: "question-circle",
    pending: "hourglass-half",
    completed: "check-circle", // falls back to conclusion coloring
  };

  // Determine icon color based on status and conclusion
  const getStatusColor = (): IAutoView.IAutoViewIconProps["color"] => {
    if (input.status === "completed") {
      return input.conclusion === "success" ? "green" : "red";
    }
    // in-progress/status colors
    switch (input.status) {
      case "in_progress":
        return "blue";
      case "queued":
      case "pending":
        return "orange";
      case "waiting":
        return "gray";
      case "requested":
        return "teal";
      default:
        return "gray";
    }
  };

  // Build timestamp markdown
  const timestampMd = [
    "### Timestamps",
    `- **Created:** ${input.created_at}`,
    `- **Started:** ${input.started_at}`,
    `- **Completed:** ${input.completed_at ?? "N/A"}`,
  ].join("\n");

  // Build steps markdown if any
  const stepsMd =
    input.steps && input.steps.length > 0
      ? [
          "### Steps",
          ...input.steps.map(
            (step) =>
              `- **${step.number}. ${step.name}**: ${step.status}${
                step.conclusion ? ` (${step.conclusion})` : ""
              }`
          ),
        ].join("\n")
      : "";

  // Build label chips if any labels
  const labelChips: IAutoView.IAutoViewChipProps[] = (input.labels || []).map(
    (lbl) => ({
      type: "Chip",
      label: lbl,
      size: "small",
      variant: "outlined",
    })
  );

  // Compose the VerticalCard with header, content, and optional footer
  const cardChildren: Array<
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  > = [];

  // Header: job name, id/run summary, and status icon
  cardChildren.push({
    type: "CardHeader",
    title: input.name,
    description: `Job #${input.id} in run ${input.run_id}`,
    startElement: {
      type: "Icon",
      id: statusIconMap[input.status] || "question-circle",
      color: getStatusColor(),
      size: 24,
    },
  });

  // Content: timestamps and steps as markdown (responsive and easy to read)
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: "Markdown",
      content: timestampMd,
    } as IAutoView.IAutoViewMarkdownProps,
  ];
  if (stepsMd) {
    contentChildren.push({
      type: "Markdown",
      content: stepsMd,
    } as IAutoView.IAutoViewMarkdownProps);
  }
  cardChildren.push({
    type: "CardContent",
    childrenProps: contentChildren,
  });

  // Footer: chip group of labels if present
  if (labelChips.length > 0) {
    cardChildren.push({
      type: "CardFooter",
      childrenProps: {
        type: "ChipGroup",
        childrenProps: labelChips,
      },
    });
  }

  // Return as VerticalCard, which is one of IAutoViewComponentProps
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
