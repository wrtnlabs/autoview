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
  // Mapping of GitHub reaction names to FontAwesome icon IDs
  const reactionIconMap: Record<string, string> = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "laugh",
    confused: "confused",
    heart: "heart",
    hooray: "tada",
    eyes: "eyes",
    rocket: "rocket",
  };

  // Build reaction badges, only include those with a positive count
  const reactionBadges: IAutoView.IAutoViewBadgeProps[] = [];
  if (input.reactions) {
    for (const key of Object.keys(reactionIconMap)) {
      const count = (input.reactions as any)[key] as number;
      if (typeof count === "number" && count > 0) {
        reactionBadges.push({
          type: "Badge",
          count,
          // Use a simple gray icon; adjust size/color as needed
          childrenProps: {
            type: "Icon",
            id: reactionIconMap[key],
            size: 16,
            color: "gray",
          },
        });
      }
    }
  }

  // Determine the author element: avatar if available, otherwise fallback icon
  let authorElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
  if (input.author && input.author.avatar_url) {
    authorElement = {
      type: "Avatar",
      src: input.author.avatar_url,
      name: input.author.name ?? input.author.login,
      size: 40,
      variant: "primary",
    };
  } else {
    authorElement = {
      type: "Icon",
      id: "user-secret", // fallback icon
      size: 40,
      color: "gray",
    };
  }

  // Format creation date with locale string, append "(edited)" if updated
  const createdAt = new Date(input.created_at).toLocaleString();
  const description = input.last_edited_at
    ? `${createdAt} (edited)`
    : createdAt;

  // Compose CardHeader
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: authorElement,
    title: input.author?.login ?? "Unknown",
    description,
  };

  // Compose CardContent with markdown rendering of the comment body
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: input.body,
    },
  };

  // Optionally compose CardFooter if there are any reaction badges
  const footer: IAutoView.IAutoViewCardFooterProps | undefined =
    reactionBadges.length > 0
      ? {
          type: "CardFooter",
          childrenProps: reactionBadges,
        }
      : undefined;

  // Return a vertical card containing header, content, and optional footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: footer
      ? [header, content, footer]
      : [header, content],
  };

  return card;
}
