export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there is no data, render a simple markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "**No users found.**",
        };
    }
    // Transform each GitHub user into a DataListItem component
    const items = input.map((user) => {
        // Avatar showing the user's GitHub avatar
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40, // medium size for a user list
        };
        // Text component for the user's login
        const loginText = {
            type: "Text",
            content: user.login,
            variant: "body1",
        };
        // Button that links to the user's GitHub profile
        const profileButton = {
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
    const list = {
        type: "DataList",
        childrenProps: items,
    };
    return list;
}
//# sourceMappingURL=654.js.map