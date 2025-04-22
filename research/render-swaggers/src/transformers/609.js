export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Serialize the entire input object into a prettified JSON string.
    // Wrapping it in a Markdown code block provides a dynamic and readable
    // visualization for any shape of data, without hard-coding field names.
    const jsonString = JSON.stringify(input, null, 2);
    // Return a Markdown component showing the JSON.
    // This uses IAutoViewMarkdownProps, which is a valid IAutoViewComponentProps.
    return {
        type: "Markdown",
        content: [
            // Prepend a title for context; users can customize or remove this.
            "# Data Preview",
            "",
            // The code block for JSON content.
            "json",
            jsonString,
            "```"
        ].join("\n")
    };
}
//# sourceMappingURL=609.js.map