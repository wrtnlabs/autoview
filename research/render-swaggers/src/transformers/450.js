export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message instead of an empty list.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No organization hooks available."
        };
    }
    // Helper to extract just the YYYY-MM-DD portion of an ISO timestamp.
    const formatDate = (iso) => iso.split("T")[0];
    // Transform each hook into a ListItem with icons, badges, and action buttons.
    const listItems = input.map((hook) => {
        // Prepare action buttons and badges for the endElement of the list item.
        const endElements = [];
        // Primary URL button (link icon).
        if (hook.url) {
            endElements.push({
                type: "Button",
                size: "small",
                variant: "text",
                startElement: {
                    type: "Icon",
                    id: "link",
                    size: 16
                },
                href: hook.url
            });
        }
        // Ping endpoint button (bolt icon).
        if (hook.ping_url) {
            endElements.push({
                type: "Button",
                size: "small",
                variant: "text",
                startElement: {
                    type: "Icon",
                    id: "bolt",
                    size: 16
                },
                href: hook.ping_url
            });
        }
        // Deliveries endpoint button (list icon).
        if (hook.deliveries_url) {
            endElements.push({
                type: "Button",
                size: "small",
                variant: "text",
                startElement: {
                    type: "Icon",
                    id: "list",
                    size: 16
                },
                href: hook.deliveries_url
            });
        }
        // Badge showing the number of events subscribed to.
        endElements.push({
            type: "Badge",
            count: hook.events.length,
            childrenProps: {
                type: "Icon",
                id: "tags",
                size: 16
            }
        });
        return {
            type: "ListItem",
            title: hook.name,
            // Condensed description: type, active state, and creation date.
            description: `Type: ${hook.type} • Active: ${hook.active} • Created: ${formatDate(hook.created_at)}`,
            // A cog icon colored by active status for quick visual cue.
            startElement: {
                type: "Icon",
                id: "cog",
                size: 20,
                color: hook.active ? "green" : "gray"
            },
            endElement: endElements
        };
    });
    // Return a List component containing all the hooks.
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=450.js.map