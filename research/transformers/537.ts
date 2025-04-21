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



// Transforms a GitHub team discussion into a responsive, icon-rich VerticalCard layout.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format ISO timestamp to a locale-sensitive string
  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  // Build a human-readable description string, including number, dates, and flags
  const descriptionParts: string[] = [];

  // Discussion number
  descriptionParts.push(`#${input.number}`);

  // Creation timestamp
  descriptionParts.push(`created ${formatDate(input.created_at)}`);

  // Last updated timestamp (if changed)
  if (input.updated_at && input.updated_at !== input.created_at) {
    descriptionParts.push(`updated ${formatDate(input.updated_at)}`);
  }

  // Pinned and private indicators
  if (input.pinned) {
    descriptionParts.push("📌 Pinned");
  }
  if (input.private) {
    descriptionParts.push("🔒 Private");
  }

  const headerDescription = descriptionParts.join(" · ");

  // Build footer metrics: comments count and +1 reactions
  const commentCount = input.comments_count;
  const upvotes = input.reactions?.["+1"] ?? 0;

  // Compose the VerticalCard with header, markdown content, and footer with icons
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header: title, author avatar, and meta description
      {
        type: "CardHeader",
        title: input.title,
        description: headerDescription,
        // Only show avatar if we have an author
        ...(input.author && {
          startElement: {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
          } as IAutoView.IAutoViewAvatarProps,
        }),
      },
      // Content: render the body as Markdown for rich formatting
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "Markdown",
            content: input.body,
          } as IAutoView.IAutoViewMarkdownProps,
        ],
      },
      // Footer: icon + count for comments and upvotes
      {
        type: "CardFooter",
        childrenProps: [
          // Comments icon and count
          {
            type: "Icon",
            id: "comments",
            color: "gray",
            size: 16,
          } as IAutoView.IAutoViewIconProps,
          {
            type: "Text",
            content: String(commentCount),
            variant: "body2",
          } as IAutoView.IAutoViewTextProps,
          // Upvote icon and count
          {
            type: "Icon",
            id: "thumbs-up",
            color: "gray",
            size: 16,
          } as IAutoView.IAutoViewIconProps,
          {
            type: "Text",
            content: String(upvotes),
            variant: "body2",
          } as IAutoView.IAutoViewTextProps,
        ],
      },
    ],
  } as IAutoView.IAutoViewVerticalCardProps;
}
