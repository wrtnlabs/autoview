export function transform($input) {
    return visualizeData($input);
}
// Transforms an integer result into a visual card with icon, markdown and action button
function visualizeData(input) {
    const value = input.result;
    // If no numeric result is provided, show a simple indicator chip
    if (value === undefined || value === null) {
        return {
            type: "Chip",
            label: "No Data",
            color: "gray",
            variant: "outlined",
        };
    }
    // Main presentation: vertical card with header, content (big markdown), and footer action
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with title, description and leading icon
                type: "CardHeader",
                title: "Result",
                description: "Computed integer value",
                startElement: {
                    type: "Icon",
                    id: "hashtag", // font‑awesome hashtag icon to denote number
                    color: "blue",
                    size: 24,
                },
            },
            {
                // Card content: render the integer as a large markdown heading
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: `\n# ${value}\n`
                    }
                ],
            },
            {
                // Card footer: a copy-to-clipboard button for convenience
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        label: "Copy",
                        variant: "outlined",
                        color: "primary",
                        size: "small",
                        startElement: {
                            type: "Icon",
                            id: "copy",
                            color: "gray",
                            size: 16,
                        },
                    }
                ],
            }
        ],
    };
}
//# sourceMappingURL=221.js.map