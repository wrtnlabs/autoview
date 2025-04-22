export function transform($input) {
    return visualizeData($input);
}
// Transforms the input (an empty object) into a visual component.
// Since there are no fields on `Schema.empty_object`, we display
// a simple markdown notification. Users can extend this logic when
// additional properties are added to the schema.
function visualizeData(input) {
    // Inform the user that there's nothing to display.
    return {
        type: "Markdown",
        content: "### No data available."
    };
}
//# sourceMappingURL=445.js.map