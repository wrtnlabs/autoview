export function transform($input) {
    return visualizeData($input);
}
// visualizeData transforms the input schema into an AutoView component.
// Since Schema.empty_object has no fields, we render an "empty state" card with an icon and markdown.
function visualizeData(input) {
    // Use an informational icon to make the UI engaging
    const infoIcon = {
        type: "Icon",
        id: "info-circle", // FontAwesome icon name
        color: "gray",
        size: 40,
    };
    // Card header with icon and title
    const header = {
        type: "CardHeader",
        title: "No Data Available",
        startElement: infoIcon,
    };
    // Markdown explaining the empty state (more engaging than plain text)
    const markdown = {
        type: "Markdown",
        content: "It looks like there is no data to display. Please provide input to visualize meaningful content.",
    };
    // Card content to wrap the markdown
    const content = {
        type: "CardContent",
        childrenProps: markdown,
    };
    // Return a responsive vertical card combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=615.js.map