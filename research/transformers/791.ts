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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Mapping from GitHub reaction content to FontAwesome icon IDs
    const iconMap: Record<string, string> = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "meh",
        heart: "heart",
        hooray: "trophy",
        rocket: "rocket",
        eyes: "eye",
    };

    // If there are no reactions, show a simple markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions yet",
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Build a list of DataListItemProps for each reaction
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((reaction) => {
        const user = reaction.user;
        // Prepare avatar: if user is null, show a generic placeholder avatar with initials
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: user?.avatar_url,
            name: user?.login ?? "Unknown",
            size: 40,
            variant: "primary",
        };

        // Prepare user's display name text
        const nameText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "body1",
            content: user?.name ?? user?.login ?? "Unknown",
            color: "primary",
        };

        // Prepare reaction icon
        const reactionIconId = iconMap[reaction.content] || "question";
        const reactionIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: reactionIconId,
            color: "blue",
            size: 20,
        };

        // Format timestamp as locale string (the UI layer can localize further)
        const timeText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "caption",
            content: new Date(reaction.created_at).toLocaleString(),
            color: "gray",
        };

        // Compose label as [avatar, name]
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            avatar,
            nameText,
        ];

        // Compose value as [icon, time]
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            reactionIcon,
            timeText,
        ];

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });

    // Wrap the list in a DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    // Add a header card for context
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Reactions",
        description: `${input.length} reaction${input.length > 1 ? "s" : ""}`,
    };

    // Card content holds the DataList
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Use a vertical card to lay out header + list
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
