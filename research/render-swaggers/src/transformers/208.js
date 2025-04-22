export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract sessions array safely
    const sessions = (_a = input.sessions) !== null && _a !== void 0 ? _a : [];
    // If there are no sessions, show a friendly markdown message
    if (sessions.length === 0) {
        return {
            type: "Markdown",
            content: "**No chat sessions found**\n\nThere are currently no sessions to display."
        };
    }
    // Map each session to a ListItemProps
    const sessionItems = sessions.map((session) => {
        var _a, _b, _c, _d;
        // Derive a display title: prefer chatId, then key, then a fallback label
        const title = (_b = (_a = session.chatId) !== null && _a !== void 0 ? _a : session.key) !== null && _b !== void 0 ? _b : "Unnamed Session";
        // Format the most recent timestamp for description
        const timestamp = (_d = (_c = session.updatedAt) !== null && _c !== void 0 ? _c : session.createdAt) !== null && _d !== void 0 ? _d : session.receivedAt;
        const description = timestamp
            ? `**Last updated:** ${new Date(timestamp).toLocaleString()}`
            : undefined;
        // Use an icon at the start to represent a chat thread
        const startElement = {
            type: "Icon",
            id: "comments", // FontAwesome "comments" icon
            color: "blue",
            size: 24
        };
        // If there are unread messages, show a badge with the count
        let endElement;
        if (typeof session.unread === "number" && session.unread > 0) {
            endElement = {
                type: "Badge",
                count: session.unread,
                // Nest an envelope icon inside the badge
                childrenProps: {
                    type: "Icon",
                    id: "envelope",
                    color: "red",
                    size: 16
                }
            };
        }
        // Compose and return the list item
        const item = Object.assign({ type: "ListItem", title,
            description,
            startElement }, (endElement ? { endElement } : {}));
        return item;
    });
    // Return a responsive List component containing all session items
    const list = {
        type: "List",
        childrenProps: sessionItems
    };
    return list;
}
//# sourceMappingURL=208.js.map