export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    const webhooks = (_a = input.webhooks) !== null && _a !== void 0 ? _a : [];
    // If there are no webhooks, show a friendly markdown message
    if (webhooks.length === 0) {
        return {
            type: "Markdown",
            content: "#### No webhooks configured.\n\nIt looks like you haven't added any webhooks yet. Create one to get started!"
        };
    }
    // Build a vertical card for each webhook
    const cards = webhooks.map((w) => {
        // Card header with an icon, name, and URL
        const header = {
            type: "CardHeader",
            title: w.name,
            description: w.url,
            startElement: {
                type: "Icon",
                id: "link", // FontAwesome "link" icon
                color: "teal",
                size: 24
            }
        };
        // Card content: API version, keywords, creation date, and block status
        const contentChildren = [];
        // API version chip
        contentChildren.push({
            type: "Chip",
            label: `v${w.apiVersion}`,
            variant: "outlined",
            color: "blue",
            size: "small"
        });
        // Keyword chips (if any)
        if (w.keywords) {
            w.keywords.forEach((kw) => {
                contentChildren.push({
                    type: "Chip",
                    label: kw,
                    variant: "outlined",
                    color: "primary",
                    size: "small"
                });
            });
        }
        // Creation date text
        if (w.createdAt) {
            const createdDate = new Date(w.createdAt).toLocaleDateString();
            contentChildren.push({
                type: "Text",
                content: createdDate,
                variant: "caption",
                color: "gray"
            });
        }
        // If the webhook is blocked, show the timestamp it was blocked
        if (w.blocked && w.lastBlockedAt) {
            const blockedDate = new Date(w.lastBlockedAt).toLocaleDateString();
            contentChildren.push({
                type: "Text",
                content: `Blocked at ${blockedDate}`,
                variant: "caption",
                color: "error"
            });
        }
        const content = {
            type: "CardContent",
            childrenProps: contentChildren
        };
        // Card footer: icons and labels for watchUserChats and watchGroups
        const footerChildren = [];
        // Watching user chats
        footerChildren.push({
            type: "Icon",
            id: "user",
            color: w.watchUserChats ? "green" : "gray",
            size: 20
        });
        footerChildren.push({
            type: "Text",
            content: w.watchUserChats ? "Watching user chats" : "Not watching user chats",
            variant: "caption",
            color: w.watchUserChats ? "success" : "gray"
        });
        // Watching groups
        footerChildren.push({
            type: "Icon",
            id: "users",
            color: w.watchGroups ? "green" : "gray",
            size: 20
        });
        footerChildren.push({
            type: "Text",
            content: w.watchGroups ? "Watching groups" : "Not watching groups",
            variant: "caption",
            color: w.watchGroups ? "success" : "gray"
        });
        const footer = {
            type: "CardFooter",
            childrenProps: footerChildren
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
    });
    // Wrap all cards in a responsive carousel
    return {
        type: "Carousel",
        infinite: true,
        navControls: true,
        indicators: true,
        gutter: 16,
        // You could wire `input.next` into a "Load more" mechanic if needed
        childrenProps: cards
    };
}
//# sourceMappingURL=217.js.map