export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Helper to create a simple text component
    const createText = (content, variant = 'body2', color) => ({
        type: 'Text',
        content,
        variant,
        color,
    });
    // Determine a fallback title: prefer the workflow name, otherwise display_title
    const title = (_a = input.name) !== null && _a !== void 0 ? _a : input.display_title;
    // Map conclusion/status to a chip color
    const conclusionKey = (_c = (_b = input.conclusion) !== null && _b !== void 0 ? _b : input.status) !== null && _c !== void 0 ? _c : 'unknown';
    let chipColor;
    switch (conclusionKey.toLowerCase()) {
        case 'success':
            chipColor = 'green';
            break;
        case 'failure':
        case 'error':
            chipColor = 'error';
            break;
        case 'cancelled':
            chipColor = 'warning';
            break;
        case 'in_progress':
        case 'queued':
            chipColor = 'info';
            break;
        default:
            chipColor = 'gray';
    }
    // Create a status chip to visually indicate run state
    const statusChip = {
        type: 'Chip',
        label: conclusionKey.replace(/_/g, ' '),
        color: chipColor,
        size: 'small',
        variant: 'outlined',
    };
    // Construct a list of key/value details for the run
    const detailsItems = [
        {
            type: 'DataListItem',
            label: [createText('Run #', 'caption')],
            value: createText(input.run_number.toString()),
        },
        {
            type: 'DataListItem',
            label: [createText('Event', 'caption')],
            value: createText(input.event),
        },
        {
            type: 'DataListItem',
            label: [createText('Branch', 'caption')],
            value: createText((_d = input.head_branch) !== null && _d !== void 0 ? _d : 'N/A'),
        },
        {
            type: 'DataListItem',
            label: [createText('Commit SHA', 'caption')],
            value: createText(input.head_sha),
        },
        {
            type: 'DataListItem',
            label: [createText('Created', 'caption')],
            value: createText(new Date(input.created_at).toLocaleString(), 'caption'),
        },
        {
            type: 'DataListItem',
            label: [createText('Updated', 'caption')],
            value: createText(new Date(input.updated_at).toLocaleString(), 'caption'),
        },
    ];
    const detailsList = {
        type: 'DataList',
        childrenProps: detailsItems,
    };
    // Card header: title, optional avatar of the actor, and status chip in the end slot
    const header = {
        type: 'CardHeader',
        title,
        description: input.workflow_id != null ? `Workflow ID: ${input.workflow_id}` : undefined,
        startElement: input.actor
            ? {
                type: 'Avatar',
                src: input.actor.avatar_url,
                name: input.actor.login,
                size: 40,
                variant: 'primary',
            }
            : undefined,
        endElement: statusChip,
    };
    // Card content: list of details
    const content = {
        type: 'CardContent',
        childrenProps: [detailsList],
    };
    // Card footer: link to GitHub
    const footer = {
        type: 'CardFooter',
        childrenProps: {
            type: 'Button',
            variant: 'text',
            size: 'small',
            label: 'View on GitHub',
            href: input.html_url,
            startElement: {
                type: 'Icon',
                id: 'github',
                size: 16,
                color: 'gray',
            },
        },
    };
    // Assemble into a vertical card for responsive display
    return {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=599.js.map