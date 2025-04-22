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
type IAutoViewTransformerInputType = Schema.team_discussion_comment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Sort comments by newest first to show recent activity at the top
  const sortedComments = [...input].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Map each comment to a DataListItem with rich visual components
  const items: IAutoView.IAutoViewDataListItemProps[] = sortedComments.map((comment) => {
    // Fallback values if author is missing
    const author = comment.author;
    const authorName = author?.login || author?.name || "Unknown";
    const avatarSrc = author?.avatar_url;

    // Avatar with user's picture or initials
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: avatarSrc,
      name: authorName,
      size: 40,
    };

    // Author name and timestamp
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: authorName,
      variant: "subtitle1",
      color: "primary",
    };
    const dateText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: new Date(comment.created_at).toLocaleString(),
      variant: "caption",
      color: "secondary",
    };

    // Main body rendered as markdown for better readability
    const bodyMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: comment.body,
    };

    // Reaction rollup: map GitHub reaction counts to icon chips
    const reactions = comment.reactions;
    const reactionMap: Array<[keyof Schema.reaction_rollup, string]> = [
      ["+1", "thumbs-up"],
      ["-1", "thumbs-down"],
      ["laugh", "laugh"],
      ["confused", "question"],
      ["heart", "heart"],
      ["hooray", "trophy"],
      ["eyes", "eye"],
      ["rocket", "rocket"],
    ];
    const reactionChips: IAutoView.IAutoViewChipProps[] = [];
    if (reactions) {
      for (const [key, iconId] of reactionMap) {
        const count = reactions[key] as number;
        if (count > 0) {
          reactionChips.push({
            type: "Chip",
            label: String(count),
            variant: "outlined",
            size: "small",
            // Display an icon before the count
            startElement: {
              type: "Icon",
              id: iconId,
              size: 12,
              color: "gray",
            },
          });
        }
      }
    }

    // Group all reaction chips into a horizontal list
    const reactionGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: reactionChips,
    };

    return {
      type: "DataListItem",
      // Left side: avatar, name, and date
      label: [avatar, nameText, dateText],
      // Right side: comment body and reactions
      value: [bodyMarkdown, reactionGroup],
    };
  });

  // Return a DataList containing all comment items
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
