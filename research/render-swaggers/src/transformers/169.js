export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure the integer result from input
    const { result } = input;
    // Handle the edge case where result is undefined or null
    if (result === undefined || result === null) {
        // Return a visually-engaging card indicating missing data
        return {
            type: "VerticalCard",
            childrenProps: {
                type: "CardContent",
                childrenProps: [
                    // Warning icon to draw attention
                    {
                        type: "Icon",
                        id: "exclamation-triangle",
                        size: 32,
                        color: "orange",
                    },
                    // Markdown explanation for better styling control
                    {
                        type: "Markdown",
                        content: "### No Data\n\n> The integer result is not available.",
                    },
                ],
            },
        };
    }
    // Format the integer with thousand separators based on user's locale
    const formattedResult = result.toLocaleString();
    // Main card display of the integer value
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with icon, title, and description
            {
                type: "CardHeader",
                startElement: {
                    type: "Icon",
                    id: "calculator",
                    size: 24,
                    color: "blue",
                },
                title: formattedResult,
                description: "Integer Result",
            },
            // Content area using markdown for rich text
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: [
                        // Bold the value and provide context
                        `**Value:** ${formattedResult}`,
                        "",
                        // Provide a small note about the data type
                        "_This is a 32-bit integer view._",
                    ].join("\n"),
                },
            },
        ],
    };
}
//# sourceMappingURL=169.js.map