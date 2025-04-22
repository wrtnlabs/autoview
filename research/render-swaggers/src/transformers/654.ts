import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.simple_user[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there is no data, render a simple markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "**No users found.**",
        };
    }

    // Transform each GitHub user into a DataListItem component
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((user) => {
        // Avatar showing the user's GitHub avatar
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40, // medium size for a user list
        };

        // Text component for the user's login
        const loginText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: user.login,
            variant: "body1",
        };

        // Button that links to the user's GitHub profile
        const profileButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "View Profile",
            href: user.html_url,
            variant: "text",
            color: "primary",
        };

        return {
            type: "DataListItem",
            // Combine avatar and login name horizontally
            label: [avatar, loginText],
            // Place the profile link button on the right side
            value: profileButton,
        };
    });

    // Wrap all items into a DataList container
    const list: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    return list;
}
