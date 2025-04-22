export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no sections in the input, show a friendly message via markdown
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No shopping sections available\n\nThere are no records to display.",
        };
    }
    // Build a List of sections with a sticky summary header
    const listChildren = [];
    // 1. Add a summary subheader showing pagination info
    listChildren.push({
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            // e.g. "Page 1 of 10 — 100 total sections"
            content: `Page ${input.pagination.current} of ${input.pagination.pages} — ${input.pagination.records} total sections`,
            variant: "subtitle2",
            color: "primary",
        },
    });
    // 2. Map each section to a ListItem
    for (const section of input.data) {
        // Format the creation timestamp to a friendly date
        let createdLabel;
        try {
            const dt = new Date(section.created_at);
            createdLabel = isNaN(dt.getTime())
                ? section.created_at
                : dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        }
        catch (_a) {
            createdLabel = section.created_at;
        }
        listChildren.push({
            type: "ListItem",
            title: section.name,
            description: section.code,
            // Use a store icon to visualize the section
            startElement: {
                type: "Icon",
                id: "store",
                color: "blue",
                size: 24,
            },
            // Show the creation date on the right
            endElement: {
                type: "Text",
                content: createdLabel,
                variant: "caption",
                color: "gray",
            },
        });
    }
    // Return the final List component
    return {
        type: "List",
        childrenProps: listChildren,
    };
}
//# sourceMappingURL=166.js.map