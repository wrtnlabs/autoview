export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Map reaction content to font-awesome icon IDs and colors
    const reactionIconMap = {
        '+1': { id: 'thumbs-up', color: 'green' },
        '-1': { id: 'thumbs-down', color: 'red' },
        laugh: { id: 'laugh', color: 'yellow' },
        confused: { id: 'confused', color: 'orange' },
        heart: { id: 'heart', color: 'pink' },
        hooray: { id: 'hands-clapping', color: 'violet' }, // approximate hooray
        rocket: { id: 'rocket', color: 'teal' },
        eyes: { id: 'eyes', color: 'cyan' },
    };
    // Safely extract user information, handle null user
    const user = (_a = input.user) !== null && _a !== void 0 ? _a : {
        avatar_url: '',
        login: 'Unknown',
        name: null
    };
    // Prepare avatar element: shows user image or initials
    const avatar = {
        type: 'Avatar',
        src: user.avatar_url,
        name: (_b = user.name) !== null && _b !== void 0 ? _b : user.login,
        variant: 'gray',
        size: 40,
    };
    // Format timestamp to a localized string
    const createdAt = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            // Fallback to raw timestamp if invalid
            return input.created_at;
        }
    })();
    // Header: avatar + user name + timestamp
    const header = {
        type: 'CardHeader',
        title: (_c = user.name) !== null && _c !== void 0 ? _c : user.login,
        description: createdAt,
        startElement: avatar,
    };
    // Determine icon for the reaction
    const iconMeta = (_d = reactionIconMap[input.content]) !== null && _d !== void 0 ? _d : {
        id: input.content,
        color: 'gray',
    };
    const reactionIcon = {
        type: 'Icon',
        id: iconMeta.id,
        color: iconMeta.color,
        size: 32,
    };
    // Represent the reaction with a chip: icon + label
    const reactionChip = {
        type: 'Chip',
        label: input.content,
        startElement: reactionIcon,
        variant: 'outlined',
        color: 'primary',
        size: 'medium',
    };
    // Content block containing the reaction chip
    const content = {
        type: 'CardContent',
        childrenProps: reactionChip,
    };
    // Assemble a vertical card: header + content
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=547.js.map