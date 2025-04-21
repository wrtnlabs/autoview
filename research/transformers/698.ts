import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export type commit_comment = {
        html_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        body: string;
        path: string | null;
        position: (number & tags.Type<"int32">) | null;
        line: (number & tags.Type<"int32">) | null;
        commit_id: string;
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: Schema.author_association;
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
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
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
type IAutoViewTransformerInputType = Schema.commit_comment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no comments, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "*No comments to display.*",
        };
    }

    // Map each commit comment to a VerticalCard
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map(comment => {
        // Safely extract user info; user can be null
        const user = comment.user;
        const login = user?.login ?? "Unknown";
        const avatarSrc = user?.avatar_url;

        // Avatar showing the commenter's profile picture
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: avatarSrc,
            name: login,
            variant: "gray",
            size: 40,
        };

        // CardHeader with avatar, username, timestamp, and association chip
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: login,
            // Format ISO date to a locale string for readability
            description: new Date(comment.created_at).toLocaleString(),
            startElement: avatar,
            endElement: {
                type: "Chip",
                label: comment.author_association,
                variant: "outlined",
                size: "small",
                color: "primary",
            },
        };

        // CardContent using a Markdown renderer for the comment body
        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: comment.body,
            },
        };

        // If reactions exist, turn each non-zero reaction into a small Chip
        let footer: IAutoView.IAutoViewCardFooterProps | undefined;
        if (comment.reactions) {
            const reactionChips: IAutoView.IAutoViewChipProps[] = [];
            // Map reaction keys to emoji shortcuts for quick recognition
            const reactionMap: Record<string, string> = {
                "+1": "👍",
                "-1": "👎",
                laugh: "😄",
                confused: "😕",
                heart: "❤️",
                hooray: "🎉",
                eyes: "👀",
                rocket: "🚀",
            };
            // Only include those reactions where the count is greater than zero
            (["+1", "-1", "laugh", "confused", "heart", "hooray", "eyes", "rocket"] as const)
                .forEach(key => {
                    const count = (comment.reactions as any)[key] as number;
                    if (count > 0) {
                        reactionChips.push({
                            type: "Chip",
                            label: `${reactionMap[key]} ${count}`,
                            variant: "outlined",
                            size: "small",
                        });
                    }
                });
            if (reactionChips.length > 0) {
                footer = {
                    type: "CardFooter",
                    childrenProps: reactionChips,
                };
            }
        }

        // Assemble the VerticalCard with its sub-components
        const children: Array<
            | IAutoView.IAutoViewCardHeaderProps
            | IAutoView.IAutoViewCardContentProps
            | IAutoView.IAutoViewCardFooterProps
        > = [header, content];
        if (footer) {
            children.push(footer);
        }

        return {
            type: "VerticalCard",
            childrenProps: children,
        };
    });

    // Wrap all cards in a swipeable, responsive carousel
    const carousel: IAutoView.IAutoViewCarouselProps = {
        type: "Carousel",
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
        // Each comment is displayed as a VerticalCard slide
        childrenProps: cards,
    };

    return carousel;
}
