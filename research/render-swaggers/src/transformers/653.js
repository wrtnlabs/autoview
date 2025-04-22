export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no users, render a simple markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No users found**",
        };
    }
    // Map each GitHub user to a ListItem with avatar, title, description, and a link button
    const listItems = input.map((user) => {
        var _a, _b;
        // Use the user's name or email as description fallbacks
        const descriptionText = (_b = (_a = user.name) !== null && _a !== void 0 ? _a : user.email) !== null && _b !== void 0 ? _b : "";
        // Avatar component for startElement
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
            variant: "gray",
        };
        // A text button linking to the user's GitHub profile
        const profileButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            label: ["View"],
            href: user.html_url,
        };
        return {
            type: "ListItem",
            // Display avatar at the start
            startElement: avatar,
            // Main title is the login
            title: user.login,
            // Show name or email (if available) as description
            description: descriptionText,
            // Link button at the end
            endElement: profileButton,
        };
    });
    // Compose the final list component
    const list = {
        type: "List",
        childrenProps: listItems,
    };
    return list;
}
//# sourceMappingURL=653.js.map