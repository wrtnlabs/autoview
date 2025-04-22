export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no result or it's an empty string, show a warning chip
    if (!input.result || input.result.trim() === "") {
        return {
            type: "VerticalCard",
            childrenProps: [
                {
                    // Card header with an exclamation icon for empty state
                    type: "CardHeader",
                    title: "Result",
                    startElement: {
                        type: "Icon",
                        id: "exclamation-circle", // FontAwesome kebab-case
                        color: "orange",
                        size: 24,
                    },
                },
                {
                    // Card content containing a single chip indicating no data
                    type: "CardContent",
                    childrenProps: {
                        type: "Chip",
                        label: "No result available",
                        color: "gray",
                        variant: "outlined",
                        size: "medium",
                    },
                },
            ],
        };
    }
    // Otherwise render the result string as markdown for richer formatting
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with a document icon
                type: "CardHeader",
                title: "Result",
                startElement: {
                    type: "Icon",
                    id: "file-alt",
                    color: "blue",
                    size: 24,
                },
            },
            {
                // Markdown component will render headings, lists, links, etc.
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: input.result,
                },
            },
        ],
    };
}
//# sourceMappingURL=269.js.map