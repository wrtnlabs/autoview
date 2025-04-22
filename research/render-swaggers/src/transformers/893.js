export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no names, show a friendly markdown message.
    if (!input.names || input.names.length === 0) {
        return {
            type: "Markdown",
            content: "### No topics available\nThere are currently no topics to display.",
        };
    }
    // Predefined palette for chips; will cycle through if there are more names than colors.
    const chipColors = [
        "primary",
        "secondary",
        "success",
        "warning",
        "info",
        "error",
        "teal",
        "cyan",
        "indigo",
        "pink",
    ];
    // Transform each topic name into a Chip component
    const chips = input.names.map((name, index) => ({
        type: "Chip",
        label: name,
        variant: "filled",
        size: "medium",
        // Cycle colors for visual variety
        color: chipColors[index % chipColors.length],
    }));
    // Group all chips into a ChipGroup for responsive wrapping
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: chips,
        // Show all chips by default; overflow handling can be added if needed
        maxItems: chips.length,
    };
    // Card header with an icon to label the section
    const cardHeader = {
        type: "CardHeader",
        title: "Topics",
        description: `Showing ${input.names.length} topic${input.names.length > 1 ? "s" : ""}`,
        startElement: {
            type: "Icon",
            id: "tag",
            color: "blue",
            size: 24,
        },
    };
    // Card content wrapping the chip group
    const cardContent = {
        type: "CardContent",
        childrenProps: chipGroup,
    };
    // Compose a vertical card with header and content for a concise UI.
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=893.js.map