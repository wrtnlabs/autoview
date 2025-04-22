import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposCheckSuitesCheckRuns {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            check_runs: Schema.check_run[];
        };
    }
    /**
     * A check performed on the code of a given code change
     *
     * @title CheckRun
    */
    export type check_run = {
        /**
         * The id of the check.
        */
        id: number & tags.Type<"int32">;
        /**
         * The SHA of the commit that is being checked.
        */
        head_sha: string;
        node_id: string;
        external_id: string | null;
        url: string;
        html_url: string | null;
        details_url: string | null;
        /**
         * The phase of the lifecycle that the check is currently in. Statuses of waiting, requested, and pending are reserved for GitHub Actions check runs.
        */
        status: "queued" | "in_progress" | "completed" | "waiting" | "requested" | "pending";
        conclusion: "success" | "failure" | "neutral" | "cancelled" | "skipped" | "timed_out" | "action_required" | null;
        started_at: (string & tags.Format<"date-time">) | null;
        completed_at: (string & tags.Format<"date-time">) | null;
        output: {
            title: string | null;
            summary: string | null;
            text: string | null;
            annotations_count: number & tags.Type<"int32">;
            annotations_url: string & tags.Format<"uri">;
        };
        /**
         * The name of the check.
        */
        name: string;
        check_suite: {
            id: number & tags.Type<"int32">;
        } | null;
        app: Schema.nullable_integration;
        /**
         * Pull requests that are open with a `head_sha` or `head_branch` that matches the check. The returned pull requests do not necessarily indicate pull requests that triggered the check.
        */
        pull_requests: Schema.pull_request_minimal[];
        deployment?: Schema.deployment_simple;
    };
    /**
     * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
     *
     * @title GitHub app
    */
    export type nullable_integration = {
        /**
         * Unique identifier of the GitHub app
        */
        id: number & tags.Type<"int32">;
        /**
         * The slug name of the GitHub app
        */
        slug?: string;
        node_id: string;
        client_id?: string;
        owner: any | any;
        /**
         * The name of the GitHub app
        */
        name: string;
        description: string | null;
        external_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The set of permissions for the GitHub app
        */
        permissions: {
            [key: string]: string;
        };
        /**
         * The list of events for the GitHub app
        */
        events: string[];
        /**
         * The number of installations associated with the GitHub app
        */
        installations_count?: number & tags.Type<"int32">;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    export type simple_user = any;
    export type enterprise = any;
    /**
     * @title Pull Request Minimal
    */
    export type pull_request_minimal = {
        id: number & tags.Type<"int32">;
        number: number & tags.Type<"int32">;
        url: string;
        head: {
            ref: string;
            sha: string;
            repo: {
                id: number & tags.Type<"int32">;
                url: string;
                name: string;
            };
        };
        base: {
            ref: string;
            sha: string;
            repo: {
                id: number & tags.Type<"int32">;
                url: string;
                name: string;
            };
        };
    };
    /**
     * A deployment created as the result of an Actions check run from a workflow that references an environment
     *
     * @title Deployment
    */
    export type deployment_simple = {
        url: string & tags.Format<"uri">;
        /**
         * Unique identifier of the deployment
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Parameter to specify a task to execute
        */
        task: string;
        original_environment?: string;
        /**
         * Name for the target deployment environment.
        */
        environment: string;
        description: string | null;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        statuses_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        /**
         * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
        */
        transient_environment?: boolean;
        /**
         * Specifies if the given environment is one that end-users directly interact with. Default: false.
        */
        production_environment?: boolean;
        performed_via_github_app?: Schema.nullable_integration;
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposCheckSuitesCheckRuns.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Map a check run's status and conclusion to an icon name and color.
   * Uses FontAwesome icon IDs in kebab-case.
   */
  function getStatusIconProps(
    status: Schema.check_run["status"],
    conclusion: Schema.check_run["conclusion"]
  ): IAutoView.IAutoViewIconProps {
    let id: string;
    let color:
      | "red"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "teal"
      | "cyan"
      | "blue"
      | "indigo"
      | "violet"
      | "pink"
      | "gray"
      | "darkGray";

    if (status === "completed") {
      // Use conclusion-specific icons
      switch (conclusion) {
        case "success":
          id = "check-circle";
          color = "green";
          break;
        case "failure":
          id = "times-circle";
          color = "red";
          break;
        case "neutral":
          id = "minus-circle";
          color = "gray";
          break;
        case "cancelled":
          id = "ban";
          color = "orange";
          break;
        case "skipped":
          id = "forward";
          color = "cyan";
          break;
        case "timed_out":
          id = "hourglass-end";
          color = "orange";
          break;
        case "action_required":
          id = "exclamation-circle";
          color = "red";
          break;
        default:
          // conclusion null or unknown
          id = "question-circle";
          color = "gray";
      }
    } else {
      // In-flight statuses
      switch (status) {
        case "queued":
        case "waiting":
        case "requested":
          id = "clock";
          color = "gray";
          break;
        case "in_progress":
        case "pending":
          id = "spinner";
          color = "blue";
          break;
        default:
          id = "question-circle";
          color = "gray";
      }
    }

    return {
      type: "Icon",
      id,
      color,
      size: 20,
    };
  }

  // Transform each check run into a DataListItem component
  const items: IAutoView.IAutoViewDataListItemProps[] = input.check_runs.map((run) => {
    const icon = getStatusIconProps(run.status, run.conclusion);
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: run.name,
      variant: "body1",
    };

    // Build markdown content: summary + link to details
    const summary = run.output.summary ?? "_No summary provided._";
    const link = run.html_url ?? run.details_url ?? run.url;
    const markdownContent = `
**Summary**

${summary}

[View details](${link})
`;

    const valueMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: markdownContent.trim(),
    };

    return {
      type: "DataListItem",
      // label is an array: [icon, text]
      label: [icon, nameText],
      // value is the markdown summary + link
      value: valueMarkdown,
    };
  });

  // Return a DataList that holds all check run items
  return {
    type: "DataList",
    childrenProps: items,
  };
}
