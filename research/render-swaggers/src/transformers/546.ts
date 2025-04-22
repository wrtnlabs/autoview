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
    /**
     * Helper: map reaction content to an icon id and color
     */
    const contentIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
        "+1":   { id: "thumbs-up",   color: "green"   },
        "-1":   { id: "thumbs-down", color: "red"     },
        laugh:  { id: "laugh",       color: "orange"  },
        confused: { id: "meh",       color: "gray"    },
        heart:  { id: "heart",       color: "red"     },
        hooray: { id: "tada",        color: "blue"    },
        rocket: { id: "rocket",      color: "indigo"  },
        eyes:   { id: "eye",         color: "teal"    },
    };

    /**
     * Helper: format an ISO timestamp into a relative time string.
     * e.g. "5m ago", "2h ago", "3d ago", or fallback to local date.
     */
    function formatTime(iso: string): string {
        const then = new Date(iso).getTime();
        const now = Date.now();
        const delta = Math.max(0, now - then) / 1000; // seconds
        if (delta < 60) return "just now";
        if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
        if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
        if (delta < 604800) return `${Math.floor(delta / 86400)}d ago`;
        // fallback: local date string for older events
        return new Date(iso).toLocaleDateString();
    }

    // If there are no reactions, render a friendly markdown notice.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions available"
        };
    }

    // Sort reactions by creation time descending
    const sorted = [...input].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Build list items for each reaction
    const items: IAutoView.IAutoViewListItemProps[] = sorted.map((reaction) => {
        const user = reaction.user;
        // Avatar: use user's avatar or a fallback icon
        const avatar: IAutoView.IAutoViewAvatarProps = user
            ? {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 32
            }
            : {
                type: "Avatar",
                name: "?",
                size: 32
            };

        // Map reaction content to an icon
        const iconInfo = contentIconMap[reaction.content] || { id: "question", color: "gray" };
        const reactionIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: iconInfo.id,
            color: iconInfo.color,
            size: 20
        };

        // Timestamp text
        const timeText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: formatTime(reaction.created_at),
            variant: "caption",
            color: "gray"
        };

        // Title: prefer user's name, then login, then node_id
        const title = user ? (user.name || user.login) : reaction.node_id;

        return {
            type: "ListItem",
            title,
            // show avatar on the left
            startElement: avatar,
            // show reaction icon and timestamp on the right
            endElement: [reactionIcon, timeText]
        };
    });

    // Compose the overall List UI
    const listProps: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: items
    };

    return listProps;
}
