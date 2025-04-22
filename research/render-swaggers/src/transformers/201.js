export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map legacy tag colors to AutoView chip colors
    const mapColor = (variant) => {
        const mapping = {
            red: "red",
            orange: "orange",
            yellow: "yellow",
            olive: "lime",
            green: "green",
            cobalt: "blue",
            purple: "violet",
            pink: "pink",
            navy: "indigo",
        };
        return mapping[variant || ""] || "gray";
    };
    // Aggregate DataListItems for each section
    const items = [];
    // Render user info with avatar
    if (input.user) {
        const user = input.user;
        items.push({
            type: "DataListItem",
            // Label shows "User"
            label: [
                { type: "Text", content: ["**User**"] }
            ],
            // Value shows avatar + name
            value: [
                { type: "Avatar", src: user.avatarUrl, name: user.name },
                { type: "Text", content: [user.name || "Unnamed"] }
            ]
        });
    }
    // Render chat session summary (unread count & last activity)
    if (input.session) {
        const session = input.session;
        const sessionParts = [];
        if (typeof session.unread === "number") {
            // show a badge with unread count
            sessionParts.push({
                type: "Badge",
                count: session.unread,
                childrenProps: { type: "Icon", id: "envelope", color: "blue", size: 16 }
            });
        }
        if (typeof session.updatedAt === "number") {
            // show a text timestamp
            const date = new Date(session.updatedAt).toLocaleString();
            sessionParts.push({
                type: "Text",
                content: [`Last updated: ${date}`]
            });
        }
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["**Session**"] }],
            value: sessionParts.length
                ? sessionParts
                : { type: "Text", content: ["No session data"] }
        });
    }
    // Render chat tags as chips
    if (input.chatTags && input.chatTags.length > 0) {
        const chips = input.chatTags.map(tag => ({
            type: "Chip",
            label: tag.name,
            color: mapColor(tag.colorVariant),
            variant: "filled",
            size: "small"
        }));
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["**Tags**"] }],
            value: { type: "ChipGroup", childrenProps: chips }
        });
    }
    // Render last message plaintext or markdown blocks
    if (input.message) {
        const msg = input.message;
        // Prefer plainText, fallback to JSON
        if (msg.plainText) {
            items.push({
                type: "DataListItem",
                label: [{ type: "Text", content: ["**Message**"] }],
                value: { type: "Markdown", content: msg.plainText }
            });
        }
        else {
            // render entire message as JSON code block
            items.push({
                type: "DataListItem",
                label: [{ type: "Text", content: ["**Message (raw)**"] }],
                value: {
                    type: "Markdown",
                    content: "json\n" + JSON.stringify(msg, null, 2) + "\n```"
                }
            });
        }
    }
    // Render one-time marketing message
    if (input.oneTimeMsg) {
        const otm = input.oneTimeMsg;
        const parts = [];
        if (otm.name) {
            parts.push({ type: "Text", content: [`Name: ${otm.name}`] });
        }
        if (otm.state) {
            parts.push({ type: "Chip", label: otm.state, color: "info", variant: "outlined", size: "small" });
        }
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["**One-Time Msg**"] }],
            value: parts
        });
    }
    // Render support bot info
    if (input.supportBot) {
        const bot = input.supportBot;
        const botParts = [];
        if (bot.botName) {
            botParts.push({ type: "Text", content: [`Name: ${bot.botName}`] });
        }
        if (bot.state) {
            botParts.push({ type: "Chip", label: bot.state, color: bot.state === "active" ? "success" : "gray", size: "small" });
        }
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["**Support Bot**"] }],
            value: botParts
        });
    }
    // As a final fallback, render any unhandled keys as JSON
    const handledKeys = new Set([
        "user", "session", "chatTags", "message", "oneTimeMsg", "supportBot"
    ]);
    const rest = {};
    for (const key of Object.keys(input)) {
        if (!handledKeys.has(key)) {
            rest[key] = input[key];
        }
    }
    if (Object.keys(rest).length > 0) {
        items.push({
            type: "DataListItem",
            label: [{ type: "Text", content: ["**Other Data**"] }],
            value: {
                type: "Markdown",
                content: "```json\n" + JSON.stringify(rest, null, 2) + "\n```"
            }
        });
    }
    // Return as a DataList component
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=201.js.map