export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no labels, display a simple Markdown message
    if (!input.labels || input.labels.length === 0) {
        return {
            type: "Markdown",
            content: "### No runner labels available",
        };
    }
    // Map each runner label to a Chips; use a gray outline for read-only labels
    const chips = input.labels.map((label) => {
        // Choose chip color by label type
        const color = label.type === "read-only" ? "gray" : "primary";
        return {
            type: "Chip",
            label: label.name,
            color,
            variant: "outlined",
            size: "small",
        };
    });
    // Wrap all chips in a ChipGroup for compact, responsive layout
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: chips,
        // Limit visible items and collapse extras on small screens
        maxItems: 8,
    };
    // Create a card header with an icon and a summary of total labels
    const header = {
        type: "CardHeader",
        title: "Runner Labels",
        description: `Total labels: ${input.total_count}`,
        startElement: {
            type: "Icon",
            id: "tag", // FontAwesome "tag" icon
            size: 24,
            color: "cyan",
        },
    };
    // Put the chip group into the card content area
    const content = {
        type: "CardContent",
        childrenProps: chipGroup,
    };
    // Use a vertical card to stack the header and content responsively
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=594.js.map