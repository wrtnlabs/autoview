export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map each shopping channel to a ListItem for a responsive list view
    const children = input.data.map((channel) => {
        // Attempt to parse and format the creation timestamp
        let dateLabel;
        const date = new Date(channel.created_at);
        if (!isNaN(date.valueOf())) {
            // Format as local date and time
            dateLabel = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
        else {
            // If parsing fails, fall back to the raw string
            dateLabel = channel.created_at;
        }
        return {
            type: "ListItem",
            // Display channel name as the primary title
            title: channel.name,
            // Show formatted creation date as a subtitle
            description: `Created: ${dateLabel}`,
            // Prepend a calendar icon for visual context
            startElement: {
                type: "Icon",
                id: "calendar-day", // FontAwesome calendar-day icon
                color: "gray",
                size: 20
            },
            // Append a chip showing the channel code
            endElement: {
                type: "Chip",
                label: channel.code,
                variant: "outlined",
                size: "small",
                color: "blue"
            }
        };
    });
    // Wrap all items in a List component for the final UI
    return {
        type: "List",
        childrenProps: children.length > 0 ? children : [] // ensure an array even if empty
    };
}
//# sourceMappingURL=111.js.map