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
    // If there are no reactions, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions found\nBe the first to leave a reaction!"
        };
    }

    // Helper to map GitHub reaction content to FontAwesome icon IDs.
    const mapContentToIcon = (content: string): string => {
        switch (content) {
            case "+1": return "thumbs-up";
            case "-1": return "thumbs-down";
            case "laugh": return "laugh";
            case "confused": return "confused";
            case "heart": return "heart";
            case "hooray": return "tada";
            case "rocket": return "rocket";
            case "eyes": return "eye";
            default: return "question-circle"; // fallback icon
        }
    };

    // Helper to choose a color for each reaction type.
    const mapContentToColor = (content: string): IAutoView.IAutoViewIconProps["color"] => {
        switch (content) {
            case "+1": return "green";
            case "-1": return "red";
            case "heart": return "red";
            case "laugh": return "yellow";
            case "hooray": return "violet";
            case "rocket": return "cyan";
            case "eyes": return "teal";
            case "confused": return "orange";
            default: return "gray";
        }
    };

    // Transform each reaction into a DataListItem with avatar, name+timestamp, and reaction icon.
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((reaction) => {
        const user = reaction.user;
        const login = user?.login ?? "Unknown";
        const displayName = user?.name ?? login;
        const timestamp = new Date(reaction.created_at).toLocaleString();

        // Avatar shows the user's avatar_url if available, otherwise initials from login.
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: user?.avatar_url,
            name: displayName,
            variant: "blue",
            size: 28
        };

        // Text includes the display name and a subdued timestamp.
        const nameAndTime: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "body1",
            color: "tertiary",
            content: `${displayName} • ${timestamp}`
        };

        // Icon for the reaction content.
        const reactionIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: mapContentToIcon(reaction.content),
            size: 20,
            color: mapContentToColor(reaction.content)
        };

        return {
            type: "DataListItem",
            // label is a horizontal stack of avatar and text.
            label: [avatar, nameAndTime],
            // value is the reaction icon.
            value: reactionIcon
        };
    });

    // Render the list of reactions as a DataList for responsive, mobile-friendly layout.
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    return dataList;
}
