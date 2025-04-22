export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map reaction content to FontAwesome icon IDs and display colors
    const iconMap = {
        '+1': { id: 'thumbs-up', color: 'green' },
        '-1': { id: 'thumbs-down', color: 'red' },
        laugh: { id: 'laugh', color: 'yellow' },
        confused: { id: 'confused', color: 'orange' },
        heart: { id: 'heart', color: 'red' },
        hooray: { id: 'hands-clapping', color: 'teal' },
        rocket: { id: 'rocket', color: 'cyan' },
        eyes: { id: 'eyes', color: 'blue' },
    };
    // Map reaction content to emoji for markdown fallback
    const emojiMap = {
        '+1': '👍',
        '-1': '👎',
        laugh: '😆',
        confused: '😕',
        heart: '❤️',
        hooray: '🎉',
        rocket: '🚀',
        eyes: '👀',
    };
    // Safely extract user info, falling back if null
    const user = input.user;
    const userLogin = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : 'Unknown';
    const avatarSrc = user === null || user === void 0 ? void 0 : user.avatar_url;
    const avatarName = (_c = (_b = user === null || user === void 0 ? void 0 : user.name) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.login) !== null && _c !== void 0 ? _c : 'Unknown';
    // Format creation timestamp to a human-readable string
    const formattedDate = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Determine the icon props for the reaction
    const reactionIcon = iconMap[input.content] || { id: input.content, color: 'gray' };
    return {
        // Using a VerticalCard to stack header and content
        type: 'VerticalCard',
        childrenProps: [
            Object.assign(Object.assign({ 
                // Card header: shows user avatar, name, timestamp and reaction icon
                type: 'CardHeader', title: userLogin, description: formattedDate }, (avatarSrc
                ? {
                    startElement: {
                        type: 'Avatar',
                        src: avatarSrc,
                        name: avatarName,
                        variant: 'primary',
                        size: 32,
                    },
                }
                : {})), { 
                // Display reaction icon in the header
                endElement: {
                    type: 'Icon',
                    id: reactionIcon.id,
                    color: reactionIcon.color,
                    size: 24,
                } }),
            {
                // Card content: use markdown to make the reaction text more engaging
                type: 'CardContent',
                childrenProps: [
                    {
                        type: 'Markdown',
                        content: `
**${emojiMap[input.content] || ''} Reacted with \`${input.content}\`**

*This reaction was created at ${formattedDate}.*
            `.trim(),
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=917.js.map