export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format ISO timestamps into localized strings
    const formatTimestamp = (iso) => {
        try {
            const d = new Date(iso);
            return isNaN(d.getTime()) ? iso : d.toLocaleString();
        }
        catch (_a) {
            // Fallback to the original string if parsing fails
            return iso;
        }
    };
    const createdAt = formatTimestamp(input.created_at);
    const updatedAt = formatTimestamp(input.updated_at);
    // Map visibility to a semantic chip color
    const visibilityColorMap = {
        all: 'success',
        private: 'error',
        selected: 'warning',
    };
    // Build a data list of properties (created, updated, repos link if any)
    const dataListItems = [
        {
            type: 'DataListItem',
            // Use a simple Text for the label
            label: { type: 'Text', content: 'Created At', variant: 'subtitle2' },
            // Show formatted timestamp
            value: { type: 'Text', content: createdAt, variant: 'body2' },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Updated At', variant: 'subtitle2' },
            value: { type: 'Text', content: updatedAt, variant: 'body2' },
        },
    ];
    // If the secret is scoped to selected repositories, show a button to view them
    if (input.visibility === 'selected' && input.selected_repositories_url) {
        dataListItems.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Repositories', variant: 'subtitle2' },
            value: {
                type: 'Button',
                label: 'View Repositories',
                variant: 'text',
                color: 'primary',
                size: 'small',
                href: input.selected_repositories_url,
            },
        });
    }
    return {
        // Use a vertical card to stack header, content, and footer
        type: 'VerticalCard',
        childrenProps: [
            // Card header: show secret name and visibility with a lock icon
            {
                type: 'CardHeader',
                title: input.name,
                description: `Visibility: ${input.visibility}`,
                startElement: {
                    type: 'Icon',
                    id: 'lock',
                    color: 'gray',
                    size: 20,
                },
            },
            // Card content: a data list of the secret's metadata
            {
                type: 'CardContent',
                childrenProps: {
                    type: 'DataList',
                    childrenProps: dataListItems,
                },
            },
            // Card footer: a chip summarizing the visibility
            {
                type: 'CardFooter',
                childrenProps: {
                    type: 'Chip',
                    label: input.visibility,
                    color: visibilityColorMap[input.visibility] || 'secondary',
                    size: 'small',
                    variant: 'outlined',
                },
            },
        ],
    };
}
//# sourceMappingURL=435.js.map