export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map GitHub check run conclusions or statuses to chip colors
    const conclusionColorMap = {
        success: 'green',
        failure: 'red',
        neutral: 'gray',
        cancelled: 'orange',
        skipped: 'gray',
        timed_out: 'warning',
        action_required: 'error',
    };
    // Build a DataListItem for each check run
    const items = input.check_runs.map((run) => {
        var _a, _b;
        // Format start/completion times; fall back to 'N/A' if missing
        const started = run.started_at ? new Date(run.started_at).toLocaleString() : 'N/A';
        const completed = run.completed_at ? new Date(run.completed_at).toLocaleString() : 'N/A';
        const timeRange = `${started} – ${completed}`;
        // Decide which label to show: conclusion if available, otherwise status
        const outcome = (_a = run.conclusion) !== null && _a !== void 0 ? _a : run.status;
        const chipColor = (_b = conclusionColorMap[outcome]) !== null && _b !== void 0 ? _b : 'gray';
        // Label consists of the run name and a caption with the time range
        const labelComponents = [
            {
                type: 'Text',
                content: run.name,
                variant: 'body1',
            },
            {
                type: 'Text',
                content: timeRange,
                variant: 'caption',
                color: 'tertiary',
            },
        ];
        // A colored chip indicating pass/fail/other outcome
        const outcomeChip = {
            type: 'Chip',
            label: outcome,
            color: chipColor,
            size: 'small',
            variant: 'filled',
        };
        return {
            type: 'DataListItem',
            label: labelComponents,
            value: outcomeChip,
        };
    });
    // Compose the overall UI as a vertical card: header + content
    return {
        type: 'VerticalCard',
        childrenProps: [
            // Card header with title, total count, and an icon
            {
                type: 'CardHeader',
                title: 'Check Runs',
                description: `${input.total_count} total`,
                startElement: {
                    type: 'Icon',
                    id: 'tasks',
                    color: 'blue',
                    size: 24,
                },
            },
            // Card content containing the data list of runs
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
//# sourceMappingURL=706.js.map