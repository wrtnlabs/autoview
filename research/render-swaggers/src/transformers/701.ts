import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
     *
     * @title Reaction
    */
    export type reaction = {
        id: number & tags.Type<"int32">;
        node_id: string;
        user: Schema.nullable_simple_user;
        /**
         * The reaction to use
        */
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        created_at: string & tags.Format<"date-time">;
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
}
type IAutoViewTransformerInputType = Schema.reaction[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no reactions, show a simple text message
  if (!input || input.length === 0) {
    return {
      type: "Text",
      content: "No reactions yet",
      variant: "body1",
      color: "gray",
    };
  }

  // Map GitHub reaction content to FontAwesome icon name and a color
  const iconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    "+1": { id: "thumbs-up", color: "green" },
    "-1": { id: "thumbs-down", color: "red" },
    laugh: { id: "laugh-beam", color: "yellow" },
    confused: { id: "confused", color: "orange" },
    heart: { id: "heart", color: "red" },
    hooray: { id: "tada", color: "blue" },
    rocket: { id: "rocket", color: "violet" },
    eyes: { id: "eye", color: "gray" },
  };

  // Sort reactions by creation date descending
  const sorted = [...input].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  // Build a list item for each reaction
  const items: IAutoView.IAutoViewListItemProps[] = sorted.map((reaction) => {
    const user = reaction.user;
    // Fallback values if user is null
    const login = user?.login ?? "Unknown";
    const avatarUrl = user?.avatar_url ?? "";
    // Format creation date for display
    const dateLabel = new Date(reaction.created_at).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    // Lookup icon and color
    const iconInfo = iconMap[reaction.content] || { id: "question-circle", color: "gray" };

    // Start element: user avatar
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: avatarUrl,
      name: login,
      variant: "primary",
      size: 32,
    };

    // End elements: reaction icon and date text
    const reactionIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: iconInfo.id,
      color: iconInfo.color,
      size: 20,
    };
    const dateText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: dateLabel,
      variant: "caption",
      color: "tertiary",
    };

    return {
      type: "ListItem",
      title: login,
      description: `Reacted with "${reaction.content}"`,
      startElement: avatar,
      endElement: [reactionIcon, dateText],
    };
  });

  // Compose the final list component
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: items,
  };

  return list;
}
