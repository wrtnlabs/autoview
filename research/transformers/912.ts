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
  // Safely extract author information, falling back to placeholders when necessary.
  const author = input.author;
  const authorName = author?.login ?? "Unknown";

  // Format the creation date for display; if invalid, fall back to the raw string.
  const createdAt = (() => {
    try {
      return new Date(input.created_at).toLocaleString();
    } catch {
      return input.created_at;
    }
  })();

  // Build a list of reaction chips using FontAwesome icon names.
  // Only include reactions with a count greater than zero.
  const reactionChips: IAutoView.IAutoViewChipProps[] = [];
  if (input.reactions) {
    const iconMap: Record<string, string> = {
      "+1": "thumbs-up",
      "-1": "thumbs-down",
      laugh: "laugh",
      confused: "frown",
      heart: "heart",
      hooray: "tada",
      eyes: "eye",
      rocket: "rocket",
    };
    // Iterate through known reaction keys
    (Object.keys(iconMap) as Array<keyof typeof iconMap>).forEach((key) => {
      const count = (input.reactions as any)[key] as number;
      if (count > 0) {
        reactionChips.push({
          type: "Chip",
          label: String(count),
          startElement: {
            type: "Icon",
            id: iconMap[key],
            size: 16,
          },
        });
      }
    });
  }

  // Compose the card's header, content, and optional footer
  const cardChildren: Array<
    IAutoView.IAutoViewCardHeaderProps |
    IAutoView.IAutoViewCardContentProps |
    IAutoView.IAutoViewCardFooterProps
  > = [
    {
      type: "CardHeader",
      title: authorName,
      description: createdAt,
      // Show the author's avatar when available
      startElement: {
        type: "Avatar",
        src: author?.avatar_url,
        name: authorName,
      },
    },
    {
      type: "CardContent",
      // Render the comment body as markdown for richer formatting
      childrenProps: {
        type: "Markdown",
        content: input.body,
      },
    },
  ];

  // If there are any reactions, append a footer containing a chip group
  if (reactionChips.length > 0) {
    cardChildren.push({
      type: "CardFooter",
      childrenProps: {
        type: "ChipGroup",
        childrenProps: reactionChips,
      },
    });
  }

  // Return the assembled vertical card
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}
