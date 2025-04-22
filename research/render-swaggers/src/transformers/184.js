export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Build lookup maps for users and bots by their IDs
    const userMap = new Map();
    (_a = input.users) === null || _a === void 0 ? void 0 : _a.forEach(u => {
        if (u.id)
            userMap.set(u.id, u);
    });
    const botMap = new Map();
    (_b = input.bots) === null || _b === void 0 ? void 0 : _b.forEach(b => {
        if (b.id)
            botMap.set(b.id, b);
    });
    // Transform each message into a DataListItemProps
    const items = (input.messages || []).map(msg => {
        var _a, _b;
        // Determine sender display name
        let name = "Unknown";
        if (msg.personType === "user" && msg.personId) {
            name = ((_a = userMap.get(msg.personId)) === null || _a === void 0 ? void 0 : _a.name) || name;
        }
        else if (msg.personType === "bot" && msg.personId) {
            name = ((_b = botMap.get(msg.personId)) === null || _b === void 0 ? void 0 : _b.name) || name;
        }
        // Format timestamp for display
        const timestamp = msg.createdAt
            ? new Date(msg.createdAt).toLocaleString()
            : "";
        // Label: display user/bot name and timestamp
        const label = [
            { type: "Text", content: name, variant: "subtitle2" },
            { type: "Text", content: timestamp, variant: "caption", color: "gray" }
        ];
        // Build content: combine plain text and blocks into a single markdown string
        let md = "";
        if (msg.plainText) {
            md += msg.plainText;
        }
        if (msg.blocks) {
            for (const block of msg.blocks) {
                if (block.type === "code") {
                    const lang = block.language || "";
                    md += `\n\n\`\`\`${lang}\n${block.value || ""}\n\`\`\``;
                }
                else if (block.type === "bullets") {
                    const list = (block.value || "")
                        .split("\n")
                        .map(line => `- ${line}`)
                        .join("\n");
                    md += `\n\n${list}`;
                }
                else if (block.type === "text") {
                    md += `\n\n${block.value || ""}`;
                }
            }
        }
        // Compose the array of presentation components for the message body
        const contentParts = [];
        if (md.trim()) {
            contentParts.push({ type: "Markdown", content: md.trim() });
        }
        // If there are file attachments, show a badge with a file icon
        if (msg.files && msg.files.length > 0) {
            const fileIcon = {
                type: "Icon",
                id: "file",
                size: 16
            };
            contentParts.push({
                type: "Badge",
                count: msg.files.length,
                childrenProps: fileIcon
            });
        }
        // Fallback when a message has neither text nor attachments
        if (contentParts.length === 0) {
            contentParts.push({
                type: "Text",
                content: "(no content)",
                variant: "caption",
                color: "gray"
            });
        }
        return {
            type: "DataListItem",
            label,
            value: contentParts
        };
    });
    // If there are no messages, show a placeholder text
    const listOrPlaceholder = items.length > 0
        ? { type: "DataList", childrenProps: items }
        : {
            type: "Text",
            content: "No messages available",
            variant: "body2",
            color: "gray"
        };
    // Card header with overall statistics
    const header = {
        type: "CardHeader",
        title: `Messages (${items.length})`,
        description: `Users: ${((_c = input.users) === null || _c === void 0 ? void 0 : _c.length) || 0}, Bots: ${((_d = input.bots) === null || _d === void 0 ? void 0 : _d.length) || 0}`
    };
    // Card content wrapping the list or placeholder
    const content = {
        type: "CardContent",
        childrenProps: listOrPlaceholder
    };
    // Card footer with pagination controls if provided
    const footerButtons = [];
    if (input.prev) {
        footerButtons.push({
            type: "Button",
            label: "Previous",
            startElement: { type: "Icon", id: "arrow-left", size: 16 },
            href: input.prev
        });
    }
    if (input.next) {
        footerButtons.push({
            type: "Button",
            label: "Next",
            endElement: { type: "Icon", id: "arrow-right", size: 16 },
            href: input.next
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons.length ? footerButtons : undefined
    };
    // Compose everything into a vertical card for a responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=184.js.map