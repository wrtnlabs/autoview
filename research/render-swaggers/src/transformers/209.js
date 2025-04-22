export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no messages, display a simple text
    if (!input.messages || input.messages.length === 0) {
        return {
            type: "Text",
            content: "No messages to display.",
            variant: "body1",
        };
    }
    // Helper to build a public URL for files stored in S3-like buckets
    function buildFileUrl(file) {
        return `https://${file.bucket}.s3.amazonaws.com/${file.key}`;
    }
    // Convert nested LegacyV4Block to a Markdown string
    function blocksToMarkdown(blocks = []) {
        return blocks
            .map((block) => {
            var _a, _b;
            const value = (_a = block.value) !== null && _a !== void 0 ? _a : "";
            switch (block.type) {
                case "text":
                    return value;
                case "code":
                    // Wrap code in triple backticks, including language if provided
                    const lang = (_b = block.language) !== null && _b !== void 0 ? _b : "";
                    return ["" + lang, value, "```"].join("\n");
                case "bullets":
                    // Each line in value becomes a list item
                    return value
                        .split(/\r?\n/)
                        .filter((l) => l.trim().length > 0)
                        .map((l) => `- ${l}`)
                        .join("\n");
                default:
                    return value;
            }
        })
            .join("\n\n");
    }
    // Find author info (name + avatar) given personType and personId
    function resolveAuthor(personType, personId) {
        var _a, _b, _c;
        if (personType === "user" && input.users) {
            const u = input.users.find((u) => u.id === personId);
            if (u)
                return { name: (_a = u.name) !== null && _a !== void 0 ? _a : "Unknown User", avatarUrl: u.avatarUrl };
        }
        if (personType === "bot" && input.bots) {
            const b = input.bots.find((b) => b.id === personId);
            if (b)
                return { name: b.name, avatarUrl: (_b = b.avatarUrl) !== null && _b !== void 0 ? _b : (_c = b.avatar) === null || _c === void 0 ? void 0 : _c.key };
        }
        if (personType === "supportBot" && input.supportBots) {
            const s = input.supportBots.find((s) => s.id === personId);
            if (s)
                return { name: s.name, avatarUrl: undefined };
        }
        return { name: "Unknown", avatarUrl: undefined };
    }
    // Build DataListItem components for each message
    const items = input.messages.map((msg) => {
        var _a;
        // Resolve author metadata
        const author = resolveAuthor(msg.personType, msg.personId);
        // Build avatar component
        const avatar = {
            type: "Avatar",
            src: author.avatarUrl,
            name: author.name,
            size: 24,
        };
        // Build name text component
        const nameText = {
            type: "Text",
            content: author.name,
            variant: "subtitle2",
            color: "secondary",
        };
        // Prepare an array of presentation components for the message body
        const bodyComponents = [];
        // 1. Render plainText or blocks as Markdown
        if (msg.plainText) {
            bodyComponents.push({
                type: "Markdown",
                content: msg.plainText,
            });
        }
        else if (msg.blocks && msg.blocks.length > 0) {
            bodyComponents.push({
                type: "Markdown",
                content: blocksToMarkdown(msg.blocks),
            });
        }
        // 2. Render attached files
        if (msg.files) {
            msg.files.forEach((file) => {
                var _a;
                const url = buildFileUrl(file);
                // If it's an image, render inline; otherwise render as a button link
                if ((_a = file.contentType) === null || _a === void 0 ? void 0 : _a.startsWith("image")) {
                    bodyComponents.push({
                        type: "Image",
                        src: url,
                        alt: file.name,
                    });
                }
                else {
                    bodyComponents.push({
                        type: "Button",
                        label: file.name,
                        href: url,
                    });
                }
            });
        }
        // 3. Render a web page preview if present
        if (msg.webPage) {
            const wp = msg.webPage;
            // If the page has an image, show it
            if (wp.imageUrl) {
                bodyComponents.push({
                    type: "Image",
                    src: wp.imageUrl,
                    alt: wp.title,
                });
            }
            // Always include a link to the page
            bodyComponents.push({
                type: "Button",
                label: (_a = wp.title) !== null && _a !== void 0 ? _a : wp.url,
                href: wp.url,
            });
        }
        // Compose the DataListItem
        const item = {
            type: "DataListItem",
            // Label shows avatar + author name
            label: [avatar, nameText],
            // Value shows the message content and attachments
            value: bodyComponents.length > 0 ? bodyComponents : undefined,
        };
        return item;
    });
    // Return the DataList wrapping all messages for display
    const list = {
        type: "DataList",
        childrenProps: items,
    };
    return list;
}
//# sourceMappingURL=209.js.map