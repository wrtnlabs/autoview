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
  // Map reaction content to FontAwesome icon IDs and display colors
  const iconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps['color'] }> = {
    '+1':    { id: 'thumbs-up',    color: 'green' },
    '-1':    { id: 'thumbs-down',  color: 'red'   },
    laugh:   { id: 'laugh',        color: 'yellow' },
    confused:{ id: 'confused',     color: 'orange' },
    heart:   { id: 'heart',        color: 'red'   },
    hooray:  { id: 'hands-clapping', color: 'teal' },
    rocket:  { id: 'rocket',       color: 'cyan'  },
    eyes:    { id: 'eyes',         color: 'blue'  },
  };

  // Map reaction content to emoji for markdown fallback
  const emojiMap: Record<string, string> = {
    '+1': '👍',
    '-1': '👎',
    laugh: '😆',
    confused: '😕',
    heart: '❤️',
    hooray: '🎉',
    rocket: '🚀',
    eyes: '👀',
  };

  // Safely extract user info, falling back if null
  const user = input.user;
  const userLogin = user?.login ?? 'Unknown';
  const avatarSrc = user?.avatar_url;
  const avatarName = user?.name ?? user?.login ?? 'Unknown';

  // Format creation timestamp to a human-readable string
  const formattedDate = (() => {
    try {
      return new Date(input.created_at).toLocaleString();
    } catch {
      return input.created_at;
    }
  })();

  // Determine the icon props for the reaction
  const reactionIcon = iconMap[input.content] || { id: input.content, color: 'gray' };

  return {
    // Using a VerticalCard to stack header and content
    type: 'VerticalCard',
    childrenProps: [
      {
        // Card header: shows user avatar, name, timestamp and reaction icon
        type: 'CardHeader',
        title: userLogin,
        description: formattedDate,
        // Display avatar if available
        ...(avatarSrc
          ? {
              startElement: {
                type: 'Avatar',
                src: avatarSrc,
                name: avatarName,
                variant: 'primary',
                size: 32,
              } as IAutoView.IAutoViewAvatarProps,
            }
          : {}),
        // Display reaction icon in the header
        endElement: {
          type: 'Icon',
          id: reactionIcon.id,
          color: reactionIcon.color,
          size: 24,
        } as IAutoView.IAutoViewIconProps,
      } as IAutoView.IAutoViewCardHeaderProps,

      {
        // Card content: use markdown to make the reaction text more engaging
        type: 'CardContent',
        childrenProps: [
          {
            type: 'Markdown',
            content: `
**${emojiMap[input.content] || ''} Reacted with \`${input.content}\`**

*This reaction was created at ${formattedDate}.*
            `.trim(),
          } as IAutoView.IAutoViewMarkdownProps,
        ],
      } as IAutoView.IAutoViewCardContentProps,
    ],
  } as IAutoView.IAutoViewVerticalCardProps;
}
