export function transform($input) {
    return visualizeData($input);
}
// Transforms runner labels response into a visual AutoView component
function visualizeData(input) {
    const { total_count, labels } = input;
    // If there are no labels, show a simple markdown message
    if (!labels || labels.length === 0) {
        return {
            type: "Markdown",
            content: "### No Runner Labels\nThere are no labels available for this repository runner."
        };
    }
    // Map each runner label into a Chip component
    const chipItems = labels.map(label => {
        // Determine styling based on label type (read-only vs custom)
        const isCustom = label.type === "custom";
        return {
            type: "Chip",
            label: label.name,
            variant: isCustom ? "filled" : "outlined",
            color: isCustom ? "primary" : "gray",
            size: "small"
        };
    });
    // Group all chips together
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: chipItems
    };
    // Build a card header with an icon and summary
    const header = {
        type: "CardHeader",
        title: "Runner Labels",
        description: `${total_count} total`,
        startElement: {
            type: "Icon",
            id: "tag", // FontAwesome "tag" icon
            size: 16,
            color: "cyan"
        }
    };
    // Card content holds the chip group
    const content = {
        type: "CardContent",
        childrenProps: chipGroup
    };
    // Return a vertical card containing header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
    return card;
}
//# sourceMappingURL=597.js.map