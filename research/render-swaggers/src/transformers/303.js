export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle nullish input: show a simple text message
    if (input === null || input === undefined) {
        return {
            type: "Text",
            variant: "subtitle1",
            content: ["No data available"],
        };
    }
    // Handle primitive input: render directly as text
    const primType = typeof input;
    if (primType === "string" || primType === "number" || primType === "boolean") {
        // Use Markdown if string is large, else plain Text
        const text = String(input);
        if (text.length > 100) {
            return {
                type: "Markdown",
                content: "\n" + text + "\n```",
            };
        }
        return {
            type: "Text",
            variant: "body1",
            content: [text],
        };
    }
    // For objects or arrays: wrap a collapsible JSON preview
    // JSON.stringify may throw on circular refs; we catch and fallback
    let jsonString;
    try {
        jsonString = JSON.stringify(input, null, 2);
    }
    catch (_a) {
        jsonString = "[Cannot display content: circular reference]";
    }
    // Compose a Collapse component with a header and markdown content
    return {
        type: "Collapse",
        header: {
            type: "CollapseHeader",
            // An icon to show expand/collapse affordance
            toggleIcon: {
                type: "Icon",
                id: "caret-down",
                size: 16,
                color: "gray",
            },
            // Title of the collapse panel
            childrenProps: {
                type: "Text",
                variant: "subtitle1",
                content: ["Data Preview"],
            },
        },
        content: {
            type: "CollapseContent",
            // Use Markdown to get syntax highlighting for JSON
            childrenProps: {
                type: "Markdown",
                content: "```json\n" + jsonString + "\n```",
            },
        },
    };
}
//# sourceMappingURL=303.js.map