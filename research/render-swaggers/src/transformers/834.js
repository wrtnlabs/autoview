export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of diff entries into a visual DataList component
function visualizeData(input) {
    // If no diffs, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No changes detected\n\nThere are no modifications to display."
        };
    }
    // Map git status to icon names and colors
    const statusMap = {
        added: { id: "plus", color: "green" },
        removed: { id: "trash", color: "red" },
        modified: { id: "pen", color: "orange" },
        renamed: { id: "exchange-alt", color: "blue" },
        copied: { id: "copy", color: "teal" },
        changed: { id: "arrows-alt-h", color: "gray" },
        unchanged: { id: "minus", color: "gray" }
    };
    // Build a DataListItemProps for each diff entry
    const items = input.map((entry) => {
        var _a;
        // Pick an icon + color for the entry's status (fallback to generic file icon)
        const statusInfo = (_a = statusMap[entry.status]) !== null && _a !== void 0 ? _a : { id: "file", color: "gray" };
        // Label area: [ status icon, filename text ]
        const label = [
            {
                type: "Icon",
                id: statusInfo.id,
                color: statusInfo.color,
                size: 16
            },
            {
                type: "Text",
                content: entry.filename,
                variant: "body1"
            }
        ];
        // Value area: chips showing additions, deletions, changes + a "View" button
        const value = [
            {
                type: "Chip",
                label: `+${entry.additions}`,
                color: "green",
                size: "small",
                variant: "outlined"
            },
            {
                type: "Chip",
                label: `-${entry.deletions}`,
                color: "red",
                size: "small",
                variant: "outlined"
            },
            {
                type: "Chip",
                label: `${entry.changes} change(s)`,
                color: "teal",
                size: "small",
                variant: "outlined"
            },
            {
                type: "Button",
                label: "View",
                href: entry.blob_url,
                startElement: {
                    type: "Icon",
                    id: "eye",
                    size: 16,
                    color: "blue"
                },
                variant: "text",
                color: "primary",
                size: "small"
            }
        ];
        return {
            type: "DataListItem",
            label,
            value
        };
    });
    // Return a responsive DataList wrapping all items
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=834.js.map