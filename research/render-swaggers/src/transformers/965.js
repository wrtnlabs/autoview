export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to humanize snake_case keys to Title Case
    const humanize = (key) => key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
    // Extract boolean flags that are true for display
    const booleanKeys = [
        'lock_repositories',
        'exclude_metadata',
        'exclude_git_data',
        'exclude_attachments',
        'exclude_releases',
        'exclude_owner_projects',
        'org_metadata_only',
    ];
    const activeFlags = booleanKeys.filter((k) => input[k]);
    // Build an array of ChipProps for each active flag
    const flagChips = activeFlags.map((flag) => ({
        type: 'Chip',
        label: humanize(flag),
        variant: 'outlined',
        color: 'primary',
        size: 'small',
    }));
    // DataList items for core migration fields
    const listItems = [];
    // Created At
    listItems.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'calendar-alt', size: 16, color: 'blue' },
            { type: 'Text', content: 'Created At' },
        ],
        value: { type: 'Text', content: input.created_at },
    });
    // Updated At
    listItems.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'calendar-alt', size: 16, color: 'blue' },
            { type: 'Text', content: 'Updated At' },
        ],
        value: { type: 'Text', content: input.updated_at },
    });
    // Owner
    const owner = input.owner;
    listItems.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'user', size: 16, color: 'teal' },
            { type: 'Text', content: 'Owner' },
        ],
        value: owner
            ? [
                {
                    type: 'Avatar',
                    src: owner.avatar_url,
                    name: owner.login,
                    variant: 'secondary',
                    size: 32,
                },
                { type: 'Text', content: (_a = owner.name) !== null && _a !== void 0 ? _a : owner.login },
            ]
            : { type: 'Text', content: 'Unknown' },
    });
    // Repositories count with badge
    listItems.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'folder', size: 16, color: 'orange' },
            { type: 'Text', content: 'Repositories' },
        ],
        value: {
            type: 'Badge',
            count: input.repositories.length,
            childrenProps: { type: 'Icon', id: 'folder', color: 'orange', size: 16 },
            showZero: true,
        },
    });
    // Migration URL
    listItems.push({
        type: 'DataListItem',
        label: [
            { type: 'Icon', id: 'link', size: 16, color: 'cyan' },
            { type: 'Text', content: 'Migration URL' },
        ],
        value: {
            type: 'Button',
            label: 'Open',
            href: input.url,
            variant: 'text',
            color: 'info',
            size: 'small',
        },
    });
    // Archive URL if present
    if (input.archive_url) {
        listItems.push({
            type: 'DataListItem',
            label: [
                { type: 'Icon', id: 'download', size: 16, color: 'violet' },
                { type: 'Text', content: 'Archive' },
            ],
            value: {
                type: 'Button',
                label: 'Download',
                href: input.archive_url,
                variant: 'text',
                color: 'violet',
                size: 'small',
            },
        });
    }
    // Assemble DataList component
    const dataList = {
        type: 'DataList',
        childrenProps: listItems,
    };
    // Build the CardHeader
    const header = {
        type: 'CardHeader',
        title: `Migration #${input.id}`,
        description: `GUID: ${input.guid}`,
        // Show owner avatar or generic icon
        startElement: owner
            ? {
                type: 'Avatar',
                src: owner.avatar_url,
                name: owner.login,
                size: 40,
                variant: 'primary',
            }
            : { type: 'Icon', id: 'user', size: 24, color: 'gray' },
        // State as a badge-like chip
        endElement: {
            type: 'Chip',
            label: input.state,
            variant: 'filled',
            color: input.state === 'completed' ? 'success' : 'warning',
            size: 'small',
        },
    };
    // Optionally include a footer with all active flags
    const footer = {
        type: 'CardFooter',
        childrenProps: flagChips.length > 0
            ? {
                type: 'ChipGroup',
                childrenProps: flagChips,
            }
            : undefined,
    };
    // Return a vertical card aggregating all components
    return {
        type: 'VerticalCard',
        childrenProps: [header, { type: 'CardContent', childrenProps: [dataList] }, footer],
    };
}
//# sourceMappingURL=965.js.map