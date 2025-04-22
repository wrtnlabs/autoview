export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // Helper: format timestamp into human-readable string
    const formatDate = (ts) => ts != null ? new Date(ts).toLocaleString() : "Unknown date";
    // Build CardHeader startElement: use bot avatar if available, otherwise generic icon
    const startElement = input.bot && input.bot.avatarUrl
        ? {
            type: "Avatar",
            src: input.bot.avatarUrl,
            name: (_a = input.bot.name) !== null && _a !== void 0 ? _a : "Bot",
            variant: "info",
            size: 40,
        }
        : {
            type: "Icon",
            id: "robot",
            color: "gray",
            size: 40,
        };
    // Build CardHeader endElement: show thread reply count
    const replyCount = (_c = (_b = input.thread) === null || _b === void 0 ? void 0 : _b.replyCount) !== null && _c !== void 0 ? _c : 0;
    const endElement = {
        type: "Chip",
        label: replyCount + (replyCount === 1 ? " reply" : " replies"),
        size: "small",
        variant: "outlined",
        color: "secondary",
    };
    // Compose CardHeader
    const cardHeader = {
        type: "CardHeader",
        title: (_g = (_e = (_d = input.bot) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : (_f = input.chat) === null || _f === void 0 ? void 0 : _f.channelId) !== null && _g !== void 0 ? _g : "Conversation",
        description: (_h = input.bot) === null || _h === void 0 ? void 0 : _h.description,
        startElement,
        endElement,
    };
    // Build CardContent children array based on message content
    const contentChildren = [];
    const msg = input.message;
    if (msg === null || msg === void 0 ? void 0 : msg.webPage) {
        const page = msg.webPage;
        // Show preview image if available
        if (page.imageUrl) {
            contentChildren.push({
                type: "Image",
                src: page.imageUrl,
                alt: page.title,
            });
        }
        // Show title and description as markdown with link
        const mdLines = [
            page.title ? `### [${page.title}](${page.url})` : "",
            page.description || "",
        ].filter(Boolean);
        contentChildren.push({
            type: "Markdown",
            content: mdLines.join("\n\n"),
        });
    }
    else if (msg === null || msg === void 0 ? void 0 : msg.plainText) {
        // Render plain text as markdown for auto formatting
        contentChildren.push({
            type: "Markdown",
            content: msg.plainText,
        });
    }
    else {
        // Fallback when no content present
        contentChildren.push({
            type: "Text",
            content: "No message content available.",
            variant: "caption",
        });
    }
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build CardFooter components: chat status chip, timestamp, managers avatars
    const footerChildren = [];
    // Chat active/inactive status
    if (((_j = input.chat) === null || _j === void 0 ? void 0 : _j.active) != null) {
        footerChildren.push({
            type: "Chip",
            label: input.chat.active ? "Chat Active" : "Chat Inactive",
            size: "small",
            variant: "outlined",
            color: input.chat.active ? "success" : "error",
        });
    }
    // Message timestamp
    if ((msg === null || msg === void 0 ? void 0 : msg.createdAt) != null) {
        footerChildren.push({
            type: "Text",
            content: formatDate(msg.createdAt),
            variant: "caption",
        });
    }
    // Managers avatar group
    const mgrs = input.managers || [];
    if (mgrs.length > 0) {
        const avatars = mgrs.map((m) => ({
            type: "Avatar",
            src: m.avatarUrl,
            name: m.name,
            variant: "primary",
            size: 24,
        }));
        footerChildren.push({
            type: "AvatarGroup",
            childrenProps: avatars,
            maxItems: 5,
            totalItems: mgrs.length,
        });
    }
    else {
        // Indicate no managers when list is empty
        footerChildren.push({
            type: "Text",
            content: "No managers assigned",
            variant: "caption",
        });
    }
    const cardFooter = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Combine all into a vertical card for responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return card;
}
//# sourceMappingURL=241.js.map