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
    // If there's no comment data, show a friendly placeholder message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No commit comments to display.",
        };
    }

    // Transform each commit_comment into a DataListItem for a visually rich list
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((cmt) => {
        // Build the label: avatar + username + short commit SHA
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        if (cmt.user) {
            labelComponents.push({
                type: "Avatar",
                src: cmt.user.avatar_url,
                name: cmt.user.login,
                variant: "primary",
                size: 32,
            });
        }
        labelComponents.push({
            type: "Text",
            // Use an array to allow future icon mixing if desired
            content: [`${cmt.user?.login ?? "Unknown user"}`],
            variant: "body1",
        });
        // Show a short SHA for quick identification
        labelComponents.push({
            type: "Text",
            content: [`${cmt.commit_id.slice(0, 7)}`],
            variant: "caption",
            color: "gray",
        });

        // Build the value: markdown body, file path chip, reactions badge, and a link button
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // Render the comment body as markdown for rich text support
        if (cmt.body) {
            valueComponents.push({
                type: "Markdown",
                content: cmt.body,
            });
        }

        // Show file path if available
        if (cmt.path) {
            valueComponents.push({
                type: "Chip",
                label: cmt.path,
                variant: "outlined",
                size: "small",
                color: "secondary",
            });
        }

        // Display reactions rollup as a badge with an icon
        if (cmt.reactions) {
            valueComponents.push({
                type: "Badge",
                count: cmt.reactions.total_count,
                maxCount: 99,
                showZero: false,
                childrenProps: {
                    type: "Icon",
                    id: "thumbs-up",
                    size: 16,
                    color: "blue",
                },
            });
        }

        // Provide a button to jump to the comment in GitHub
        valueComponents.push({
            type: "Button",
            label: "View on GitHub",
            variant: "outlined",
            size: "small",
            href: cmt.html_url,
        });

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });

    // Wrap all items in a DataList for a clean, scrollable list UI
    return {
        type: "DataList",
        childrenProps: items,
    };
}
