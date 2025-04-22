export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a map of bot definitions for quick lookup
    const botsMap = {};
    if (input.bots) {
        for (const bot of input.bots) {
            if (bot.id) {
                botsMap[bot.id] = bot;
            }
        }
    }
    // Transform each message into a DataListItem
    const messageItems = (input.messages || []).map((msg) => {
        var _a;
        // Determine if the message sender is a bot with metadata
        const botInfo = msg.personType === "bot" ? botsMap[msg.personId] : undefined;
        const isBot = Boolean(botInfo);
        // Avatar for sender: use bot avatar if available; otherwise use initials
        const avatar = {
            type: "Avatar",
            size: 32,
            variant: isBot ? "info" : "primary",
            src: isBot ? botInfo.avatarUrl : undefined,
            name: isBot ? botInfo.name : msg.personId,
        };
        // Format timestamp into a human‐readable form
        const timestamp = new Date(msg.createdAt).toLocaleTimeString();
        // Header text: "Name • HH:MM:SS"
        const headerText = {
            type: "Text",
            variant: "body2",
            content: `${isBot ? botInfo.name : msg.personId} • ${timestamp}`,
        };
        // Build the markdown content from plainText or block values
        let contentString = (_a = msg.plainText) !== null && _a !== void 0 ? _a : "";
        if (!contentString && msg.blocks) {
            contentString = msg.blocks.map((b) => { var _a; return (_a = b.value) !== null && _a !== void 0 ? _a : ""; }).join("\n\n");
        }
        const markdown = {
            type: "Markdown",
            content: contentString,
        };
        // If there are image‐type files, render them with Image components
        const images = (msg.files || [])
            .filter((file) => { var _a; return (_a = file.contentType) === null || _a === void 0 ? void 0 : _a.startsWith("image/"); })
            .map((file) => ({
            type: "Image",
            src: `${file.bucket}/${file.key}`,
            alt: file.name,
        }));
        // Compose the children components for the message body
        const messageBody = [
            markdown,
            ...images,
        ];
        return {
            type: "DataListItem",
            label: [avatar, headerText],
            value: messageBody,
        };
    });
    // If there are no messages, show a placeholder item
    const dataList = {
        type: "DataList",
        childrenProps: messageItems.length > 0
            ? messageItems
            : [
                {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        variant: "body1",
                        content: "No messages available",
                    },
                    value: [],
                },
            ],
    };
    // Card header with an icon and summary
    const cardHeader = {
        type: "CardHeader",
        title: "Conversation",
        description: `Total messages: ${messageItems.length}`,
        startElement: {
            type: "Icon",
            id: "comments",
            size: 24,
            color: "blue",
        },
    };
    // Pagination controls if prev/next links exist
    const paginationButtons = [];
    if (input.prev) {
        paginationButtons.push({
            type: "Button",
            label: "Previous",
            variant: "text",
            size: "medium",
            href: input.prev,
        });
    }
    if (input.next) {
        paginationButtons.push({
            type: "Button",
            label: "Next",
            variant: "text",
            size: "medium",
            href: input.next,
        });
    }
    const cardFooter = {
        type: "CardFooter",
        childrenProps: paginationButtons,
    };
    // Combine header, message list, and footer into a responsive vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            cardHeader,
            { type: "CardContent", childrenProps: dataList },
            cardFooter,
        ],
    };
}
//# sourceMappingURL=268.js.map