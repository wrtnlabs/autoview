export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Determine if this policy is for branches or tags
    const isBranch = input.type === 'branch';
    // Choose an appropriate icon and chip color
    const headerIcon = {
        type: 'Icon',
        id: isBranch ? 'code-branch' : 'tag',
        color: 'blue',
        size: 24,
    };
    const typeChip = {
        type: 'Chip',
        label: ((_a = input.type) !== null && _a !== void 0 ? _a : 'unknown').toString(),
        variant: 'filled',
        color: isBranch ? 'green' : 'violet',
        size: 'small',
    };
    // Build the card header: show the policy name and a chip for its type
    const header = {
        type: 'CardHeader',
        title: (_b = input.name) !== null && _b !== void 0 ? _b : 'Unnamed Policy',
        startElement: headerIcon,
        endElement: typeChip,
    };
    // Construct list items for the policy details: id and node_id
    const detailItems = [];
    if (input.id !== undefined) {
        detailItems.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'ID', variant: 'subtitle2' },
            value: { type: 'Text', content: input.id.toString(), variant: 'body2' },
        });
    }
    if (input.node_id) {
        detailItems.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Node ID', variant: 'subtitle2' },
            value: { type: 'Text', content: input.node_id, variant: 'body2' },
        });
    }
    // If no details are present, fall back to a markdown notice
    const contentChild = detailItems.length > 0
        ? {
            type: 'DataList',
            childrenProps: detailItems,
        }
        : {
            type: 'Markdown',
            content: '*No additional information available*',
        };
    // Wrap header and content into a vertical card for responsive presentation
    const card = {
        type: 'VerticalCard',
        childrenProps: [
            header,
            {
                type: 'CardContent',
                childrenProps: contentChild,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=734.js.map