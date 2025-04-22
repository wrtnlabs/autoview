export function transform($input) {
    return visualizeData($input);
}
/**
 * Transforms a UserChatView into a visual AutoView component tree.
 * We display a vertical card with a header (avatar + summary) and content
 * (key details in a data list, tag chips for chatTags).
 */
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g;
    // Helper to create a text component
    const makeText = (content, variant = "body1", color) => ({
        type: "Text",
        content,
        variant,
        color,
    });
    // Build CardHeader
    const user = input.user;
    // Avatar for the user or generic fallback
    const avatar = {
        type: "Avatar",
        src: user === null || user === void 0 ? void 0 : user.avatarUrl,
        name: (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : "User",
        variant: "primary",
        size: 40,
    };
    // Title: user name or "Unknown User"
    const title = (_b = user === null || user === void 0 ? void 0 : user.name) !== null && _b !== void 0 ? _b : "Unknown User";
    // Description: latest message plain text (truncated) or fallback
    const description = ((_c = input.message) === null || _c === void 0 ? void 0 : _c.plainText)
        ? input.message.plainText.length > 100
            ? input.message.plainText.slice(0, 100) + "…"
            : input.message.plainText
        : "No recent message";
    const header = {
        type: "CardHeader",
        startElement: avatar,
        title,
        description,
    };
    // Build DataList items for key fields
    const items = [];
    // Session unread count
    if (((_d = input.session) === null || _d === void 0 ? void 0 : _d.unread) !== undefined) {
        items.push({
            type: "DataListItem",
            label: [makeText("Unread", "subtitle2")],
            value: makeText(String(input.session.unread), "body1"),
        });
    }
    // Session alert count
    if (((_e = input.session) === null || _e === void 0 ? void 0 : _e.alert) !== undefined) {
        items.push({
            type: "DataListItem",
            label: [makeText("Alerts", "subtitle2")],
            value: makeText(String(input.session.alert), "body1"),
        });
    }
    // ChatTags as a ChipGroup
    if (input.chatTags && input.chatTags.length > 0) {
        const chips = input.chatTags.map((tag) => ({
            type: "Chip",
            label: tag.name,
            color: tag.colorVariant || "gray",
            size: "small",
            variant: "outlined",
        }));
        items.push({
            type: "DataListItem",
            label: [makeText("Tags", "subtitle2")],
            value: {
                type: "ChipGroup",
                childrenProps: chips,
                maxItems: 5,
            },
        });
    }
    // Campaign name if present
    if ((_f = input.campaign) === null || _f === void 0 ? void 0 : _f.name) {
        items.push({
            type: "DataListItem",
            label: [makeText("Campaign", "subtitle2")],
            value: makeText(input.campaign.name, "body1"),
        });
    }
    // One-time message state
    if (input.oneTimeMsg) {
        items.push({
            type: "DataListItem",
            label: [makeText("OneTimeMsg State", "subtitle2")],
            value: makeText(input.oneTimeMsg.state, "body1"),
        });
    }
    // UserChat state
    if ((_g = input.userChat) === null || _g === void 0 ? void 0 : _g.state) {
        items.push({
            type: "DataListItem",
            label: [makeText("Chat State", "subtitle2")],
            value: makeText(input.userChat.state, "body1"),
        });
    }
    // If no items, display a fallback markdown
    let contentChildren;
    if (items.length > 0) {
        contentChildren = {
            type: "DataList",
            childrenProps: items,
        };
    }
    else {
        // fallback to markdown
        contentChildren = {
            type: "Markdown",
            content: "No detailed data available.",
        };
    }
    // Build CardContent with the data list or markdown
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Compose a vertical card to wrap header + content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=261.js.map