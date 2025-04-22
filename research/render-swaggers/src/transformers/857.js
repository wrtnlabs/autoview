export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Extract user data, handling case where user may be null
    const user = input.user;
    const userName = (_b = (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : user === null || user === void 0 ? void 0 : user.login) !== null && _b !== void 0 ? _b : "Unknown User";
    const avatarUrl = user === null || user === void 0 ? void 0 : user.avatar_url;
    // Map each reaction content to an icon name and a color
    const reactionMapping = {
        "+1": { icon: "thumbs-up", color: "green" },
        "-1": { icon: "thumbs-down", color: "red" },
        laugh: { icon: "laugh", color: "yellow" },
        confused: { icon: "meh", color: "orange" },
        heart: { icon: "heart", color: "pink" },
        hooray: { icon: "grin-stars", color: "violet" },
        rocket: { icon: "rocket", color: "cyan" },
        eyes: { icon: "eye", color: "gray" },
    };
    // Fallback to a question icon if content is unrecognized
    const { icon, color } = (_c = reactionMapping[input.content]) !== null && _c !== void 0 ? _c : { icon: "question-circle", color: "darkGray" };
    // Format creation date for display
    const formattedDate = (() => {
        try {
            // Display in local date-time format
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            return input.created_at; // Fallback to raw string
        }
    })();
    // Build the card header, showing avatar, user name, and reaction icon
    const header = {
        type: "CardHeader",
        title: userName,
        startElement: avatarUrl
            ? {
                type: "Avatar",
                src: avatarUrl,
                name: userName,
                size: 40,
                variant: "gray",
            }
            : undefined,
        endElement: {
            type: "Icon",
            id: icon,
            color,
            size: 20,
        },
    };
    // Build the card footer, showing the timestamp
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Text",
            variant: "caption",
            color: "tertiary",
            content: formattedDate,
        },
    };
    // Wrap header and footer in a vertical card for a clean, responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, footer],
    };
    return card;
}
//# sourceMappingURL=857.js.map