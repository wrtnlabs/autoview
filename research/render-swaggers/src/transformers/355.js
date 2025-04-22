export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Count items for branching logic
    const count = input.length;
    // Edge case: no data provided
    if (count === 0) {
        return {
            type: "Markdown",
            content: "### No items to display\n\nThere is no data available to visualize."
        };
    }
    // A simple color palette for chips, cycled by index
    const palette = [
        "red", "orange", "yellow", "lime", "green",
        "teal", "cyan", "blue", "indigo", "violet",
        "pink", "gray", "darkGray"
    ];
    // If there are only a few items, show them as clickable chips
    if (count <= 5) {
        return {
            type: "ChipGroup",
            childrenProps: input.map((item, idx) => ({
                type: "Chip",
                label: item,
                // cycle through our palette
                color: palette[idx % palette.length],
                size: "medium",
                variant: "filled"
            }))
        };
    }
    // For many items, use a data list with icons for visual hierarchy
    return {
        type: "DataList",
        childrenProps: input.map((item) => ({
            type: "DataListItem",
            // prepend a small icon to each entry, then the text
            label: [
                {
                    type: "Icon",
                    id: "circle",
                    size: 8,
                    color: "blue"
                },
                {
                    type: "Text",
                    content: item
                }
            ]
        }))
    };
}
//# sourceMappingURL=355.js.map