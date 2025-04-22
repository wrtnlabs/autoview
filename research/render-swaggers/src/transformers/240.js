export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // Build header for the conversation overview
    const header = {
        type: "CardHeader",
        title: input.chat
            ? `Chat ${(_b = (_a = input.chat.channelId) !== null && _a !== void 0 ? _a : input.chat.id) !== null && _b !== void 0 ? _b : ""}`
            : "No Chat Data",
        description: input.chat
            ? input.chat.active
                ? "Status: Active"
                : "Status: Inactive"
            : undefined,
        // Use a chat bubble icon to illustrate this is a conversation
        startElement: {
            type: "Icon",
            id: "comments", // FontAwesome icon name
            color: "blue",
            size: 24,
        },
    };
    // Build an array of presentation components for the content section
    const contentChildren = [];
    // If there are managers associated, show an avatar group
    if (Array.isArray(input.managers) && input.managers.length > 0) {
        const avatars = input.managers.map((m) => ({
            type: "Avatar",
            src: m.avatarUrl,
            name: m.name,
            variant: "primary",
            size: 32,
        }));
        contentChildren.push({
            type: "AvatarGroup",
            childrenProps: avatars,
            totalItems: input.managers.length,
        });
    }
    // Build a data list of core identifiers and timestamps
    const listItems = [];
    if (input.chat) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Chat ID", variant: "subtitle2" }],
            value: [{ type: "Text", content: (_c = input.chat.id) !== null && _c !== void 0 ? _c : "N/A", variant: "body2" }],
        });
        if (input.chat.createdAt) {
            listItems.push({
                type: "DataListItem",
                label: [{ type: "Text", content: "Chat Created", variant: "subtitle2" }],
                value: [
                    {
                        type: "Text",
                        content: new Date(input.chat.createdAt).toLocaleString(),
                        variant: "body2",
                    },
                ],
            });
        }
    }
    if (input.message) {
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Message ID", variant: "subtitle2" }],
            value: [{ type: "Text", content: input.message.id, variant: "body2" }],
        });
        listItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Sent At", variant: "subtitle2" }],
            value: [
                {
                    type: "Text",
                    content: new Date(input.message.createdAt).toLocaleString(),
                    variant: "body2",
                },
            ],
        });
        if (input.message.chatType) {
            listItems.push({
                type: "DataListItem",
                label: [{ type: "Text", content: "Chat Type", variant: "subtitle2" }],
                value: [{ type: "Text", content: input.message.chatType, variant: "body2" }],
            });
        }
    }
    if (listItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: listItems,
        });
    }
    // If there's plain text content, render it via Markdown to allow richer formatting
    if ((_d = input.message) === null || _d === void 0 ? void 0 : _d.plainText) {
        contentChildren.push({
            type: "Markdown",
            content: input.message.plainText,
        });
    }
    // If a web page preview is available, show an image and a link
    if ((_e = input.message) === null || _e === void 0 ? void 0 : _e.webPage) {
        const wp = input.message.webPage;
        if (wp.imageUrl) {
            contentChildren.push({
                type: "Image",
                src: wp.imageUrl,
                alt: wp.title,
            });
        }
        contentChildren.push({
            type: "Button",
            label: [`Open Link: ${(_f = wp.title) !== null && _f !== void 0 ? _f : wp.url}`],
            href: wp.url,
            variant: "outlined",
            size: "small",
            color: "primary",
        });
    }
    // If thread info exists, offer a button to view the thread
    let footer;
    if (input.thread && input.thread.id) {
        footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Button",
                label: ["View Thread"],
                href: `/thread/${input.thread.id}`,
                variant: "contained",
                color: "secondary",
                size: "medium",
            },
        };
    }
    // Compose the vertical card as the root component
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: contentChildren,
            },
            // Only include footer if defined
            ...(footer ? [footer] : []),
        ],
    };
    return card;
}
//# sourceMappingURL=240.js.map