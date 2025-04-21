import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type simple_user = any;
    export type stargazer = any;
}
type IAutoViewTransformerInputType = any[] | any[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Handle invalid or empty input gracefully
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No data available to display**"
        };
    }

    // Attempt to detect GitHub‐style user objects by presence of common fields
    const isGitHubUser = (obj: any): obj is { login?: string; avatar_url?: string; html_url?: string } =>
        typeof obj === "object" &&
        ("login" in obj || "avatar_url" in obj || "html_url" in obj);

    // Map each item to a DataListItemProps
    const childrenProps: IAutoView.IAutoViewDataListItemProps[] = input.map((item) => {
        // If this looks like a GitHub user, render avatar + login + profile button
        if (isGitHubUser(item)) {
            const avatar: IAutoView.IAutoViewAvatarProps = {
                type: "Avatar",
                src: item.avatar_url,
                name: item.login,
                variant: "gray",
                size: 40
            };
            const loginText: IAutoView.IAutoViewTextProps = {
                type: "Text",
                content: item.login || "Unknown",
                variant: "subtitle1",
                color: "primary"
            };
            const profileButton: IAutoView.IAutoViewButtonProps = {
                type: "Button",
                label: "View Profile",
                href: item.html_url,
                variant: "outlined",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "arrow-right",
                    size: 12,
                    color: "blue"
                }
            };
            return {
                type: "DataListItem",
                // label is an array of presentation components
                label: [avatar, loginText],
                value: profileButton
            };
        }

        // Fallback: Render generic object via markdown
        const jsonContent = JSON.stringify(item, null, 2);
        return {
            type: "DataListItem",
            label: {
                type: "Markdown",
                content: "json\n" + jsonContent + "\n```"
            }
        };
    });

    // Return a responsive DataList containing all items
    return {
        type: "DataList",
        childrenProps
    };
}
