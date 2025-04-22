export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No users to display"
        };
    }
    // Map each GitHub user to a DataListItem with avatar, name, and action buttons
    const items = input.map(user => {
        var _a;
        // Fallback to login if name is missing
        const displayName = (_a = user.name) !== null && _a !== void 0 ? _a : user.login;
        // Avatar on the left
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: displayName,
            size: 40,
            variant: "gray"
        };
        // Username text
        const nameText = {
            type: "Text",
            variant: "body1",
            content: displayName
        };
        // Button to open the GitHub profile
        const profileButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            href: user.html_url,
            label: "Profile",
            startElement: {
                type: "Icon",
                id: "github",
                size: 16,
                color: "gray"
            }
        };
        // Button to open the repositories list
        const reposButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            href: user.repos_url,
            label: "Repos",
            startElement: {
                type: "Icon",
                id: "book",
                size: 16,
                color: "gray"
            }
        };
        // Button to open the followers list
        const followersButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            href: user.followers_url,
            label: "Followers",
            startElement: {
                type: "Icon",
                id: "user-group",
                size: 16,
                color: "gray"
            }
        };
        return {
            type: "DataListItem",
            // Label contains avatar + username
            label: [avatar, nameText],
            // Value contains action buttons
            value: [profileButton, reposButton, followersButton]
        };
    });
    // Wrap all items in a DataList for responsive, scrollable rendering
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=621.js.map