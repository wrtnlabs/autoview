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
type IAutoViewTransformerInputType = Schema.reaction;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Map each GitHub reaction content to a FontAwesome icon name and a color
   * The color must match one of the allowed values in IAutoView.IAutoViewIconProps.color
   */
  const reactionMap: Record<IAutoViewTransformerInputType["content"], { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    "+1":    { id: "thumbs-up",   color: "green"   },
    "-1":    { id: "thumbs-down", color: "red"     },
    laugh:   { id: "laugh",       color: "yellow"  },
    confused:{ id: "confused",    color: "gray"    },
    heart:   { id: "heart",       color: "red"     },
    hooray:  { id: "grin-beam",   color: "blue"    },
    rocket:  { id: "rocket",      color: "cyan"    },
    eyes:    { id: "eyes",        color: "gray"    },
  };

  const { id: iconId, color: iconColor } = reactionMap[input.content];

  // Format the ISO timestamp to a more user-friendly locale string.
  // If parsing fails, fall back to the raw string.
  let formattedTime = input.created_at;
  const dt = new Date(input.created_at);
  if (!isNaN(dt.getTime())) {
    formattedTime = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`;
  }

  // Build an Avatar component for the reacting user, if available.
  // If the user is a site admin, highlight the avatar with a 'warning' variant.
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: input.user?.avatar_url,
    name: input.user?.login,
    size: 32,
    variant: input.user?.site_admin ? "warning" : undefined,
  };

  // Build an Icon component to display the reaction.
  const reactionIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: iconId,
    color: iconColor,
    size: 24,
  };

  // Assemble a ListItem showing avatar + user login on the left,
  // timestamp below, and the reaction icon on the right.
  const listItem: IAutoView.IAutoViewListItemProps = {
    type: "ListItem",
    title: input.user?.login ?? "Unknown User",
    description: formattedTime,
    startElement: avatar,
    endElement: reactionIcon,
    // If the user's profile URL is available, make the entire item a link.
    href: input.user?.html_url,
  };

  // Wrap the single item into a responsive List container.
  // Even for a single reaction, using a List keeps the UI consistent
  // and makes it easy to extend to multiple reactions in the future.
  const list: IAutoView.IAutoViewListProps = {
    type: "List",
    childrenProps: listItem,
  };

  return list;
}
