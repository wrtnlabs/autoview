export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Prepare content: use provided string or fallback to a notice
    const raw = (_a = input.result) === null || _a === void 0 ? void 0 : _a.trim();
    const markdownContent = raw
        ? raw
        : "_No data available_"; // italic fallback in markdown
    return {
        // Use a vertical card to group header (icon + title) and content
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with an icon for visual cue
                type: "CardHeader",
                title: "Results",
                startElement: {
                    type: "Icon",
                    id: "chart-bar", // FontAwesome solid icon name
                    color: "teal", // A friendly accent color
                    size: 24, // Reasonable icon size for header
                },
            },
            {
                // Card content rendering the result as markdown
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: markdownContent,
                },
            },
        ],
    };
}
//# sourceMappingURL=237.js.map