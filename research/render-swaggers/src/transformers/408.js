export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Card header showing an icon and the total count of labels
    const header = {
        type: "CardHeader",
        title: "Runner Labels",
        description: `Total: ${input.total_count}`,
        startElement: {
            type: "Icon",
            id: "tags",
            color: "blue",
            size: 24
        }
    };
    // Build a list of DataListItemProps for each runner_label
    const items = input.labels.map(label => {
        var _a;
        // Primary text showing the label's name
        const nameText = {
            type: "Text",
            content: label.name,
            variant: "body1"
        };
        // If the label has an ID, show it as a badge on a small tag icon
        const idBadge = label.id !== undefined
            ? {
                type: "Badge",
                count: label.id,
                maxCount: 999,
                showZero: false,
                dot: false,
                offset: { vertical: "top", horizontal: "right" },
                childrenProps: {
                    type: "Icon",
                    id: "tag",
                    color: "gray",
                    size: 16
                }
            }
            : null;
        // Chip to represent whether the label is custom or read-only
        const chipColor = label.type === "custom" ? "success" : "info";
        const typeChip = {
            type: "Chip",
            label: (_a = label.type) !== null && _a !== void 0 ? _a : "custom",
            color: chipColor,
            size: "small",
            variant: "filled"
        };
        return {
            type: "DataListItem",
            label: [
                nameText,
                // filter out null in case there's no ID
                ...(idBadge ? [idBadge] : [])
            ],
            value: typeChip
        };
    });
    // If there are no labels, show a Markdown message; otherwise a DataList
    const contentChild = items.length > 0
        ? {
            type: "DataList",
            childrenProps: items
        }
        : {
            type: "Markdown",
            content: "_No labels available._"
        };
    const content = {
        type: "CardContent",
        childrenProps: contentChild
    };
    // Wrap everything in a vertical card for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=408.js.map