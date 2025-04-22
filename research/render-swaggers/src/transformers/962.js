export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Destructure relevant fields from membership record
    const { organization, state, role, permissions, user } = input;
    // Map role to a color scale for visual distinction
    const roleColorMap = {
        admin: 'error',
        member: 'info',
        billing_manager: 'warning',
    };
    const chipRoleColor = (_a = roleColorMap[role]) !== null && _a !== void 0 ? _a : 'gray';
    // 1) CardHeader: shows organization avatar, name, and role badge
    const header = {
        type: 'CardHeader',
        title: organization.login,
        // show description in header if available
        description: (_b = organization.description) !== null && _b !== void 0 ? _b : undefined,
        startElement: {
            type: 'Avatar',
            src: organization.avatar_url,
            name: organization.login,
            size: 40,
            variant: 'gray',
        },
        endElement: {
            type: 'Chip',
            label: role,
            color: chipRoleColor,
            variant: 'filled',
        },
    };
    // 2) CardContent: primary action to view the organization on GitHub
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'Button',
            label: 'View on GitHub',
            href: organization.url,
            variant: 'outlined',
            color: 'primary',
        },
    };
    // 3) Build a DataList of detailed properties (status, role, permissions, user)
    const listItems = [];
    // Membership status
    listItems.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Status',
            variant: 'caption',
            color: 'gray',
        },
        value: {
            type: 'Chip',
            label: state,
            color: state === 'active' ? 'success' : 'warning',
            variant: 'outlined',
        },
    });
    // Role (repeated for detail view)
    listItems.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            content: 'Role',
            variant: 'caption',
            color: 'gray',
        },
        value: {
            type: 'Chip',
            label: role,
            color: chipRoleColor,
            variant: 'filled',
        },
    });
    // Permission: can_create_repository
    if (permissions && typeof permissions.can_create_repository === 'boolean') {
        listItems.push({
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'Can Create Repo',
                variant: 'caption',
                color: 'gray',
            },
            value: {
                type: 'Icon',
                id: permissions.can_create_repository ? 'check' : 'times',
                color: permissions.can_create_repository ? 'green' : 'red',
                size: 16,
            },
        });
    }
    // User info, if available
    if (user) {
        listItems.push({
            type: 'DataListItem',
            label: {
                type: 'Text',
                content: 'User',
                variant: 'caption',
                color: 'gray',
            },
            value: {
                type: 'Chip',
                label: user.login,
                color: 'primary',
                variant: 'outlined',
                startElement: {
                    type: 'Avatar',
                    src: user.avatar_url,
                    name: (_c = user.name) !== null && _c !== void 0 ? _c : user.login,
                    size: 24,
                    variant: 'gray',
                },
            },
        });
    }
    // Wrap the items in a DataList component
    const dataList = {
        type: 'DataList',
        childrenProps: listItems,
    };
    // 4) CardFooter: holds the detailed DataList
    const footer = {
        type: 'CardFooter',
        childrenProps: dataList,
    };
    // 5) Assemble the VerticalCard with header, action, and details
    return {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=962.js.map