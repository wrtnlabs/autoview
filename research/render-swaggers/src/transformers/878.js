export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle invalid or empty input gracefully
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No data available to display**"
        };
    }
    // Attempt to detect GitHub‐style user objects by presence of common fields
    const isGitHubUser = (obj) => typeof obj === "object" &&
        ("login" in obj || "avatar_url" in obj || "html_url" in obj);
    // Map each item to a DataListItemProps
    const childrenProps = input.map((item) => {
        // If this looks like a GitHub user, render avatar + login + profile button
        if (isGitHubUser(item)) {
            const avatar = {
                type: "Avatar",
                src: item.avatar_url,
                name: item.login,
                variant: "gray",
                size: 40
            };
            const loginText = {
                type: "Text",
                content: item.login || "Unknown",
                variant: "subtitle1",
                color: "primary"
            };
            const profileButton = {
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
//# sourceMappingURL=878.js.map