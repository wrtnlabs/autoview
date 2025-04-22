export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO date-time strings into a human-readable form
    const formatDateTime = (iso) => new Date(iso).toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    });
    // Choose a chip color based on visibility level
    const visibilityColorMap = {
        all: 'success',
        private: 'error',
        selected: 'info',
    };
    const visibilityColor = visibilityColorMap[input.visibility] || 'gray';
    // Build a list of data list items for the secret properties
    const dataListItems = [];
    // Created At
    dataListItems.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            variant: 'body2',
            content: 'Created At',
            color: 'tertiary'
        },
        value: {
            type: 'Text',
            variant: 'body2',
            content: formatDateTime(input.created_at),
            color: 'primary'
        }
    });
    // Updated At
    dataListItems.push({
        type: 'DataListItem',
        label: {
            type: 'Text',
            variant: 'body2',
            content: 'Updated At',
            color: 'tertiary'
        },
        value: {
            type: 'Text',
            variant: 'body2',
            content: formatDateTime(input.updated_at),
            color: 'primary'
        }
    });
    // If the secret visibility is "selected", provide a link to the selected repos
    if (input.visibility === 'selected' && input.selected_repositories_url) {
        dataListItems.push({
            type: 'DataListItem',
            label: {
                type: 'Text',
                variant: 'body2',
                content: 'Repositories URL',
                color: 'tertiary'
            },
            // Render as a button that opens the URL
            value: {
                type: 'Button',
                variant: 'text',
                color: 'primary',
                size: 'small',
                label: 'View Repos',
                href: input.selected_repositories_url
            }
        });
    }
    // Define the card header with an icon and a chip showing visibility
    const cardHeader = {
        type: 'CardHeader',
        title: input.name,
        // Use subtitle to show raw visibility string
        description: `Visibility: ${input.visibility}`,
        startElement: {
            type: 'Icon',
            id: 'key',
            color: 'gray',
            size: 24
        },
        endElement: {
            type: 'Chip',
            label: input.visibility.toUpperCase(),
            color: visibilityColor,
            size: 'small',
            variant: 'filled'
        }
    };
    // Bundle the list items into a DataList inside the card content
    const cardContent = {
        type: 'CardContent',
        childrenProps: {
            type: 'DataList',
            childrenProps: dataListItems
        }
    };
    // Return a vertical card containing the header and the content list
    const card = {
        type: 'VerticalCard',
        childrenProps: [cardHeader, cardContent]
    };
    return card;
}
//# sourceMappingURL=412.js.map