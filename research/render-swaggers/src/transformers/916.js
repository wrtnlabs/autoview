export function transform($input) {
    return visualizeData($input);
}
// Helper mappings from GitHub reaction content to FontAwesome icon names and colors
const reactionIconMap = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "laugh",
    confused: "confused",
    heart: "heart",
    hooray: "tada", // celebration icon
    rocket: "rocket",
    eyes: "eye",
};
const reactionColorMap = {
    "+1": "green",
    "-1": "red",
    laugh: "yellow",
    confused: "orange",
    heart: "red",
    hooray: "violet",
    rocket: "cyan",
    eyes: "gray",
};
function visualizeData(input) {
    // A sticky subheader for the reactions list
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            variant: "h6",
            content: "Reactions",
        },
    };
    // Transform each reaction into a ListItem component
    const items = input.map((reaction) => {
        var _a, _b, _c;
        const { user, content, created_at } = reaction;
        // Determine the user's display name and avatar or fallback icon
        const login = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown User";
        const avatarUrl = user === null || user === void 0 ? void 0 : user.avatar_url;
        const startElement = avatarUrl
            ? {
                type: "Avatar",
                src: avatarUrl,
                name: login,
                variant: "gray",
                size: 40,
            }
            : {
                type: "Icon",
                id: "user",
                color: "gray",
                size: 40,
            };
        // Map the reaction content to a visual icon and color
        const iconId = (_b = reactionIconMap[content]) !== null && _b !== void 0 ? _b : "question";
        const iconColor = (_c = reactionColorMap[content]) !== null && _c !== void 0 ? _c : "gray";
        const endElement = {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 24,
        };
        // Format the timestamp to the locale string for readability
        const timestamp = new Date(created_at).toLocaleString();
        return {
            type: "ListItem",
            title: login,
            description: timestamp,
            startElement,
            endElement,
        };
    });
    // Compose the final List component, combining the subheader and all items
    return {
        type: "List",
        childrenProps: [subheader, ...items],
    };
}
//# sourceMappingURL=916.js.map