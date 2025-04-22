import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Gist Simple
     *
     * @title Gist Simple
    */
    export type gist_simple = {
        forks?: {
            id?: string;
            url?: string & tags.Format<"uri">;
            user?: any;
            created_at?: string & tags.Format<"date-time">;
            updated_at?: string & tags.Format<"date-time">;
        }[] | null;
        history?: any[] | null;
        /**
         * Gist
         *
         * @title Gist
        */
        fork_of?: {
            url: string & tags.Format<"uri">;
            forks_url: string & tags.Format<"uri">;
            commits_url: string & tags.Format<"uri">;
            id: string;
            node_id: string;
            git_pull_url: string & tags.Format<"uri">;
            git_push_url: string & tags.Format<"uri">;
            html_url: string & tags.Format<"uri">;
            files: {
                [key: string]: {
                    filename?: string;
                    type?: string;
                    language?: string;
                    raw_url?: string;
                    size?: number & tags.Type<"int32">;
                };
            };
            "public": boolean;
            created_at: string & tags.Format<"date-time">;
            updated_at: string & tags.Format<"date-time">;
            description: string | null;
            comments: number & tags.Type<"int32">;
            comments_enabled?: boolean;
            user: any;
            comments_url: string & tags.Format<"uri">;
            owner?: any;
            truncated?: boolean;
            forks?: any[];
            history?: any[];
        } | null;
        url?: string;
        forks_url?: string;
        commits_url?: string;
        id?: string;
        node_id?: string;
        git_pull_url?: string;
        git_push_url?: string;
        html_url?: string;
        files?: {
            [key: string]: {
                filename?: string;
                type?: string;
                language?: string;
                raw_url?: string;
                size?: number & tags.Type<"int32">;
                truncated?: boolean;
                content?: string;
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            } | null;
        };
        "public"?: boolean;
        created_at?: string;
        updated_at?: string;
        description?: string | null;
        comments?: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user?: string | null;
        comments_url?: string;
        owner?: Schema.simple_user;
        truncated?: boolean;
    };
    export type public_user = any;
    export type gist_history = any;
    export type nullable_simple_user = any;
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
}
type IAutoViewTransformerInputType = Schema.gist_simple;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper: format ISO date string to a human-readable date
    const formatDate = (iso?: string): string => {
        if (!iso) return "";
        const date = new Date(iso);
        // Fallback to ISO if invalid date
        return isNaN(date.getTime()) ? iso : date.toLocaleString();
    };

    // Build a list of DataListItemProps to show key pieces of gist data
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // Owner information (if present)
    if (input.owner && typeof input.owner === "object") {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Owner",
                variant: "subtitle2",
            },
            value: {
                type: "Avatar",
                // using the avatar_url and login name
                src: input.owner.avatar_url,
                name: input.owner.login,
                size: 32,
                variant: "primary",
            },
        });
    }

    // Gist description rendered as Markdown for better text handling
    if (input.description != null) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Description",
                variant: "subtitle2",
            },
            value: {
                type: "Markdown",
                content: input.description || "_No description_",
            },
        });
    }

    // Number of files in the gist
    const fileCount = input.files ? Object.keys(input.files).length : 0;
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Files",
            variant: "subtitle2",
        },
        value: {
            type: "Text",
            content: `${fileCount}`,
            variant: "body2",
        },
    });

    // Number of forks
    const forksCount = Array.isArray(input.forks) ? input.forks.length : 0;
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Forks",
            variant: "subtitle2",
        },
        value: {
            type: "Badge",
            count: forksCount,
            childrenProps: {
                type: "Icon",
                id: "code-branch", // fontawesome branch icon
                size: 16,
                color: "gray",
            },
            maxCount: 99,
            showZero: true,
        },
    });

    // Created at date
    if (input.created_at) {
        listItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Icon",
                    id: "calendar-alt",
                    size: 16,
                    color: "gray",
                },
                {
                    type: "Text",
                    content: "Created",
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Text",
                content: formatDate(input.created_at),
                variant: "body2",
            },
        });
    }

    // Updated at date
    if (input.updated_at) {
        listItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Icon",
                    id: "sync",
                    size: 16,
                    color: "gray",
                },
                {
                    type: "Text",
                    content: "Updated",
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Text",
                content: formatDate(input.updated_at),
                variant: "body2",
            },
        });
    }

    // Compose the main visual: a vertical card with header + content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header shows gist ID and a small owner avatar if available
                type: "CardHeader",
                title: input.id ? `Gist: ${input.id}` : "Gist",
                description: input.description ? undefined : undefined,
                startElement:
                    input.owner && input.owner.avatar_url
                        ? {
                              type: "Avatar",
                              src: input.owner.avatar_url,
                              name: input.owner.login,
                              size: 40,
                              variant: "primary",
                          }
                        : undefined,
            },
            {
                // Card content houses the data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
        ],
    };
}
