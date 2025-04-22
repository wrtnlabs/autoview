export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no labels, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No labels found\nThere are no labels to display.",
        };
    }
    // Transform each GitHub label into a DataListItem:
    // - label: a chip with a tag icon
    // - value: the label description (or a fallback)
    const childrenProps = input.map((lbl) => {
        // Chip for the label name with a tag icon
        const labelChip = {
            type: "Chip",
            label: lbl.name,
            variant: "filled",
            // Use a neutral color; GitHub hex color codes are not supported by ChipProps
            color: "gray",
            startElement: {
                type: "Icon",
                id: "tag",
                color: "gray",
                size: 16,
            },
        };
        // Text component for the description
        const descriptionText = {
            type: "Text",
            variant: "body2",
            // If description is null or empty, show a placeholder
            content: lbl.description && lbl.description.trim().length > 0
                ? lbl.description
                : "No description",
        };
        return {
            type: "DataListItem",
            label: labelChip,
            value: descriptionText,
        };
    });
    // Wrap all items in a DataList for a clean key–value display.
    return {
        type: "DataList",
        childrenProps,
    };
}
//# sourceMappingURL=790.js.map