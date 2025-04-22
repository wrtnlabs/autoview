import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export type team_discussion_comment = {
        author: Schema.nullable_simple_user;
        /**
         * The main text of the comment.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        discussion_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion comment.
        */
        number: number & tags.Type<"int32">;
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
type IAutoViewTransformerInputType = Schema.team_discussion_comment[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Transform an array of team discussion comments into a DataList UI component
    // Each comment will appear as a DataListItem with an author label and a value comprising the comment markdown and optional reaction chips.

    // Helper to build reaction chips for a comment
    function buildReactionChips(
        reactions: Schema.reaction_rollup | undefined
    ): IAutoView.IAutoViewChipProps[] {
        if (!reactions) return [];

        // List of reaction keys we want to display (excluding url and total_count)
        const reactionKeys: (keyof Omit<Schema.reaction_rollup, "url" | "total_count">)[] = [
            "+1", "-1", "laugh", "confused", "heart", "hooray", "eyes", "rocket"
        ];

        return reactionKeys
            .filter((key) => reactions[key] > 0)
            .map((key) => ({
                type: "Chip",
                label: `${key} ${reactions[key]}`,
                size: "small",
                variant: "outlined"
            }));
    }

    // Map each comment to a DataListItemProps
    const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map((comment) => {
        const author = comment.author;
        // Determine display name, falling back to login or "Unknown"
        const authorName = author && (author.name ?? author.login) ? (author.name || author.login) : "Unknown";

        // Avatar for the author
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: author?.avatar_url,
            name: authorName,
            size: 32
        };

        // Text next to avatar showing the author name
        const authorText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: authorName,
            variant: "body2"
        };

        // Markdown component for the comment body
        const markdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: comment.body
        };

        // Build chips for each non-zero reaction
        const chips = buildReactionChips(comment.reactions);
        const reactionChipGroup: IAutoView.IAutoViewChipGroupProps | undefined =
            chips.length > 0
                ? {
                      type: "ChipGroup",
                      childrenProps: chips
                  }
                : undefined;

        // Assemble value: always include markdown; append reaction chips if present
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = reactionChipGroup
            ? [markdown, reactionChipGroup]
            : [markdown];

        return {
            type: "DataListItem",
            label: [avatar, authorText],
            value: valueComponents
        };
    });

    // Return the top-level DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps
    };

    return dataList;
}
