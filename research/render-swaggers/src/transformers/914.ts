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
  // Map of reaction content to FontAwesome icon IDs
  const iconMap: Record<string, string> = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "laugh",
    confused: "confused",
    heart: "heart",
    hooray: "hands-clapping",
    rocket: "rocket",
    eyes: "eyes",
  };

  // Map of reaction content to icon colors
  const colorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
    "+1": "green",
    "-1": "red",
    laugh: "yellow",
    confused: "orange",
    heart: "red",
    hooray: "violet",
    rocket: "cyan",
    eyes: "gray",
  };

  // Sort reactions by creation time descending (most recent first)
  const sorted = [...input].sort((a, b) => {
    const ta = new Date(a.created_at).getTime();
    const tb = new Date(b.created_at).getTime();
    return tb - ta;
  });

  // Transform each reaction into a DataListItemProps
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = sorted.map((reaction) => {
    const user = reaction.user;
    // Prepare avatar properties; if user is null, fall back to placeholder initials
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user?.avatar_url ?? undefined,
      name: user?.login ?? "Unknown",
      variant: "gray",
      size: 32,
    };

    // Reaction icon properties
    const contentKey = reaction.content;
    const iconId = iconMap[contentKey] ?? "question";
    const iconColor = colorMap[contentKey] ?? "gray";
    const reactionIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: iconId,
      color: iconColor,
      size: 20,
    };

    // Format timestamp for display
    const date = new Date(reaction.created_at);
    const timestamp = isNaN(date.getTime())
      ? "Invalid date"
      : date.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

    const timeText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: timestamp,
      variant: "caption",
      color: "#666666",
    };

    // Compose DataListItemProps with label (avatar + username) and value (icon + timestamp)
    return {
      type: "DataListItem",
      label: [avatar, {
        type: "Text",
        content: user?.login ?? "Unknown",
        variant: "body1",
        color: "primary",
      }],
      value: [reactionIcon, timeText],
    };
  });

  // Wrap all items in a DataList for responsive, accessible display
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps,
  };

  return dataList;
}
