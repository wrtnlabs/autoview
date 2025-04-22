export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Edge case: if there are no labels, display a friendly message via Markdown
    if (!input.labels || input.labels.length === 0) {
        return {
            type: "Markdown",
            content: "# No Runner Labels Found\n\nThere are currently no labels to display.",
        };
    }
    // Transform each runner label into a Chip component
    const chips = input.labels.map((label) => {
        // Distinguish read-only vs custom labels with different icons/colors
        const isReadOnly = label.type === "read-only";
        const icon = {
            type: "Icon",
            id: isReadOnly ? "lock" : "tag",
            color: isReadOnly ? "gray" : "teal",
            size: 16,
        };
        const chipColor = isReadOnly ? "gray" : "teal";
        return {
            type: "Chip",
            label: label.name,
            // Prepend the lock or tag icon to each chip
            startElement: icon,
            variant: "outlined",
            size: "small",
            color: chipColor,
        };
    });
    // Group all chips into a responsive ChipGroup
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: chips,
        // Show all items by default; UI will wrap on small screens
        maxItems: chips.length,
    };
    // Create a card header with an overview icon and total count
    const header = {
        type: "CardHeader",
        title: "Runner Labels",
        description: `Total: ${input.total_count}`,
        startElement: {
            type: "Icon",
            id: "tags",
            color: "blue",
            size: 24,
        },
    };
    // Place the chip group inside the card content area
    const content = {
        type: "CardContent",
        childrenProps: chipGroup,
    };
    // Assemble everything into a vertical card for a clean, mobile‑friendly layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=405.js.map