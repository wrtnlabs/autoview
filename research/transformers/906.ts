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
type IAutoViewTransformerInputType = Schema.team_discussion[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format ISO date to localized date string
  const formatDate = (iso: string): string => {
    const dt = new Date(iso);
    // e.g. "Mar 10, 2023"
    return dt.toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric"
    });
  };

  // Map each discussion to a ListItem component
  const items: IAutoView.IAutoViewListItemProps[] = input.map(discussion => {
    // Author avatar, fallback to login if name missing
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: discussion.author?.avatar_url,
      name: discussion.author?.name ?? discussion.author?.login ?? "Unknown",
      size: 40,
      variant: "gray"
    };

    // Comments badge with icon inside
    const commentBadge: IAutoView.IAutoViewBadgeProps = {
      type: "Badge",
      count: discussion.comments_count,
      maxCount: 99,
      showZero: false,
      color: "blue",
      childrenProps: {
        type: "Icon",
        id: "comment",
        size: 16,
        color: "blue"
      }
    };

    // Reactions chip showing total reactions
    const reactionsCount = discussion.reactions?.total_count ?? 0;
    const reactionsChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: reactionsCount.toString(),
      variant: "outlined",
      size: "small",
      color: reactionsCount > 0 ? "red" : "gray",
      startElement: {
        type: "Icon",
        id: "heart",
        size: 16,
        color: reactionsCount > 0 ? "red" : "gray"
      }
    };

    // Build ListItemProps
    const listItem: IAutoView.IAutoViewListItemProps = {
      type: "ListItem",
      title: discussion.title,
      description: `#${discussion.number} • Updated ${formatDate(discussion.updated_at)}`,
      startElement: avatar,
      endElement: [commentBadge, reactionsChip]
    };

    return listItem;
  });

  // Compose into a responsive List component
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    // on mobile this list stacks vertically; each item is tappable
    childrenProps: items
  };

  return list;
}
