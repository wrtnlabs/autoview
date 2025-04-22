export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const user = input.user || {};
    const online = input.online !== undefined;
    // Helper to build DataList items
    const makeItem = (labelText, valueComponent) => ({
        type: "DataListItem",
        label: { type: "Text", content: labelText },
        value: valueComponent,
    });
    // Construct the avatar with online indicator color
    const avatar = {
        type: "Avatar",
        src: user.avatarUrl,
        name: user.name,
        variant: online ? "green" : "gray",
        size: 40,
    };
    // Build the list of user properties
    const dataItems = [];
    // User IDs
    if (user.id) {
        dataItems.push(makeItem("ID", { type: "Text", content: user.id }));
    }
    if (user.userId) {
        dataItems.push(makeItem("User ID", { type: "Text", content: user.userId }));
    }
    if (user.channelId) {
        dataItems.push(makeItem("Channel", { type: "Text", content: user.channelId }));
    }
    // Online status
    dataItems.push(makeItem("Status", {
        type: "Icon",
        id: "circle",
        color: online ? "green" : "gray",
        size: 12,
    }));
    // Location
    const locationParts = [];
    if (user.city)
        locationParts.push(user.city);
    if (user.country)
        locationParts.push(user.country);
    const locationText = locationParts.join(", ") || "Unknown";
    dataItems.push(makeItem("Location", { type: "Text", content: locationText }));
    // Last seen
    if (typeof user.lastSeenAt === "number") {
        const seen = new Date(user.lastSeenAt).toLocaleString();
        dataItems.push(makeItem("Last Seen", { type: "Text", content: seen }));
    }
    // Sessions count
    if (typeof user.sessionsCount === "number") {
        dataItems.push(makeItem("Sessions", { type: "Text", content: String(user.sessionsCount) }));
    }
    // Alert count as a badge on a bell icon
    if (typeof user.alert === "number") {
        dataItems.push(makeItem("Alerts", {
            type: "Badge",
            count: user.alert,
            maxCount: 99,
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "bell",
                color: "red",
                size: 16,
            },
        }));
    }
    // Tags as a ChipGroup
    if (Array.isArray(user.tags) && user.tags.length > 0) {
        const chips = user.tags.map((tag) => ({
            type: "Chip",
            label: tag,
            variant: "outlined",
            size: "small",
        }));
        dataItems.push(makeItem("Tags", {
            type: "ChipGroup",
            childrenProps: chips,
        }));
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Footer icons for web and mobile presence
    const footerIcons = [];
    if (user.web && (user.web.browser || user.web.device)) {
        footerIcons.push({
            type: "Icon",
            id: "globe",
            color: "blue",
            size: 20,
        });
    }
    if (user.mobile && (user.mobile.appName || user.mobile.device)) {
        footerIcons.push({
            type: "Icon",
            id: "mobile-alt",
            color: "teal",
            size: 20,
        });
    }
    const footer = Object.assign({ type: "CardFooter" }, (footerIcons.length > 0 ? { childrenProps: footerIcons } : {}));
    // Header with avatar, name, and subtitle
    const header = {
        type: "CardHeader",
        startElement: avatar,
        title: user.name || "Unknown User",
        description: user.userId,
    };
    // Assemble the vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, { type: "CardContent", childrenProps: [dataList] }, footer],
    };
    return card;
}
//# sourceMappingURL=214.js.map