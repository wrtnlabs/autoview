export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Generic fallback visualization:
     * When we cannot infer a richer visualization from the input shape,
     * render the raw JSON as a fenced code block using the Markdown component.
     * Markdown will automatically produce a responsive, scrollable code viewer
     * on both desktop and mobile.
     */
    const jsonString = JSON.stringify(input, null, 2);
    return {
        type: "Markdown",
        content: [
            "### Data Preview",
            "",
            "json",
            jsonString,
            "```"
        ].join("\n")
    };
}
//# sourceMappingURL=288.js.map