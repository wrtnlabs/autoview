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
    // If there are no users, show a friendly message
    if (input.length === 0) {
        return {
            type: "Text",
            // Use a subdued color and body text for empty state
            variant: "body1",
            color: "gray",
            content: "No users found."
        };
    }

    // Transform each GitHub user into a DataListItem
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((user) => {
        // Avatar for the user
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
            variant: "gray"
        };

        // Primary text: username
        const loginText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: user.login,
            variant: "subtitle1",
            color: "primary"
        };

        // Secondary text: real name, if available
        const nameText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: user.name || "",
            variant: "body2",
            color: "secondary"
        };

        // Arrange avatar and text horizontally in the label area
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            avatar,
            loginText
        ];
        if (user.name) {
            labelComponents.push(nameText);
        }

        // Icon for the GitHub logo
        const githubIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 16
        };

        // A button linking to the user's GitHub profile
        const profileButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "Profile",
            variant: "outlined",
            color: "primary",
            startElement: githubIcon,
            href: user.html_url
        };

        return {
            type: "DataListItem",
            // Composite label: avatar + texts
            label: labelComponents,
            // Action value: view profile button
            value: profileButton
        };
    });

    // Return the complete data list
    return {
        type: "DataList",
        childrenProps: items
    };
}
