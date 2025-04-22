export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. CardHeader: show the type of record and the timestamp with an icon
    const header = {
        type: 'CardHeader',
        title: 'Deposit Charge',
        description: new Date(input.created_at).toLocaleString(),
        startElement: {
            type: 'Icon',
            id: 'money-bill', // FontAwesome "money-bill" icon
            size: 24,
            color: 'green',
        },
    };
    // 2. Build a list of key/value pairs to display the details
    const items = [];
    // 2.a. Unique ID
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'ID',
            variant: 'body2',
            color: '#888', // subtle gray
        },
        value: {
            type: 'Text',
            content: input.id,
        },
    });
    // 2.b. Creation date
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Date',
            variant: 'body2',
            color: '#888',
        },
        value: {
            type: 'Text',
            content: new Date(input.created_at).toLocaleString(),
        },
    });
    // 2.c. Monetary value rendered as a colored chip
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Amount',
            variant: 'body2',
            color: '#888',
        },
        value: {
            type: 'Chip',
            label: `$${input.value.toFixed(2)}`,
            color: 'success',
            size: 'medium',
            variant: 'filled',
        },
    });
    // 2.d. Customer identifier
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Customer ID',
            variant: 'body2',
            color: '#888',
        },
        value: {
            type: 'Text',
            content: input.customer.id,
        },
    });
    // 2.e. Channel through which the customer connected
    const channelName = input.customer.channel.name || input.customer.channel.code;
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Channel',
            variant: 'body2',
            color: '#888',
        },
        value: {
            type: 'Text',
            content: channelName,
        },
    });
    // 2.f. Customer IP address
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'IP Address',
            variant: 'body2',
            color: '#888',
        },
        value: {
            type: 'Text',
            content: input.customer.ip,
        },
    });
    // 2.g. Referrer URL (clickable if present)
    if (input.customer.referrer) {
        const href = input.customer.referrer;
        items.push({
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'Referrer',
                variant: 'body2',
                color: '#888',
            },
            value: {
                type: 'Markdown',
                // Markdown link for a more interactive UI
                content: `[${href}](${href})`,
            },
        });
    }
    // 2.h. Published status
    const isPublished = input.publish != null;
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Published',
            variant: 'body2',
            color: '#888',
        },
        value: {
            type: 'Chip',
            label: isPublished ? 'Yes' : 'No',
            color: isPublished ? 'primary' : 'gray',
            size: 'small',
            variant: 'filled',
        },
    });
    // 3. Wrap the items in a DataList for structured layout
    const dataList = {
        type: 'DataList',
        childrenProps: items,
    };
    // 4. CardContent to hold our DataList
    const content = {
        type: 'CardContent',
        childrenProps: dataList,
    };
    // 5. Compose everything into a VerticalCard for responsive presentation
    return {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=62.js.map