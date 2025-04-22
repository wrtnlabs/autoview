export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map GitHub permission names to UI colors
    const permissionColorMap = {
        admin: 'error',
        maintain: 'warning',
        triage: 'success',
        write: 'primary',
        read: 'info',
    };
    // Format ISO timestamp into local datetime string
    const formatDate = (iso) => {
        try {
            const d = new Date(iso);
            return isNaN(d.getTime()) ? iso : d.toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Construct a list of DataListItemProps for details
    const details = [];
    // Invitee
    if (input.invitee) {
        details.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Invitee', variant: 'body2' },
            value: {
                type: 'Chip',
                label: input.invitee.login,
                color: 'primary',
                size: 'small',
                variant: 'outlined',
                startElement: {
                    type: 'Avatar',
                    src: input.invitee.avatar_url,
                    name: input.invitee.login,
                    size: 20,
                    variant: 'gray',
                },
            },
        });
    }
    else {
        details.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Invitee', variant: 'body2' },
            value: { type: 'Text', content: 'None', variant: 'body2' },
        });
    }
    // Inviter
    if (input.inviter) {
        details.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Inviter', variant: 'body2' },
            value: {
                type: 'Chip',
                label: input.inviter.login,
                color: 'secondary',
                size: 'small',
                variant: 'outlined',
                startElement: {
                    type: 'Avatar',
                    src: input.inviter.avatar_url,
                    name: input.inviter.login,
                    size: 20,
                    variant: 'gray',
                },
            },
        });
    }
    else {
        details.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Inviter', variant: 'body2' },
            value: { type: 'Text', content: 'None', variant: 'body2' },
        });
    }
    // Permission
    const perm = input.permissions;
    details.push({
        type: 'DataListItem',
        label: { type: 'Text', content: 'Permission', variant: 'body2' },
        value: {
            type: 'Chip',
            label: perm.charAt(0).toUpperCase() + perm.slice(1),
            color: permissionColorMap[perm] || 'gray',
            size: 'small',
            variant: 'filled',
        },
    });
    // Created At
    details.push({
        type: 'DataListItem',
        label: { type: 'Text', content: 'Created', variant: 'body2' },
        value: { type: 'Text', content: formatDate(input.created_at), variant: 'body2' },
    });
    // Invitation Link
    if (input.html_url) {
        details.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'View', variant: 'body2' },
            value: {
                type: 'Button',
                label: 'Open Invitation',
                variant: 'outlined',
                size: 'small',
                startElement: { type: 'Icon', id: 'link', color: 'blue', size: 12 },
                href: input.html_url,
            },
        });
    }
    // Expiration status chip
    const statusChip = {
        type: 'Chip',
        label: input.expired ? 'Expired' : 'Active',
        color: input.expired ? 'error' : 'success',
        size: 'small',
        variant: 'filled',
    };
    return {
        type: 'VerticalCard',
        // The card is composed of header, content (details), and footer (status)
        childrenProps: [
            {
                type: 'CardHeader',
                title: input.repository.full_name,
                description: (_a = input.repository.description) !== null && _a !== void 0 ? _a : '',
                startElement: {
                    type: 'Avatar',
                    src: input.repository.owner.avatar_url,
                    name: input.repository.owner.login,
                    size: 40,
                    variant: 'gray',
                },
            },
            {
                type: 'CardContent',
                childrenProps: {
                    type: 'DataList',
                    childrenProps: details,
                },
            },
            {
                type: 'CardFooter',
                childrenProps: statusChip,
            },
        ],
    };
}
//# sourceMappingURL=774.js.map