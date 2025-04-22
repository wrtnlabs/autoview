export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Since the API returns an empty object for a successful column move,
    // we render a confirmation UI. If the API is extended to return details,
    // this function can be updated to visualize them here.
    // A vertical card layout provides a compact, responsive container
    // with a header (including an icon) and content (rich markdown).
    const successIcon = {
        type: "Icon",
        id: "check-circle", // FontAwesome icon name (kebab-case, without prefix)
        color: "green",
        size: 28,
    };
    const header = {
        type: "CardHeader",
        startElement: successIcon,
        title: "Columns Moved",
        description: "The columns have been moved successfully.",
    };
    const markdownMessage = {
        type: "Markdown",
        // Using emoji and bold text to make the confirmation more engaging.
        content: "✅ **Success:** Your columns have been moved.",
    };
    const content = {
        type: "CardContent",
        childrenProps: [markdownMessage],
    };
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=563.js.map