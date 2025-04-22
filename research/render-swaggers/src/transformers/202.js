export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper to map legacy tag color to UI chip color
    const mapTagColor = (variant) => {
        switch (variant) {
            case "red":
            case "orange":
            case "yellow":
            case "olive":
            case "green":
            case "cobalt":
            case "purple":
            case "pink":
            case "navy":
                // olive → green, cobalt/navy → blue
                if (variant === "olive")
                    return "green";
                if (variant === "cobalt" || variant === "navy")
                    return "blue";
                return variant;
            default:
                return "gray";
        }
    };
    // Build a list of key–value items for display
    const listItems = [];
    // 1) User information: avatar + name
    if (input.user) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "User", variant: "subtitle2" },
            value: [
                {
                    type: "Avatar",
                    src: input.user.avatarUrl,
                    name: input.user.name,
                    size: 40,
                    variant: "primary",
                },
                {
                    type: "Text",
                    content: input.user.name || "[No Name]",
                    variant: "body1",
                },
            ],
        });
    }
    // 2) Chat session: status and unread count
    if (input.session) {
        const s = input.session;
        const status = s.watch || "none";
        const unread = s.unread != null ? `${s.unread}` : "0";
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Session", variant: "subtitle2" },
            value: [
                { type: "Text", content: `Status: ${status}`, variant: "body2" },
                {
                    type: "Badge",
                    count: s.unread,
                    showZero: false,
                    color: "error",
                    childrenProps: { type: "Icon", id: "envelope", color: "gray", size: 20 },
                },
            ],
        });
    }
    // 3) Chat tags: clickable chips
    if (Array.isArray(input.chatTags) && input.chatTags.length > 0) {
        const chips = input.chatTags.map((tag) => ({
            type: "Chip",
            label: tag.name,
            color: mapTagColor(tag.colorVariant),
            size: "small",
            variant: "outlined",
        }));
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Tags", variant: "subtitle2" },
            value: {
                type: "ChipGroup",
                childrenProps: chips,
            },
        });
    }
    // 4) Last message: markdown if available, fallback to plain text
    if (input.message) {
        const msg = input.message;
        let contentMd = msg.plainText;
        // if there are blocks, concatenate them with markdown formatting
        if (!contentMd && Array.isArray(msg.blocks)) {
            contentMd = msg.blocks
                .map((b) => {
                if (b.type === "code")
                    return "" + (b.language || "") + "\n" + (b.value || "") + "\n```";
                if (b.type === "bullets")
                    return `- ${b.value || ""}`;
                return b.value || "";
            })
                .join("\n");
        }
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Last Message", variant: "subtitle2" },
            value: { type: "Markdown", content: contentMd || "_no content_" },
        });
    }
    // 5) Campaign or one-time message info if present
    if (input.campaign) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Campaign", variant: "subtitle2" },
            value: { type: "Text", content: input.campaign.name, variant: "body1" },
        });
    }
    else if (input.oneTimeMsg) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "One-Time Msg", variant: "subtitle2" },
            value: { type: "Text", content: input.oneTimeMsg.name, variant: "body1" },
        });
    }
    // 6) Bookmark indicator
    if (input.bookmark && input.bookmark.bookmarkKey) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Bookmarked", variant: "subtitle2" },
            value: {
                type: "Icon",
                id: "bookmark",
                color: "teal",
                size: 20,
            },
        });
    }
    // Compose the view: vertical card with header and content list
    const headerTitle = ((_a = input.userChat) === null || _a === void 0 ? void 0 : _a.id)
        ? `Chat #${input.userChat.id}`
        : "Chat View";
    const headerDesc = ((_b = input.userChat) === null || _b === void 0 ? void 0 : _b.state)
        ? `State: ${input.userChat.state}`
        : undefined;
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: headerTitle,
                description: headerDesc,
                startElement: input.user
                    ? {
                        type: "Avatar",
                        src: input.user.avatarUrl,
                        name: input.user.name,
                        size: 32,
                    }
                    : undefined,
            },
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
            // optionally add actions in footer
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "Open Chat",
                    variant: "outlined",
                    size: "small",
                    startElement: { type: "Icon", id: "arrow-right", size: 16, color: "blue" },
                },
            },
        ],
    };
}
//# sourceMappingURL=202.js.map