export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g;
    // Aggregate items for a DataList
    const items = [];
    // 1. User info with avatar and email
    if (input.user) {
        const u = input.user;
        const avatar = {
            type: "Avatar",
            src: u.avatarUrl,
            name: u.name,
        };
        const emailText = {
            type: "Text",
            variant: "body2",
            content: u.email || "N/A",
        };
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**User**" }],
            value: [avatar, emailText],
        });
    }
    // 2. Chat session summary
    if (input.session) {
        const s = input.session;
        const lines = [];
        if (s.chatId)
            lines.push(`- Chat ID: ${s.chatId}`);
        lines.push(`- Unread: ${(_a = s.unread) !== null && _a !== void 0 ? _a : 0}`);
        if (s.watch)
            lines.push(`- Watch: ${s.watch}`);
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**Session**" }],
            value: [
                {
                    type: "Markdown",
                    content: lines.join("\n"),
                },
            ],
        });
    }
    // 3. Chat tags as chips
    if (input.chatTags && input.chatTags.length > 0) {
        const chipProps = input.chatTags.map((tag) => ({
            type: "Chip",
            label: tag.name,
            variant: "filled",
            color: mapTagColor(tag.colorVariant),
        }));
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**Tags**" }],
            value: {
                type: "ChipGroup",
                childrenProps: chipProps,
            },
        });
    }
    // 4. Last message preview
    if (input.message) {
        const m = input.message;
        let msgContent = "";
        if (m.plainText) {
            msgContent = m.plainText;
        }
        else if (m.blocks) {
            msgContent = m.blocks
                .map((b) => b.value)
                .filter(Boolean)
                .join("\n\n");
        }
        else {
            msgContent = "No message content.";
        }
        // Wrap in code block for readability
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**Last Message**" }],
            value: [
                {
                    type: "Markdown",
                    content: "text\n" + msgContent + "\n```",
                },
            ],
        });
    }
    // 5. Campaign statistics
    if (input.campaign) {
        const c = input.campaign;
        const lines = [
            `- Name: ${c.name}`,
            `- State: ${c.state}`,
            `- Sent: ${(_b = c.sent) !== null && _b !== void 0 ? _b : 0}`,
            `- View: ${(_c = c.view) !== null && _c !== void 0 ? _c : 0}`,
        ];
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**Campaign**" }],
            value: [
                {
                    type: "Markdown",
                    content: lines.join("\n"),
                },
            ],
        });
    }
    // 6. One-time message stats
    if (input.oneTimeMsg) {
        const o = input.oneTimeMsg;
        const lines = [
            `- Name: ${o.name}`,
            `- State: ${o.state}`,
            `- Sent: ${(_d = o.sent) !== null && _d !== void 0 ? _d : 0}`,
            `- View: ${(_e = o.view) !== null && _e !== void 0 ? _e : 0}`,
        ];
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**One-Time Message**" }],
            value: [
                {
                    type: "Markdown",
                    content: lines.join("\n"),
                },
            ],
        });
    }
    // 7. Support bot summary
    if (input.supportBot) {
        const sb = input.supportBot;
        const lines = [
            `- Bot Name: ${sb.botName}`,
            `- State: ${sb.state}`,
        ];
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**Support Bot**" }],
            value: [
                {
                    type: "Markdown",
                    content: lines.join("\n"),
                },
            ],
        });
    }
    // 8. UserChat overview
    if (input.userChat) {
        const uc = input.userChat;
        const lines = [
            `- State: ${uc.state}`,
            `- First opened: ${(_f = uc.firstOpenedAt) !== null && _f !== void 0 ? _f : "N/A"}`,
            `- Reply Count: ${(_g = uc.replyCount) !== null && _g !== void 0 ? _g : 0}`,
        ];
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "**Chat Overview**" }],
            value: [
                {
                    type: "Markdown",
                    content: lines.join("\n"),
                },
            ],
        });
    }
    // Fallback for empty data
    if (items.length === 0) {
        items.push({
            type: "DataListItem",
            label: [{ type: "Markdown", content: "No data available." }],
            value: [{ type: "Markdown", content: "" }],
        });
    }
    // Return a responsive DataList that displays all collected items
    return {
        type: "DataList",
        childrenProps: items,
    };
    /**
     * Map legacy tag color variants to supported chip colors.
     */
    function mapTagColor(variant) {
        switch (variant) {
            case "red":
            case "orange":
            case "yellow":
            case "green":
            case "pink":
                return variant;
            case "olive":
                return "lime";
            case "cobalt":
                return "blue";
            case "purple":
                return "violet";
            case "navy":
                return "indigo";
            default:
                return "gray";
        }
    }
}
//# sourceMappingURL=211.js.map