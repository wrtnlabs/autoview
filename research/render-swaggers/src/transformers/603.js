export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub workflow_run into a rich, responsive AutoView UI
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Map possible workflow conclusions to Chip colors
    const conclusionColorMap = {
        success: 'success',
        failure: 'error',
        cancelled: 'gray',
        skipped: 'gray',
        neutral: 'info',
        timed_out: 'warning',
        action_required: 'warning',
    };
    // Determine the string to display and its color
    const conclusionKey = (_b = (_a = input.conclusion) !== null && _a !== void 0 ? _a : input.status) !== null && _b !== void 0 ? _b : 'pending';
    const chipColor = (_c = conclusionColorMap[conclusionKey]) !== null && _c !== void 0 ? _c : 'info';
    // Build the CardHeader: avatar + title + conclusion chip
    const header = {
        type: 'CardHeader',
        title: input.display_title,
        description: `Run #${input.run_number}${input.run_attempt && input.run_attempt > 1 ? ` (attempt ${input.run_attempt})` : ''}`,
        // Actor avatar if available, otherwise a placeholder
        startElement: input.actor
            ? {
                type: 'Avatar',
                src: input.actor.avatar_url,
                name: input.actor.login,
                variant: 'cyan',
                size: 40,
            }
            : {
                type: 'Avatar',
                name: '∅',
                variant: 'gray',
                size: 40,
            },
        endElement: {
            type: 'Chip',
            label: conclusionKey,
            color: chipColor,
            variant: 'filled',
            size: 'small',
        },
    };
    // Build a DataList of key details (event, branch, commit, times)
    const detailsList = {
        type: 'DataList',
        childrenProps: [
            {
                type: 'DataListItem',
                label: [{ type: 'Text', content: 'Event', variant: 'subtitle2' }],
                value: [{ type: 'Text', content: input.event, variant: 'body2' }],
            },
            {
                type: 'DataListItem',
                label: [{ type: 'Text', content: 'Branch', variant: 'subtitle2' }],
                value: [
                    { type: 'Text', content: (_d = input.head_branch) !== null && _d !== void 0 ? _d : 'unknown', variant: 'body2' },
                ],
            },
            {
                type: 'DataListItem',
                label: [{ type: 'Text', content: 'Commit', variant: 'subtitle2' }],
                // Truncate SHA for readability
                value: [{ type: 'Text', content: input.head_sha.slice(0, 8), variant: 'body2' }],
            },
            {
                type: 'DataListItem',
                label: [{ type: 'Text', content: 'Started', variant: 'subtitle2' }],
                value: [
                    {
                        type: 'Text',
                        content: new Date((_e = input.run_started_at) !== null && _e !== void 0 ? _e : input.created_at).toLocaleString(),
                        variant: 'body2',
                    },
                ],
            },
            {
                type: 'DataListItem',
                label: [{ type: 'Text', content: 'Updated', variant: 'subtitle2' }],
                value: [
                    { type: 'Text', content: new Date(input.updated_at).toLocaleString(), variant: 'body2' },
                ],
            },
        ],
    };
    // Footer: a button linking to the workflow run on GitHub
    const footerButton = {
        type: 'Button',
        variant: 'outlined',
        color: 'primary',
        size: 'small',
        label: 'View on GitHub',
        startElement: { type: 'Icon', id: 'github', color: 'gray', size: 20 },
        href: input.html_url,
    };
    // Assemble a VerticalCard with header, content, and footer
    const card = {
        type: 'VerticalCard',
        childrenProps: [
            header,
            {
                type: 'CardContent',
                childrenProps: [detailsList],
            },
            {
                type: 'CardFooter',
                childrenProps: [footerButton],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=603.js.map