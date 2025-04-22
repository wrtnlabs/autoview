export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // If there are no chats to display, show a simple markdown notice
    if (!input.userChats || input.userChats.length === 0) {
        return {
            type: "Markdown",
            content: "**No chats available**",
        };
    }
    // Build lookup maps for users and chat tags to avoid repeated scans
    const userMap = new Map();
    (_a = input.users) === null || _a === void 0 ? void 0 : _a.forEach(user => {
        if (user.id)
            userMap.set(user.id, user);
    });
    const tagMap = new Map();
    (_b = input.chatTags) === null || _b === void 0 ? void 0 : _b.forEach(tag => {
        if (tag.key)
            tagMap.set(tag.key, tag);
    });
    // Helper to map legacy tag colorVariant to AutoView chip color
    const mapTagColor = (variant) => {
        const mapping = {
            red: "red",
            orange: "orange",
            yellow: "yellow",
            olive: "lime",
            green: "green",
            cobalt: "blue",
            purple: "violet",
            pink: "pink",
            navy: "indigo",
        };
        return variant && mapping[variant] ? mapping[variant] : "gray";
    };
    // Transform each user chat into a DataListItem
    const dataListItems = input.userChats.map(chat => {
        var _a, _b, _c;
        // Determine avatar or fallback icon for the chat's user
        const user = chat.userId ? userMap.get(chat.userId) : undefined;
        const startElement = (user === null || user === void 0 ? void 0 : user.avatarUrl)
            ? {
                type: "Avatar",
                src: user.avatarUrl,
                name: user.name,
                size: 32,
            }
            : {
                type: "Icon",
                id: "user",
                size: 32,
            };
        // Create chips for each tag on this chat
        const chipProps = ((_a = chat.tags) !== null && _a !== void 0 ? _a : []).map(tagKey => {
            var _a;
            const tag = tagMap.get(tagKey);
            return {
                type: "Chip",
                label: (_a = tag === null || tag === void 0 ? void 0 : tag.name) !== null && _a !== void 0 ? _a : tagKey,
                color: mapTagColor(tag === null || tag === void 0 ? void 0 : tag.colorVariant),
                variant: "outlined",
            };
        });
        // If tags exist, wrap them in a ChipGroup
        const endElement = chipProps.length
            ? {
                type: "ChipGroup",
                childrenProps: chipProps,
            }
            : undefined;
        return {
            type: "DataListItem",
            title: (_b = chat.name) !== null && _b !== void 0 ? _b : `Chat ${chat.id}`,
            description: `State: ${(_c = chat.state) !== null && _c !== void 0 ? _c : "unknown"}`,
            startElement,
            endElement,
        };
    });
    // Compose pagination buttons if prev/next links are provided
    const footerButtons = [];
    if (input.prev) {
        footerButtons.push({
            type: "Button",
            label: "Prev",
            href: input.prev,
            variant: "outlined",
            startElement: { type: "Icon", id: "arrow-left" },
        });
    }
    if (input.next) {
        footerButtons.push({
            type: "Button",
            label: "Next",
            href: input.next,
            variant: "outlined",
            endElement: { type: "Icon", id: "arrow-right" },
        });
    }
    // Build the final VerticalCard containing header, the chat list, and optional footer
    const cardChildren = [];
    // Header with overall summary
    cardChildren.push({
        type: "CardHeader",
        title: "Chat Overview",
        description: `${input.userChats.length} chats, ${(_d = (_c = input.messages) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0} messages`,
        startElement: { type: "Icon", id: "comments" },
    });
    // Content section holding the list of chats
    cardChildren.push({
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems,
        },
    });
    // Footer with pagination if needed
    if (footerButtons.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: footerButtons,
        });
    }
    // Return the assembled vertical card
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=207.js.map