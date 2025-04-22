export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Determine if we have meaningful result text
    const raw = (_a = input.result) === null || _a === void 0 ? void 0 : _a.trim();
    const hasResult = typeof raw === "string" && raw.length > 0;
    // Card header with an icon to visually label the section
    const header = {
        type: "CardHeader",
        title: "Result",
        // Use a file-alt icon from FontAwesome to denote a text result
        startElement: {
            type: "Icon",
            id: "file-alt",
            color: "blue",
            size: 20
        }
    };
    // If there is result text, render it as markdown for better readability
    // Otherwise, show a Chip indicating "No result"
    const content = hasResult
        ? {
            type: "Markdown",
            // Surround with code fences if it seems like code; else raw markdown
            content: raw.startsWith("") ? raw : raw
        }
        : {
            type: "Chip",
            label: "No result",
            color: "warning",
            variant: "outlined"
        };
    // Compose a vertical card to make the layout responsive and mobile-friendly
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            // Wrap content in CardContent for consistent padding
            {
                type: "CardContent",
                childrenProps: content
            }
        ]
    };
    return card;
}
//# sourceMappingURL=185.js.map