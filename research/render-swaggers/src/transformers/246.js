export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { manager, online } = input;
    // If there's no manager information, display a simple markdown message.
    if (!manager) {
        return {
            type: 'Markdown',
            content: '## No manager data available',
        };
    }
    // Build an avatar or fallback icon for the manager.
    // If an avatar URL is present, use it; otherwise, show a generic user icon.
    const avatarElement = manager.avatarUrl
        ? {
            type: 'Avatar',
            src: manager.avatarUrl,
            name: manager.name,
            variant: 'primary',
            size: 40,
        }
        : {
            type: 'Icon',
            id: 'user',
            color: 'gray',
            size: 40,
        };
    // Card header: Displays name, optional description, and avatar/icon.
    const header = {
        type: 'CardHeader',
        title: manager.name,
        // Only show description if flagged to display it
        description: manager.showDescriptionToFront && manager.description
            ? manager.description
            : undefined,
        startElement: avatarElement,
    };
    // Prepare a list of DataListItemProps for key details.
    const items = [];
    // Email entry, rendered as a mailto link via Markdown.
    if (manager.showEmailToFront && manager.email) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Email', variant: 'subtitle2' },
            ],
            value: {
                type: 'Markdown',
                content: `[${manager.email}](mailto:${manager.email})`,
            },
        });
    }
    // Mobile number entry, rendered as a tel link.
    if (manager.showMobileNumberToFront && manager.mobileNumber) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Mobile', variant: 'subtitle2' },
            ],
            value: {
                type: 'Markdown',
                content: `[${manager.mobileNumber}](tel:${manager.mobileNumber})`,
            },
        });
    }
    // Online status as a colored chip: green = online, gray = offline.
    const isOnline = Boolean(online && online.id);
    items.push({
        type: 'DataListItem',
        label: [
            { type: 'Text', content: 'Status', variant: 'subtitle2' },
        ],
        value: {
            type: 'Chip',
            label: isOnline ? 'Online' : 'Offline',
            color: isOnline ? 'green' : 'gray',
            size: 'small',
            variant: 'filled',
        },
    });
    // Role identifier.
    if (manager.roleId) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Role', variant: 'subtitle2' },
            ],
            value: {
                type: 'Text',
                content: manager.roleId,
                variant: 'body2',
            },
        });
    }
    // Operator and touch scores as numeric stats.
    if (typeof manager.operatorScore === 'number') {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Operator Score', variant: 'subtitle2' },
            ],
            value: {
                type: 'Text',
                content: String(manager.operatorScore),
                variant: 'body2',
            },
        });
    }
    if (typeof manager.touchScore === 'number') {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Text', content: 'Touch Score', variant: 'subtitle2' },
            ],
            value: {
                type: 'Text',
                content: String(manager.touchScore),
                variant: 'body2',
            },
        });
    }
    // Wrap the list items in a DataList component.
    const dataList = {
        type: 'DataList',
        childrenProps: items,
    };
    // Card content holding the DataList.
    const content = {
        type: 'CardContent',
        childrenProps: dataList,
    };
    // Final vertical card combining header and content.
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=246.js.map