import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A request for a specific ref(branch,sha,tag) to be deployed
     *
     * @title Deployment
    */
    export type deployment = {
        url: string & tags.Format<"uri">;
        /**
         * Unique identifier of the deployment
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        sha: string;
        /**
         * The ref to deploy. This can be a branch, tag, or sha.
        */
        ref: string;
        /**
         * Parameter to specify a task to execute
        */
        task: string;
        payload: {} | string;
        original_environment?: string;
        /**
         * Name for the target deployment environment.
        */
        environment: string;
        description: string | null;
        creator: Schema.nullable_simple_user;
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
type IAutoViewTransformerInputType = Schema.deployment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no deployment data, show a simple message
  if (!input || input.length === 0) {
    return {
      type: "Text",
      content: "No deployment data available",
      variant: "body1",
    };
  }

  // Transform each deployment into a ListItem
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(deployment => {
    // Build an avatar for the creator if present
    const avatar = deployment.creator
      ? ({
          type: "Avatar",
          src: deployment.creator.avatar_url,
          name: deployment.creator.login,
          variant: "blue",
          size: 40,
        } as IAutoView.IAutoViewAvatarProps)
      : undefined;

    // Create “chips” to flag production/transient environments
    const chips: IAutoView.IAutoViewChipProps[] = [];
    if (deployment.production_environment) {
      chips.push({
        type: "Chip",
        label: "Production",
        color: "success",
        size: "small",
        variant: "filled",
      });
    }
    if (deployment.transient_environment) {
      chips.push({
        type: "Chip",
        label: "Transient",
        color: "warning",
        size: "small",
        variant: "outlined",
      });
    }

    // A button to navigate to the deployment statuses URL
    const statusButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "View Statuses",
      size: "small",
      variant: "text",
      href: deployment.statuses_url,
    };

    return {
      type: "ListItem",
      title: deployment.environment,
      // Show ref and abbreviated SHA in the description
      description: `Ref: ${deployment.ref} (${deployment.sha.slice(0, 7)})`,
      startElement: avatar,
      // Render chips and the statuses button at the end
      endElement: [...chips, statusButton],
    };
  });

  // Wrap all ListItems in a responsive List
  return {
    type: "List",
    childrenProps: listItems,
  };
}
