import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Base Gist
     *
     * @title Base Gist
    */
    export type base_gist = {
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
                /**
                 * The encoding used for `content`. Currently, `"utf-8"` and `"base64"` are supported.
                */
                encoding?: string & tags.Default<"utf-8">;
            };
        };
        "public": boolean;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        description: string | null;
        comments: number & tags.Type<"int32">;
        comments_enabled?: boolean;
        user: Schema.nullable_simple_user;
        comments_url: string & tags.Format<"uri">;
        owner?: Schema.simple_user;
        truncated?: boolean;
        forks?: any[];
        history?: any[];
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
type IAutoViewTransformerInputType = Schema.base_gist[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Transform each gist into a ListItem component with avatar or icon, title, description, and metadata chips
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((gist) => {
        // Determine the avatar or fallback icon for the gist owner
        const ownerAvatar = gist.owner
            ? ({
                  type: "Avatar" as const,
                  src: gist.owner.avatar_url,
                  name: gist.owner.login,
                  size: 40,
              } as IAutoView.IAutoViewAvatarProps)
            : ({
                  type: "Icon" as const,
                  id: "github",
                  color: "gray",
                  size: 24,
              } as IAutoView.IAutoViewIconProps);

        // Count number of files in the gist
        const fileCount = Object.keys(gist.files || {}).length;

        // Compose visual chips for file count and comments count
        const metadataChips: IAutoView.IAutoViewChipProps[] = [
            {
                type: "Chip" as const,
                label: `${fileCount} file${fileCount !== 1 ? "s" : ""}`,
                size: "small",
                variant: "outlined",
                color: "info",
            },
            {
                type: "Chip" as const,
                label: `${gist.comments} comment${gist.comments !== 1 ? "s" : ""}`,
                size: "small",
                variant: "outlined",
                color: "secondary",
            },
        ];

        // Format the creation date in a human‐friendly way
        let createdAt = "Unknown date";
        try {
            createdAt = new Date(gist.created_at).toLocaleDateString();
        } catch {
            // If date parsing fails, fallback to raw string
            createdAt = gist.created_at;
        }

        return {
            type: "ListItem" as const,
            // Use the description or a placeholder if missing
            title: gist.description && gist.description.trim() !== "" ? gist.description : "No description",
            // Provide the creation date in the description field
            description: `Created on ${createdAt}`,
            // Clicking on the item navigates to the gist HTML URL
            href: gist.html_url,
            startElement: ownerAvatar,
            endElement: metadataChips,
        };
    });

    // Wrap all items into a List component for responsive display
    return {
        type: "List" as const,
        childrenProps: listItems,
    } as IAutoView.IAutoViewListProps;
}
