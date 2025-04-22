export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for easier access
    const { citizen, mileage, value, balance, source_id, created_at } = input;
    // Format the timestamp into a human-readable string
    const date = new Date(created_at);
    const formattedDate = isNaN(date.getTime())
        ? 'Invalid date'
        : date.toLocaleString(); // e.g. "9/1/2023, 10:23 AM"
    // Determine transaction direction and styling
    const direction = mileage.direction;
    const amount = typeof value === 'number' ? value : 0;
    const sign = direction === 1 ? '+' : '-';
    // Use semantic color names for better UX
    const transactionColor = direction === 1 ? 'success' : 'error';
    // Card header: Avatar (initials), user name, and a colored chip showing the delta
    const header = {
        type: 'CardHeader',
        title: citizen.name || 'Unknown User',
        description: formattedDate,
        startElement: {
            type: 'Avatar',
            name: citizen.name || 'User',
            variant: 'primary',
        },
        endElement: {
            type: 'Chip',
            label: `${sign}${amount}`,
            color: transactionColor,
            size: 'medium',
            variant: 'filled',
        },
    };
    // Build a data list of key-value pairs for the transaction details
    const dataListItems = [
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Mobile' },
            value: { type: 'Text', content: citizen.mobile || 'N/A' },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Source' },
            value: { type: 'Text', content: mileage.source },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Code' },
            value: { type: 'Text', content: mileage.code },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Balance' },
            value: { type: 'Text', content: balance.toString() },
        },
    ];
    // Wrap the data list into a CardContent component
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'DataList',
            childrenProps: dataListItems,
        },
    };
    // Footer with a button linking to a detailed view (responsive and accessible)
    const footer = {
        type: 'CardFooter',
        childrenProps: {
            type: 'Button',
            label: 'View Details',
            variant: 'text',
            color: 'primary',
            href: `/mileage/${source_id}`, // assumes a route to view details by source_id
        },
    };
    // Combine header, content, and footer into a vertical card for responsive display
    return {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=71.js.map