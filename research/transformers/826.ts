import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Pull Request Review Comments are comments on a portion of the Pull Request's diff.
     *
     * @title Pull Request Review Comment
    */
    export type pull_request_review_comment = {
        /**
         * URL for the pull request review comment
        */
        url: string;
        /**
         * The ID of the pull request review to which the comment belongs.
        */
        pull_request_review_id: (number & tags.Type<"int32">) | null;
        /**
         * The ID of the pull request review comment.
        */
        id: number & tags.Type<"int32">;
        /**
         * The node ID of the pull request review comment.
        */
        node_id: string;
        /**
         * The diff of the line that the comment refers to.
        */
        diff_hunk: string;
        /**
         * The relative path of the file to which the comment applies.
        */
        path: string;
        /**
         * The line index in the diff to which the comment applies. This field is closing down; use `line` instead.
        */
        position?: number & tags.Type<"int32">;
        /**
         * The index of the original line in the diff to which the comment applies. This field is closing down; use `original_line` instead.
        */
        original_position?: number & tags.Type<"int32">;
        /**
         * The SHA of the commit to which the comment applies.
        */
        commit_id: string;
        /**
         * The SHA of the original commit to which the comment applies.
        */
        original_commit_id: string;
        /**
         * The comment ID to reply to.
        */
        in_reply_to_id?: number & tags.Type<"int32">;
        user: Schema.simple_user;
        /**
         * The text of the comment.
        */
        body: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * HTML URL for the pull request review comment.
        */
        html_url: string;
        /**
         * URL for the pull request that the review comment belongs to.
        */
        pull_request_url: string;
        author_association: Schema.author_association;
        _links: {
            self: {
                href: string & tags.Format<"uri">;
            };
            html: {
                href: string & tags.Format<"uri">;
            };
            pull_request: {
                href: string & tags.Format<"uri">;
            };
        };
        /**
         * The first line of the range for a multi-line comment.
        */
        start_line?: (number & tags.Type<"int32">) | null;
        /**
         * The first line of the range for a multi-line comment.
        */
        original_start_line?: (number & tags.Type<"int32">) | null;
        /**
         * The side of the first line of the range for a multi-line comment.
        */
        start_side?: "LEFT" | "RIGHT" | null;
        /**
         * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        line?: number & tags.Type<"int32">;
        /**
         * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        original_line?: number & tags.Type<"int32">;
        /**
         * The side of the diff to which the comment applies. The side of the last line of the range for a multi-line comment
        */
        side?: "LEFT" | "RIGHT";
        /**
         * The level at which the comment is targeted, can be a diff line or a file.
        */
        subject_type?: "line" | "file";
        reactions?: Schema.reaction_rollup;
        body_html?: string;
        body_text?: string;
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
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
    };
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
type IAutoViewTransformerInputType = Schema.pull_request_review_comment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no comments, show a simple text indicator
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No comments to display",
            variant: "body1",
            color: "gray",
        };
    }

    // Map GitHub author associations to avatar color variants
    const associationColorMap: Record<string, IAutoView.IAutoViewAvatarProps["variant"]> = {
        OWNER: "primary",
        COLLABORATOR: "success",
        MEMBER: "secondary",
        CONTRIBUTOR: "info",
        FIRST_TIMER: "orange",
        FIRST_TIME_CONTRIBUTOR: "yellow",
        MANNEQUIN: "gray",
        NONE: "darkGray",
    };

    // Compose a DataList component where each entry is one PR review comment
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((comment) => {
        const user = comment.user;
        // Format the creation date for display
        const dateString = new Date(comment.created_at).toLocaleString();

        // Choose a color variant for the avatar based on author association
        const avatarVariant =
            associationColorMap[comment.author_association ?? "NONE"] ||
            "gray";

        // Build the avatar for the comment author
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            variant: avatarVariant,
            size: 32,
        };

        // Text showing filename and line number context
        const fileContext: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: `${comment.path}:${comment.line ?? comment.position ?? "?"}`,
            variant: "body2",
            color: "tertiary",
        };

        // Markdown for the comment body to render any markdown or code snippets
        const bodyMarkdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: comment.body,
        };

        // Small caption showing when the comment was created
        const dateCaption: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: dateString,
            variant: "caption",
            color: "gray",
        };

        // A chip indicating the total number of reactions
        const reactionChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `Reactions: ${comment.reactions?.total_count ?? 0}`,
            size: "small",
            variant: "outlined",
        };

        return {
            type: "DataListItem",
            // Combine avatar, username, and file context into the label
            label: [
                avatar,
                {
                    type: "Text",
                    content: user.login,
                    variant: "subtitle1",
                    color: "primary",
                },
                fileContext,
            ],
            // Combine the rendered comment, date, and reactions into the value
            value: [bodyMarkdown, dateCaption, reactionChip],
        };
    });

    // Return the DataList component wrapping all comment items
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    return dataList;
}
