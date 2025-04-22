export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, render a friendly markdown message rather than empty text
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No data available\n\nThere are no items to display."
        };
    }
    // A palette of colors to cycle through for visual distinction.
    // Feel free to adjust or extend this list as needed.
    const colorPalette = [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "teal",
        "cyan",
        "violet",
        "pink"
    ];
    // Transform each string into a colored chip
    const chips = input.map((value, index) => {
        const color = colorPalette[index % colorPalette.length];
        return {
            type: "Chip",
            label: value,
            color,
            variant: "filled",
            size: "medium"
        };
    });
    // Use a ChipGroup so that on small screens, extra items collapse into a "+N" chip
    return {
        type: "ChipGroup",
        childrenProps: chips,
        // show up to 6 chips, collapse the rest into a "+N" indicator
        maxItems: 6
    };
}
//# sourceMappingURL=641.js.map