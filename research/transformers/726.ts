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
type IAutoViewTransformerInputType = Schema.deployment_status[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map deployment state to an icon name and color for visual emphasis
  const stateIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    success: { id: "check-circle", color: "green" },
    error: { id: "times-circle", color: "red" },
    failure: { id: "times-circle", color: "orange" },
    pending: { id: "hourglass-half", color: "yellow" },
    in_progress: { id: "spinner", color: "cyan" },
    queued: { id: "clock", color: "blue" },
    inactive: { id: "ban", color: "gray" },
  };

  // Helper to format ISO date strings into a more user‐friendly format
  function formatDate(iso: string): string {
    // Use browser locale for responsiveness on different devices
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Build each DataListItemProps from a deployment_status record
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((status) => {
    const creator = status.creator;
    // Prepare avatar if creator info exists
    const avatarComponent: IAutoView.IAutoViewAvatarProps | undefined =
      creator && creator.avatar_url
        ? {
            type: "Avatar",
            src: creator.avatar_url,
            name: creator.login,
            variant: "primary",
            size: 28,
          }
        : undefined;

    // Choose icon for the state
    const stateMeta = stateIconMap[status.state] || {
      id: "question-circle",
      color: "gray",
    };

    // Compose the label: avatar + user login + description
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (avatarComponent) {
      labelComponents.push(avatarComponent);
    }
    labelComponents.push({
      type: "Text",
      variant: "body1",
      content: [
        // Show login and short description if available
        creator ? creator.login : "Unknown",
        status.description ? ` - ${status.description}` : "",
      ].join(""),
    });

    // Compose the value: state icon + state name + created date
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: stateMeta.id,
        color: stateMeta.color,
        size: 20,
      },
      {
        type: "Text",
        variant: "body2",
        content: ` ${status.state.replace("_", " ")} `,
      },
      {
        type: "Text",
        variant: "caption",
        color: "#888",
        content: formatDate(status.created_at),
      },
    ];

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Wrap all items in a responsive DataList component
  return {
    type: "DataList",
    childrenProps: items,
  };
}
