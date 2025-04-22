export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no chat sessions to display, show a friendly markdown message.
    if (!input.sessions || input.sessions.length === 0) {
        return {
            type: "Markdown",
            content: "### No active chat sessions\n\nThere are currently no chat sessions to display."
        };
    }
    // Build a list item for each session, showing avatar (with unread badge), name, and unread count.
    const items = input.sessions.map((session) => {
        var _a, _b, _c, _d, _e;
        // Try to find the corresponding user by personId; fallback to a generic chat label.
        const user = (_a = input.users) === null || _a === void 0 ? void 0 : _a.find((u) => u.id === session.personId);
        // Avatar for the user (or a gray fallback if not found).
        const avatar = {
            type: "Avatar",
            src: user === null || user === void 0 ? void 0 : user.avatarUrl,
            name: user === null || user === void 0 ? void 0 : user.name,
            variant: user ? "blue" : "gray",
            size: 32
        };
        // Wrap avatar in a badge to highlight unread count.
        const unreadCount = (_b = session.unread) !== null && _b !== void 0 ? _b : 0;
        const avatarWithBadge = {
            type: "Badge",
            childrenProps: avatar,
            count: unreadCount,
            maxCount: 99,
            showZero: false,
            color: unreadCount > 0 ? "error" : "gray"
        };
        // Text component for the session/user label.
        const nameText = {
            type: "Text",
            content: (_e = (_d = (_c = user === null || user === void 0 ? void 0 : user.name) !== null && _c !== void 0 ? _c : session.chatId) !== null && _d !== void 0 ? _d : session.chatKey) !== null && _e !== void 0 ? _e : "Chat",
            variant: "body1"
        };
        // Text component for the unread‐message summary.
        const unreadText = {
            type: "Text",
            content: `${unreadCount} unread message${unreadCount === 1 ? "" : "s"}`,
            variant: "caption",
            color: "gray"
        };
        return {
            type: "DataListItem",
            // Label can be an array of presentation components: [badge, username]
            label: [avatarWithBadge, nameText],
            // Value is shown on the right: unread summary
            value: unreadText
        };
    });
    // Return a DataList component with all the session items.
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=257.js.map