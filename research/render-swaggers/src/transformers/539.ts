import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export type team_discussion = {
        author: Schema.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
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
type IAutoViewTransformerInputType = Schema.team_discussion;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Format creation date for display
  const formattedDate = new Date(input.created_at).toLocaleString();

  // Build the CardHeader: show title, author and date, and pinned flag if any
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    // If author exists, show login and date, else just date
    description: `${
      input.author?.login ?? "Unknown author"
    } · ${formattedDate}`,
    // Show avatar if author available
    startElement: input.author
      ? {
          type: "Avatar",
          src: input.author.avatar_url,
          name: input.author.name ?? input.author.login,
        }
      : undefined,
    // If discussion is pinned, show a chip
    endElement: input.pinned
      ? {
          type: "Chip",
          label: "Pinned",
          startElement: { type: "Icon", id: "thumbtack" },
          color: "warning",
          variant: "filled",
        }
      : undefined,
  };

  // Build the CardContent: render body text as markdown for better readability
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "Markdown",
        content: input.body,
      },
    ],
  };

  // Build a badge for the number of comments
  const commentsBadge: IAutoView.IAutoViewBadgeProps = {
    type: "Badge",
    count: input.comments_count,
    // Use comment icon
    childrenProps: { type: "Icon", id: "comment" },
    // Show zero if count is zero
    showZero: true,
    maxCount: 999,
  };

  // Build reaction chips if any
  const reactionChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.reactions) {
    // Map each reaction field to an icon id
    const reactionMap: Record<keyof Schema.reaction_rollup, string> = {
      url: "link",
      total_count: "hashtag",
      "+1": "thumbs-up",
      "-1": "thumbs-down",
      laugh: "laugh",
      confused: "confused",
      heart: "heart",
      hooray: "hands-clapping",
      eyes: "eye",
      rocket: "rocket",
    };
    // Only include numeric reactions (skip url and total_count)
    for (const key of Object.keys(input.reactions) as (keyof Schema.reaction_rollup)[]) {
      if (key === "url" || key === "total_count") continue;
      const count = input.reactions[key] as number;
      if (count > 0) {
        reactionChips.push({
          type: "Chip",
          label: String(count),
          startElement: { type: "Icon", id: reactionMap[key] },
          variant: "outlined",
          size: "small",
        });
      }
    }
  }

  // Build the CardFooter: include the comments badge and reactions if any
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    commentsBadge,
  ];
  if (reactionChips.length > 0) {
    footerChildren.push({
      type: "ChipGroup",
      childrenProps: reactionChips,
    });
  }
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Compose the vertical card with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
