export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    // Destructure commonly used parts
    const { user, userSession, message, chatTags = [], campaign, userOnline, userChat } = input;
    // CARD HEADER: Show user avatar, name, and online badge
    const header = {
        type: "CardHeader",
        // Display the user's name or fallback to the chat title or generic text
        title: (_b = (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : userChat === null || userChat === void 0 ? void 0 : userChat.title) !== null && _b !== void 0 ? _b : "Chat",
        // Display the chat state if available
        description: (userChat === null || userChat === void 0 ? void 0 : userChat.state) ? `Status: ${userChat.state}` : undefined,
        // Show avatar if URL exists
        startElement: (user === null || user === void 0 ? void 0 : user.avatarUrl)
            ? {
                type: "Avatar",
                src: user.avatarUrl,
                name: user.name,
                variant: "blue",
                size: 40,
            }
            : undefined,
        // If the user is online, show a green dot badge
        endElement: userOnline
            ? {
                type: "Badge",
                dot: true,
                color: "green",
                childrenProps: {
                    type: "Icon",
                    id: "circle",
                    size: 8,
                    color: "green",
                },
            }
            : undefined,
    };
    // CONTENT: build an array of visual elements
    const contentChildren = [];
    // 1) Campaign chip (if any)
    if (campaign) {
        // Map campaign state to a chip color
        const stateColorMap = {
            draft: "gray",
            active: "green",
            stopped: "orange",
            removed: "red",
        };
        contentChildren.push({
            type: "Chip",
            label: campaign.name,
            color: (_d = stateColorMap[(_c = campaign.state) !== null && _c !== void 0 ? _c : ""]) !== null && _d !== void 0 ? _d : "gray",
            size: "small",
        });
    }
    // 2) Chat tags as a ChipGroup
    if (chatTags.length > 0) {
        // Map unsupported tag colors to closest supported
        const normalizeColor = (c) => {
            var _a;
            switch (c) {
                case "olive":
                    return "yellow";
                case "cobalt":
                    return "blue";
                case "purple":
                    return "violet";
                case "navy":
                    return "indigo";
                default:
                    // cast safely if in supported list
                    return (_a = c) !== null && _a !== void 0 ? _a : "gray";
            }
        };
        const tagChips = chatTags.map((t) => ({
            type: "Chip",
            label: t.name,
            color: normalizeColor(t.colorVariant),
            size: "small",
        }));
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: tagChips,
            maxItems: tagChips.length,
        });
    }
    // 3) Last message preview: use Markdown if plain text exists
    if (message === null || message === void 0 ? void 0 : message.plainText) {
        contentChildren.push({
            type: "Markdown",
            content: message.plainText,
        });
    }
    // 4) Show rich preview if webPage info exists
    if ((_e = message === null || message === void 0 ? void 0 : message.webPage) === null || _e === void 0 ? void 0 : _e.imageUrl) {
        contentChildren.push({
            type: "Image",
            src: message.webPage.imageUrl,
            alt: message.webPage.title,
        });
    }
    // 5) List attached files in a DataList
    if ((message === null || message === void 0 ? void 0 : message.files) && message.files.length > 0) {
        const fileItems = message.files.map((f) => ({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "File",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: f.name,
                },
            ],
        }));
        contentChildren.push({
            type: "DataList",
            childrenProps: fileItems,
        });
    }
    // 6) Session summary: unread count & last message timestamp
    if (userSession) {
        const sessionItems = [];
        if (typeof userSession.unread === "number") {
            sessionItems.push({
                type: "DataListItem",
                label: [{ type: "Text", content: "Unread" }],
                value: [{ type: "Text", content: String(userSession.unread) }],
            });
        }
        if (typeof userSession.updatedAt === "number") {
            // format timestamp to locale string
            const when = new Date(userSession.updatedAt).toLocaleString();
            sessionItems.push({
                type: "DataListItem",
                label: [{ type: "Text", content: "Last Update" }],
                value: [{ type: "Text", content: when }],
            });
        }
        if (sessionItems.length) {
            contentChildren.push({
                type: "DataList",
                childrenProps: sessionItems,
            });
        }
    }
    // Wrap content into a CardContent component
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // FINAL OUTPUT: VerticalCard combining header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
}
//# sourceMappingURL=262.js.map