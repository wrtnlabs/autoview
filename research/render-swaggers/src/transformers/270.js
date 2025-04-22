export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Destructure commonly used fields for convenience
    const { user, userOnline, chatTags, session, bookmark, message } = input;
    // Prepare avatar component: show user's avatar or initials
    const avatar = {
        type: "Avatar",
        src: user === null || user === void 0 ? void 0 : user.avatarUrl,
        name: user === null || user === void 0 ? void 0 : user.name,
        variant: "primary",
        size: 40,
    };
    // Prepare online status icon: green if online, gray otherwise
    const statusIcon = {
        type: "Icon",
        id: "circle",
        color: userOnline ? "green" : "gray",
        size: 12,
    };
    // Helper to format a timestamp (in ms) to a locale string
    const formatTimestamp = (ms) => ms ? new Date(ms).toLocaleString() : "N/A";
    // Build a list of metric items (unread, tags, bookmark, last message)
    const metrics = [];
    // Unread count
    metrics.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "envelope", color: "blue", size: 16 },
            { type: "Text", content: ["Unread"], variant: "body2" },
        ],
        value: {
            type: "Text",
            content: [String((_a = session === null || session === void 0 ? void 0 : session.unread) !== null && _a !== void 0 ? _a : 0)],
            variant: "body2",
        },
    });
    // Chat tags count
    metrics.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "tag", color: "violet", size: 16 },
            { type: "Text", content: ["Tags"], variant: "body2" },
        ],
        value: {
            type: "Text",
            content: [String((_b = chatTags === null || chatTags === void 0 ? void 0 : chatTags.length) !== null && _b !== void 0 ? _b : 0)],
            variant: "body2",
        },
    });
    // Bookmark status
    metrics.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "bookmark", color: "orange", size: 16 },
            { type: "Text", content: ["Bookmarked"], variant: "body2" },
        ],
        value: {
            type: "Text",
            content: [bookmark ? "Yes" : "No"],
            variant: "body2",
            color: bookmark ? "success" : "gray",
        },
    });
    // Last message timestamp
    metrics.push({
        type: "DataListItem",
        label: [
            { type: "Icon", id: "clock", color: "teal", size: 16 },
            { type: "Text", content: ["Last Msg"], variant: "body2" },
        ],
        value: {
            type: "Text",
            content: [formatTimestamp(message === null || message === void 0 ? void 0 : message.createdAt)],
            variant: "body2",
        },
    });
    // Compose the UI as a vertical card:
    //  - CardHeader: user info + status
    //  - CardContent: a DataList of metrics
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: (_c = user === null || user === void 0 ? void 0 : user.name) !== null && _c !== void 0 ? _c : "Unknown User",
                description: (_d = user === null || user === void 0 ? void 0 : user.type) !== null && _d !== void 0 ? _d : "",
                startElement: avatar,
                endElement: statusIcon,
            },
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: metrics,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=270.js.map