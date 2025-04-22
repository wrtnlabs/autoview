export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub users into an AutoView list with avatars and links.
// Shows a markdown message if there are no users.
function visualizeData(input) {
    // Handle the empty‐array case with a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No users to display."
        };
    }
    // Map each user to a ListItem with an avatar, title, description, and link icon
    const listItems = input.map(user => {
        var _a, _b;
        // Prefer the full name; if missing, fall back to the login
        const title = ((_a = user.name) === null || _a === void 0 ? void 0 : _a.trim()) || user.login;
        // Show email if available; otherwise use the profile URL
        const description = ((_b = user.email) === null || _b === void 0 ? void 0 : _b.trim()) || user.html_url;
        // Avatar component rendering the user's GitHub avatar
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            variant: "primary",
            size: 40
        };
        // Simple right-arrow icon to indicate navigation
        const chevron = {
            type: "Icon",
            id: "arrow-right",
            size: 16,
            color: "gray"
        };
        return {
            type: "ListItem",
            title,
            description,
            startElement: avatar,
            // Make the entire row clickable
            href: user.html_url,
            endElement: chevron
        };
    });
    // Wrap all items in a responsive List
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=510.js.map