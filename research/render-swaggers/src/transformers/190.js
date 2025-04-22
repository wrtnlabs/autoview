export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to convert legacy V4 blocks into a markdown string
    function blocksToMarkdown(blocks) {
        if (!blocks || blocks.length === 0)
            return "";
        return blocks
            .map((b) => {
            switch (b.type) {
                case "code":
                    // fenced code block with optional language
                    return [
                        "" + (b.language || ""),
                        b.value || "",
                        "```",
                    ].join("\n");
                case "bullets":
                    // flatten bullet lines; include nested blocks recursively
                    const lines = (b.value || "").split("\n");
                    const items = lines.map((line) => `- ${line}`);
                    if (b.blocks) {
                        // nested bullets or code/text
                        items.push(blocksToMarkdown(b.blocks));
                    }
                    return items.join("\n");
                case "text":
                default:
                    // plain text
                    return b.value || "";
            }
        })
            .join("\n\n");
    }
    // Build lookup maps for users and bots by their id/key
    const userMap = new Map();
    (input.users || []).forEach((u) => {
        if (u && u.id)
            userMap.set(u.id, u);
    });
    const botMap = new Map();
    (input.bots || []).forEach((b) => {
        if (b && b.id)
            botMap.set(b.id, b);
    });
    // If there are no messages, render a friendly markdown notice
    if (!input.messages || input.messages.length === 0) {
        return {
            type: "Markdown",
            content: "**No messages to display.**",
        };
    }
    // Transform each message into a DataListItemProps
    const dataItems = input.messages.map((msg) => {
        var _a;
        // Determine sender (user or bot) info
        const senderType = msg.personType;
        let name = "Unknown";
        let avatarUrl;
        if (senderType === "user" && msg.personId) {
            const u = userMap.get(msg.personId);
            if (u) {
                name = u.name || "User";
                avatarUrl = u.avatarUrl;
            }
        }
        else if ((senderType === "bot" || senderType === "supportBot") && msg.personId) {
            const b = botMap.get(msg.personId);
            if (b) {
                name = b.name;
                avatarUrl = b.avatarUrl;
            }
        }
        // Fallback icon when no avatar image
        const startElement = avatarUrl
            ? {
                type: "Avatar",
                src: avatarUrl,
                name,
                size: 32,
            }
            : {
                type: "Icon",
                id: senderType === "user" ? "user" : "robot",
                size: 32,
                color: "gray",
            };
        // Build a timestamp label if available
        let timeLabel = "";
        if (msg.createdAt) {
            try {
                timeLabel = new Date(msg.createdAt).toLocaleString();
            }
            catch (_b) {
                timeLabel = "";
            }
        }
        // Compose the markdown content: prefer plainText, else blocks
        let contentMd = ((_a = msg.plainText) === null || _a === void 0 ? void 0 : _a.trim()) || blocksToMarkdown(msg.blocks);
        // Append web page preview link if present
        if (msg.webPage) {
            const wp = msg.webPage;
            const title = wp.title || wp.url;
            contentMd += `\n\n[${title}](${wp.url})`;
        }
        // Build label components: avatar/icon, name text, timestamp text
        const labelComponents = [
            startElement,
            {
                type: "Text",
                content: name,
                variant: "subtitle1",
            },
        ];
        if (timeLabel) {
            labelComponents.push({
                type: "Text",
                content: timeLabel,
                variant: "caption",
                color: "tertiary",
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: {
                type: "Markdown",
                content: contentMd,
            },
        };
    });
    // Main DataList containing all messages
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Navigation buttons for pagination if prev/next tokens exist
    const navButtons = [];
    if (input.prev) {
        navButtons.push({
            type: "Button",
            label: "Load previous",
            variant: "text",
            size: "small",
            href: input.prev,
        });
    }
    if (input.next) {
        navButtons.push({
            type: "Button",
            label: "Load more",
            variant: "contained",
            color: "primary",
            size: "small",
            href: input.next,
        });
    }
    // Compose the final UI as a vertical card with optional header and footer
    const children = [
        {
            type: "CardHeader",
            title: "Conversation",
        },
        {
            type: "CardContent",
            childrenProps: dataList,
        },
    ];
    if (navButtons.length > 0) {
        children.push({
            type: "CardFooter",
            childrenProps: navButtons,
        });
    }
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=190.js.map