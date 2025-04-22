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
    // If no users provided, render a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        const emptyState: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: "### No users available\n\nThere are currently no GitHub users to display.",
        };
        return emptyState;
    }

    // Map each GitHub user to a ListItem with avatar, title, description and a profile button
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((user) => {
        // Build a compact description (name and/or email) separated by a bullet
        const details: string[] = [];
        if (user.name) {
            details.push(user.name);
        }
        if (user.email) {
            details.push(user.email);
        }
        const description = details.length > 0 ? details.join(" • ") : undefined;

        // Avatar shown at the start of the list item
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
            variant: "primary",
        };

        // A small outlined button linking to the user's GitHub profile
        const viewProfileButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "Profile",
            href: user.html_url,
            variant: "outlined",
            size: "small",
            color: "primary",
        };

        // Compose the ListItem
        const listItem: IAutoView.IAutoViewListItemProps = {
            type: "ListItem",
            title: user.login,
            description,
            startElement: avatar,
            // Place the button on the right as an end element
            endElement: viewProfileButton,
            // Make the entire item clickable (redirect to GitHub profile)
            href: user.html_url,
        };

        return listItem;
    });

    // Wrap all list items in a responsive List component
    const listProps: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: listItems,
    };

    return listProps;
}
