export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    const { user, online } = input;
    // If there's no user, show a simple markdown note
    if (!user) {
        return {
            type: "Markdown",
            content: "### No user data available"
        };
    }
    // Build an avatar: prefer src; fallback to user name initials
    const avatar = {
        type: "Avatar",
        src: user.avatarUrl,
        name: user.name || "Unknown",
        variant: "primary",
        size: 40
    };
    // Online/offline status as a colored chip
    const statusChip = {
        type: "Chip",
        label: online ? "Online" : "Offline",
        color: online ? "green" : "gray",
        variant: "filled"
    };
    // Card header: avatar + name + type + online status
    const header = {
        type: "CardHeader",
        startElement: avatar,
        title: user.name || "Unnamed User",
        description: user.type ? user.type.charAt(0).toUpperCase() + user.type.slice(1) : undefined,
        endElement: statusChip
    };
    // Prepare key/value rows for the user properties
    const rows = [];
    // Utility to push a yes/no row
    function pushBooleanRow(labelText, value) {
        rows.push({
            type: "DataListItem",
            label: { type: "Text", content: labelText },
            value: { type: "Text", content: value ? "Yes" : "No" }
        });
    }
    // Utility to push a generic text row
    function pushTextRow(labelText, valueText) {
        rows.push({
            type: "DataListItem",
            label: { type: "Text", content: labelText },
            value: { type: "Text", content: valueText || "-" }
        });
    }
    // Boolean flags
    pushBooleanRow("Email Qualified", user.emailQualified);
    pushBooleanRow("Mobile Qualified", user.mobileNumberQualified);
    pushBooleanRow("Has Chat", user.hasChat);
    // Numeric counters
    pushTextRow("Unread Messages", (_a = user.unread) === null || _a === void 0 ? void 0 : _a.toString());
    pushTextRow("Alerts", (_b = user.alert) === null || _b === void 0 ? void 0 : _b.toString());
    // Optional IDs
    if (user.channelId) {
        pushTextRow("Channel ID", user.channelId);
    }
    if (user.memberId) {
        pushTextRow("Member ID", user.memberId);
    }
    // Render as data list
    const dataList = {
        type: "DataList",
        childrenProps: rows
    };
    // Wrap the data list in card content
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Footer: show created/updated timestamps if available
    const footerElements = [];
    if (user.createdAt) {
        footerElements.push({
            type: "Text",
            content: `Created: ${new Date(user.createdAt).toLocaleString()}`
        });
    }
    if (user.updatedAt) {
        footerElements.push({
            type: "Text",
            content: `Updated: ${new Date(user.updatedAt).toLocaleString()}`
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerElements.length > 0 ? footerElements : undefined
    };
    // Assemble the vertical card for responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
    return card;
}
//# sourceMappingURL=276.js.map