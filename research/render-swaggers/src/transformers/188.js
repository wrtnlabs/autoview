export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e;
    const { chat, message, bot, managers = [], thread } = input;
    // Build the card header: bot avatar + name, fallback to thread ID if no bot
    const header = {
        type: "CardHeader",
        title: (_a = bot === null || bot === void 0 ? void 0 : bot.name) !== null && _a !== void 0 ? _a : `Thread ${(_b = thread === null || thread === void 0 ? void 0 : thread.id) !== null && _b !== void 0 ? _b : "Unknown"}`,
        description: (_c = chat === null || chat === void 0 ? void 0 : chat.channelId) !== null && _c !== void 0 ? _c : "",
        // If bot has an avatarUrl or avatar, show it, else we rely on initials via name
        startElement: {
            type: "Avatar",
            src: bot === null || bot === void 0 ? void 0 : bot.avatarUrl,
            name: bot === null || bot === void 0 ? void 0 : bot.name,
            size: 40,
        },
        // Show count of managers as a chip
        endElement: managers.length > 0
            ? {
                type: "Chip",
                label: `${managers.length} manager${managers.length > 1 ? "s" : ""}`,
                variant: "outlined",
            }
            : undefined,
    };
    // Optionally show a preview image for a web page snippet
    const media = ((_d = message === null || message === void 0 ? void 0 : message.webPage) === null || _d === void 0 ? void 0 : _d.imageUrl)
        ? {
            type: "CardMedia",
            src: message.webPage.imageUrl,
        }
        : undefined;
    // Build the content: primary message body as markdown or fallback text
    const contentChildren = [];
    if (message === null || message === void 0 ? void 0 : message.plainText) {
        // Prefer markdown for rich text rendering
        contentChildren.push({
            type: "Markdown",
            content: message.plainText,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            content: "No message content available.",
        });
    }
    // Attach any file previews (images) or file links
    if ((message === null || message === void 0 ? void 0 : message.files) && message.files.length > 0) {
        // Render image files inline; other files as markdown links
        message.files.forEach((file) => {
            var _a;
            if ((_a = file.contentType) === null || _a === void 0 ? void 0 : _a.startsWith("image/")) {
                contentChildren.push({
                    type: "Image",
                    src: `https://your.cdn.com/${file.bucket}/${file.key}`,
                    alt: file.name,
                });
            }
            else {
                // Fallback: link in markdown
                contentChildren.push({
                    type: "Markdown",
                    content: `[📄 ${file.name}](https://your.cdn.com/${file.bucket}/${file.key})`,
                });
            }
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build metadata footer: replies, version, timestamps
    const footerListItems = [];
    if (typeof (thread === null || thread === void 0 ? void 0 : thread.replyCount) === "number") {
        footerListItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Replies" }],
            value: [{ type: "Text", content: thread.replyCount.toString() }],
        });
    }
    if (typeof (thread === null || thread === void 0 ? void 0 : thread.version) === "number") {
        footerListItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Version" }],
            value: [{ type: "Text", content: thread.version.toString() }],
        });
    }
    // Show the most relevant timestamp: message createdAt, then thread.updatedAt
    const ts = (_e = message === null || message === void 0 ? void 0 : message.createdAt) !== null && _e !== void 0 ? _e : thread === null || thread === void 0 ? void 0 : thread.updatedAt;
    if (typeof ts === "number") {
        footerListItems.push({
            type: "DataListItem",
            label: [{ type: "Text", content: "Date" }],
            value: [
                {
                    type: "Text",
                    content: new Date(ts).toLocaleString(),
                },
            ],
        });
    }
    // Only include footer if we have metadata
    const footer = footerListItems.length > 0
        ? {
            type: "CardFooter",
            childrenProps: {
                type: "DataList",
                childrenProps: footerListItems,
            },
        }
        : undefined;
    // Compose the vertical card with header, optional media, content, and footer
    const cardChildren = [header];
    if (media)
        cardChildren.push(media);
    cardChildren.push(content);
    if (footer)
        cardChildren.push(footer);
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=188.js.map