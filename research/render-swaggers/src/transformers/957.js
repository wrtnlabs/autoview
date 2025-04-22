export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Icon displayed next to the title in the card header
    const headerIcon = {
        type: 'Icon',
        id: 'key', // uses the 'key' icon from FontAwesome
        size: 24,
        color: 'yellow',
    };
    // Card header showing the resource title and its numeric ID
    const header = {
        type: 'CardHeader',
        title: input.title,
        description: input.id.toString(),
        startElement: headerIcon,
    };
    // Convert the ISO timestamp into a locale-specific string
    const formattedDate = new Date(input.created_at).toLocaleString();
    // Build a DataList; each DataListItem displays a specific field
    const items = [
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'ID', variant: 'subtitle2' },
            value: { type: 'Text', content: input.id.toString(), variant: 'body2' },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'URL', variant: 'subtitle2' },
            // A button that navigates to the provided URL
            value: {
                type: 'Button',
                variant: 'text',
                color: 'blue',
                size: 'small',
                label: 'Visit',
                href: input.url,
                startElement: { type: 'Icon', id: 'link', size: 16, color: 'blue' },
            },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Created At', variant: 'subtitle2' },
            value: { type: 'Text', content: formattedDate, variant: 'body2' },
        },
    ];
    const dataList = {
        type: 'DataList',
        childrenProps: items,
    };
    // Main card content holds the DataList
    const content = {
        type: 'CardContent',
        childrenProps: dataList,
    };
    // Two chips representing the boolean flags (verified & read-only)
    const verifiedChip = {
        type: 'Chip',
        label: input.verified ? 'Verified' : 'Unverified',
        color: input.verified ? 'success' : 'error',
        variant: 'filled',
        size: 'small',
    };
    const readOnlyChip = {
        type: 'Chip',
        label: input.read_only ? 'Read Only' : 'Writable',
        color: input.read_only ? 'warning' : 'success',
        variant: input.read_only ? 'filled' : 'outlined',
        size: 'small',
    };
    // Group the status chips for a compact footer
    const statusGroup = {
        type: 'ChipGroup',
        childrenProps: [verifiedChip, readOnlyChip],
        maxItems: 2,
    };
    const footer = {
        type: 'CardFooter',
        childrenProps: [statusGroup],
    };
    // Assemble a vertical card with header, body, and footer
    return {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=957.js.map