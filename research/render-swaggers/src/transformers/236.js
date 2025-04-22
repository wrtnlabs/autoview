export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to convert message blocks into markdown string
    const blocksToMarkdown = (blocks = []) => {
        return blocks.map(block => {
            var _a, _b, _c, _d;
            switch (block.type) {
                case "code":
                    // wrap code in triple backticks
                    return "" + ((_a = block.language) !== null && _a !== void 0 ? _a : "") + "\n" + ((_b = block.value) !== null && _b !== void 0 ? _b : "") + "\n```";
                case "bullets":
                    // each nested block becomes a bullet
                    return ((_c = block.blocks) !== null && _c !== void 0 ? _c : []).map(b => { var _a; return "- " + ((_a = b.value) !== null && _a !== void 0 ? _a : ""); }).join("\n");
                case "text":
                default:
                    return (_d = block.value) !== null && _d !== void 0 ? _d : "";
            }
        }).join("\n\n");
    };
    // If there are no messages, show a friendly text
    if (!input.messages || input.messages.length === 0) {
        return {
            type: "Text",
            content: "No messages to display.",
            variant: "body2",
        };
    }
    // Build DataListItems for each message
    const items = input.messages.map((msg) => {
        var _a, _b, _c;
        // Determine author avatar and name
        let avatar;
        const isBot = msg.personType === "bot";
        if (isBot && input.bots) {
            const bot = input.bots.find((b) => b.id === msg.personId);
            avatar = {
                type: "Avatar",
                src: bot === null || bot === void 0 ? void 0 : bot.avatarUrl,
                name: bot === null || bot === void 0 ? void 0 : bot.name,
                variant: "info",
                size: 36,
            };
        }
        else {
            // fallback to initials or ID
            avatar = {
                type: "Avatar",
                name: msg.personId,
                variant: "primary",
                size: 36,
            };
        }
        // Author name text
        const authorText = {
            type: "Text",
            // Use subtitle style for name
            variant: "subtitle2",
            content: msg.personType === "bot"
                ? (((_b = (_a = input.bots) === null || _a === void 0 ? void 0 : _a.find(b => b.id === msg.personId)) === null || _b === void 0 ? void 0 : _b.name) || msg.personId)
                : msg.personId,
        };
        // Compose markdown content: prefer plainText, otherwise render blocks
        const markdownContent = msg.plainText
            ? msg.plainText
            : blocksToMarkdown((_c = msg.blocks) !== null && _c !== void 0 ? _c : []);
        const messageMarkdown = {
            type: "Markdown",
            content: markdownContent,
        };
        // Timestamp chip
        const timeString = new Date(msg.createdAt).toLocaleString();
        const timestampChip = {
            type: "Chip",
            label: timeString,
            size: "small",
            variant: "outlined",
            color: "gray",
        };
        // Optional attachments indicator
        const attachmentElements = [];
        if (msg.files && msg.files.length > 0) {
            // paperclip icon
            attachmentElements.push({
                type: "Icon",
                id: "paperclip",
                size: 16,
                color: "gray",
            });
            // count
            attachmentElements.push({
                type: "Text",
                content: `${msg.files.length}`,
                variant: "caption",
            });
        }
        // Build the DataListItemProps
        const item = {
            type: "DataListItem",
            // Label: avatar + name
            label: [avatar, authorText],
            // Value: message + timestamp + attachments
            value: [
                messageMarkdown,
                timestampChip,
                // if there are attachments, show them on the same line
                ...(attachmentElements.length ? attachmentElements : []),
            ],
        };
        return item;
    });
    // Return a DataList wrapping all message items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=236.js.map