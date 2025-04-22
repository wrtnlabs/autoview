export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * If there are no labels, we return a simple text component.
     */
    if (!input || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No labels found.",
        };
    }
    /**
     * We will render the labels in a Markdown table.
     * - Name column: label name
     * - Description column: the label description or a dash if missing
     * - Color column: an inline HTML span with a colored square using the label's hex color code
     *
     * Most Markdown renderers support inline HTML for small elements like this.
     */
    const tableLines = [];
    tableLines.push("| Name | Description | Color |");
    tableLines.push("| ---- | ----------- | ----- |");
    for (const lbl of input) {
        // Safely escape any pipe characters in text to avoid breaking the table
        const safeName = lbl.name.replace(/\|/g, "\\|");
        const safeDesc = lbl.description
            ? lbl.description.replace(/\|/g, "\\|")
            : "—";
        // Inline HTML for a colored square. This will render as a small box of the label's color.
        // We use vertical-align to line it up nicely with text baseline.
        const colorSpan = `<span style="background-color:#${lbl.color};display:inline-block;width:1em;height:1em;border-radius:0.125em;vertical-align:middle;border:1px solid #ccc;"></span>`;
        tableLines.push(`| ${safeName} | ${safeDesc} | ${colorSpan} |`);
    }
    const markdownContent = tableLines.join("\n");
    return {
        type: "Markdown",
        content: markdownContent,
    };
}
//# sourceMappingURL=788.js.map