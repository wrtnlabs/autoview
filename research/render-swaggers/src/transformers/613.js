export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Since the input schema is an empty object (no fields),
     * we render a friendly "no data" placeholder using a Markdown component.
     * Markdown is preferred over plain text for simple formatting and responsiveness.
     */
    return {
        type: "Markdown",
        content: `
> **No data available**

There is currently nothing to display. Please provide valid input data to visualize.
    `.trim()
    };
}
//# sourceMappingURL=613.js.map