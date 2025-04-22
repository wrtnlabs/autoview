export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const user = input.user;
    const online = input.online;
    // If there is no user data, render a friendly markdown message
    if (!user) {
        return {
            type: "Markdown",
            content: "**No user data available**",
        };
    }
    // Helper to format timestamps into human-readable strings
    const formatDate = (ts) => ts != null ? new Date(ts).toLocaleString() : "-";
    // Determine online status
    const isOnline = online != null;
    // Build a list of key/value pairs to display in the details section
    const details = [
        ["User ID", (_a = user.id) !== null && _a !== void 0 ? _a : "-"],
        ["Channel ID", (_b = user.channelId) !== null && _b !== void 0 ? _b : "-"],
        ["Member ID", (_c = user.memberId) !== null && _c !== void 0 ? _c : "-"],
        ["Unified ID", (_d = user.unifiedId) !== null && _d !== void 0 ? _d : "-"],
        ["Email", (_e = user.email) !== null && _e !== void 0 ? _e : "-"],
        ["Country", (_f = user.country) !== null && _f !== void 0 ? _f : "-"],
        ["City", (_g = user.city) !== null && _g !== void 0 ? _g : "-"],
        ["Language", (_h = user.language) !== null && _h !== void 0 ? _h : "-"],
        ["Sessions", user.sessionsCount != null ? String(user.sessionsCount) : "-"],
        ["Last Seen", formatDate(user.lastSeenAt)],
        ["Created At", formatDate(user.createdAt)],
        ["Updated At", formatDate(user.updatedAt)],
    ];
    // Transform each detail into a DataListItemProps
    const detailItems = details.map(([labelText, valueText]) => ({
        type: "DataListItem",
        // label rendered in smaller gray text
        label: {
            type: "Text",
            content: labelText,
            variant: "body2",
            color: "gray",
        },
        // value in primary body text
        value: {
            type: "Text",
            content: valueText,
            variant: "body1",
        },
    }));
    // Compose the overall card UI
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: user.name,
                // Show channel ID as subtitle
                description: user.channelId,
                // Show avatar if available
                startElement: {
                    type: "Avatar",
                    src: user.avatarUrl,
                    name: user.name,
                    size: 40,
                },
                // Show an online/offline chip
                endElement: {
                    type: "Chip",
                    label: isOnline ? "Online" : "Offline",
                    color: isOnline ? "success" : "gray",
                    size: "small",
                    variant: "filled",
                },
            },
            {
                type: "CardContent",
                // Wrap the details list in a DataList for structured layout
                childrenProps: {
                    type: "DataList",
                    childrenProps: detailItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=215.js.map