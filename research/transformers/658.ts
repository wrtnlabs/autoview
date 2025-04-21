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
  // Map check_run.status to an icon and color for intuitive visual feedback
  const statusIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps['color'] }> = {
    queued:      { id: 'clock',       color: 'gray' },
    in_progress:{ id: 'spinner',     color: 'blue' },
    waiting:     { id: 'hourglass',   color: 'orange' },
    requested:   { id: 'info-circle', color: 'teal' },
    pending:     { id: 'pause',       color: 'yellow' },
    completed:   {
      // success vs failure icon
      id: input.conclusion === 'success' ? 'check' : 'times',
      color: input.conclusion === 'success' ? 'green' : 'red',
    },
  };

  // Fallback to 'requested' if unknown status
  const statusKey = statusIconMap[input.status] ? input.status : 'requested';
  const iconProps: IAutoView.IAutoViewIconProps = {
    type: 'Icon',
    id: statusIconMap[statusKey].id,
    color: statusIconMap[statusKey].color,
    size: 24,
  };

  // Utility to build a single DataListItem with label & value as Text components
  function listItem(labelText: string, valueText: string | number): IAutoView.IAutoViewDataListItemProps {
    return {
      type: 'DataListItem',
      label: [
        { type: 'Text', content: labelText, variant: 'body2', color: 'tertiary' },
      ],
      value: [
        { type: 'Text', content: String(valueText), variant: 'body1' },
      ],
    };
  }

  // Assemble key/value items, skipping any missing values
  const items = [
    listItem('ID', input.id),
    listItem('Name', input.name),
    listItem('Status', input.status),
    input.conclusion != null ? listItem('Conclusion', input.conclusion) : undefined,
    input.started_at ? listItem('Started At', new Date(input.started_at).toLocaleString()) : undefined,
    input.completed_at ? listItem('Completed At', new Date(input.completed_at).toLocaleString()) : undefined,
    listItem('Annotations', input.output.annotations_count),
    // Display count of pull requests if present
    Array.isArray(input.pull_requests)
      ? listItem('Pull Requests', input.pull_requests.length)
      : undefined,
  ].filter((i): i is IAutoView.IAutoViewDataListItemProps => !!i);

  // DataList component to present key/value pairs
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: items,
  };

  // Optionally render the output.summary as markdown for richer formatting
  const summaryComponent = input.output.summary
    ? {
        type: 'Markdown',
        content: `### ${input.output.title || 'Summary'}\n\n${input.output.summary}`,
      } as IAutoView.IAutoViewMarkdownProps
    : undefined;

  // Card header with icon, title and subtitle
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    startElement: iconProps,
    title: input.name,
    description: input.status.replace('_', ' '),
  };

  // Card content: include markdown summary first (if any), then the data list
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (summaryComponent) contentChildren.push(summaryComponent);
  contentChildren.push(dataList);

  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: contentChildren,
  };

  // Wrap header & content in a vertical card for responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [header, content],
  };

  return card;
}
