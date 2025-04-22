export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, inform the user with a lightweight markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "*No organizations available.*"
        };
    }
    // Map each organization to a ListItem component
    const items = input.map((org) => {
        var _a;
        return ({
            type: "ListItem",
            // Organization login as the main title
            title: org.login,
            // Show description only if present
            description: (_a = org.description) !== null && _a !== void 0 ? _a : undefined,
            // Display the organization's avatar on the left
            startElement: {
                type: "Image",
                src: org.avatar_url,
                alt: `${org.login} avatar`
            },
            // Add a chevron icon on the right to indicate navigation
            endElement: {
                type: "Icon",
                id: "chevron-right",
                color: "gray",
                // Moderate icon size for mobile friendliness
                size: 20
            }
        });
    });
    // Compose a sticky subheader plus the list items for better structure on mobile
    const children = [
        {
            type: "ListSubheader",
            stickToTop: true,
            // Use a heading text to title the list
            childrenProps: {
                type: "Text",
                variant: "h5",
                content: "Organizations"
            }
        },
        ...items
    ];
    // Return the composed List component
    return {
        type: "List",
        childrenProps: children
    };
}
//# sourceMappingURL=968.js.map