export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // If there are no sessions, show a friendly message
    const sessions = (_a = input.sessions) !== null && _a !== void 0 ? _a : [];
    if (sessions.length === 0) {
        return {
            type: "Markdown",
            content: "### No chat sessions found\n\nYou don’t have any active sessions at the moment."
        };
    }
    // Helper: pick icon name based on chat type
    const getChatIcon = (chatType) => {
        switch (chatType) {
            case "group":
                return "users";
            case "broadcast":
                return "bullhorn";
            default:
                return "user";
        }
    };
    // Helper: pick watch icon name based on watch preference
    const getWatchIcon = (watch) => {
        switch (watch) {
            case "all":
                return "eye";
            case "info":
                return "info-circle";
            case "none":
                return "eye-slash";
            default:
                return "eye-slash";
        }
    };
    // Build a DataList where each session is a DataListItem
    const items = sessions.map((session) => {
        var _a, _b, _c, _d;
        // Choose the label for this session: prefer chatId, fallback to personId or key
        const sessionLabel = session.chatId || session.personId || session.key || "Unknown";
        // Compute last activity timestamp (prefer updatedAt, then receivedAt, then createdAt)
        const lastTs = (_c = (_b = (_a = session.updatedAt) !== null && _a !== void 0 ? _a : session.receivedAt) !== null && _b !== void 0 ? _b : session.createdAt) !== null && _c !== void 0 ? _c : 0;
        // Format for display (local date/time)
        const dateStr = lastTs > 0
            ? new Date(lastTs).toLocaleString()
            : "—";
        // Unread count (default to zero)
        const unreadCount = (_d = session.unread) !== null && _d !== void 0 ? _d : 0;
        // Compose the label side: icon + text
        const labelComponents = [
            {
                type: "Icon",
                id: getChatIcon(session.chatType),
                size: 20,
                color: "blue"
            },
            {
                type: "Text",
                content: sessionLabel,
                variant: "body1",
                color: "primary"
            }
        ];
        // Compose the value side: unread chip, watch icon, last-updated timestamp
        const valueComponents = [
            {
                type: "Chip",
                label: unreadCount.toString(),
                size: "small",
                variant: "filled",
                color: unreadCount > 0 ? "error" : "gray"
            },
            {
                type: "Icon",
                id: getWatchIcon(session.watch),
                size: 16,
                color: "teal"
            },
            {
                type: "Text",
                content: dateStr,
                variant: "caption",
                color: "gray"
            }
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });
    // Return the DataList component with all session items
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=183.js.map