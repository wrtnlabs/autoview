export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { messages = [], bots = [], users = [] } = input;
    // Helper to find sender info (bot or user) by personType and personId
    function getSender(personType, personId) {
        var _a;
        let record;
        if (personType === "bot") {
            record = bots.find((b) => b.id === personId);
        }
        else {
            record = users.find((u) => u.id === personId);
        }
        return {
            name: (_a = record === null || record === void 0 ? void 0 : record.name) !== null && _a !== void 0 ? _a : "Unknown",
            avatarUrl: record === null || record === void 0 ? void 0 : record.avatarUrl,
        };
    }
    // Convert structured blocks to a markdown string
    function blocksToMarkdown(blocks = [], indent = 0) {
        var _a, _b;
        const pad = "  ".repeat(indent);
        let md = "";
        for (const blk of blocks) {
            switch (blk.type) {
                case "text":
                    if (blk.value)
                        md += pad + blk.value + "\n\n";
                    break;
                case "bullets":
                    if (blk.value)
                        md += `${pad}- ${blk.value}\n`;
                    if (Array.isArray(blk.blocks)) {
                        md += blocksToMarkdown(blk.blocks, indent + 1);
                    }
                    break;
                case "code":
                    md += pad +
                        "" +
                        ((_a = blk.language) !== null && _a !== void 0 ? _a : "") +
                        "\n" +
                        ((_b = blk.value) !== null && _b !== void 0 ? _b : "") +
                        "\n```" +
                        "\n\n";
                    break;
                default:
                    // nested blocks or unsupported types
                    if (Array.isArray(blk.blocks)) {
                        md += blocksToMarkdown(blk.blocks, indent);
                    }
            }
        }
        return md.trim();
    }
    // If there are no messages, show a simple text placeholder
    if (messages.length === 0) {
        return {
            type: "Text",
            content: "No messages available.",
            variant: "body1",
            color: "gray",
        };
    }
    // Build DataListItem for each message
    const items = messages.map((msg) => {
        var _a, _b;
        const { name, avatarUrl } = getSender(msg.personType, msg.personId);
        // Avatar of sender
        const avatar = {
            type: "Avatar",
            src: avatarUrl,
            name,
            size: 32,
            variant: "gray",
        };
        // Timestamp as caption
        const ts = new Date(msg.createdAt).toLocaleTimeString();
        const timeText = {
            type: "Text",
            content: ts,
            variant: "caption",
            color: "gray",
        };
        // Compose label: avatar + timestamp
        const label = [
            avatar,
            timeText,
        ];
        // Prepare message content: plainText or markdown from blocks
        const raw = (_a = msg.plainText) !== null && _a !== void 0 ? _a : blocksToMarkdown((_b = msg.blocks) !== null && _b !== void 0 ? _b : []);
        const markdown = {
            type: "Markdown",
            content: raw,
        };
        return {
            type: "DataListItem",
            label,
            value: [markdown],
        };
    });
    // Wrap all items in a DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=266.js.map