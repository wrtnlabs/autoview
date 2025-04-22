export function transform($input) {
    return visualizeData($input);
}
// Transforms a LegacyV4UserChatView into an AutoView component tree.
// Uses a vertical card layout with header (avatar + badge), content (session, message, campaign), and footer (tags).
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { user, session, message, chatTags, campaign } = input;
    // Create an avatar if user's avatarUrl exists
    const avatar = (user === null || user === void 0 ? void 0 : user.avatarUrl)
        ? {
            type: "Avatar",
            src: user.avatarUrl,
            name: (_a = user.name) !== null && _a !== void 0 ? _a : undefined,
            variant: "primary",
            size: 40,
        }
        : undefined;
    // Wrap avatar in a badge to show unread count
    const unreadCount = (_b = session === null || session === void 0 ? void 0 : session.unread) !== null && _b !== void 0 ? _b : 0;
    const badge = {
        type: "Badge",
        count: unreadCount,
        maxCount: 99,
        showZero: true,
        // If there is no avatar, fall back to a neutral icon
        childrenProps: avatar !== null && avatar !== void 0 ? avatar : {
            type: "Icon",
            id: "user-circle",
            size: 40,
            color: "gray",
        },
        color: unreadCount > 0 ? "error" : "gray",
    };
    // Header: user name + session ID, with avatar+badge on the left
    const header = {
        type: "CardHeader",
        title: (_c = user === null || user === void 0 ? void 0 : user.name) !== null && _c !== void 0 ? _c : "Unknown User",
        description: session === null || session === void 0 ? void 0 : session.chatId,
        startElement: badge,
    };
    // Session info rendered as Markdown list for readability
    const sessionLines = [];
    if (session) {
        sessionLines.push(`- **Session Key**: ${session.key}`);
        sessionLines.push(`- **Chat ID**: ${session.chatId}`);
        sessionLines.push(`- **Unread**: ${(_d = session.unread) !== null && _d !== void 0 ? _d : 0}`);
        if (session.updatedAt) {
            const updated = new Date(session.updatedAt).toLocaleString();
            sessionLines.push(`- **Last Updated**: ${updated}`);
        }
    }
    const sessionMarkdown = {
        type: "Markdown",
        content: `### Session Info\n${sessionLines.join("\n")}`,
    };
    // Last message content as Markdown
    let messageMarkdown;
    if (message === null || message === void 0 ? void 0 : message.plainText) {
        // Use markdown to preserve any formatting or links
        messageMarkdown = {
            type: "Markdown",
            content: `### Last Message\n${message.plainText}`,
        };
    }
    // Convert chat tags into chips
    const chips = (chatTags !== null && chatTags !== void 0 ? chatTags : []).map((tag) => {
        var _a, _b;
        // Map legacy colorVariant to our chip color scale
        const mapColor = {
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
        const color = (_b = mapColor[(_a = tag.colorVariant) !== null && _a !== void 0 ? _a : "green"]) !== null && _b !== void 0 ? _b : "gray";
        return {
            type: "Chip",
            label: tag.name,
            color,
            size: "small",
            variant: "outlined",
        };
    });
    const tagChipGroup = {
        type: "ChipGroup",
        childrenProps: chips,
        maxItems: 5,
    };
    // Campaign summary as Markdown if present
    let campaignMarkdown;
    if (campaign) {
        campaignMarkdown = {
            type: "Markdown",
            content: [
                "### Campaign Summary",
                `- **Name**: ${campaign.name}`,
                `- **State**: ${campaign.state}`,
                `- **Sent**: ${(_e = campaign.sent) !== null && _e !== void 0 ? _e : 0}`,
                `- **Viewed**: ${(_f = campaign.view) !== null && _f !== void 0 ? _f : 0}`,
                `- **Clicked**: ${(_g = campaign.click) !== null && _g !== void 0 ? _g : 0}`,
            ].join("\n"),
        };
    }
    // Assemble card content section
    const contentChildren = [sessionMarkdown];
    if (messageMarkdown)
        contentChildren.push(messageMarkdown);
    if (campaignMarkdown)
        contentChildren.push(campaignMarkdown);
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer: show tag chips if any
    const footer = {
        type: "CardFooter",
        childrenProps: chips.length ? tagChipGroup : undefined,
    };
    // Final vertical card combining header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=212.js.map