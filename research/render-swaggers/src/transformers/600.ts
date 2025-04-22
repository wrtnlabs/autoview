import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An entry in the reviews log for environment deployments
     *
     * @title Environment Approval
    */
    export type environment_approvals = {
        /**
         * The list of environments that were approved or rejected
        */
        environments: {
            /**
             * The id of the environment.
            */
            id?: number & tags.Type<"int32">;
            node_id?: string;
            /**
             * The name of the environment.
            */
            name?: string;
            url?: string;
            html_url?: string;
            /**
             * The time that the environment was created, in ISO 8601 format.
            */
            created_at?: string;
            /**
             * The time that the environment was last updated, in ISO 8601 format.
            */
            updated_at?: string;
        }[];
        /**
         * Whether deployment to the environment(s) was approved or rejected or pending (with comments)
        */
        state: "approved" | "rejected" | "pending";
        user: Schema.simple_user;
        /**
         * The comment submitted with the deployment review
        */
        comment: string;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
}
type IAutoViewTransformerInputType = Schema.environment_approvals[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to pick an icon and color based on approval state
  function getStateVisuals(
    state: "approved" | "rejected" | "pending"
  ): { icon: string; color: IAutoView.IAutoViewIconProps["color"] } {
    switch (state) {
      case "approved":
        return { icon: "check-circle", color: "green" };
      case "rejected":
        return { icon: "times-circle", color: "red" };
      case "pending":
      default:
        return { icon: "hourglass", color: "orange" };
    }
  }

  // If there's no data, show a friendly placeholder
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No environment approval records to display."
    };
  }

  // Map each approval record to a VerticalCard
  const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((record) => {
    const { icon, color } = getStateVisuals(record.state);

    // Build chips for each environment entry
    const envChips: IAutoView.IAutoViewChipProps[] =
      Array.isArray(record.environments) && record.environments.length > 0
        ? record.environments.map((env) => ({
            type: "Chip",
            label: env.name ?? env.url ?? "Unknown",
            variant: "outlined",
            size: "small"
          }))
        : [
            {
              type: "Chip",
              label: "No environments",
              variant: "outlined",
              size: "small"
            }
          ];

    // CardHeader: user info + state icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: record.user.login,
      // Show avatar if available
      startElement: {
        type: "Avatar",
        src: record.user.avatar_url,
        name: record.user.login,
        variant: "gray",
        size: 32
      },
      endElement: {
        type: "Icon",
        id: icon,
        color: color,
        size: 24
      },
      description: record.state.charAt(0).toUpperCase() + record.state.slice(1)
    };

    // CardContent: list of environment chips
    const envSection: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: envChips
    };

    // CardContent: comment rendered as markdown
    const commentSection: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: {
        type: "Markdown",
        content:
          record.comment && record.comment.trim().length > 0
            ? `**Comment**:\n\n${record.comment}`
            : "*No comment provided.*"
      }
    };

    return {
      type: "VerticalCard",
      childrenProps: [header, envSection, commentSection]
    };
  });

  // Wrap all cards in a Carousel for horizontal scrolling on mobile & desktop
  const carousel: IAutoView.IAutoViewCarouselProps = {
    type: "Carousel",
    autoPlay: false,
    infinite: false,
    gutter: 16,
    navControls: true,
    indicators: false,
    childrenProps: cards
  };

  return carousel;
}
