export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no users provided, render a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        const emptyState = {
            type: "Markdown",
            content: "### No users available\n\nThere are currently no GitHub users to display.",
        };
        return emptyState;
    }
    // Map each GitHub user to a ListItem with avatar, title, description and a profile button
    const listItems = input.map((user) => {
        // Build a compact description (name and/or email) separated by a bullet
        const details = [];
        if (user.name) {
            details.push(user.name);
        }
        if (user.email) {
            details.push(user.email);
        }
        const description = details.length > 0 ? details.join(" • ") : undefined;
        // Avatar shown at the start of the list item
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
            variant: "primary",
        };
        // A small outlined button linking to the user's GitHub profile
        const viewProfileButton = {
            type: "Button",
            label: "Profile",
            href: user.html_url,
            variant: "outlined",
            size: "small",
            color: "primary",
        };
        // Compose the ListItem
        const listItem = {
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
    const listProps = {
        type: "List",
        childrenProps: listItems,
    };
    return listProps;
}
//# sourceMappingURL=885.js.map