export function transform($input) {
    return visualizeData($input);
}
// The visualizeData function transforms the (empty) input into a UI component.
// Since Schema.empty_object contains no data, we render a friendly "no data" card.
// This approach is easy to extend when real fields are added to the input type.
function visualizeData(input) {
    // Detect empty input state: no properties to display.
    // In future, if Schema.empty_object is extended, replace this branch with
    // detailed transformation logic based on input fields.
    if (Object.keys(input).length === 0) {
        // Compose a small vertical card with an info icon and a message.
        const header = {
            type: "CardHeader",
            title: "No Data",
            // Use a neutral info icon to indicate empty state.
            startElement: {
                type: "Icon",
                id: "info-circle", // FontAwesome name without prefix
                color: "gray",
                size: 24,
            },
        };
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "Text",
                variant: "body2",
                color: "gray",
                content: "There is currently no data to display.",
            },
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content],
        };
    }
    // Fallback: if somehow input is non‐empty, show raw JSON in markdown.
    // This ensures we never break if input gains fields unexpectedly.
    return {
        type: "Markdown",
        content: [
            "## Raw Data",
            "json",
            JSON.stringify(input, null, 2),
            "```",
        ].join("\n"),
    };
}
//# sourceMappingURL=667.js.map