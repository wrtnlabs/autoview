export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // The input schema is defined as an empty object (Schema.empty_object),
    // so there are no fields to visualize. To provide a graceful fallback,
    // we render a Markdown message indicating that there's nothing to display.
    return {
        type: "Markdown",
        content: `
# No Data Available

The provided input object contains no data to visualize.
    `.trim(),
    };
}
//# sourceMappingURL=743.js.map