export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We don't know the exact shape of input at compile time.
    // Fallback: render the entire input as a formatted JSON code block via Markdown component.
    // This approach is responsive and user‐friendly on all devices, and keeps the view maintainable.
    let content;
    try {
        // Pretty‐print JSON with 2‐spaces indentation
        const jsonString = JSON.stringify(input, null, 2);
        // Wrap in a fenced code block so that markdown renderers apply syntax highlighting
        content = ["json", jsonString, "```"].join("\n");
    }
    catch (e) {
        // In case serialization fails (e.g. circular references), show a simple error message
        content = "⚠️ Unable to display data. Serialization error.";
    }
    // Return a Markdown component to render the JSON payload
    const markdownProps = {
        type: "Markdown",
        content,
    };
    return markdownProps;
}
//# sourceMappingURL=284.js.map