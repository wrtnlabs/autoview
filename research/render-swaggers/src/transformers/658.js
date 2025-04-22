export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map check_run.status to an icon and color for intuitive visual feedback
    const statusIconMap = {
        queued: { id: 'clock', color: 'gray' },
        in_progress: { id: 'spinner', color: 'blue' },
        waiting: { id: 'hourglass', color: 'orange' },
        requested: { id: 'info-circle', color: 'teal' },
        pending: { id: 'pause', color: 'yellow' },
        completed: {
            // success vs failure icon
            id: input.conclusion === 'success' ? 'check' : 'times',
            color: input.conclusion === 'success' ? 'green' : 'red',
        },
    };
    // Fallback to 'requested' if unknown status
    const statusKey = statusIconMap[input.status] ? input.status : 'requested';
    const iconProps = {
        type: 'Icon',
        id: statusIconMap[statusKey].id,
        color: statusIconMap[statusKey].color,
        size: 24,
    };
    // Utility to build a single DataListItem with label & value as Text components
    function listItem(labelText, valueText) {
        return {
            type: 'DataListItem',
            label: [
                { type: 'Text', content: labelText, variant: 'body2', color: 'tertiary' },
            ],
            value: [
                { type: 'Text', content: String(valueText), variant: 'body1' },
            ],
        };
    }
    // Assemble key/value items, skipping any missing values
    const items = [
        listItem('ID', input.id),
        listItem('Name', input.name),
        listItem('Status', input.status),
        input.conclusion != null ? listItem('Conclusion', input.conclusion) : undefined,
        input.started_at ? listItem('Started At', new Date(input.started_at).toLocaleString()) : undefined,
        input.completed_at ? listItem('Completed At', new Date(input.completed_at).toLocaleString()) : undefined,
        listItem('Annotations', input.output.annotations_count),
        // Display count of pull requests if present
        Array.isArray(input.pull_requests)
            ? listItem('Pull Requests', input.pull_requests.length)
            : undefined,
    ].filter((i) => !!i);
    // DataList component to present key/value pairs
    const dataList = {
        type: 'DataList',
        childrenProps: items,
    };
    // Optionally render the output.summary as markdown for richer formatting
    const summaryComponent = input.output.summary
        ? {
            type: 'Markdown',
            content: `### ${input.output.title || 'Summary'}\n\n${input.output.summary}`,
        }
        : undefined;
    // Card header with icon, title and subtitle
    const header = {
        type: 'CardHeader',
        startElement: iconProps,
        title: input.name,
        description: input.status.replace('_', ' '),
    };
    // Card content: include markdown summary first (if any), then the data list
    const contentChildren = [];
    if (summaryComponent)
        contentChildren.push(summaryComponent);
    contentChildren.push(dataList);
    const content = {
        type: 'CardContent',
        childrenProps: contentChildren,
    };
    // Wrap header & content in a vertical card for responsive layout
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=658.js.map