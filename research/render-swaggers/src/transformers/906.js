export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format ISO date to localized date string
    const formatDate = (iso) => {
        const dt = new Date(iso);
        // e.g. "Mar 10, 2023"
        return dt.toLocaleDateString(undefined, {
            year: "numeric", month: "short", day: "numeric"
        });
    };
    // Map each discussion to a ListItem component
    const items = input.map(discussion => {
        var _a, _b, _c, _d, _e, _f, _g;
        // Author avatar, fallback to login if name missing
        const avatar = {
            type: "Avatar",
            src: (_a = discussion.author) === null || _a === void 0 ? void 0 : _a.avatar_url,
            name: (_e = (_c = (_b = discussion.author) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : (_d = discussion.author) === null || _d === void 0 ? void 0 : _d.login) !== null && _e !== void 0 ? _e : "Unknown",
            size: 40,
            variant: "gray"
        };
        // Comments badge with icon inside
        const commentBadge = {
            type: "Badge",
            count: discussion.comments_count,
            maxCount: 99,
            showZero: false,
            color: "blue",
            childrenProps: {
                type: "Icon",
                id: "comment",
                size: 16,
                color: "blue"
            }
        };
        // Reactions chip showing total reactions
        const reactionsCount = (_g = (_f = discussion.reactions) === null || _f === void 0 ? void 0 : _f.total_count) !== null && _g !== void 0 ? _g : 0;
        const reactionsChip = {
            type: "Chip",
            label: reactionsCount.toString(),
            variant: "outlined",
            size: "small",
            color: reactionsCount > 0 ? "red" : "gray",
            startElement: {
                type: "Icon",
                id: "heart",
                size: 16,
                color: reactionsCount > 0 ? "red" : "gray"
            }
        };
        // Build ListItemProps
        const listItem = {
            type: "ListItem",
            title: discussion.title,
            description: `#${discussion.number} • Updated ${formatDate(discussion.updated_at)}`,
            startElement: avatar,
            endElement: [commentBadge, reactionsChip]
        };
        return listItem;
    });
    // Compose into a responsive List component
    const list = {
        type: "List",
        // on mobile this list stacks vertically; each item is tappable
        childrenProps: items
    };
    return list;
}
//# sourceMappingURL=906.js.map