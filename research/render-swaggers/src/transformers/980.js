export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no keys are present, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "## No SSH Signing Keys Found\n\n" +
                "You don't have any SSH signing keys yet. " +
                "Add a new key to start signing your commits securely."
        };
    }
    // Helper to format ISO date-time strings into a human-readable date
    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
    // Build a ListItemProps for each SSH signing key
    const items = input.map((item) => ({
        type: "ListItem",
        title: item.title, // Display the key's title
        description: `ID: ${item.id}`, // Show the numeric ID
        // Left icon to visually represent a key
        startElement: {
            type: "Icon",
            id: "key",
            color: "blue",
            size: 24
        },
        // Show the creation date as a chip on the right
        endElement: {
            type: "Chip",
            label: formatDate(item.created_at),
            size: "small",
            variant: "outlined",
            color: "info"
        }
    }));
    // Add a sticky subheader indicating the count of keys
    const header = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            variant: "h6",
            content: `SSH Signing Keys (${input.length})`
        }
    };
    // Compose the final List component
    return {
        type: "List",
        childrenProps: [header, ...items]
    };
}
//# sourceMappingURL=980.js.map