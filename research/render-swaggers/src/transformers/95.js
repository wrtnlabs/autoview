export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Select an icon based on the file format
    let formatIconId;
    switch (input.format) {
        case 'md':
            formatIconId = 'file-lines';
            break;
        case 'html':
            formatIconId = 'file-code';
            break;
        case 'txt':
            formatIconId = 'file-alt';
            break;
        default:
            formatIconId = 'file';
    }
    // Human‐readable creation date
    const createdAt = new Date(input.created_at).toLocaleString();
    // Card header with title, date, and format icon
    const header = {
        type: 'CardHeader',
        title: input.title,
        description: createdAt,
        startElement: {
            type: 'Icon',
            id: formatIconId,
            size: 20,
            color: 'blue'
        }
    };
    // Main body rendered as markdown for rich formatting
    const markdown = {
        type: 'Markdown',
        content: input.body
    };
    const cardContent = {
        type: 'CardContent',
        childrenProps: [markdown]
    };
    // If there are attachments, list them in the footer
    let cardFooter;
    if (input.files && input.files.length > 0) {
        const items = input.files.map(file => {
            // Reconstruct the full filename
            const fileName = file.extension && file.extension.length > 0
                ? `${file.name}.${file.extension}`
                : file.name;
            return {
                type: 'DataListItem',
                // Show a paperclip icon next to the filename
                label: [
                    { type: 'Icon', id: 'paperclip', size: 16, color: 'gray' },
                    { type: 'Text', content: fileName, variant: 'body2' }
                ],
                // Provide a download link via a text button
                value: {
                    type: 'Button',
                    variant: 'text',
                    label: 'Download',
                    href: file.url
                }
            };
        });
        const dataList = {
            type: 'DataList',
            childrenProps: items
        };
        cardFooter = {
            type: 'CardFooter',
            childrenProps: [dataList]
        };
    }
    // Assemble the vertical card; include footer only if attachments exist
    const card = {
        type: 'VerticalCard',
        childrenProps: cardFooter
            ? [header, cardContent, cardFooter]
            : [header, cardContent]
    };
    return card;
}
//# sourceMappingURL=95.js.map