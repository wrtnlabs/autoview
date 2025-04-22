export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // Helper: map legacy tag colorVariant to chip color
    function mapTagColor(variant) {
        switch (variant) {
            case 'red': return 'red';
            case 'orange': return 'orange';
            case 'yellow': return 'yellow';
            case 'olive': return 'lime';
            case 'green': return 'green';
            case 'teal': return 'teal';
            case 'cyan': return 'cyan';
            case 'blue': return 'blue';
            case 'cobalt': return 'indigo';
            case 'navy': return 'indigo';
            case 'purple': return 'violet';
            case 'pink': return 'pink';
            default: return 'gray';
        }
    }
    // Build CardHeaderProps
    const header = {
        type: "CardHeader",
        title: ((_a = input.user) === null || _a === void 0 ? void 0 : _a.name) || ((_b = input.user) === null || _b === void 0 ? void 0 : _b.userId) || "Unknown User",
        description: (_c = input.user) === null || _c === void 0 ? void 0 : _c.email,
        // Show avatar if available, else user icon
        startElement: ((_d = input.user) === null || _d === void 0 ? void 0 : _d.avatarUrl)
            ? {
                type: "Avatar",
                src: input.user.avatarUrl,
                name: input.user.name,
                variant: "primary",
                size: 40
            }
            : {
                type: "Icon",
                id: "user",
                color: "gray",
                size: 32
            },
        // Show chat state as a chip if available
        endElement: ((_e = input.userChat) === null || _e === void 0 ? void 0 : _e.state)
            ? {
                type: "Chip",
                label: input.userChat.state,
                color: input.userChat.state === "opened"
                    ? "success"
                    : input.userChat.state === "closed"
                        ? "error"
                        : "secondary",
                size: "small",
                variant: "outlined"
            }
            : undefined
    };
    // Prepare DataList items for various sections
    const items = [];
    // Campaign info
    if (input.campaign) {
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "bullhorn", color: "blue", size: 20 },
                { type: "Text", content: `Campaign` }
            ],
            value: [
                { type: "Text", content: input.campaign.name },
                { type: "Chip", label: input.campaign.state || "unknown", color: input.campaign.state === "active" ? "success" :
                        input.campaign.state === "stopped" ? "warning" :
                            input.campaign.state === "removed" ? "error" : "secondary",
                    size: "small",
                    variant: "outlined"
                }
            ]
        });
    }
    // Bookmark key
    if ((_f = input.bookmark) === null || _f === void 0 ? void 0 : _f.bookmarkKey) {
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "bookmark", color: "orange", size: 20 },
                { type: "Text", content: "Bookmark" }
            ],
            value: { type: "Text", content: input.bookmark.bookmarkKey }
        });
    }
    // Session unread count
    if (((_g = input.session) === null || _g === void 0 ? void 0 : _g.unread) !== undefined) {
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "envelope", color: "cyan", size: 20 },
                { type: "Text", content: "Unread Messages" }
            ],
            value: { type: "Text", content: String(input.session.unread) }
        });
    }
    // Chat tags as chips
    if (input.chatTags && input.chatTags.length) {
        const chips = input.chatTags.map(tag => ({
            type: "Chip",
            label: tag.name,
            color: mapTagColor(tag.colorVariant),
            size: "small",
            variant: "filled"
        }));
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "tags", color: "teal", size: 20 },
                { type: "Text", content: "Tags" }
            ],
            value: { type: "ChipGroup", childrenProps: chips }
        });
    }
    // Last message preview
    if ((_h = input.message) === null || _h === void 0 ? void 0 : _h.plainText) {
        // Truncate preview to 100 characters
        const preview = input.message.plainText.length > 100
            ? input.message.plainText.slice(0, 100) + "…"
            : input.message.plainText;
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "comments", color: "gray", size: 20 },
                { type: "Text", content: "Last Message" }
            ],
            value: { type: "Markdown", content: preview.replace(/\n/g, " ") }
        });
    }
    // One-time message info
    if (input.oneTimeMsg) {
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "clock", color: "violet", size: 20 },
                { type: "Text", content: "One-Time Msg" }
            ],
            value: [
                { type: "Text", content: input.oneTimeMsg.name },
                { type: "Chip", label: input.oneTimeMsg.state, color: input.oneTimeMsg.state === "sent" ? "success" :
                        input.oneTimeMsg.state === "canceled" ? "error" : "secondary",
                    size: "small",
                    variant: "outlined"
                }
            ]
        });
    }
    // Support bot info
    if (input.supportBot) {
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "robot", color: "pink", size: 20 },
                { type: "Text", content: "Support Bot" }
            ],
            value: [
                { type: "Text", content: input.supportBot.botName },
                { type: "Chip", label: input.supportBot.state, color: input.supportBot.state === "active" ? "success" : "secondary",
                    size: "small",
                    variant: "outlined"
                }
            ]
        });
    }
    // User chat metadata
    if (input.userChat) {
        items.push({
            type: "DataListItem",
            label: [
                { type: "Icon", id: "comments", color: "blue", size: 20 },
                { type: "Text", content: "Chat State" }
            ],
            value: { type: "Text", content: input.userChat.state || "unknown" }
        });
    }
    // Wrap items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Compose CardContent
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Optionally, add a footer with actions (omitted if no actions required)
    // Here we skip CardFooter for conciseness
    // Build the VerticalCard root component
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=203.js.map