import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The status of a deployment.
     *
     * @title Deployment Status
    */
    export type deployment_status = {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The state of the status.
        */
        state: "error" | "failure" | "inactive" | "pending" | "success" | "queued" | "in_progress";
        creator: Schema.nullable_simple_user;
        /**
         * A short description of the status.
        */
        description: string & tags.Default<"">;
        /**
         * The environment of the deployment that the status is for.
        */
        environment?: string & tags.Default<"">;
        /**
         * Closing down notice: the URL to associate with this status.
        */
        target_url: string & tags.Default<"">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        deployment_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        /**
         * The URL for accessing your environment.
        */
        environment_url?: string & tags.Default<"">;
        /**
         * The URL to associate with this status.
        */
        log_url?: string & tags.Default<"">;
        performed_via_github_app?: Schema.nullable_integration;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
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
}
type IAutoViewTransformerInputType = Schema.deployment_status;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map deployment state to a friendly chip color
  const stateColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    error: 'error',
    failure: 'error',
    inactive: 'gray',
    pending: 'warning',
    queued: 'info',
    in_progress: 'blue',
    success: 'success',
  };

  // Construct a chip to represent the state
  const stateChip: IAutoView.IAutoViewChipProps = {
    type: 'Chip',
    label: input.state,
    color: stateColorMap[input.state] || 'gray',
    variant: 'filled',
    size: 'small',
  };

  // Build the list of key-value pairs to display in a DataList
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Status' },
      value: stateChip,
    },
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Created At' },
      // Format dates into a human-readable string
      value: {
        type: 'Text',
        content: new Date(input.created_at).toLocaleString(),
      },
    },
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Updated At' },
      value: {
        type: 'Text',
        content: new Date(input.updated_at).toLocaleString(),
      },
    },
  ];

  // Optionally show environment
  if (input.environment) {
    dataListItems.push({
      type: 'DataListItem',
      label: { type: 'Text', content: 'Environment' },
      value: { type: 'Text', content: input.environment },
    });
  }

  // Prepare buttons for all relevant URLs
  const urlButtons: { label: string; href: string }[] = [
    { label: 'View Deployment', href: input.deployment_url },
    { label: 'View Repository', href: input.repository_url },
  ];
  if (input.log_url) {
    urlButtons.push({ label: 'View Logs', href: input.log_url });
  }
  if (input.environment_url) {
    urlButtons.push({ label: 'Environment Link', href: input.environment_url });
  }
  if (input.target_url) {
    urlButtons.push({ label: 'Target URL', href: input.target_url });
  }

  const footerButtons: IAutoView.IAutoViewButtonProps[] = urlButtons.map((btn) => ({
    type: 'Button',
    label: btn.label,
    href: btn.href,
    size: 'small',
    variant: 'outlined',
  }));

  // Compose the card header, showing deployment id, description, and creator avatar
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: `Deployment #${input.id}`,
    description: input.description || undefined,
  };
  if (input.creator) {
    header.startElement = {
      type: 'Avatar',
      src: input.creator.avatar_url,
      name: input.creator.login,
      variant: 'info',
      size: 32,
    };
  }
  // Show environment as an end chip if available
  if (input.environment) {
    header.endElement = {
      type: 'Chip',
      label: input.environment,
      variant: 'outlined',
      size: 'small',
      color: 'primary',
    };
  }

  // Wrap our data list inside a CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'DataList',
      childrenProps: dataListItems,
    },
  };

  // Footer with action buttons
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: footerButtons,
  };

  // Final vertical card combining header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  };

  return card;
}
