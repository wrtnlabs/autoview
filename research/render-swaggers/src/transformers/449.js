export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map invitation roles to chip colors
    const getRoleColor = (role) => {
        switch (role.toLowerCase()) {
            case 'admin':
            case 'owner':
                return 'error';
            case 'member':
            case 'contributor':
                return 'primary';
            default:
                return 'info';
        }
    };
    // Transform each invitation into a DataListItem component
    const items = input.map(inv => {
        // Build label: inviter avatar and login
        const labelComponents = [
            {
                type: 'Avatar',
                src: inv.inviter.avatar_url,
                name: inv.inviter.login,
                size: 32,
            },
            {
                type: 'Text',
                content: inv.inviter.login,
                variant: 'body1',
            },
        ];
        // Build value: role chip, email link (if any), team count, created date, and failure indicator (if any)
        const valueComponents = [];
        // Role as a small filled chip
        valueComponents.push({
            type: 'Chip',
            label: inv.role,
            variant: 'filled',
            size: 'small',
            color: getRoleColor(inv.role),
        });
        // Email link via markdown for clickability
        if (inv.email) {
            // Markdown will render [email](mailto:email)
            valueComponents.push({
                type: 'Markdown',
                content: `[${inv.email}](mailto:${inv.email})`,
            });
        }
        // Team count with users icon
        valueComponents.push({
            type: 'Icon',
            id: 'users',
            color: 'gray',
            size: 16,
        }, {
            type: 'Text',
            content: `${inv.team_count}`,
            variant: 'caption',
            color: 'gray',
        });
        // Created date (formatted for locale)
        valueComponents.push({
            type: 'Text',
            content: new Date(inv.created_at).toLocaleDateString(),
            variant: 'caption',
            color: 'tertiary',
        });
        // If invitation failed, show an icon with tooltip explaining the reason
        if (inv.failed_reason) {
            valueComponents.push({
                type: 'Tooltip',
                message: inv.failed_reason,
                childrenProps: {
                    type: 'Icon',
                    id: 'exclamation-triangle',
                    color: 'red',
                    size: 16,
                },
            });
        }
        return {
            type: 'DataListItem',
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList for responsive display
    return {
        type: 'DataList',
        childrenProps: items,
    };
}
//# sourceMappingURL=449.js.map