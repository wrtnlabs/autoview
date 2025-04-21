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



// Transforms an array of GitHub simple_user records into an AutoView DataList
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Sort users alphabetically by login for consistent ordering
    const users = [...input].sort((a, b) => a.login.localeCompare(b.login));

    // Map each user to a DataListItemProps
    const items: IAutoView.IAutoViewDataListItemProps[] = users.map(user => {
        // Compose the label: avatar + login link + optional admin chip
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // User avatar
        labelComponents.push({
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            variant: "gray",
            size: 40,
        } as IAutoView.IAutoViewAvatarProps);

        // Login as a clickable text button linking to the user's GitHub profile
        labelComponents.push({
            type: "Button",
            label: user.login,
            variant: "text",
            size: "small",
            href: user.html_url,
        } as IAutoView.IAutoViewButtonProps);

        // If the user is a site admin, show a red "ADMIN" chip
        if (user.site_admin) {
            labelComponents.push({
                type: "Chip",
                label: "ADMIN",
                variant: "outlined",
                size: "small",
                color: "error",
            } as IAutoView.IAutoViewChipProps);
        }

        // Compose the value: name, email tooltip, and user type
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // Show the user's real name if available
        if (user.name) {
            valueComponents.push({
                type: "Text",
                content: user.name,
                variant: "body1",
                color: "secondary",
            } as IAutoView.IAutoViewTextProps);
        }

        // If an email is present, show an envelope icon with tooltip
        if (user.email) {
            valueComponents.push({
                type: "Tooltip",
                message: user.email,
                childrenProps: {
                    type: "Icon",
                    id: "envelope",
                    size: 16,
                    color: "gray",
                },
            } as IAutoView.IAutoViewTooltipProps);
        }

        // Always display the GitHub account type (e.g. "User", "Organization")
        valueComponents.push({
            type: "Icon",
            id: "user",
            size: 16,
            color: "blue",
        } as IAutoView.IAutoViewIconProps);
        valueComponents.push({
            type: "Text",
            content: user.type,
            variant: "caption",
            color: "gray",
        } as IAutoView.IAutoViewTextProps);

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        } as IAutoView.IAutoViewDataListItemProps;
    });

    // Return the full DataList component
    return {
        type: "DataList",
        childrenProps: items,
    } as IAutoView.IAutoViewDataListProps;
}
