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
type IAutoViewTransformerInputType = Schema.gist_simple[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no gists to display, render a simple markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No gists to display\n\nThere are no public gists available at the moment."
        };
    }

    // Map each gist to a ListItem component.
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((gist) => {
        // Prepare a human‐friendly title: use description if present, otherwise fallback to ID.
        const titleText = gist.description?.trim() || gist.id || "Untitled Gist";

        // Format creation date in ISO form (the consumer can render it nicely).
        const createdDate = gist.created_at
            ? new Date(gist.created_at).toISOString().split("T")[0]
            : "Unknown date";

        // Build the avatar or an icon as the leading element.
        const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = gist.owner?.avatar_url
            ? {
                  type: "Avatar",
                  src: gist.owner.avatar_url,
                  size: 40,
                  variant: "primary"
              }
            : {
                  type: "Icon",
                  id: "file-code",   // FontAwesome icon key for code or file
                  size: 24,
                  color: "gray"
              };

        // If an HTML URL is available, attach a "View" button as the trailing element.
        const endElement: IAutoView.IAutoViewButtonProps | undefined = gist.html_url
            ? {
                  type: "Button",
                  label: "View",
                  href: gist.html_url,
                  variant: "outlined",
                  color: "primary",
                  size: "small"
              }
            : undefined;

        return {
            type: "ListItem",
            title: titleText,
            description: `Created: ${createdDate}`,
            startElement,
            endElement
        };
    });

    // Wrap everything in a List component for easy scrolling on mobile devices.
    return {
        type: "List",
        childrenProps: listItems
    };
}
