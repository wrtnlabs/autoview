export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Clone and sort labels by name for consistent ordering
    const sortedLabels = [...input].sort((a, b) => a.name.localeCompare(b.name));
    // Map each label to a DataListItemProps
    const items = sortedLabels.map(label => {
        // Build the "label" area: avatar + name + optional default-star icon
        const labelComponents = [];
        // 1. Avatar with the first letter of the label name
        labelComponents.push({
            type: "Avatar",
            name: label.name.charAt(0).toUpperCase(),
            variant: "gray",
            size: 24,
        });
        // 2. Text component for the full label name
        labelComponents.push({
            type: "Text",
            content: label.name,
            variant: "body1",
        });
        // 3. If it's a default label, append a star icon
        if (label.default) {
            labelComponents.push({
                type: "Icon",
                id: "star",
                size: 12,
                color: "yellow",
            });
        }
        // Build the "value" area: use markdown for description if present
        // Otherwise show a placeholder Text
        let valueComponent;
        if (label.description) {
            // Render description via markdown for richer formatting
            valueComponent = {
                type: "Markdown",
                content: label.description,
            };
        }
        else {
            // Empty description fallback
            valueComponent = {
                type: "Text",
                content: "_No description_",
                variant: "caption",
                color: "tertiary",
            };
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent,
        };
    });
    // Wrap all items in a DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=811.js.map