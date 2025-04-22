export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Parse creation date and format it for display
    const createdDate = new Date(input.created_at);
    const createdAtDisplay = isNaN(createdDate.getTime())
        // If invalid, fall back to raw string
        ? input.created_at
        // Use locale-sensitive representation
        : createdDate.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    // Construct a visual card to present section information
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header: show avatar, name and code, and a chip with the ID
                type: "CardHeader",
                title: input.name,
                description: `Section Code: ${input.code}`,
                // Avatar with the first character of the name, colored teal
                startElement: {
                    type: "Avatar",
                    name: input.name,
                    variant: "teal",
                    size: 40,
                },
                // Display the internal ID as a small chip
                endElement: {
                    type: "Chip",
                    label: input.id,
                    variant: "outlined",
                    size: "small",
                    color: "gray",
                },
            },
            {
                // Content: a markdown block showing the creation timestamp
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: `**Created At:** ${createdAtDisplay}`,
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=117.js.map