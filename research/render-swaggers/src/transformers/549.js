export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no users, show a simple markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No GitHub users found.",
        };
    }
    // Map each GitHub user to a ListItem component
    const childrenProps = input.map((user) => {
        var _a;
        // Prefer real name if available, otherwise fall back to login
        const subtitle = (_a = user.name) !== null && _a !== void 0 ? _a : "";
        return {
            type: "ListItem",
            title: user.login,
            description: subtitle,
            href: user.html_url, // Clicking the item will navigate to the GitHub profile
            startElement: {
                // Display the user's avatar for quick visual identification
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                variant: "gray",
                size: 40,
            },
            endElement: {
                // A small arrow icon indicating this is a link
                type: "Icon",
                id: "arrow-right",
                color: "gray",
                size: 16,
            },
        };
    });
    // Return a responsive List of users; ListItems will wrap nicely on narrow viewports
    return {
        type: "List",
        childrenProps,
    };
}
//# sourceMappingURL=549.js.map