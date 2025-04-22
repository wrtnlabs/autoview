export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since the input type is an empty object (Schema.empty_object), there is no business data to render.
    // We fallback to a markdown component displaying a friendly "no data" message,
    // as a text representation is unavoidable here.
    return {
        type: "Markdown",
        content: `
# No Data Available

There is nothing to display at the moment.
`
    };
}
//# sourceMappingURL=413.js.map