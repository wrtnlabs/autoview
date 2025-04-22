export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Utility: convert bytes into human-readable string
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
        return `${value} ${sizes[i]}`;
    }
    // Prepare the metrics we want to display
    const metrics = [
        {
            label: 'Active Caches',
            iconId: 'layer-group', // representing cache layers
            value: input.total_active_caches_count.toString(),
        },
        {
            label: 'Total Cache Size',
            iconId: 'hdd', // representing storage
            value: formatBytes(input.total_active_caches_size_in_bytes),
        },
    ];
    // Build DataListItem components for each metric
    const dataListItems = metrics.map(metric => ({
        type: 'DataListItem',
        // label: an icon + text
        label: [
            {
                type: 'Icon',
                id: metric.iconId,
                size: 20,
                color: 'cyan',
            },
            {
                type: 'Text',
                content: metric.label,
                variant: 'body2',
                color: 'tertiary',
            },
        ],
        // value: the metric value, prominently displayed
        value: {
            type: 'Text',
            content: metric.value,
            variant: 'body1',
            color: 'primary',
        },
    }));
    // Compose the final UI using a vertical card with header and content
    return {
        type: 'VerticalCard',
        childrenProps: [
            {
                type: 'CardHeader',
                title: 'Cache Usage Summary',
                // A database icon in the header for quick recognition
                startElement: {
                    type: 'Icon',
                    id: 'database',
                    size: 24,
                    color: 'blue',
                },
            },
            {
                type: 'CardContent',
                // Embed a DataList to lay out our metrics in a clean list
                childrenProps: {
                    type: 'DataList',
                    childrenProps: dataListItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=375.js.map