export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map the runner label types to chip colors for visual distinction
    const chipColorMap = {
        'read-only': 'gray',
        'custom': 'primary',
    };
    // If there are no labels, render a friendly markdown message
    if (!input.labels || input.labels.length === 0) {
        return {
            type: 'Markdown',
            content: `### Runner Labels

_No labels found for this organization._`,
        };
    }
    // Create a chip for each runner label
    const chips = input.labels.map(label => {
        var _a;
        return ({
            type: 'Chip',
            label: label.name,
            // Fallback to 'primary' if type is undefined
            color: chipColorMap[(_a = label.type) !== null && _a !== void 0 ? _a : 'custom'],
            size: 'medium',
            variant: 'filled',
        });
    });
    // Header of the card showing total count with an icon
    const header = {
        type: 'CardHeader',
        title: 'Runner Labels',
        description: `Total: ${input.total_count}`,
        startElement: {
            type: 'Icon',
            id: 'tags', // using FontAwesome 'tags' icon to represent labels
            color: 'blue',
            size: 20,
        },
    };
    // Content of the card displaying the chips in a responsive group
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'ChipGroup',
            // chips will wrap responsively on small screens
            childrenProps: chips,
        },
    };
    // Compose the vertical card containing header and chip list
    return {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=407.js.map