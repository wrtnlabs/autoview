export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no labels, show a friendly markdown message
    if (!input.labels || input.labels.length === 0) {
        return {
            type: "Markdown",
            content: `
### No Runner Labels Found

This repository has no self-hosted runner labels associated with it.
      `.trim()
        };
    }
    // Map each runner_label to an interactive Chip with an icon indicating its type
    const chips = input.labels.map(label => {
        // Choose an icon and color based on the label type
        const isReadOnly = label.type === "read-only";
        const iconId = isReadOnly ? "lock" : "tag";
        const iconColor = isReadOnly ? "gray" : "blue";
        const chipColor = isReadOnly ? "gray" : "primary";
        return {
            type: "Chip",
            label: label.name,
            variant: "filled",
            color: chipColor,
            startElement: {
                type: "Icon",
                id: iconId,
                color: iconColor,
                size: 16
            }
        };
    });
    // Compose a vertical card: header summarizes total count, content displays the chips
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with a title, description, and a tags icon
                type: "CardHeader",
                title: `${input.total_count} Runner Label${input.total_count === 1 ? "" : "s"}`,
                description: "Labels for self-hosted runners in this repository.",
                startElement: {
                    type: "Icon",
                    id: "tags",
                    color: "teal",
                    size: 24
                }
            },
            {
                // Card content holds a ChipGroup that lays out all label chips
                type: "CardContent",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: chips
                }
            }
        ]
    };
}
//# sourceMappingURL=593.js.map