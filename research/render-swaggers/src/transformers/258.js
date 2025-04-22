export function transform($input) {
    return visualizeData($input);
}
// Helper to map ChatTag color variants to AutoView chip colors
function mapTagColor(variant) {
    switch (variant) {
        case "red":
            return "red";
        case "orange":
            return "orange";
        case "yellow":
            return "yellow";
        case "olive":
            return "lime";
        case "green":
            return "green";
        case "cobalt":
            return "blue";
        case "purple":
            return "violet";
        case "pink":
            return "pink";
        case "navy":
            return "indigo";
        default:
            return "gray";
    }
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Build the card header using user info
    const user = input.user;
    const userHeader = {
        type: "CardHeader",
        title: (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : "Unknown User",
        description: (_c = (_b = user === null || user === void 0 ? void 0 : user.email) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.memberId) !== null && _c !== void 0 ? _c : "",
        startElement: {
            type: "Avatar",
            src: user === null || user === void 0 ? void 0 : user.avatarUrl,
            name: user === null || user === void 0 ? void 0 : user.name,
            size: 40,
        },
        // Show online/offline status
        endElement: {
            type: "Icon",
            id: "circle",
            size: 12,
            color: input.userOnline ? "green" : "gray",
        },
    };
    // Build the data list items for session and last message
    const session = input.session;
    const message = input.message;
    const dataListItems = [];
    if (session) {
        dataListItems.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Unread" },
            ],
            value: [
                {
                    type: "Text",
                    content: String((_d = session.unread) !== null && _d !== void 0 ? _d : 0),
                },
            ],
        });
    }
    if (message) {
        // Use markdown to render the last message text for richer styling
        const text = (_g = (_e = message.plainText) !== null && _e !== void 0 ? _e : (_f = message.blocks) === null || _f === void 0 ? void 0 : _f.map((b) => b.value).filter((v) => typeof v === "string").join("\n")) !== null && _g !== void 0 ? _g : "";
        dataListItems.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Last Message" },
            ],
            value: {
                type: "Markdown",
                content: text || "*No messages yet*",
            },
        });
    }
    // Build the card content; if we have any list items, render the DataList
    const contentChildren = dataListItems.length > 0
        ? [
            {
                type: "DataList",
                childrenProps: dataListItems,
            },
        ]
        : [
            {
                type: "Text",
                content: "No session or messages to display.",
            },
        ];
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build chips for chat tags in the footer
    const tags = (_h = input.chatTags) !== null && _h !== void 0 ? _h : [];
    const chips = tags.map((t) => ({
        type: "Chip",
        label: t.name,
        color: mapTagColor(t.colorVariant),
        variant: "outlined",
    }));
    const cardFooter = {
        type: "CardFooter",
        // Only render if there are tags
        childrenProps: chips.length
            ? {
                type: "ChipGroup",
                childrenProps: chips,
                maxItems: 5,
            }
            : [],
    };
    // Compose the vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [userHeader, cardContent, cardFooter],
    };
    return card;
}
//# sourceMappingURL=258.js.map