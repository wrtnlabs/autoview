export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // Helper to turn "in_progress" into "In progress", etc.
    const capitalize = (str) => str
        .split(/[\s_]+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
    // Map analysis statuses to chip colors
    const statusColorMap = {
        succeeded: 'success',
        failed: 'error',
        in_progress: 'info',
        cancelled: 'warning',
        canceled: 'warning',
        pending: 'warning',
        timed_out: 'error',
    };
    // Header: show actor avatar + variant analysis title + status badge
    const header = {
        type: 'CardHeader',
        title: `Variant Analysis #${input.id}`,
        // If there was a high‐level failure reason on the entire analysis, show it
        description: input.failure_reason ? `Reason: ${capitalize(input.failure_reason)}` : undefined,
        startElement: {
            type: 'Avatar',
            src: input.actor.avatar_url,
            name: input.actor.login,
            variant: 'primary',
        },
        endElement: {
            type: 'Chip',
            label: capitalize(input.status),
            color: (_a = statusColorMap[input.status]) !== null && _a !== void 0 ? _a : 'primary',
            size: 'small',
            variant: 'filled',
        },
    };
    // Build a list of scanned repositories, each with status chips
    const scannedListItems = (_c = (_b = input.scanned_repositories) === null || _b === void 0 ? void 0 : _b.map((entry) => {
        var _a;
        return ({
            type: 'DataListItem',
            // Repository full name on the left
            label: {
                type: 'Text',
                content: entry.repository.full_name,
                variant: 'body1',
            },
            // Status chip (e.g. "Succeeded", "Failed") on the right
            value: {
                type: 'Chip',
                label: capitalize(entry.analysis_status),
                color: (_a = statusColorMap[entry.analysis_status]) !== null && _a !== void 0 ? _a : 'primary',
                size: 'small',
                variant: 'outlined',
            },
        });
    })) !== null && _c !== void 0 ? _c : [];
    // Content: wrap the list in a DataList; if no entries, show a Markdown notice
    const contentList = scannedListItems.length > 0
        ? {
            type: 'DataList',
            childrenProps: scannedListItems,
        }
        : {
            type: 'Markdown',
            content: '*No repositories were scanned.*',
        };
    const content = {
        type: 'CardContent',
        childrenProps: contentList,
    };
    // Footer: show timestamps for created, updated, completed
    const datesMarkdownLines = [
        `**Created:** ${(_d = input.created_at) !== null && _d !== void 0 ? _d : 'N/A'}`,
        `**Updated:** ${(_e = input.updated_at) !== null && _e !== void 0 ? _e : 'N/A'}`,
        `**Completed:** ${(_f = input.completed_at) !== null && _f !== void 0 ? _f : 'N/A'}`,
    ];
    const footer = {
        type: 'CardFooter',
        childrenProps: {
            type: 'Markdown',
            content: datesMarkdownLines.join('\n\n'),
        },
    };
    // Assemble everything into a vertical card
    return {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=679.js.map