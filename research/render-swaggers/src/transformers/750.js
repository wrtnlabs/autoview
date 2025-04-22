export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to quickly create a Text component
    const makeText = (content) => ({
        type: "Text",
        content,
        // Use a small caption style for data list entries
        variant: "body2",
        color: "gray",
    });
    // Helper to create a Markdown component for code blocks or rich text
    const makeMarkdown = (md) => ({
        type: "Markdown",
        content: md,
    });
    // Build a list of data items to display each field of the blob
    const children = [];
    // Node ID
    children.push({
        type: "DataListItem",
        label: makeText("Node ID"),
        value: makeText(input.node_id),
    });
    // SHA
    children.push({
        type: "DataListItem",
        label: makeText("SHA"),
        value: makeText(input.sha),
    });
    // URL (render as link in Markdown for better UX)
    children.push({
        type: "DataListItem",
        label: makeText("URL"),
        value: makeMarkdown(`[View Blob](${input.url})`),
    });
    // Size (handle null gracefully)
    children.push({
        type: "DataListItem",
        label: makeText("Size"),
        value: makeText(input.size !== null
            ? `${input.size.toLocaleString()} bytes`
            : "Unknown"),
    });
    // Encoding
    children.push({
        type: "DataListItem",
        label: makeText("Encoding"),
        value: makeText(input.encoding),
    });
    // If highlighted content is provided, show it in a syntax-highlighted code block.
    // Otherwise, fall back to raw content in a code block.
    const codeContent = (_a = input.highlighted_content) !== null && _a !== void 0 ? _a : input.content;
    // Wrap in Markdown triple-backticks to render properly
    const codeBlock = `\`\`\`\n${codeContent}\n\`\`\``;
    children.push({
        type: "DataListItem",
        label: makeText("Content"),
        value: makeMarkdown(codeBlock),
    });
    // Compose the final DataList component
    return {
        type: "DataList",
        childrenProps: children,
    };
}
//# sourceMappingURL=750.js.map