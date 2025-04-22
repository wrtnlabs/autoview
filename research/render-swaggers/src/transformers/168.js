export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Format the creation timestamp into a human‐readable date.
    // If parsing fails, fall back to the raw string.
    const createdDate = new Date(input.created_at);
    const createdLabel = isNaN(createdDate.getTime())
        ? input.created_at
        : createdDate.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    return {
        // Use a vertical card to present the section in a compact, responsive layout
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with a section icon, the name as title, and the code in the description
                type: "CardHeader",
                title: input.name,
                description: `Section Code: ${input.code}`,
                startElement: {
                    type: "Icon",
                    id: "layer-group", // FontAwesome icon name; represents a grouped section
                    size: 24,
                    color: "blue",
                },
            },
            {
                // Card content displaying the ID and creation date as visual chips
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Chip",
                        label: `ID: ${input.id}`,
                        variant: "outlined",
                        size: "small",
                        color: "secondary",
                    },
                    {
                        type: "Chip",
                        label: createdLabel,
                        variant: "filled",
                        size: "small",
                        color: "info",
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=168.js.map