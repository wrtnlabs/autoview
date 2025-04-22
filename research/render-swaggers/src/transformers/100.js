export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Choose a chip color based on the numeric score.
     * @param score number from 0 to 5 (assumed)
     */
    function chooseScoreColor(score) {
        if (score >= 4)
            return 'success';
        if (score >= 3)
            return 'info';
        if (score >= 2)
            return 'warning';
        return 'error';
    }
    // Build a list of snapshots. If no snapshots, we'll show a placeholder text.
    const listChildren = input.snapshots && input.snapshots.length > 0
        ? input.snapshots.map((snap) => {
            // Format file attachments as buttons linking to the URL.
            const attachmentButtons = (snap.files || []).map((file) => ({
                type: 'Button',
                label: `${file.name}${file.extension ? '.' + file.extension : ''}`,
                href: file.url,
                variant: 'text',
                color: 'primary',
                size: 'small',
            }));
            return {
                type: 'DataListItem',
                // Use the title of the snapshot as the label.
                label: [
                    {
                        type: 'Text',
                        variant: 'subtitle1',
                        content: snap.title,
                    },
                ],
                // Show score chip, the body markdown, and any attachments.
                value: [
                    {
                        type: 'Chip',
                        label: String(snap.score),
                        color: chooseScoreColor(snap.score),
                        variant: 'filled',
                        size: 'small',
                    },
                    {
                        type: 'Markdown',
                        content: snap.body,
                    },
                    // Spread attachments if any.
                    ...attachmentButtons,
                ],
            };
        })
        : [
            {
                type: 'DataListItem',
                label: [
                    {
                        type: 'Text',
                        variant: 'body2',
                        content: 'No review snapshots available.',
                    },
                ],
                // Empty value.
                value: [],
            },
        ];
    // Compose the data list component.
    const dataList = {
        type: 'DataList',
        childrenProps: listChildren,
    };
    // Build the card header with an icon and creation date.
    const header = {
        type: 'CardHeader',
        title: 'Customer Review',
        description: `Created at ${new Date(input.created_at).toLocaleString()}`,
        startElement: {
            type: 'Icon',
            id: 'user',
            size: 24,
            color: 'gray',
        },
    };
    // Combine into a vertical card for responsive presentation.
    const card = {
        type: 'VerticalCard',
        childrenProps: [
            header,
            {
                type: 'CardContent',
                childrenProps: dataList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=100.js.map