export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no columns are present, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No Project Columns\n\nThere are no project columns to display.",
        };
    }
    // Map each project column into a ListItem component for visual display.
    const listItems = input.map((col) => {
        // Format the updated_at timestamp for user readability.
        // You may adjust locale or formatting options as needed.
        const updatedAt = new Date(col.updated_at).toLocaleString();
        return {
            type: "ListItem",
            title: col.name,
            description: `Last updated: ${updatedAt}`,
            // An icon to visually represent the column.
            startElement: {
                type: "Icon",
                id: "folder",
                size: 24,
                color: "blue",
            },
            // A directional arrow to indicate this item is clickable.
            endElement: {
                type: "Icon",
                id: "arrow-right",
                size: 20,
                color: "gray",
            },
            // Link the entire list item to the project's column URL.
            href: col.url,
        };
    });
    // Return a responsive list of the project columns.
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=568.js.map