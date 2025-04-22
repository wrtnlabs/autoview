export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: Recursively build a Markdown bullet list of hierarchical categories
    function buildCategoriesMarkdown(categories, indent = 0) {
        if (!categories.length) {
            return '';
        }
        return categories
            .map((cat) => {
            // indent bullets by two spaces per level
            const prefix = '  '.repeat(indent) + '-';
            // show name and code
            const line = `${prefix} **${cat.name}** (\`${cat.code}\`)`;
            // recurse into children
            const childrenMd = buildCategoriesMarkdown(cat.children, indent + 1);
            return childrenMd ? `${line}\n${childrenMd}` : line;
        })
            .join('\n');
    }
    // If no channels, show a friendly message
    if (!Array.isArray(input.data) || input.data.length === 0) {
        return {
            type: 'Text',
            variant: 'body1',
            content: 'No shopping channels available.',
        };
    }
    // Create a VerticalCard for each shopping channel
    const channelCards = input.data.map((channel) => {
        // render category tree as markdown
        const categoriesMd = buildCategoriesMarkdown(channel.categories);
        // if empty, show a placeholder
        const markdownContent = categoriesMd.trim().length > 0
            ? categoriesMd
            : '_No categories defined._';
        return {
            type: 'VerticalCard',
            childrenProps: [
                // Card Header: channel name with icon
                {
                    type: 'CardHeader',
                    title: channel.name,
                    description: `Code: ${channel.code}`,
                    startElement: {
                        type: 'Icon',
                        id: 'shopping-cart',
                        color: 'blue',
                        size: 24,
                    },
                },
                // Card Content: markdown of categories
                {
                    type: 'CardContent',
                    childrenProps: {
                        type: 'Markdown',
                        content: `### Categories\n${markdownContent}`,
                    },
                },
            ],
        };
    });
    // Wrap all cards in a carousel for responsive, swipeable display
    return {
        type: 'Carousel',
        autoPlay: false,
        infinite: false,
        gutter: 16,
        navControls: true,
        indicators: true,
        childrenProps: channelCards,
    };
}
//# sourceMappingURL=112.js.map