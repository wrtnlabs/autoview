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



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Helper: capitalize a string
  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1);

  // Map statuses and conclusions to FontAwesome icon names
  const statusIconMap: Record<string, string> = {
    queued: "hourglass-half",
    in_progress: "spinner",
    waiting: "hourglass-start",
    requested: "paper-plane",
    pending: "clock",
    completed: "check-circle",
  };
  const conclusionIconMap: Record<string, string> = {
    success: "check-circle",
    failure: "times-circle",
    neutral: "minus-circle",
    cancelled: "ban",
    skipped: "forward",
    timed_out: "hourglass-end",
    action_required: "exclamation-circle",
  };

  // Determine which icon and color to show in the header
  let iconId = statusIconMap[input.status] || "question-circle";
  let iconColor: IAutoView.IAutoViewIconProps["color"] = "gray";
  if (input.status === "in_progress") {
    iconColor = "blue";
  } else if (input.status === "completed") {
    const concl = input.conclusion || "neutral";
    iconId = conclusionIconMap[concl] || statusIconMap.completed;
    iconColor = concl === "success" ? "green" : "red";
  } else if (input.status === "queued" || input.status === "waiting") {
    iconColor = "orange";
  }

  // Format dates for display
  const formatDate = (dt: string | null): string =>
    dt ? new Date(dt).toLocaleString() : "—";

  // Compute duration if both timestamps exist
  let durationDisplay = "—";
  if (input.started_at && input.completed_at) {
    const started = new Date(input.started_at).getTime();
    const completed = new Date(input.completed_at).getTime();
    const ms = completed - started;
    if (!isNaN(ms) && ms >= 0) {
      const secs = Math.round(ms / 1000);
      if (secs < 60) durationDisplay = `${secs}s`;
      else {
        const mins = Math.floor(secs / 60);
        const rem = secs % 60;
        durationDisplay = rem
          ? `${mins}m ${rem}s`
          : `${mins}m`;
      }
    }
  }

  // Build the data list items
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "ID" },
      value: { type: "Text", content: input.id.toString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Status" },
      value: {
        type: "Text",
        content: capitalize(input.status),
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Started" },
      value: { type: "Text", content: formatDate(input.started_at) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Completed" },
      value: { type: "Text", content: formatDate(input.completed_at) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Duration" },
      value: { type: "Text", content: durationDisplay },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Annotations" },
      value: {
        type: "Text",
        content: input.output.annotations_count.toString(),
      },
    },
  ];

  // Optionally add markdown summary if present
  const markdownContentParts: string[] = [];
  if (input.output.title) {
    markdownContentParts.push(`## ${input.output.title}`);
  }
  if (input.output.summary) {
    markdownContentParts.push(input.output.summary);
  }
  if (input.output.text) {
    markdownContentParts.push(input.output.text);
  }
  const markdown =
    markdownContentParts.length > 0
      ? {
          type: "Markdown" as const,
          content: markdownContentParts.join("\n\n"),
        }
      : null;

  // Action buttons for details and annotations
  const footerButtons: IAutoView.IAutoViewButtonProps[] = [
    {
      type: "Button",
      variant: "outlined",
      size: "small",
      label: "View on GitHub",
      href: input.html_url || input.url,
      startElement: {
        type: "Icon",
        id: "link",
        size: 16,
        color: "blue",
      },
    },
    {
      type: "Button",
      variant: "outlined",
      size: "small",
      label: "Annotations",
      href: input.output.annotations_url,
      startElement: {
        type: "Icon",
        id: "align-left",
        size: 16,
        color: "teal",
      },
    },
  ];

  // Compose the vertical card
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header with status icon
      {
        type: "CardHeader",
        title: input.name,
        description:
          input.status === "completed" && input.conclusion
            ? `${capitalize(input.status)} (${capitalize(
                input.conclusion,
              )})`
            : capitalize(input.status),
        startElement: {
          type: "Icon",
          id: iconId,
          color: iconColor,
          size: 24,
        },
      },
      // Main content: data list + optional markdown
      {
        type: "CardContent",
        childrenProps: markdown
          ? [
              { type: "DataList", childrenProps: dataListItems },
              markdown,
            ]
          : [{ type: "DataList", childrenProps: dataListItems }],
      },
      // Footer with action buttons
      {
        type: "CardFooter",
        childrenProps: footerButtons,
      },
    ],
  };
}
