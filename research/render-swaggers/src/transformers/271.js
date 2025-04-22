export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // Helper: map chatTag colorVariant to AutoView chip color
    const mapTagColor = (variant) => {
        switch (variant) {
            case "red": return "red";
            case "orange": return "orange";
            case "yellow": return "yellow";
            case "olive": return "lime";
            case "green": return "green";
            case "cobalt": return "blue";
            case "purple": return "violet";
            case "pink": return "pink";
            case "navy": return "indigo";
            default: return "gray";
        }
    };
    // Build card header: show user's avatar and name
    const user = input.user;
    const userName = (_b = (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : user === null || user === void 0 ? void 0 : user.id) !== null && _b !== void 0 ? _b : "Unknown User";
    const avatar = {
        type: "Avatar",
        src: user === null || user === void 0 ? void 0 : user.avatarUrl,
        name: userName,
        variant: "blue",
        size: 40,
    };
    const header = {
        type: "CardHeader",
        startElement: avatar,
        title: userName,
        // Show chat state if available
        description: ((_c = input.userChat) === null || _c === void 0 ? void 0 : _c.state) ? `State: ${input.userChat.state}` : undefined,
    };
    // Build card content: status chips and details list
    const contentChildren = [];
    // Online status chip
    const online = input.userOnline;
    contentChildren.push({
        type: "Chip",
        label: online ? "Online" : "Offline",
        color: online ? "success" : "gray",
        size: "small",
        variant: "filled",
    });
    // Prepare data list items for session, message, timestamp
    const listItems = [];
    if (input.session) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Unread" }],
            value: [{ type: "Text", content: String((_d = input.session.unread) !== null && _d !== void 0 ? _d : 0) }],
        });
    }
    if (input.message) {
        // Use Markdown for message content to preserve formatting
        const text = (_e = input.message.plainText) !== null && _e !== void 0 ? _e : "(no message text)";
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Last Message" }],
            value: [{ type: "Markdown", content: text }],
        });
        // Timestamp
        if (input.message.createdAt) {
            listItems.push({
                type: "DataListItem",
                label: [{ type: "Text", content: "At" }],
                value: [
                    {
                        type: "Text",
                        content: new Date(input.message.createdAt).toLocaleString(),
                    },
                ],
            });
        }
    }
    if (listItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: listItems,
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren.length > 0 ? contentChildren : undefined,
    };
    // Build card footer: tags as chips
    const footerChips = ((_f = input.chatTags) !== null && _f !== void 0 ? _f : []).map((tag) => ({
        type: "Chip",
        label: tag.name,
        color: mapTagColor(tag.colorVariant),
        size: "small",
        variant: "outlined",
    }));
    const footer = {
        type: "CardFooter",
        childrenProps: footerChips.length > 0 ? footerChips : undefined,
    };
    // Compose VerticalCard to wrap header, content, footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=271.js.map