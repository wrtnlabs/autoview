export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no labels, show a simple text message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No labels available.",
            variant: "body1",
            color: "tertiary",
        };
    }
    // Map each label to a Chip component.
    // Use a gray color for default labels, primary otherwise.
    const chips = input.map((label) => ({
        type: "Chip",
        label: label.name,
        variant: "filled",
        size: "medium",
        color: label.default ? "gray" : "primary",
        // We could add an icon to show default status, but keep it simple.
    }));
    // Compose a ChipGroup to hold all label chips.
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: chips,
        maxItems: 10, // limit for responsiveness; overflow will be hidden with "+N"
    };
    // Build a card header with an icon and summary
    const header = {
        type: "CardHeader",
        title: `Labels (${input.length})`,
        description: "A quick overview of all repository labels",
        startElement: {
            type: "Icon",
            id: "tag",
            color: "blue",
            size: 24,
        },
    };
    // Put the chip group inside CardContent
    const content = {
        type: "CardContent",
        childrenProps: chipGroup,
    };
    // Wrap everything in a vertical card for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=787.js.map