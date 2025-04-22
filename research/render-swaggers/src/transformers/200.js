export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Build a lookup of users by their ID for quick access.
    const usersById = {};
    (_a = input.users) === null || _a === void 0 ? void 0 : _a.forEach(u => {
        if (u.id) {
            usersById[u.id] = u;
        }
    });
    // Group messages by chatKey (session identifier).
    const messagesByChat = {};
    (_b = input.messages) === null || _b === void 0 ? void 0 : _b.forEach(m => {
        if (m.chatKey) {
            messagesByChat[m.chatKey] = messagesByChat[m.chatKey] || [];
            messagesByChat[m.chatKey].push(m);
        }
    });
    // Sort sessions by most recent update.
    const sessions = (input.sessions || []).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    // Transform each session into a DataListItemProps
    const items = sessions.map(session => {
        var _a;
        const chatKey = session.chatKey || "";
        const user = session.personId ? usersById[session.personId] : undefined;
        // Build an avatar component (or fallback to an icon if no image).
        const avatar = {
            type: "Avatar",
            src: user === null || user === void 0 ? void 0 : user.avatarUrl,
            name: user === null || user === void 0 ? void 0 : user.name,
            variant: "primary",
            size: 32,
        };
        // Find the latest message in this session.
        const msgs = messagesByChat[chatKey] || [];
        const lastMsg = msgs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))[0];
        const plainText = (_a = lastMsg === null || lastMsg === void 0 ? void 0 : lastMsg.plainText) !== null && _a !== void 0 ? _a : "";
        const snippetRaw = plainText.length > 0
            ? plainText.slice(0, 60) + (plainText.length > 60 ? "…" : "")
            : "No messages yet";
        const messageText = {
            type: "Text",
            variant: "body2",
            color: "secondary",
            content: snippetRaw,
        };
        // If the session has unread count, wrap avatar in a badge.
        const badgedAvatar = (session.unread && session.unread > 0)
            ? {
                type: "Badge",
                count: session.unread,
                maxCount: 99,
                showZero: false,
                color: "error",
                childrenProps: avatar,
            }
            : avatar;
        // Display the user's name (or a fallback).
        const nameText = {
            type: "Text",
            variant: "subtitle1",
            content: (user === null || user === void 0 ? void 0 : user.name) || "Unknown User",
        };
        return {
            type: "DataListItem",
            // Left side: avatar/badge + user name
            label: [badgedAvatar, nameText],
            // Right side: last message snippet
            value: messageText,
        };
    });
    // If there are no sessions, show a friendly Markdown message.
    if (items.length === 0) {
        return {
            type: "Markdown",
            content: "### No active chat sessions found\nStart a conversation to see it here.",
        };
    }
    // Compose the DataList component with all sessions.
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=200.js.map