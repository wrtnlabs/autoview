export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Remove any null entries from the input array
    const integrations = input.filter((item) => item !== null);
    // If there are no integrations to show, render a simple markdown message
    if (integrations.length === 0) {
        return {
            type: "Markdown",
            content: "### No Integrations Available\n" +
                "There are currently no GitHub apps to display."
        };
    }
    // Transform each integration into a ListItem component
    const childrenProps = integrations.map((integration) => {
        var _a;
        // Build a short description with key metadata
        const permissionsCount = Object.keys(integration.permissions).length;
        const createdDate = integration.created_at.split("T")[0]; // YYYY-MM-DD
        return {
            type: "ListItem",
            title: integration.name,
            description: `Slug: ${(_a = integration.slug) !== null && _a !== void 0 ? _a : "n/a"} • ` +
                `Created: ${createdDate} • ` +
                `Events: ${integration.events.length} • ` +
                `Permissions: ${permissionsCount}`,
            // Show an avatar with the app's name initials
            startElement: {
                type: "Avatar",
                name: integration.name
            },
            // Make the entire item clickable to the app's page
            href: integration.html_url,
            // Add a small 'View' button for clarity
            endElement: {
                type: "Button",
                label: "View",
                variant: "outlined",
                size: "small",
                color: "primary",
                href: integration.html_url
            }
        };
    });
    // Wrap the items in a responsive List component
    return {
        type: "List",
        childrenProps
    };
}
//# sourceMappingURL=648.js.map