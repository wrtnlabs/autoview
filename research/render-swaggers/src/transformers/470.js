export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map each interaction_group value to a chip color
    const limitColorMap = {
        existing_users: 'info',
        contributors_only: 'success',
        collaborators_only: 'primary',
    };
    // Determine chip color for the current limit, fallback to gray if unknown
    const limitColor = (_a = limitColorMap[input.limit]) !== null && _a !== void 0 ? _a : 'gray';
    // Format the expiration timestamp into a human-readable string
    let expiresDisplay;
    const date = new Date(input.expires_at);
    if (!isNaN(date.getTime())) {
        // Locale string adapts to user's device (mobile or desktop)
        expiresDisplay = date.toLocaleString();
    }
    else {
        // Fallback to the raw string if parsing failed
        expiresDisplay = input.expires_at;
    }
    // Build a DataList of the key properties: limit and expiration
    const dataList = {
        type: 'DataList',
        childrenProps: [
            {
                // DataListItem for interaction limit
                type: 'DataListItem',
                label: [
                    {
                        type: 'Text',
                        content: 'Limit',
                        variant: 'body2',
                    },
                ],
                value: {
                    type: 'Chip',
                    label: input.limit.replace(/_/g, ' '),
                    color: limitColor,
                    variant: 'filled',
                },
            },
            {
                // DataListItem for expiry timestamp
                type: 'DataListItem',
                label: [
                    {
                        type: 'Text',
                        content: 'Expires At',
                        variant: 'body2',
                    },
                ],
                value: {
                    type: 'Text',
                    content: expiresDisplay,
                    variant: 'body2',
                },
            },
        ],
    };
    // Compose the overall view as a VerticalCard with header and content
    return {
        type: 'VerticalCard',
        childrenProps: [
            {
                // Header with a globe icon and the origin string
                type: 'CardHeader',
                title: 'Interaction Limit',
                description: input.origin,
                startElement: {
                    type: 'Icon',
                    id: 'globe',
                    color: 'blue',
                    size: 24,
                },
            },
            {
                // Content containing our DataList
                type: 'CardContent',
                childrenProps: [dataList],
            },
        ],
    };
}
//# sourceMappingURL=470.js.map