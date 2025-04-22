export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Map GitHub reaction types to FontAwesome icons and colors
    const reactionMap = {
        '+1': { icon: 'thumbs-up', color: 'green' },
        '-1': { icon: 'thumbs-down', color: 'red' },
        laugh: { icon: 'laugh', color: 'yellow' },
        confused: { icon: 'question', color: 'orange' },
        heart: { icon: 'heart', color: 'pink' },
        hooray: { icon: 'tada', color: 'orange' },
        eyes: { icon: 'eye', color: 'blue' },
        rocket: { icon: 'rocket', color: 'teal' },
    };
    // Build an array of ChipProps for each non-zero reaction
    const reactionChips = [];
    if (input.reactions) {
        for (const key of Object.keys(reactionMap)) {
            // Type-unsafe index access; we trust the compiler-validated input
            const count = input.reactions[key];
            if (typeof count === 'number' && count > 0) {
                const { icon, color } = reactionMap[key];
                reactionChips.push({
                    type: 'Chip',
                    label: `${key} ${count}`,
                    startElement: { type: 'Icon', id: icon, color },
                    variant: 'outlined',
                    size: 'small',
                });
            }
        }
    }
    // Create an avatar if available, otherwise a fallback icon
    const userAvatar = input.user && input.user.avatar_url
        ? {
            type: 'Avatar',
            src: input.user.avatar_url,
            name: input.user.login,
            variant: 'primary',
            size: 40,
        }
        : {
            type: 'Icon',
            id: 'user',
            color: 'gray',
            size: 40,
        };
    // Card header: shows user avatar, login, and a short commit ID
    const header = {
        type: 'CardHeader',
        startElement: userAvatar,
        title: (_b = (_a = input.user) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : 'Unknown User',
        description: `Comment on ${input.commit_id.slice(0, 7)}`,
    };
    // Card content: render the comment body as markdown for rich text
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'Markdown',
            content: input.body || '',
        },
    };
    // Card footer: reaction chips or a placeholder text, plus a link button
    const footerChildren = [];
    if (reactionChips.length > 0) {
        footerChildren.push({
            type: 'ChipGroup',
            childrenProps: reactionChips,
        });
    }
    else {
        footerChildren.push({
            type: 'Text',
            variant: 'caption',
            color: 'gray',
            content: 'No reactions',
        });
    }
    if (input.html_url) {
        footerChildren.push({
            type: 'Button',
            variant: 'text',
            startElement: { type: 'Icon', id: 'link', color: 'blue' },
            label: 'View on GitHub',
            href: input.html_url,
        });
    }
    const footer = {
        type: 'CardFooter',
        childrenProps: footerChildren,
    };
    // Assemble the vertical card with header, content, and footer
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=700.js.map