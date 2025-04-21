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
    // Map reaction content to font-awesome icon IDs and colors
    const reactionIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps['color'] }> = {
        '+1':     { id: 'thumbs-up',    color: 'green'  },
        '-1':     { id: 'thumbs-down',  color: 'red'    },
        laugh:    { id: 'laugh',        color: 'yellow' },
        confused: { id: 'confused',     color: 'orange' },
        heart:    { id: 'heart',        color: 'pink'   },
        hooray:   { id: 'hands-clapping', color: 'violet' }, // approximate hooray
        rocket:   { id: 'rocket',       color: 'teal'   },
        eyes:     { id: 'eyes',         color: 'cyan'   },
    };

    // Safely extract user information, handle null user
    const user = input.user ?? { 
        avatar_url: '', 
        login: 'Unknown', 
        name: null 
    };

    // Prepare avatar element: shows user image or initials
    const avatar: IAutoView.IAutoViewAvatarProps = {
        type: 'Avatar',
        src: user.avatar_url,
        name: user.name ?? user.login,
        variant: 'gray',
        size: 40,
    };

    // Format timestamp to a localized string
    const createdAt = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        } catch {
            // Fallback to raw timestamp if invalid
            return input.created_at;
        }
    })();

    // Header: avatar + user name + timestamp
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: 'CardHeader',
        title: user.name ?? user.login,
        description: createdAt,
        startElement: avatar,
    };

    // Determine icon for the reaction
    const iconMeta = reactionIconMap[input.content] ?? {
        id: input.content,
        color: 'gray' as IAutoView.IAutoViewIconProps['color'],
    };
    const reactionIcon: IAutoView.IAutoViewIconProps = {
        type: 'Icon',
        id: iconMeta.id,
        color: iconMeta.color,
        size: 32,
    };

    // Represent the reaction with a chip: icon + label
    const reactionChip: IAutoView.IAutoViewChipProps = {
        type: 'Chip',
        label: input.content,
        startElement: reactionIcon,
        variant: 'outlined',
        color: 'primary',
        size: 'medium',
    };

    // Content block containing the reaction chip
    const content: IAutoView.IAutoViewCardContentProps = {
        type: 'CardContent',
        childrenProps: reactionChip,
    };

    // Assemble a vertical card: header + content
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };

    return card;
}
