export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since the input type is an empty object (and may be extended in the future),
    // we render the entire payload as a JSON code block in Markdown.
    // This approach dynamically adapts to any added fields without hard‐coding.
    try {
        const serialized = JSON.stringify(input, null, 2);
        return {
            type: "Markdown",
            content: [
                "## Raw Input Data",
                "",
                "json",
                serialized,
                "```",
            ].join("\n"),
        };
    }
    catch (e) {
        // In the unlikely event of a serialization error, fallback to simple text.
        return {
            type: "Text",
            variant: "body1",
            content: "Unable to render input data.",
        };
    }
}
//# sourceMappingURL=682.js.map