import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Legacy Review Comment
     *
     * @title Legacy Review Comment
    */
    export type review_comment = {
        url: string & tags.Format<"uri">;
        pull_request_review_id: (number & tags.Type<"int32">) | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        diff_hunk: string;
        path: string;
        position: (number & tags.Type<"int32">) | null;
        original_position: number & tags.Type<"int32">;
        commit_id: string;
        original_commit_id: string;
        in_reply_to_id?: number & tags.Type<"int32">;
        user: Schema.nullable_simple_user;
        body: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        html_url: string & tags.Format<"uri">;
        pull_request_url: string & tags.Format<"uri">;
        author_association: Schema.author_association;
        _links: {
            self: Schema.link;
            html: Schema.link;
            pull_request: Schema.link;
        };
        body_text?: string;
        body_html?: string;
        reactions?: Schema.reaction_rollup;
        /**
         * The side of the first line of the range for a multi-line comment.
        */
        side?: "LEFT" | "RIGHT";
        /**
         * The side of the first line of the range for a multi-line comment.
        */
        start_side?: "LEFT" | "RIGHT" | null;
        /**
         * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        line?: number & tags.Type<"int32">;
        /**
         * The original line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        original_line?: number & tags.Type<"int32">;
        /**
         * The first line of the range for a multi-line comment.
        */
        start_line?: (number & tags.Type<"int32">) | null;
        /**
         * The original first line of the range for a multi-line comment.
        */
        original_start_line?: (number & tags.Type<"int32">) | null;
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
     * Hypermedia Link
     *
     * @title Link
    */
    export type link = {
        href: string;
    };
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
type IAutoViewTransformerInputType = Schema.review_comment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to safely format a Date string into a human-readable form
    const formatDate = (iso: string): string => {
        try {
            return new Date(iso).toLocaleString();
        } catch {
            return iso;
        }
    };

    // Map each review comment into a DataListItemProps
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((comment) => {
        // Safely extract user info; fall back to anonymous if missing
        const login = comment.user?.login ?? "Anonymous";
        const avatarSrc = comment.user?.avatar_url;

        // Avatar component for the comment author
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: avatarSrc,
            name: login,
            size: 32,
            variant: "primary",
        };

        // Username text
        const userText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: login,
            variant: "subtitle1",
        };

        // Compose markdown body:
        // 1. The comment text
        // 2. A horizontal rule
        // 3. Reactions summary (if any)
        // 4. Timestamp (italicized)
        const parts: string[] = [];

        // Raw comment body as markdown
        parts.push(comment.body);

        // Separator
        parts.push("\n\n---\n\n");

        // Reactions summary
        if (comment.reactions) {
            const r = comment.reactions;
            parts.push(
                "**Reactions:** " +
                [
                    r["+1"] ? `👍 ${r["+1"]}` : null,
                    r["-1"] ? `👎 ${r["-1"]}` : null,
                    r.laugh ? `😄 ${r.laugh}` : null,
                    r.confused ? `😕 ${r.confused}` : null,
                    r.heart ? `❤️ ${r.heart}` : null,
                    r.hooray ? `🎉 ${r.hooray}` : null,
                    r.eyes ? `👀 ${r.eyes}` : null,
                    r.rocket ? `🚀 ${r.rocket}` : null,
                ]
                    .filter((s) => s)
                    .join("  ")
            );
        } else {
            parts.push("_No reactions yet_");
        }

        // Timestamp
        parts.push(`\n\n*Commented at ${formatDate(comment.created_at)}*`);

        const markdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: parts.join(""),
        };

        // Assemble the DataListItemProps
        return {
            type: "DataListItem",
            // Label shows avatar + username
            label: [avatar, userText],
            // Value renders the comment with markdown formatting
            value: markdown,
        };
    });

    // Return a DataList component containing all comments
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    return dataList;
}
