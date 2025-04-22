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



/**
 * Helper to map GitHub reaction content to FontAwesome icon IDs.
 */
function mapContentToIcon(content: string): string {
    switch (content) {
        case "+1":
            return "thumbs-up";
        case "-1":
            return "thumbs-down";
        case "laugh":
            return "laugh";
        case "confused":
            return "confused";
        case "heart":
            return "heart";
        case "hooray":
            return "tada";
        case "rocket":
            return "rocket";
        case "eyes":
            return "eyes";
        default:
            return "question";
    }
}

/**
 * Simple "time ago" formatter for a date-time string.
 */
function timeAgo(dateTime: string): string {
    const now = new Date().getTime();
    const past = new Date(dateTime).getTime();
    const diff = Math.max(0, now - past);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Safely handle a possibly null 'user'
    const user = input.user;
    const userLogin = user?.login ?? "Unknown user";
    const avatarSrc = user?.avatar_url ?? "";

    // Avatar for the reacting user
    const avatar: IAutoView.IAutoViewAvatarProps = {
        type: "Avatar",
        src: avatarSrc,
        name: userLogin,
        variant: "gray",
        size: 40,
    };

    // Icon representing the reaction content
    const reactionIconId = mapContentToIcon(input.content);
    const reactionIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: reactionIconId,
        color: "blue",
        size: 24,
    };

    // Build a markdown block summarizing the reaction
    const markdownSummary = [
        `### Reaction Details`,
        ``,
        `- **User:** @${userLogin}`,
        `- **Reaction:** \`${input.content}\``,
        `- **Created:** ${new Date(input.created_at).toLocaleString()}`,
    ].join("\n");

    // Assemble a vertical card for a compact, mobile-friendly layout
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with avatar and identifier
            {
                type: "CardHeader",
                startElement: avatar,
                title: userLogin,
                description: timeAgo(input.created_at),
            },
            // Main content displaying the reaction icon and content
            {
                type: "CardContent",
                childrenProps: [
                    // Show the icon in context
                    {
                        type: "Chip",
                        label: `Reacted with "${input.content}"`,
                        startElement: reactionIcon,
                        color: "cyan",
                        size: "medium",
                        variant: "outlined",
                    },
                ],
            },
            // Footer with a markdown summary for richer text
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Markdown",
                    content: markdownSummary,
                },
            },
        ],
    };
}
