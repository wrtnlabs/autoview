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
  // Helper: Map reaction content to a color theme for chips
  const reactionColorMap: Record<Schema.reaction["content"], IAutoView.IAutoViewChipProps["color"]> = {
    "+1": "success",
    "-1": "error",
    laugh: "yellow",
    confused: "orange",
    heart: "red",
    hooray: "green",
    rocket: "teal",
    eyes: "blue",
  };

  // Helper: Format ISO date-time into a user-friendly string
  function formatDateTime(iso: string): string {
    const date = new Date(iso);
    // Fallback for invalid dates
    if (isNaN(date.getTime())) return iso;
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  // If there are no reactions, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No reactions found\n\nBe the first to react to this conversation!",
    };
  }

  // Sort reactions by creation time descending (most recent first)
  const sorted = [...input].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Transform each reaction into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = sorted.map(
    (reaction) => {
      // Destructure user, may be null
      const user = reaction.user;
      const login = user?.login ?? "Unknown";
      const avatarSrc = user?.avatar_url;
      const avatarName = user?.name ?? login;

      // Build avatar component
      const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        name: avatarName,
        ...(avatarSrc ? { src: avatarSrc } : {}),
        // small avatar to save horizontal space
        size: 32,
      };

      // Username text next to avatar
      const userNameText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        variant: "body1",
        content: login,
      };

      // Reaction chip showing the content
      const reactionChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: reaction.content,
        variant: "filled",
        size: "small",
        color: reactionColorMap[reaction.content] ?? "gray",
      };

      // Timestamp text
      const timestampText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        variant: "caption",
        color: "gray",
        content: formatDateTime(reaction.created_at),
      };

      // Compose the DataListItem: label shows user info; value shows reaction and timestamp
      return {
        type: "DataListItem",
        label: [
          avatar,
          {
            // A tiny divider for spacing; could be a zero-width Divider for layout
            type: "Divider",
            orientation: "vertical",
            color: "transparent",
          },
          userNameText,
        ],
        value: [
          reactionChip,
          {
            type: "Divider",
            orientation: "vertical",
            color: "transparent",
          },
          timestampText,
        ],
      };
    }
  );

  // Finally, wrap all items in a DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  return dataList;
}
