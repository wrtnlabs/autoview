export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since the input schema is an empty object, there are no fields to visualize.
    // Provide a user-friendly markdown message instead of raw text.
    return {
        type: "Markdown",
        content: `
# No Data Available

There is currently no data to display.
    `.trim()
    };
}
//# sourceMappingURL=720.js.map