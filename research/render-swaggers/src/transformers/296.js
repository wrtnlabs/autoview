export function transform($input) {
    return visualizeData($input);
}
// The visualizeData function transforms arbitrary input into a Markdown component
// showing the serialized JSON. This provides a responsive, mobile-friendly
// UI by leveraging the Markdown renderer, and falls back gracefully if
// serialization fails.
function visualizeData(input) {
    let content;
    try {
        // Serialize the input to pretty-printed JSON.
        const json = JSON.stringify(input, null, 2);
        // Use a fenced code block for clear syntax highlighting in Markdown.
        content = [
            "Here is the data visualization in JSON format:",
            "json",
            json,
            "```"
        ].join("\n");
    }
    catch (e) {
        // If serialization fails, fall back to a simple text representation.
        content = `Unable to serialize input data: ${String(e)}`;
    }
    // Return a Markdown component to render the JSON or error message.
    return {
        type: "Markdown",
        content
    };
}
//# sourceMappingURL=296.js.map