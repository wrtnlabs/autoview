export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Helper: map GitHub reaction keys to FontAwesome icon IDs
    const reactionIconMap = {
        '+1': 'thumbs-up',
        '-1': 'thumbs-down',
        laugh: 'laugh',
        confused: 'confused',
        heart: 'heart',
        hooray: 'tada', // FontAwesome "tada" for celebration
        eyes: 'eye',
        rocket: 'rocket',
    };
    // Build a header with avatar and author info
    const author = input.author;
    const authorAvatar = {
        type: 'Avatar',
        src: author === null || author === void 0 ? void 0 : author.avatar_url,
        name: (_a = author === null || author === void 0 ? void 0 : author.login) !== null && _a !== void 0 ? _a : 'Unknown',
        variant: 'primary',
        size: 32,
    };
    const header = {
        type: 'CardHeader',
        title: (_c = (_b = author === null || author === void 0 ? void 0 : author.name) !== null && _b !== void 0 ? _b : author === null || author === void 0 ? void 0 : author.login) !== null && _c !== void 0 ? _c : 'Unknown User',
        description: `Posted on ${new Date(input.created_at).toLocaleString()}`,
        startElement: authorAvatar,
    };
    // Use Markdown component to render the comment body (assumes `body` is markdown)
    const contentComponents = [
        {
            type: 'Markdown',
            content: input.body,
        },
    ];
    // If there are reaction rollups, build a DataList of reactions
    if (input.reactions && input.reactions.total_count > 0) {
        const items = [];
        // Collect only reaction types (exclude url and total_count)
        for (const key of Object.keys(input.reactions)) {
            if (key === 'url' || key === 'total_count')
                continue;
            const count = input.reactions[key];
            if (count > 0 && reactionIconMap[key]) {
                // Icon for this reaction
                const icon = {
                    type: 'Icon',
                    id: reactionIconMap[key],
                    color: 'gray',
                    size: 16,
                };
                // Label: icon + reaction name
                const label = [
                    icon,
                    {
                        type: 'Text',
                        content: key === '+1' ? 'Upvotes' :
                            key === '-1' ? 'Downvotes' :
                                key.charAt(0).toUpperCase() + key.slice(1),
                        variant: 'body2',
                    },
                ];
                // Value: count
                const value = {
                    type: 'Text',
                    content: count.toString(),
                    variant: 'body2',
                };
                items.push({
                    type: 'DataListItem',
                    label,
                    value,
                });
            }
        }
        if (items.length > 0) {
            contentComponents.push({
                type: 'DataList',
                childrenProps: items,
            });
        }
    }
    // Assemble card content
    const cardContent = {
        type: 'CardContent',
        childrenProps: contentComponents,
    };
    // Optionally show last edited timestamp in footer
    const footerChildren = [];
    if (input.last_edited_at) {
        footerChildren.push({
            type: 'Text',
            content: `Edited on ${new Date(input.last_edited_at).toLocaleString()}`,
            variant: 'caption',
            color: '#666',
        });
    }
    const cardFooter = {
        type: 'CardFooter',
        childrenProps: footerChildren.length > 0 ? footerChildren : undefined,
    };
    // Compose the vertical card: header, body, footer
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, cardContent, cardFooter].filter((c) => !!c),
    };
    return card;
}
//# sourceMappingURL=542.js.map