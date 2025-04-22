export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // When there's no data, show a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No users found\n\nThere are no GitHub users in the input data."
        };
    }
    // Map each GitHub user to a ListItem with avatar, name/login, and a Profile button
    const listItems = input.map(user => {
        // Compose the secondary text: show the real name if available, otherwise show email if present
        const descriptionParts = [];
        if (user.name) {
            descriptionParts.push(`Name: ${user.name}`);
        }
        else if (user.email) {
            // mailto link in markdown will render clickable in Markdown component; here it's plain text
            descriptionParts.push(`Email: ${user.email}`);
        }
        return {
            type: "ListItem",
            // Primary label is the GitHub login
            title: user.login,
            // Concatenate the description parts into one line
            description: descriptionParts.join(" • "),
            // Show avatar on the left for quick recognition
            startElement: {
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
                size: 40
            },
            // Provide a direct link to the user's GitHub profile
            endElement: {
                type: "Button",
                label: "View Profile",
                variant: "text",
                size: "small",
                href: user.html_url
            },
            // Make the entire list item clickable as well
            href: user.html_url
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=986.js.map