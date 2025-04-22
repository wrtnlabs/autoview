export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure the API response
    const { total_count, labels } = input;
    // Build the card header: title, description, and an icon for context
    const header = {
        type: "CardHeader",
        title: "Runner Labels",
        description: `Total: ${total_count}`,
        startElement: {
            type: "Icon",
            id: "tags", // a FontAwesome icon representing labels
            color: "blue", // use a standard color to tie into theme
            size: 32, // prominent size for header
        },
    };
    // Decide what to show in the card content:
    // - If there are no labels, show a friendly markdown note.
    // - Otherwise, render all labels as a group of colored chips.
    const contentChild = labels.length === 0
        ? {
            type: "Markdown",
            content: "_No labels available_",
        }
        : {
            type: "ChipGroup",
            // Map each runner_label into a Chip with an icon indicating its type.
            childrenProps: labels.map((label) => {
                const icon = {
                    type: "Icon",
                    id: label.type === "read-only" ? "lock" : "tag",
                    color: label.type === "read-only" ? "gray" : "green",
                    size: 12,
                };
                return {
                    type: "Chip",
                    label: label.name,
                    variant: label.type === "read-only" ? "outlined" : "filled",
                    color: label.type === "read-only" ? "gray" : "primary",
                    size: "small",
                    startElement: icon,
                };
            }),
            // Show up to 10 chips before collapsing into a "+n" indicator
            maxItems: 10,
        };
    // Wrap the chosen content in a CardContent component
    const content = {
        type: "CardContent",
        childrenProps: contentChild,
    };
    // Return a vertical card composed of the header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=406.js.map