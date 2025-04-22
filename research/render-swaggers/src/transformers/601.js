export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since the input schema is an empty object, there is no actual data to visualize.
    // Provide a user‑friendly placeholder UI indicating the absence of data.
    // Compose a vertical card with a header and markdown content.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with an informational icon to indicate no data.
                type: "CardHeader",
                title: "No Data",
                description: "There is no data to display.",
                startElement: {
                    type: "Icon",
                    id: "info-circle", // FontAwesome “info-circle” icon
                    color: "gray",
                    size: 24,
                },
            },
            {
                // Card content with markdown for richer text formatting.
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: [
                            "#### No Data Available",
                            "",
                            "The dataset is empty. Please provide valid data to visualize."
                        ].join("\n"),
                    }
                ],
            }
        ],
    };
}
//# sourceMappingURL=601.js.map