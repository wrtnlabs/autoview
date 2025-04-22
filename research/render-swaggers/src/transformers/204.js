export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Build header with user info (avatar + name + identifier)
    const user = input.user;
    const header = {
        type: "CardHeader",
        title: (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : "Chat",
        description: (_c = (_b = user === null || user === void 0 ? void 0 : user.email) !== null && _b !== void 0 ? _b : user === null || user === void 0 ? void 0 : user.userId) !== null && _c !== void 0 ? _c : "",
        // only include avatar if URL is provided
        startElement: (user === null || user === void 0 ? void 0 : user.avatarUrl)
            ? {
                type: "Avatar",
                src: user.avatarUrl,
                name: user.name,
            }
            : undefined,
    };
    // Prepare an array of presentation components for the card content
    const contentChildren = [];
    // 1. Render the latest message as Markdown if available
    const msg = input.message;
    if (msg) {
        // Prefer plainText, fallback to concatenated block values
        let messageContent = msg.plainText;
        if (!messageContent && Array.isArray(msg.blocks)) {
            messageContent = msg.blocks.map((b) => { var _a; return (_a = b.value) !== null && _a !== void 0 ? _a : ""; }).join("\n\n");
        }
        if (messageContent) {
            contentChildren.push({
                type: "Markdown",
                content: messageContent,
            });
        }
    }
    // 2. Render chat tags as a group of chips
    if (Array.isArray(input.chatTags) && input.chatTags.length > 0) {
        // Map legacy colorVariant to AutoView chip color
        const mapColor = (variant) => {
            switch (variant) {
                case "olive":
                case "yellow":
                    return "yellow";
                case "cobalt":
                case "blue":
                    return "blue";
                case "navy":
                case "indigo":
                    return "indigo";
                case "purple":
                case "violet":
                    return "violet";
                case "pink":
                    return "pink";
                case "green":
                    return "green";
                case "red":
                    return "red";
                case "orange":
                    return "orange";
                default:
                    return "gray";
            }
        };
        const chips = input.chatTags.map((tag) => ({
            type: "Chip",
            label: tag.name,
            color: mapColor(tag.colorVariant),
            size: "small",
            variant: "filled",
        }));
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: chips,
        });
    }
    // 3. Render session statistics as a data list
    const ses = input.session;
    if (ses) {
        const items = [];
        if (ses.unread !== undefined) {
            items.push({
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Unread", variant: "subtitle2" },
                ],
                value: [{ type: "Text", content: `${ses.unread}`, variant: "body2" }],
            });
        }
        if (ses.alert !== undefined) {
            items.push({
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Alerts", variant: "subtitle2" },
                ],
                value: [{ type: "Text", content: `${ses.alert}`, variant: "body2" }],
            });
        }
        if (ses.watch) {
            items.push({
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Watch", variant: "subtitle2" },
                ],
                value: [{ type: "Text", content: ses.watch, variant: "body2" }],
            });
        }
        if (items.length > 0) {
            contentChildren.push({
                type: "DataList",
                childrenProps: items,
            });
        }
    }
    // 4. Fallback text if there's nothing to show
    if (contentChildren.length === 0) {
        contentChildren.push({
            type: "Text",
            content: "No details available.",
        });
    }
    // Wrap content children into a CardContent component
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble everything into a VerticalCard for responsive display
    const card = {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
    return card;
}
//# sourceMappingURL=204.js.map