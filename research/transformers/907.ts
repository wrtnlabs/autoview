import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export type team_discussion = {
        author: Schema.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
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
type IAutoViewTransformerInputType = Schema.team_discussion;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Prepare the avatar or fallback icon for the author
    const authorElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.author && input.author.avatar_url
        ? {
            type: "Avatar",
            src: input.author.avatar_url,
            name: input.author.login,
            variant: "primary",
            size: 32
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 32
        };

    // Header component displaying title, number, and pinned status
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.title,
        description: `#${input.number} • ${input.private ? "Private" : "Public"}`,
        startElement: authorElement,
        endElement: {
            type: "Chip",
            label: input.pinned ? "Pinned" : "Discussion",
            variant: "filled",
            color: input.pinned ? "info" : "gray",
            size: "small"
        }
    };

    // Convert the body (plain markdown) to a markdown component
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body
        }
    };

    // Helper to format ISO date-time strings for display
    function formatDateTime(value: string): string {
        try {
            return new Date(value).toLocaleString();
        } catch {
            return value;
        }
    }

    // Data list of metadata: comments, created and updated timestamps
    const metaList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Comments", variant: "body2" }],
                value: {
                    type: "Badge",
                    count: input.comments_count,
                    childrenProps: {
                        type: "Icon",
                        id: "comment",
                        color: "blue",
                        size: 16
                    }
                }
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Created", variant: "body2" }],
                value: { type: "Text", content: formatDateTime(input.created_at), variant: "caption" }
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Updated", variant: "body2" }],
                value: { type: "Text", content: input.updated_at ? formatDateTime(input.updated_at) : "—", variant: "caption" }
            }
        ]
    };

    // Footer wraps the metadata list
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: metaList
    };

    // Compose a vertical card that stacks header, content, and footer
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };

    return card;
}
