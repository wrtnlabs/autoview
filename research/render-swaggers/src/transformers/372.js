export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no organizations, display a friendly message
    if (input.length === 0) {
        return {
            type: "Text",
            content: "No organizations found.",
            variant: "body1",
            color: "gray",
        };
    }
    // Map each organization to a ListItem component
    const listItems = input.map((org) => {
        var _a;
        // Avatar for the organization, using its avatar_url
        const avatar = {
            type: "Avatar",
            src: org.avatar_url,
            name: org.login,
            size: 40, // midsize avatar for clarity
        };
        // Button that links to the organization's repositories
        const repoButton = {
            type: "Button",
            label: "View Repos",
            variant: "outlined",
            size: "small",
            href: org.repos_url,
        };
        // Build the ListItem; clicking the item itself will navigate to the organization's main URL
        const item = {
            type: "ListItem",
            title: org.login,
            // Only show description if provided, otherwise omit for cleaner UI
            description: (_a = org.description) !== null && _a !== void 0 ? _a : undefined,
            startElement: avatar,
            endElement: repoButton,
            href: org.url,
        };
        return item;
    });
    // Return a responsive list of organizations
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=372.js.map