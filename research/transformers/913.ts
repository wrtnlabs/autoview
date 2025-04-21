import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export type team_discussion_comment = {
        author: Schema.nullable_simple_user;
        /**
         * The main text of the comment.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        discussion_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion comment.
        */
        number: number & tags.Type<"int32">;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        reactions?: Schema.reaction_rollup;
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
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.team_discussion_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: map reaction keys to FontAwesome icon IDs
  const reactionIconMap: Record<string, string> = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "laugh",
    confused: "question-circle",  // approximate
    heart: "heart",
    hooray: "tada",
    eyes: "eye",
    rocket: "rocket",
  };

  // Build author avatar; handle null author gracefully
  const avatarProps: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: input.author?.avatar_url,
    name: input.author?.name ?? input.author?.login ?? "Unknown",
    variant: "gray",
    size: 32,
  };

  // Format creation timestamp for display
  const createdAt = new Date(input.created_at).toLocaleString();

  // Card header with avatar, author login, and timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.author?.login ?? "Unknown",
    description: createdAt,
    startElement: avatarProps,
  };

  // Main content: render the comment body as markdown
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: input.body,
    },
  };

  // Build reaction chips if any reaction has a positive count
  const reactionChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.reactions) {
    for (const key of Object.keys(input.reactions) as Array<keyof typeof input.reactions>) {
      const count = input.reactions[key] as number;
      // Skip URL and total_count fields
      if (key === "url" || key === "total_count") continue;
      if (count > 0) {
        const iconId = reactionIconMap[key] ?? "question-circle";
        reactionChips.push({
          type: "Chip",
          label: String(count),
          variant: "outlined",
          color: "gray",
          size: "small",
          startElement: {
            type: "Icon",
            id: iconId,
            size: 16,
            color: "gray",
          },
        });
      }
    }
  }

  // Optional "View on GitHub" button if HTML URL is present
  const viewButton: IAutoView.IAutoViewButtonProps | null = input.html_url
    ? {
        type: "Button",
        variant: "outlined",
        color: "primary",
        size: "small",
        label: "View on GitHub",
        startElement: {
          type: "Icon",
          id: "github",
          size: 16,
        },
        href: input.html_url,
      }
    : null;

  // Assemble footer: include reaction chip group and view button if any
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (reactionChips.length > 0) {
    footerChildren.push({
      type: "ChipGroup",
      childrenProps: reactionChips,
      maxItems: reactionChips.length, // show all
    });
  }
  if (viewButton) {
    footerChildren.push(viewButton);
  }

  const footer: IAutoView.IAutoViewCardFooterProps | null =
    footerChildren.length > 0
      ? {
          type: "CardFooter",
          childrenProps: footerChildren,
        }
      : null;

  // Final vertical card composition
  const cardChildren: (IAutoView.IAutoViewCardHeaderProps | IAutoView.IAutoViewCardContentProps | IAutoView.IAutoViewCardFooterProps)[] = [
    header,
    content,
  ];
  if (footer) {
    cardChildren.push(footer);
  }

  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
