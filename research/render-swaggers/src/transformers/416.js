export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since the input type is an empty object, there's no actual data to transform.
    // We provide a friendly "empty state" UI using a VerticalCard with an icon and Markdown.
    const emptyStateCard = {
        type: "VerticalCard",
        childrenProps: [
            // Card header with an informational icon
            {
                type: "CardHeader",
                title: "No Data Available",
                description: "There is no input data to visualize.",
                startElement: {
                    type: "Icon",
                    id: "info-circle", // FontAwesome icon name (kebab-case, no prefix)
                    color: "gray",
                    size: 32
                }
            },
            // Card content with a Markdown message
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: `
**Empty State**

_No input was provided to the transformer function. Please supply valid data to display visual components._
`
                }
            }
        ]
    };
    return emptyStateCard;
}
//# sourceMappingURL=416.js.map