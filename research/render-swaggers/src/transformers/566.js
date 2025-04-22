export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub users into a responsive AutoView List component
function visualizeData(input) {
    // Edge case: if no users, display a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No users found\nPlease try a different query."
        };
    }
    // Map each GitHub user to a ListItem with avatar, login, and a link button
    const listItems = input.map(user => {
        // Fallback to login if the name is null or empty
        const descriptionText = user.name && user.name.trim().length > 0
            ? user.name
            : user.login;
        return {
            type: "ListItem",
            title: user.login,
            description: descriptionText,
            // Show the user's avatar
            startElement: {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 40
            },
            // Provide a button linking to the user's GitHub page
            endElement: {
                type: "Button",
                label: "View",
                variant: "text",
                href: user.html_url,
                startElement: {
                    type: "Icon",
                    id: "arrow-right",
                    size: 16,
                    color: "blue"
                }
            }
        };
    });
    // Wrap all items in a List component for responsive rendering
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=566.js.map