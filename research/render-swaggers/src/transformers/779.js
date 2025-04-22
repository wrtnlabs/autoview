export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Map each reaction content string to an appropriate FontAwesome icon name and color
    const reactionIconMap = {
        '+1': { id: 'thumbs-up', color: 'green' },
        '-1': { id: 'thumbs-down', color: 'red' },
        'laugh': { id: 'laugh', color: 'yellow' },
        'confused': { id: 'meh', color: 'orange' },
        'heart': { id: 'heart', color: 'red' },
        'hooray': { id: 'hands-clapping', color: 'violet' },
        'rocket': { id: 'rocket', color: 'gray' },
        'eyes': { id: 'eye', color: 'teal' },
    };
    // Fallback if we encounter an unknown content value
    const { id: reactionIconId, color: reactionIconColor } = (_a = reactionIconMap[input.content]) !== null && _a !== void 0 ? _a : { id: input.content, color: 'gray' };
    // Format the ISO timestamp into a human-friendly local string.
    // If parsing fails, just show the raw input.
    const formattedDate = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Choose an avatar if user data is present, otherwise use a generic user icon.
    const headerAvatarOrIcon = input.user && input.user.avatar_url
        ? {
            type: 'Avatar',
            src: input.user.avatar_url,
            name: input.user.login,
            // size and variant are optional; let the UI theme decide defaults
        }
        : {
            type: 'Icon',
            id: 'user',
            color: 'gray',
            size: 24,
        };
    // Build the content of the card with a mix of avatar/icon, text, and the reaction icon.
    const cardContentChildren = [
        // Show the avatar or fallback icon
        headerAvatarOrIcon,
        // User login or a placeholder when missing
        {
            type: 'Text',
            variant: 'h6',
            content: (_c = (_b = input.user) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : 'Unknown User',
        },
        // Timestamp of the reaction
        {
            type: 'Text',
            variant: 'caption',
            content: formattedDate,
        },
        // The reaction icon itself
        {
            type: 'Icon',
            id: reactionIconId,
            color: reactionIconColor,
            size: 24,
        },
    ];
    // Compose the final layout as a horizontal card: avatar on the left, details on the right
    return {
        type: 'HorizontalCard',
        childrenProps: [
            // Media section: show the user's avatar if available
            {
                type: 'CardMedia',
                src: (_d = input.user) === null || _d === void 0 ? void 0 : _d.avatar_url,
            },
            // Content section: all reaction details
            {
                type: 'CardContent',
                childrenProps: cardContentChildren,
            },
        ],
    };
}
//# sourceMappingURL=779.js.map