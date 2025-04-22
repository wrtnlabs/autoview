import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.check_run;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: pick an icon based on the check run status and conclusion
  function getStatusIcon(): IAutoView.IAutoViewIconProps {
    let iconId = "question-circle";
    let color: IAutoView.IAutoViewIconProps["color"] = "gray";

    switch (input.status) {
      case "completed":
        if (input.conclusion === "success") {
          iconId = "check-circle";
          color = "green";
        } else if (input.conclusion === "failure" || input.conclusion === "cancelled" || input.conclusion === "timed_out") {
          iconId = "times-circle";
          color = "red";
        } else {
          iconId = "minus-circle";
          color = "orange";
        }
        break;
      case "in_progress":
      case "pending":
      case "requested":
      case "waiting":
        iconId = "hourglass-half";
        color = "yellow";
        break;
      case "queued":
        iconId = "clock";
        color = "blue";
        break;
    }

    return {
      type: "Icon",
      id: iconId,
      size: 24,
      color,
    };
  }

  // Build a list of key-value items to display in a DataList
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Utility to push a text item
  function pushTextItem(label: string, value: string | number) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: [label + ":"],
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: [String(value)],
        variant: "body2",
      },
    });
  }

  // Status and conclusion
  pushTextItem("Status", input.status);
  if (input.conclusion !== null) {
    pushTextItem("Conclusion", input.conclusion);
  }

  // Timestamps
  if (input.started_at) {
    pushTextItem("Started", new Date(input.started_at).toLocaleString());
  }
  if (input.completed_at) {
    pushTextItem("Completed", new Date(input.completed_at).toLocaleString());
  }

  // Check run URLs as buttons
  if (input.html_url) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: ["View Check Run:"],
        variant: "subtitle2",
      },
      value: {
        type: "Button",
        label: "Open in GitHub",
        href: input.html_url,
        variant: "text",
        color: "primary",
        size: "small",
      },
    });
  }
  if (input.details_url) {
    dataListItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: ["Details URL:"],
        variant: "subtitle2",
      },
      value: {
        type: "Button",
        label: "More Details",
        href: input.details_url,
        variant: "outlined",
        color: "secondary",
        size: "small",
      },
    });
  }

  // Annotations count
  if (typeof input.output.annotations_count === "number") {
    pushTextItem("Annotations", input.output.annotations_count);
  }

  // Pull requests: show as chips
  let prChipGroup: IAutoView.IAutoViewChipGroupProps | undefined;
  if (Array.isArray(input.pull_requests) && input.pull_requests.length > 0) {
    const chips: IAutoView.IAutoViewChipProps[] = input.pull_requests.map(pr => ({
      type: "Chip",
      label: `#${pr.number}`,
      variant: "outlined",
      size: "small",
    }));
    prChipGroup = {
      type: "ChipGroup",
      childrenProps: chips,
      maxItems: 5,
    };
  }

  // Build the main card
  const children: Array<
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  > = [];

  // Card header: show check-run name, id, and status icon
  children.push({
    type: "CardHeader",
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: getStatusIcon(),
  });

  // Card content: show summary or fallback markdown, then the data list
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  if (input.output.summary) {
    // Render the summary as markdown for better responsiveness and formatting
    contentChildren.push({
      type: "Markdown",
      content: `**Summary**\n\n${input.output.summary}`,
    });
  }

  // Always include the data list if we have items
  if (dataListItems.length > 0) {
    contentChildren.push({
      type: "DataList",
      childrenProps: dataListItems,
    });
  } else {
    // Fallback text if no detail items
    contentChildren.push({
      type: "Text",
      content: ["No additional details available."],
      variant: "body2",
    });
  }

  children.push({
    type: "CardContent",
    childrenProps: contentChildren,
  });

  // Card footer: pull requests if any
  if (prChipGroup) {
    children.push({
      type: "CardFooter",
      childrenProps: prChipGroup,
    });
  }

  // Return a vertical card for responsive layout on mobile and desktop
  return {
    type: "VerticalCard",
    childrenProps: children,
  };
}
