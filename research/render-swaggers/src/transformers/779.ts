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
  // Map each reaction content string to an appropriate FontAwesome icon name and color
  const reactionIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps['color'] }> = {
    '+1':     { id: 'thumbs-up',      color: 'green'  },
    '-1':     { id: 'thumbs-down',    color: 'red'    },
    'laugh':  { id: 'laugh',          color: 'yellow' },
    'confused': { id: 'meh',          color: 'orange' },
    'heart':  { id: 'heart',          color: 'red'    },
    'hooray': { id: 'hands-clapping', color: 'violet' },
    'rocket': { id: 'rocket',         color: 'gray'   },
    'eyes':   { id: 'eye',            color: 'teal'   },
  };

  // Fallback if we encounter an unknown content value
  const { id: reactionIconId, color: reactionIconColor } =
    reactionIconMap[input.content] ?? { id: input.content, color: 'gray' };

  // Format the ISO timestamp into a human-friendly local string.
  // If parsing fails, just show the raw input.
  const formattedDate = (() => {
    try {
      return new Date(input.created_at).toLocaleString();
    } catch {
      return input.created_at;
    }
  })();

  // Choose an avatar if user data is present, otherwise use a generic user icon.
  const headerAvatarOrIcon: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps =
    input.user && input.user.avatar_url
      ? {
          type: 'Avatar',
          src: input.user.avatar_url,
          name: input.user.login,
          // size and variant are optional; let the UI theme decide defaults
        }
      : {
          type: 'Icon',
          id: 'user',
          color: 'gray',
          size: 24,
        };

  // Build the content of the card with a mix of avatar/icon, text, and the reaction icon.
  const cardContentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    // Show the avatar or fallback icon
    headerAvatarOrIcon,

    // User login or a placeholder when missing
    {
      type: 'Text',
      variant: 'h6',
      content: input.user?.login ?? 'Unknown User',
    },

    // Timestamp of the reaction
    {
      type: 'Text',
      variant: 'caption',
      content: formattedDate,
    },

    // The reaction icon itself
    {
      type: 'Icon',
      id: reactionIconId,
      color: reactionIconColor,
      size: 24,
    },
  ];

  // Compose the final layout as a horizontal card: avatar on the left, details on the right
  return {
    type: 'HorizontalCard',
    childrenProps: [
      // Media section: show the user's avatar if available
      {
        type: 'CardMedia',
        src: input.user?.avatar_url,
      },
      // Content section: all reaction details
      {
        type: 'CardContent',
        childrenProps: cardContentChildren,
      },
    ],
  };
}
