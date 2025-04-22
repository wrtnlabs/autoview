export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since `IAutoViewTransformerInputType` is an empty object, there's no
    // dynamic data to render. We choose to render a friendly Markdown message
    // to inform the user there’s no data available.
    return {
        type: "Markdown",
        content: "# No Data Available\n\nThere is no information to display."
    };
}
//# sourceMappingURL=580.js.map