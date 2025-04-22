export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: Map reaction content to a color theme for chips
    const reactionColorMap = {
        "+1": "success",
        "-1": "error",
        laugh: "yellow",
        confused: "orange",
        heart: "red",
        hooray: "green",
        rocket: "teal",
        eyes: "blue",
    };
    // Helper: Format ISO date-time into a user-friendly string
    function formatDateTime(iso) {
        const date = new Date(iso);
        // Fallback for invalid dates
        if (isNaN(date.getTime()))
            return iso;
        return date.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    }
    // If there are no reactions, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No reactions found\n\nBe the first to react to this conversation!",
        };
    }
    // Sort reactions by creation time descending (most recent first)
    const sorted = [...input].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Transform each reaction into a DataListItem
    const items = sorted.map((reaction) => {
        var _a, _b, _c;
        // Destructure user, may be null
        const user = reaction.user;
        const login = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown";
        const avatarSrc = user === null || user === void 0 ? void 0 : user.avatar_url;
        const avatarName = (_b = user === null || user === void 0 ? void 0 : user.name) !== null && _b !== void 0 ? _b : login;
        // Build avatar component
        const avatar = Object.assign(Object.assign({ type: "Avatar", name: avatarName }, (avatarSrc ? { src: avatarSrc } : {})), { 
            // small avatar to save horizontal space
            size: 32 });
        // Username text next to avatar
        const userNameText = {
            type: "Text",
            variant: "body1",
            content: login,
        };
        // Reaction chip showing the content
        const reactionChip = {
            type: "Chip",
            label: reaction.content,
            variant: "filled",
            size: "small",
            color: (_c = reactionColorMap[reaction.content]) !== null && _c !== void 0 ? _c : "gray",
        };
        // Timestamp text
        const timestampText = {
            type: "Text",
            variant: "caption",
            color: "gray",
            content: formatDateTime(reaction.created_at),
        };
        // Compose the DataListItem: label shows user info; value shows reaction and timestamp
        return {
            type: "DataListItem",
            label: [
                avatar,
                {
                    // A tiny divider for spacing; could be a zero-width Divider for layout
                    type: "Divider",
                    orientation: "vertical",
                    color: "transparent",
                },
                userNameText,
            ],
            value: [
                reactionChip,
                {
                    type: "Divider",
                    orientation: "vertical",
                    color: "transparent",
                },
                timestampText,
            ],
        };
    });
    // Finally, wrap all items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=544.js.map