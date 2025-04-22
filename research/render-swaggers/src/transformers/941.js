export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Map codespace state to a UI-friendly color for the Chip component
    const stateColorMap = {
        Available: 'success',
        Provisioning: 'info',
        Queued: 'info',
        Created: 'info',
        Starting: 'info',
        ShuttingDown: 'warning',
        Shutdown: 'warning',
        Failed: 'error',
        Deleted: 'secondary',
        Unavailable: 'secondary',
        Archived: 'secondary',
        Moved: 'secondary',
        Awaiting: 'info',
        Exporting: 'info',
        Updating: 'info',
        Rebuilding: 'info',
        Unknown: 'gray',
    };
    const stateColor = (_a = stateColorMap[input.state]) !== null && _a !== void 0 ? _a : 'primary';
    // Card header: display avatar, codespace name, repo name, and current state as a Chip
    const header = {
        type: 'CardHeader',
        title: (_b = input.display_name) !== null && _b !== void 0 ? _b : input.name,
        description: input.repository.full_name,
        startElement: {
            type: 'Avatar',
            src: input.owner.avatar_url,
            name: input.owner.login,
            size: 40,
            variant: 'primary',
        },
        endElement: {
            type: 'Chip',
            label: input.state,
            color: stateColor,
            variant: 'filled',
            size: 'small',
        },
    };
    // Helper to format ISO dates into a locale-aware string
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Build a list of metadata items for the DataList
    const items = [];
    // Repository link
    items.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'book', size: 16, color: 'gray' },
            { type: 'Text', content: ' Repository', variant: 'body2' },
        ],
        value: {
            type: 'Button',
            variant: 'text',
            color: 'secondary',
            startElement: { type: 'Icon', id: 'github', size: 16, color: 'gray' },
            label: input.repository.full_name,
            href: input.repository.html_url,
        },
    });
    // Created at
    items.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'calendar-plus', size: 16, color: 'gray' },
            { type: 'Text', content: ' Created At', variant: 'body2' },
        ],
        value: {
            type: 'Text',
            content: formatDate(input.created_at),
        },
    });
    // Last used at
    if (input.last_used_at) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Icon', id: 'clock', size: 16, color: 'gray' },
                { type: 'Text', content: ' Last Used', variant: 'body2' },
            ],
            value: {
                type: 'Text',
                content: formatDate(input.last_used_at),
            },
        });
    }
    // Idle timeout in minutes
    if (input.idle_timeout_minutes !== null && input.idle_timeout_minutes !== undefined) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Icon', id: 'hourglass-half', size: 16, color: 'gray' },
                { type: 'Text', content: ' Idle Timeout', variant: 'body2' },
            ],
            value: {
                type: 'Text',
                content: `${input.idle_timeout_minutes} min`,
            },
        });
    }
    // Retention expiry
    if (input.retention_expires_at) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Icon', id: 'trash-alt', size: 16, color: 'gray' },
                { type: 'Text', content: ' Retention Expires', variant: 'body2' },
            ],
            value: {
                type: 'Text',
                content: formatDate(input.retention_expires_at),
            },
        });
    }
    // Location
    items.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'map-marker-alt', size: 16, color: 'gray' },
            { type: 'Text', content: ' Location', variant: 'body2' },
        ],
        value: {
            type: 'Text',
            content: input.location,
        },
    });
    // Git status: ahead/behind as a group of Chips
    const git = input.git_status || {};
    const gitChips = [];
    if (git.ahead !== undefined) {
        gitChips.push({
            type: 'Chip',
            label: `↑${git.ahead}`,
            color: 'info',
            variant: 'outlined',
            size: 'small',
        });
    }
    if (git.behind !== undefined) {
        gitChips.push({
            type: 'Chip',
            label: `↓${git.behind}`,
            color: 'info',
            variant: 'outlined',
            size: 'small',
        });
    }
    if (gitChips.length) {
        items.push({
            type: 'DataListItem',
            label: [
                { type: 'Icon', id: 'code-branch', size: 16, color: 'gray' },
                { type: 'Text', content: ' Git Status', variant: 'body2' },
            ],
            value: {
                type: 'ChipGroup',
                childrenProps: gitChips,
            },
        });
    }
    // Wrap the items into a DataList component
    const dataList = {
        type: 'DataList',
        childrenProps: items,
    };
    // Card content holds the data list
    const content = {
        type: 'CardContent',
        childrenProps: dataList,
    };
    // Footer with a primary action to open the codespace in the browser
    const footer = {
        type: 'CardFooter',
        childrenProps: {
            type: 'Button',
            label: 'Open Codespace',
            variant: 'contained',
            color: 'primary',
            startElement: { type: 'Icon', id: 'external-link-alt', size: 16, color: 'gray' },
            href: input.web_url,
        },
    };
    // Compose the final vertical card
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=941.js.map