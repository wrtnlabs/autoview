export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map membership state and role to chip colors for visual distinction.
    const stateColorMap = {
        active: 'success',
        pending: 'warning',
    };
    const roleColorMap = {
        admin: 'error',
        member: 'primary',
        billing_manager: 'info',
    };
    // Build a list of DataListItem components to display structured data.
    const items = [];
    // 1. Membership state
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Status',
            variant: 'body2',
        },
        value: {
            type: 'Chip',
            label: input.state,
            color: (_a = stateColorMap[input.state]) !== null && _a !== void 0 ? _a : 'gray',
            variant: 'filled',
            size: 'medium',
        },
    });
    // 2. Membership role
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Role',
            variant: 'body2',
        },
        value: {
            type: 'Chip',
            label: input.role,
            color: (_b = roleColorMap[input.role]) !== null && _b !== void 0 ? _b : 'gray',
            variant: 'filled',
            size: 'medium',
        },
    });
    // 3. Permissions (if available)
    if (input.permissions && typeof input.permissions.can_create_repository === 'boolean') {
        items.push({
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'Can Create Repos',
                variant: 'body2',
            },
            value: {
                type: 'Icon',
                id: input.permissions.can_create_repository ? 'check-circle' : 'times-circle',
                color: input.permissions.can_create_repository ? 'green' : 'red',
                size: 16,
            },
        });
    }
    // 4. User information (avatar + login) or fallback text
    items.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'User',
            variant: 'body2',
        },
        value: input.user
            ? [
                {
                    type: 'Avatar',
                    src: input.user.avatar_url,
                    name: input.user.login,
                    size: 24,
                },
                {
                    type: 'Text',
                    content: input.user.login,
                    variant: 'body2',
                    color: 'primary',
                },
            ]
            : {
                type: 'Text',
                content: 'No User',
                variant: 'body2',
                color: 'gray',
            },
    });
    // 5. Link to the raw membership resource
    if (input.url) {
        items.push({
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'Details',
                variant: 'body2',
            },
            value: {
                type: 'Markdown',
                content: `[View Membership](${input.url})`,
            },
        });
    }
    // Compose a vertical card: header with organization info, content with the data list.
    return {
        type: 'VerticalCard',
        childrenProps: [
            {
                type: 'CardHeader',
                title: input.organization.login,
                description: (_c = input.organization.description) !== null && _c !== void 0 ? _c : '',
                startElement: {
                    type: 'Avatar',
                    src: input.organization.avatar_url,
                    name: input.organization.login,
                    size: 40,
                },
            },
            {
                type: 'CardContent',
                childrenProps: {
                    type: 'DataList',
                    childrenProps: items,
                },
            },
        ],
    };
}
//# sourceMappingURL=481.js.map