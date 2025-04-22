export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    const user = input.user;
    // If there's no user data, render a simple message
    if (!user) {
        return {
            type: "Text",
            content: "No user data available",
        };
    }
    // Helper to format timestamps into human-readable strings
    const formatDate = (ts) => ts ? new Date(ts).toLocaleString() : "Unknown";
    // Build tag chips if any tags exist
    const tagsComponent = user.tags && user.tags.length > 0
        ? {
            type: "ChipGroup",
            childrenProps: user.tags.map((tag) => ({
                type: "Chip",
                label: tag,
            })),
        }
        : {
            type: "Text",
            content: "No tags",
        };
    // Build the main card header with avatar, name, email, and online badge
    const header = {
        type: "CardHeader",
        title: user.name || "Unnamed User",
        description: user.email,
        startElement: {
            type: "Avatar",
            // Use the user's avatar URL if provided, otherwise fallback to initials
            src: user.avatarUrl,
            name: user.name,
            variant: "secondary",
            size: 40,
        },
        endElement: input.online
            ? {
                type: "Badge",
                dot: true,
                color: "green",
                // A dot badge with no count
                childrenProps: {
                    type: "Icon",
                    id: "circle", // small circle icon to attach the dot to
                    size: 8,
                    color: "green",
                },
            }
            : undefined,
    };
    // Build a list of key user statistics
    const dataListItems = [
        {
            type: "DataListItem",
            // Display tags
            label: { type: "Icon", id: "tags", color: "gray", size: 16 },
            value: tagsComponent,
        },
        {
            type: "DataListItem",
            // Display alert count with a bell icon badge
            label: { type: "Icon", id: "bell", color: "orange", size: 16 },
            value: {
                type: "Badge",
                count: (_a = user.alert) !== null && _a !== void 0 ? _a : 0,
                showZero: true,
                maxCount: 99,
                childrenProps: { type: "Icon", id: "bell", color: "orange", size: 16 },
            },
        },
        {
            type: "DataListItem",
            // Display unread messages with an envelope icon badge
            label: { type: "Icon", id: "envelope", color: "blue", size: 16 },
            value: {
                type: "Badge",
                count: (_b = user.unread) !== null && _b !== void 0 ? _b : 0,
                showZero: true,
                maxCount: 99,
                childrenProps: { type: "Icon", id: "envelope", color: "blue", size: 16 },
            },
        },
        {
            type: "DataListItem",
            // Display location icon + city, country
            label: { type: "Icon", id: "map-marker-alt", color: "red", size: 16 },
            value: {
                type: "Text",
                content: `${(_c = user.city) !== null && _c !== void 0 ? _c : "Unknown city"}${user.country ? `, ${user.country}` : ""}`,
            },
        },
        {
            type: "DataListItem",
            // Display last seen timestamp
            label: { type: "Icon", id: "clock", color: "gray", size: 16 },
            value: {
                type: "Text",
                content: formatDate(user.lastSeenAt),
            },
        },
        {
            type: "DataListItem",
            // Display account creation date
            label: { type: "Icon", id: "calendar-alt", color: "gray", size: 16 },
            value: {
                type: "Text",
                content: formatDate(user.createdAt),
            },
        },
        {
            type: "DataListItem",
            // Display total sessions count
            label: { type: "Icon", id: "users", color: "teal", size: 16 },
            value: {
                type: "Text",
                content: `${(_d = user.sessionsCount) !== null && _d !== void 0 ? _d : 0}`,
            },
        },
    ];
    // Wrap the items into a DataList
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Compose the vertical card presenting all the information
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
}
//# sourceMappingURL=216.js.map