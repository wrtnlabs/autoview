export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map of reaction content to FontAwesome icon IDs
    const iconMap = {
        "+1": "thumbs-up",
        "-1": "thumbs-down",
        laugh: "laugh",
        confused: "confused",
        heart: "heart",
        hooray: "hands-clapping",
        rocket: "rocket",
        eyes: "eyes",
    };
    // Map of reaction content to icon colors
    const colorMap = {
        "+1": "green",
        "-1": "red",
        laugh: "yellow",
        confused: "orange",
        heart: "red",
        hooray: "violet",
        rocket: "cyan",
        eyes: "gray",
    };
    // Sort reactions by creation time descending (most recent first)
    const sorted = [...input].sort((a, b) => {
        const ta = new Date(a.created_at).getTime();
        const tb = new Date(b.created_at).getTime();
        return tb - ta;
    });
    // Transform each reaction into a DataListItemProps
    const childrenProps = sorted.map((reaction) => {
        var _a, _b, _c, _d, _e;
        const user = reaction.user;
        // Prepare avatar properties; if user is null, fall back to placeholder initials
        const avatar = {
            type: "Avatar",
            src: (_a = user === null || user === void 0 ? void 0 : user.avatar_url) !== null && _a !== void 0 ? _a : undefined,
            name: (_b = user === null || user === void 0 ? void 0 : user.login) !== null && _b !== void 0 ? _b : "Unknown",
            variant: "gray",
            size: 32,
        };
        // Reaction icon properties
        const contentKey = reaction.content;
        const iconId = (_c = iconMap[contentKey]) !== null && _c !== void 0 ? _c : "question";
        const iconColor = (_d = colorMap[contentKey]) !== null && _d !== void 0 ? _d : "gray";
        const reactionIcon = {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 20,
        };
        // Format timestamp for display
        const date = new Date(reaction.created_at);
        const timestamp = isNaN(date.getTime())
            ? "Invalid date"
            : date.toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        const timeText = {
            type: "Text",
            content: timestamp,
            variant: "caption",
            color: "#666666",
        };
        // Compose DataListItemProps with label (avatar + username) and value (icon + timestamp)
        return {
            type: "DataListItem",
            label: [avatar, {
                    type: "Text",
                    content: (_e = user === null || user === void 0 ? void 0 : user.login) !== null && _e !== void 0 ? _e : "Unknown",
                    variant: "body1",
                    color: "primary",
                }],
            value: [reactionIcon, timeText],
        };
    });
    // Wrap all items in a DataList for responsive, accessible display
    const dataList = {
        type: "DataList",
        childrenProps,
    };
    return dataList;
}
//# sourceMappingURL=914.js.map