import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsRunsJobs {
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
type IAutoViewTransformerInputType = Schema.IApiReposActionsRunsJobs.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: pick an icon and color based on job status
  const mapStatusToIcon = (
    status: Schema.IApiReposActionsRunsJobs.GetResponse["jobs"][0]["status"]
  ): IAutoView.IAutoViewIconProps => {
    switch (status) {
      case "in_progress":
        return { type: "Icon", id: "spinner", color: "blue", size: 20 };
      case "queued":
      case "pending":
      case "waiting":
      case "requested":
        return { type: "Icon", id: "clock", color: "gray", size: 20 };
      case "completed":
        return { type: "Icon", id: "check-circle", color: "green", size: 20 };
      default:
        return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
    }
  };

  // Helper: map conclusion to chip color
  const mapConclusionToColor = (
    conclusion: Schema.IApiReposActionsRunsJobs.GetResponse["jobs"][0]["conclusion"]
  ): IAutoView.IAutoViewChipProps["color"] => {
    switch (conclusion) {
      case "success":
        return "green";
      case "failure":
      case "timed_out":
        return "error";
      case "cancelled":
        return "orange";
      case "skipped":
        return "warning";
      case "neutral":
        return "gray";
      case "action_required":
        return "red";
      default:
        return "gray";
    }
  };

  // Ensure we have a jobs array
  const jobs = Array.isArray(input.jobs) ? input.jobs : [];

  // Build a subheader showing total count
  const subheader: IAutoView.IAutoViewListSubheaderProps = {
    type: "ListSubheader",
    stickToTop: true,
    childrenProps: {
      type: "Text",
      content: `Total Jobs: ${input.total_count}`,
      variant: "subtitle1",
      color: "primary",
    },
  };

  // Transform each job into a list item
  const jobItems: IAutoView.IAutoViewListItemProps[] = jobs.map((job) => {
    // Format description: branch and run id
    const branch = job.head_branch ?? "unknown";
    const description = `Branch: ${branch} | Run #${job.run_id}`;

    // Icon representing status
    const statusIcon = mapStatusToIcon(job.status);

    // Chip representing conclusion
    const conclusionLabel = job.conclusion ?? "unknown";
    const conclusionChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: conclusionLabel,
      color: mapConclusionToColor(job.conclusion),
      size: "small",
      variant: "filled",
    };

    // Compose the list item
    const listItem: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: job.name,
      description,
      startElement: statusIcon,
      endElement: conclusionChip,
      // If html_url is null, omit href
      href: job.html_url ?? undefined,
    };

    return listItem;
  });

  // Final List component combining subheader and job items
  const listProps: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: [subheader, ...jobItems],
  };

  return listProps;
}
