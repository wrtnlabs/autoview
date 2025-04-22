export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no users, show a simple markdown message.
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No users found**"
        };
    }
    // Map each user into a ListItem for a responsive list view.
    const listItems = input.map(user => {
        // Compose a human‐readable description: use name and email if available.
        const descriptionParts = [];
        if (user.name) {
            descriptionParts.push(user.name);
        }
        if (user.email) {
            descriptionParts.push(user.email);
        }
        const description = descriptionParts.join(" • ");
        // Build the end‐element icons/chips array.
        const endElements = [
            // GitHub icon to indicate link to profile.
            {
                type: "Icon",
                id: "github",
                size: 20,
                color: "gray"
            }
        ];
        // If the user is a site admin, show a red "Admin" chip.
        if (user.site_admin) {
            endElements.push({
                type: "Chip",
                label: "Admin",
                variant: "outlined",
                color: "red",
                size: "small"
            });
        }
        return {
            type: "ListItem",
            // The GitHub login is the primary title.
            title: user.login,
            // Secondary text combining name and email (if present).
            description: description || undefined,
            // Show the avatar on the left.
            startElement: {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 40
            },
            // Make the entire item link to the user's GitHub page.
            href: user.html_url,
            // Add the icon and optional admin chip on the right.
            endElement: endElements
        };
    });
    // Return the top‐level List component with all items as children.
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=419.js.map