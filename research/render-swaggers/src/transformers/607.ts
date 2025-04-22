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



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // If there are no deployments, inform the user
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No deployments available**",
    };
  }

  // Map each deployment into a vertical card
  const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map(
    (dep) => {
      // Build the header with avatar or fallback icon, title, description, and environment chip
      const creatorElem:
        | IAutoView.IAutoViewAvatarProps
        | IAutoView.IAutoViewIconProps = dep.creator &&
        dep.creator.avatar_url
        ? {
            type: "Avatar",
            src: dep.creator.avatar_url,
            name: dep.creator.login,
            variant: "blue",
            size: 40,
          }
        : {
            // Fallback to a generic user icon if no avatar URL
            type: "Icon",
            id: "user",
            color: "gray",
            size: 32,
          };

      const envChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: dep.environment,
        variant: "filled",
        // Color-code for production/transient environments
        color: dep.production_environment
          ? "green"
          : dep.transient_environment
          ? "orange"
          : "blue",
        size: "small",
      };

      const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: dep.ref,
        description: `#${dep.id}`,
        startElement: creatorElem,
        endElement: envChip,
      };

      // Content: show creation date and a markdown link to statuses
      const createdAt = new Date(dep.created_at).toLocaleString();
      const dateText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: `Created: ${createdAt}`,
        variant: "caption",
        color: "gray",
      };
      const statusesLink: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: `[View statuses](${dep.statuses_url})`,
      };

      const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [dateText, statusesLink],
      };

      // Footer: buttons to repository and statuses
      const repoButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "Repository",
        variant: "contained",
        color: "primary",
        size: "small",
        href: dep.repository_url,
      };
      const statusesButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "Statuses",
        variant: "outlined",
        color: "secondary",
        size: "small",
        href: dep.statuses_url,
      };

      const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: [repoButton, statusesButton],
      };

      return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
      };
    }
  );

  // Wrap all deployment cards in a responsive carousel
  const carousel: IAutoView.IAutoViewCarouselProps = {
    type: "Carousel",
    infinite: true,
    navControls: true,
    indicators: true,
    // A small gutter between cards for better readability on mobile
    gutter: 16,
    childrenProps: cards,
  };

  return carousel;
}
