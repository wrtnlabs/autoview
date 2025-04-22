export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since `Schema.empty_object` has no properties, we render a user‐friendly placeholder
    // using a vertical card with an alert icon and a markdown message to keep things engaging.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with an icon to draw attention
                type: "CardHeader",
                title: "No Data Available",
                startElement: {
                    type: "Icon",
                    // Uses FontAwesome's `exclamation-circle` icon in gray to indicate emptiness
                    id: "exclamation-circle",
                    color: "gray",
                    size: 24,
                },
            },
            {
                // Card content with markdown for nicer text formatting
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: "There is no data available to display.\n\nPlease check back later or update your query."
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=387.js.map