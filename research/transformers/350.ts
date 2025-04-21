import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export type gist_comment = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        /**
         * The comment text.
        */
        body: string;
        user: Schema.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: Schema.author_association;
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
}
type IAutoViewTransformerInputType = Schema.gist_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract user information, handling the case when user is null
    const user = input.user;
    const userName = user?.login ?? "Unknown user";
    const userAvatarUrl = user?.avatar_url;
    // Format dates for display in locale-sensitive format
    const createdAt = new Date(input.created_at).toLocaleString();
    const updatedAt = new Date(input.updated_at).toLocaleString();

    return {
        // Use a vertical card to stack header, content, and footer vertically
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with user avatar, name, and association
                type: "CardHeader",
                startElement: {
                    type: "Avatar",
                    src: userAvatarUrl,
                    name: userName,
                    variant: "primary",
                    size: 40,
                },
                title: userName,
                description: input.author_association,
            },
            {
                // Card content rendering the body as markdown for rich text & links
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: input.body,
                },
            },
            {
                // Card footer summarizing meta information in a data list
                type: "CardFooter",
                childrenProps: {
                    type: "DataList",
                    childrenProps: [
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Created",
                                variant: "caption",
                                color: "gray",
                            },
                            value: {
                                type: "Text",
                                content: createdAt,
                                variant: "caption",
                                color: "gray",
                            },
                        },
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Updated",
                                variant: "caption",
                                color: "gray",
                            },
                            value: {
                                type: "Text",
                                content: updatedAt,
                                variant: "caption",
                                color: "gray",
                            },
                        },
                        {
                            // Show the comment ID with an icon for clarity
                            type: "DataListItem",
                            label: {
                                type: "Icon",
                                id: "hashtag",
                                color: "teal",
                                size: 16,
                            },
                            value: {
                                type: "Text",
                                content: `#${input.id}`,
                                variant: "caption",
                                color: "teal",
                            },
                        },
                    ],
                },
            },
        ],
    };
}
