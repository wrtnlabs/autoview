export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data or empty input, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No GitHub integrations found\nPlease check back later or install a new integration.",
        };
    }
    // Filter out any null entries that may have passed through
    const integrations = input.filter((i) => i !== null);
    // A small helper to pick a consistent avatar color variant based on slug
    const colorVariants = [
        "primary", "secondary", "success", "error", "warning", "info",
        "red", "orange", "yellow", "lime", "green", "teal",
        "cyan", "blue", "indigo", "violet", "pink", "gray", "darkGray"
    ];
    function pickVariant(name) {
        if (!name)
            return "gray";
        const idx = name.length % colorVariants.length;
        return colorVariants[idx];
    }
    // Transform each integration into a DataListItemProps
    const childrenProps = integrations.map(integration => {
        var _a, _b;
        // Fallback text for missing fields
        const description = (_a = integration.description) !== null && _a !== void 0 ? _a : "_No description provided._";
        const installCount = (_b = integration.installations_count) !== null && _b !== void 0 ? _b : 0;
        const eventCount = Array.isArray(integration.events) ? integration.events.length : 0;
        return {
            type: "DataListItem",
            title: integration.name,
            // Use a markdown sub-component for description so links and formatting render nicely
            description: [
                {
                    type: "Markdown",
                    content: description,
                }
            ],
            // A simple avatar showing the name initials and colored by slug
            startElement: {
                type: "Avatar",
                name: integration.name,
                variant: pickVariant(integration.slug),
                size: 32,
            },
            // Show badges for installations and events, plus a button to view the app
            endElement: [
                // Installations badge
                {
                    type: "Badge",
                    count: installCount,
                    showZero: true,
                    maxCount: 999,
                    childrenProps: {
                        type: "Icon",
                        id: "download",
                        color: "blue",
                        size: 16,
                    },
                },
                // Events badge
                {
                    type: "Badge",
                    count: eventCount,
                    showZero: true,
                    childrenProps: {
                        type: "Icon",
                        id: "bolt",
                        color: "yellow",
                        size: 16,
                    },
                },
                // View button linking to the integration's GitHub page
                {
                    type: "Button",
                    variant: "text",
                    color: "primary",
                    size: "small",
                    startElement: {
                        type: "Icon",
                        id: "external-link-alt",
                        color: "primary",
                        size: 16,
                    },
                    label: ["View"],
                    href: integration.html_url,
                },
            ],
        };
    });
    // Compose a DataList to render all items in a responsive list
    return {
        type: "DataList",
        childrenProps,
    };
}
//# sourceMappingURL=646.js.map