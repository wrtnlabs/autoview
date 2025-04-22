export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "**No keys available**",
        };
    }
    // Map each record to a ListItem with icons, chips, and a link button
    const listItems = input.map((record) => {
        // Build up badges/chips and link button for the right side
        const endElements = [];
        // Show a "Verified" chip if applicable
        if (record.verified) {
            endElements.push({
                type: "Chip",
                label: "Verified",
                color: "success",
                size: "small",
                variant: "filled",
                startElement: {
                    type: "Icon",
                    id: "check-circle",
                    size: 16,
                    color: "green",
                },
            });
        }
        // Show a "Read-only" chip if applicable
        if (record.read_only) {
            endElements.push({
                type: "Chip",
                label: "Read-only",
                color: "warning",
                size: "small",
                variant: "outlined",
                startElement: {
                    type: "Icon",
                    id: "lock",
                    size: 16,
                    color: "yellow",
                },
            });
        }
        // Always include an "Open" button linking to the URL
        endElements.push({
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "link",
                size: 16,
                color: "blue",
            },
            label: "Open",
            href: record.url,
        });
        return {
            // Discriminator
            type: "ListItem",
            // Main title is the key title
            title: record.title,
            // Show the creation date in a localized format
            description: new Date(record.created_at).toLocaleString(),
            // Key icon on the left, colored if verified
            startElement: {
                type: "Icon",
                id: "key",
                size: 24,
                color: record.verified ? "green" : "gray",
            },
            // Place chips and the link button on the right
            endElement: endElements.length === 1 ? endElements[0] : endElements,
            // Make entire item clickable as well
            href: record.url,
        };
    });
    // Return a responsive list component
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=956.js.map