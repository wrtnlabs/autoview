export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    const sessions = (_a = input.sessions) !== null && _a !== void 0 ? _a : [];
    // If there are no chat sessions, render a friendly markdown message.
    if (sessions.length === 0) {
        return {
            type: "Markdown",
            content: "**No chat sessions available**\n\n" +
                "Start a new conversation to see it listed here.",
        };
    }
    // Transform each session into a ListItem.
    const items = sessions.map((session) => {
        var _a, _b, _c;
        // Pick an icon based on chatType.
        const chatTypeIconId = (() => {
            switch (session.chatType) {
                case "team":
                    return "users"; // team chat → group icon
                case "channel":
                    return "hashtag"; // channel → hashtag icon
                default:
                    return "comment"; // direct message or unknown → comment icon
            }
        })();
        // Start element: visual icon for the chat.
        const startElement = {
            type: "Icon",
            id: chatTypeIconId,
            size: 24,
            // Highlight icon if there are unread messages.
            color: session.unread && session.unread > 0 ? "red" : "blue",
        };
        // Title: prefer chatId, fall back to other identifiers.
        const title = (_c = (_b = (_a = session.chatId) !== null && _a !== void 0 ? _a : session.channelId) !== null && _b !== void 0 ? _b : session.personId) !== null && _c !== void 0 ? _c : "Unknown Chat";
        // Description: human‐readable last‐updated timestamp.
        const description = session.updatedAt
            ? `Last updated: ${new Date(session.updatedAt).toLocaleString()}`
            : undefined;
        // End element: show a badge with the number of unread messages, if any.
        let endElement;
        if (session.unread && session.unread > 0) {
            endElement = {
                type: "Badge",
                count: session.unread,
                maxCount: 99,
                showZero: false,
                color: "error",
                childrenProps: {
                    type: "Icon",
                    id: "bell",
                    size: 16,
                    color: "red",
                },
            };
        }
        else {
            // If zero unread, show a muted note instead of a zero badge.
            endElement = {
                type: "Text",
                content: "No unread",
                variant: "caption",
                color: "gray",
            };
        }
        // Assemble the list item.
        const listItem = {
            type: "ListItem",
            title,
            description,
            startElement,
            endElement,
        };
        return listItem;
    });
    // Wrap all list items in a responsive list.
    const listProps = {
        type: "List",
        childrenProps: items,
    };
    return listProps;
}
//# sourceMappingURL=267.js.map