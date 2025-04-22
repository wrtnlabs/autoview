export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // If there is no message to display, fall back to a simple markdown notification.
    if (!input.message) {
        return {
            type: "Markdown",
            content: "No message available to display.",
        };
    }
    const msg = input.message;
    // Build the sender representation: prefer bot icon, then user avatar, else default user icon.
    let senderElement;
    if (input.bot) {
        senderElement = {
            type: "Icon",
            id: "robot",
            size: 24,
            color: "gray",
        };
    }
    else if (input.user && input.user.avatarUrl) {
        senderElement = {
            type: "Avatar",
            src: input.user.avatarUrl,
            name: input.user.name,
            variant: "primary",
            size: 36,
        };
    }
    else {
        senderElement = {
            type: "Icon",
            id: "user",
            size: 24,
            color: "gray",
        };
    }
    // Format the timestamp if available.
    const timestamp = msg.createdAt
        ? new Date(msg.createdAt).toLocaleString()
        : undefined;
    // Compose the card header: sender, name/title, and timestamp as description.
    const header = {
        type: "CardHeader",
        startElement: senderElement,
        title: ((_a = input.bot) === null || _a === void 0 ? void 0 : _a.name) || ((_b = input.user) === null || _b === void 0 ? void 0 : _b.name) || "Unknown Sender",
        description: timestamp,
    };
    // Consolidate text content: transform blocks into markdown or use plainText.
    let markdownContent = "";
    if (Array.isArray(msg.blocks) && msg.blocks.length > 0) {
        // Convert each block into its markdown representation.
        const parts = msg.blocks.map((b) => {
            switch (b.type) {
                case "code":
                    // Wrap code in fenced block with optional language.
                    return "" + (b.language || "") + "\n" + (b.value || "") + "\n```";
                case "bullets":
                    // Render sub-blocks as list items.
                    if (Array.isArray(b.blocks)) {
                        return b.blocks
                            .map((item) => "- " + (item.value || ""))
                            .join("\n");
                    }
                    return b.value || "";
                default:
                    // Plain text block.
                    return b.value || "";
            }
        });
        markdownContent = parts.join("\n\n");
    }
    else if (msg.plainText) {
        markdownContent = msg.plainText;
    }
    // Fallback if neither blocks nor plainText produce content.
    if (!markdownContent) {
        markdownContent = "_No textual content available._";
    }
    const contentMarkdown = {
        type: "Markdown",
        content: markdownContent,
    };
    const content = {
        type: "CardContent",
        childrenProps: [contentMarkdown],
    };
    // Build footer elements: reactions and file count badge if present.
    const footerChildren = [];
    // Reactions: show as a chip group of emoji + count.
    if (Array.isArray(msg.reactions) && msg.reactions.length > 0) {
        const chips = msg.reactions.map((r) => {
            const count = Array.isArray(r.personKeys) ? r.personKeys.length : 0;
            return {
                type: "Chip",
                label: `${r.emojiName} ${count}`,
                size: "small",
                variant: "filled",
            };
        });
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: chips,
        });
    }
    // File attachments: show a badge with count and a file icon.
    if (Array.isArray(msg.files) && msg.files.length > 0) {
        footerChildren.push({
            type: "Badge",
            count: msg.files.length,
            maxCount: 99,
            showZero: false,
            childrenProps: {
                type: "Icon",
                id: "file-alt",
                size: 16,
                color: "gray",
            },
        });
    }
    // Only include a footer if we have any elements.
    let footer;
    if (footerChildren.length > 0) {
        footer = {
            type: "CardFooter",
            childrenProps: footerChildren,
        };
    }
    // Assemble a vertical card with header, content, and optional footer.
    const children = [header, content];
    if (footer) {
        children.push(footer);
    }
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=243.js.map