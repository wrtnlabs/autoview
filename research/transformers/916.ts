import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
     *
     * @title Reaction
    */
    export type reaction = {
        id: number & tags.Type<"int32">;
        node_id: string;
        user: Schema.nullable_simple_user;
        /**
         * The reaction to use
        */
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        created_at: string & tags.Format<"date-time">;
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
}
type IAutoViewTransformerInputType = Schema.reaction[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Helper mappings from GitHub reaction content to FontAwesome icon names and colors
const reactionIconMap: Record<Schema.reaction["content"], string> = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "laugh",
    confused: "confused",
    heart: "heart",
    hooray: "tada",    // celebration icon
    rocket: "rocket",
    eyes: "eye",
};

const reactionColorMap: Record<Schema.reaction["content"], IAutoView.IAutoViewIconProps["color"]> = {
    "+1": "green",
    "-1": "red",
    laugh: "yellow",
    confused: "orange",
    heart: "red",
    hooray: "violet",
    rocket: "cyan",
    eyes: "gray",
};

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // A sticky subheader for the reactions list
    const subheader: IAutoView.IAutoViewListSubheaderProps = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            variant: "h6",
            content: "Reactions",
        },
    };

    // Transform each reaction into a ListItem component
    const items: IAutoView.IAutoViewListItemProps[] = input.map((reaction) => {
        const { user, content, created_at } = reaction;

        // Determine the user's display name and avatar or fallback icon
        const login = user?.login ?? "Unknown User";
        const avatarUrl = user?.avatar_url;
        const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = avatarUrl
            ? {
                  type: "Avatar",
                  src: avatarUrl,
                  name: login,
                  variant: "gray",
                  size: 40,
              }
            : {
                  type: "Icon",
                  id: "user",
                  color: "gray",
                  size: 40,
              };

        // Map the reaction content to a visual icon and color
        const iconId = reactionIconMap[content] ?? "question";
        const iconColor = reactionColorMap[content] ?? "gray";
        const endElement: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 24,
        };

        // Format the timestamp to the locale string for readability
        const timestamp = new Date(created_at).toLocaleString();

        return {
            type: "ListItem",
            title: login,
            description: timestamp,
            startElement,
            endElement,
        };
    });

    // Compose the final List component, combining the subheader and all items
    return {
        type: "List",
        childrenProps: [subheader, ...items],
    };
}
