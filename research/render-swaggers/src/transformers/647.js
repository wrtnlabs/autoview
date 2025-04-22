export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Filter out any null entries (Schema.integration is nullable)
    const integrations = input.filter((item) => item != null);
    // If there's no data, show a friendly markdown message
    if (integrations.length === 0) {
        return {
            type: "Markdown",
            content: "## No GitHub Apps Found\n\nThere are no integrations to display.",
        };
    }
    // Sort by creation date descending so newest appear first
    integrations.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Map each integration to a responsive ListItem
    const items = integrations.map((integration) => {
        var _a, _b, _c;
        // Human‐readable dates
        const createdDate = new Date(integration.created_at).toLocaleDateString();
        const updatedDate = new Date(integration.updated_at).toLocaleDateString();
        // Some numeric metrics
        const installs = (_a = integration.installations_count) !== null && _a !== void 0 ? _a : 0;
        const eventsCount = (_c = (_b = integration.events) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
        // Build a multi‐line description; the ListItem will respect line breaks
        const descriptionLines = [];
        if (integration.description) {
            descriptionLines.push(integration.description.trim());
        }
        descriptionLines.push(`**Installs:** ${installs}`);
        descriptionLines.push(`**Events:** ${eventsCount}`);
        descriptionLines.push(`**Created:** ${createdDate}`);
        descriptionLines.push(`**Updated:** ${updatedDate}`);
        const description = descriptionLines.join("\n");
        // Build a badge showing the number of events at the end
        const eventBadge = {
            type: "Badge",
            count: eventsCount,
            // Using a calendar icon to represent events
            childrenProps: {
                type: "Icon",
                id: "calendar",
                color: "gray",
                size: 16,
            },
        };
        // Build the GitHub icon at the start
        const ghIcon = {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 24,
        };
        return {
            type: "ListItem",
            title: integration.name,
            description,
            startElement: ghIcon,
            endElement: eventBadge,
        };
    });
    // Return the top‐level List component
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=647.js.map