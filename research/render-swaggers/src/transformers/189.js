export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Extract useful pieces, providing defaults to avoid undefined dereferences
    const bot = input.bot;
    const managers = (_a = input.managers) !== null && _a !== void 0 ? _a : [];
    const msg = input.message;
    const thread = input.thread;
    const chat = input.chat;
    // 1. Build Bot Avatar for header
    const botAvatar = {
        type: "Avatar",
        // Use bot.avatarUrl if available, fallback to initials via name
        src: bot === null || bot === void 0 ? void 0 : bot.avatarUrl,
        name: bot === null || bot === void 0 ? void 0 : bot.name,
        variant: "primary",
        size: 40,
    };
    // 2. Build CardHeader displaying the bot and chat id
    const header = {
        type: "CardHeader",
        title: (_b = bot === null || bot === void 0 ? void 0 : bot.name) !== null && _b !== void 0 ? _b : "Conversation",
        description: chat === null || chat === void 0 ? void 0 : chat.id, // chat identifier
        startElement: botAvatar,
    };
    // 3. Build the list of messages (even if only one) as a DataList
    const dataListItems = [];
    if (msg) {
        // 3a. Decide on an avatar or icon for the message sender
        let senderAvatarOrIcon;
        // If the message is from the bot, reuse its avatar
        if (msg.personId && (bot === null || bot === void 0 ? void 0 : bot.id) === msg.personId) {
            senderAvatarOrIcon = botAvatar;
        }
        // If it's from a known manager, show their avatar
        else if (msg.personId) {
            const mgr = managers.find((m) => m.id === msg.personId);
            if (mgr) {
                senderAvatarOrIcon = {
                    type: "Avatar",
                    src: mgr.avatarUrl,
                    name: mgr.name,
                    variant: "secondary",
                    size: 32,
                };
            }
            else {
                // Unknown person: fallback to a generic icon
                senderAvatarOrIcon = {
                    type: "Icon",
                    id: "user",
                    color: "gray",
                    size: 24,
                };
            }
        }
        else {
            // No personId: use a comment icon
            senderAvatarOrIcon = {
                type: "Icon",
                id: "comment",
                color: "gray",
                size: 24,
            };
        }
        // 3b. Build a title text showing who spoke and when
        const who = msg.personType ? msg.personType : "Unknown";
        const timeLabel = msg.createdAt
            ? new Date(msg.createdAt).toLocaleTimeString()
            : "";
        const titleText = {
            type: "Text",
            content: [`${who}${timeLabel ? " · " + timeLabel : ""}`],
            variant: "subtitle2",
            color: "secondary",
        };
        // 3c. Combine plainText and structured blocks into markdown content
        let assembled = "";
        if (msg.blocks && msg.blocks.length) {
            // Flatten nested blocks, marking code blocks appropriately
            const renderBlock = (b) => {
                var _a, _b;
                if (b.type === "code" && b.value) {
                    // Wrap code in fenced block
                    const lang = (_a = b.language) !== null && _a !== void 0 ? _a : "";
                    return `\`\`\`${lang}\n${b.value}\n\`\`\``;
                }
                return (_b = b.value) !== null && _b !== void 0 ? _b : "";
            };
            assembled = msg.blocks.map(renderBlock).join("\n\n");
        }
        // Append plain text as fallback
        if (msg.plainText) {
            if (assembled)
                assembled += "\n\n";
            assembled += msg.plainText;
        }
        // If we still have nothing, show a placeholder
        if (!assembled) {
            assembled = "_No content_";
        }
        const markdownComp = {
            type: "Markdown",
            content: assembled,
        };
        // 3d. Construct the DataListItem
        const listItem = {
            type: "DataListItem",
            // label can be an array: avatar/icon and a title text
            label: [senderAvatarOrIcon, titleText],
            // value is the message body
            value: markdownComp,
        };
        dataListItems.push(listItem);
    }
    // Wrap messages into a DataList
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // 4. Wrap the DataList into CardContent
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // 5. Build a footer showing participating managers as an AvatarGroup
    const managerAvatars = managers.map((m) => ({
        type: "Avatar",
        src: m.avatarUrl,
        name: m.name,
        variant: "success",
        size: 28,
    }));
    const avatarGroup = {
        type: "AvatarGroup",
        childrenProps: managerAvatars,
        maxItems: 4,
        totalItems: managers.length,
    };
    const footer = {
        type: "CardFooter",
        childrenProps: avatarGroup,
    };
    // 6. Combine header, content, and footer into a VerticalCard
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=189.js.map