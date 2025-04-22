export function transform($input) {
    return visualizeData($input);
}
// Helper functions to map enum values to UI colors
function mapEnforcementColor(enforcement) {
    switch (enforcement) {
        case 'active':
            return 'success';
        case 'evaluate':
            return 'info';
        case 'disabled':
        default:
            return 'gray';
    }
}
function mapTargetColor(target) {
    switch (target) {
        case 'branch':
            return 'primary';
        case 'tag':
            return 'secondary';
        case 'push':
            return 'success';
        case 'repository':
        default:
            return 'info';
    }
}
function mapSourceTypeColor(sourceType) {
    switch (sourceType) {
        case 'Repository':
            return 'primary';
        case 'Organization':
            return 'secondary';
        case 'Enterprise':
        default:
            return 'info';
    }
}
function mapBypassModeColor(mode) {
    switch (mode) {
        case 'always':
            return 'success';
        case 'pull_request':
        case 'pull_requests_only':
            return 'warning';
        case 'never':
        default:
            return 'error';
    }
}
function visualizeData(input) {
    // 1. CardHeader with the ruleset name and enforcement badge
    const header = {
        type: 'CardHeader',
        title: input.name,
        description: `ID: ${input.id}`,
        endElement: {
            type: 'Chip',
            label: input.enforcement,
            variant: 'filled',
            size: 'medium',
            color: mapEnforcementColor(input.enforcement),
        },
    };
    // 2. Build DataListItems for the core properties
    const items = [];
    // Source
    items.push({
        type: 'DataListItem',
        label: { type: 'Text', content: 'Source' },
        value: { type: 'Text', content: input.source },
    });
    // Target (enum)
    if (input.target) {
        items.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Target' },
            value: {
                type: 'Chip',
                label: input.target,
                variant: 'outlined',
                size: 'small',
                color: mapTargetColor(input.target),
            },
        });
    }
    // Source Type (enum)
    if (input.source_type) {
        items.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Source Type' },
            value: {
                type: 'Chip',
                label: input.source_type,
                variant: 'outlined',
                size: 'small',
                color: mapSourceTypeColor(input.source_type),
            },
        });
    }
    // Current User Can Bypass
    if (input.current_user_can_bypass) {
        items.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Your Bypass Mode' },
            value: {
                type: 'Chip',
                label: input.current_user_can_bypass,
                variant: 'outlined',
                size: 'small',
                color: mapBypassModeColor(input.current_user_can_bypass),
            },
        });
    }
    // Created / Updated timestamps
    if (input.created_at) {
        items.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Created At' },
            value: { type: 'Text', content: new Date(input.created_at).toLocaleString() },
        });
    }
    if (input.updated_at) {
        items.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Updated At' },
            value: { type: 'Text', content: new Date(input.updated_at).toLocaleString() },
        });
    }
    // Bypass Actors: render as markdown bullet list
    if (Array.isArray(input.bypass_actors) && input.bypass_actors.length > 0) {
        const mdLines = input.bypass_actors.map(actor => {
            const idLabel = actor.actor_id != null ? ` (ID: ${actor.actor_id})` : '';
            return `- **${actor.actor_type}**${idLabel}${actor.bypass_mode ? ` — mode: ${actor.bypass_mode}` : ''}`;
        });
        items.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Bypass Actors' },
            value: { type: 'Markdown', content: mdLines.join('\n') },
        });
    }
    // 3. Wrap items in a DataList
    const dataList = {
        type: 'DataList',
        childrenProps: items,
    };
    // 4. CardContent to hold our DataList
    const content = {
        type: 'CardContent',
        childrenProps: [dataList],
    };
    // 5. Compose final VerticalCard
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=864.js.map