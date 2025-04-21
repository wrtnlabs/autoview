import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposCommitsCheckRuns {
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
type IAutoViewTransformerInputType = Schema.IApiReposCommitsCheckRuns.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map GitHub check run conclusions or statuses to chip colors
  const conclusionColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    success: 'green',
    failure: 'red',
    neutral: 'gray',
    cancelled: 'orange',
    skipped: 'gray',
    timed_out: 'warning',
    action_required: 'error',
  };

  // Build a DataListItem for each check run
  const items: IAutoView.IAutoViewDataListItemProps[] = input.check_runs.map((run) => {
    // Format start/completion times; fall back to 'N/A' if missing
    const started = run.started_at ? new Date(run.started_at).toLocaleString() : 'N/A';
    const completed = run.completed_at ? new Date(run.completed_at).toLocaleString() : 'N/A';
    const timeRange = `${started} – ${completed}`;

    // Decide which label to show: conclusion if available, otherwise status
    const outcome = run.conclusion ?? run.status;
    const chipColor = conclusionColorMap[outcome] ?? 'gray';

    // Label consists of the run name and a caption with the time range
    const labelComponents: IAutoView.IAutoViewTextProps[] = [
      {
        type: 'Text',
        content: run.name,
        variant: 'body1',
      },
      {
        type: 'Text',
        content: timeRange,
        variant: 'caption',
        color: 'tertiary',
      },
    ];

    // A colored chip indicating pass/fail/other outcome
    const outcomeChip: IAutoView.IAutoViewChipProps = {
      type: 'Chip',
      label: outcome,
      color: chipColor,
      size: 'small',
      variant: 'filled',
    };

    return {
      type: 'DataListItem',
      label: labelComponents,
      value: outcomeChip,
    };
  });

  // Compose the overall UI as a vertical card: header + content
  return {
    type: 'VerticalCard',
    childrenProps: [
      // Card header with title, total count, and an icon
      {
        type: 'CardHeader',
        title: 'Check Runs',
        description: `${input.total_count} total`,
        startElement: {
          type: 'Icon',
          id: 'tasks',
          color: 'blue',
          size: 24,
        },
      },
      // Card content containing the data list of runs
      {
        type: 'CardContent',
        childrenProps: {
          type: 'DataList',
          childrenProps: items,
        },
      },
    ],
  };
}
