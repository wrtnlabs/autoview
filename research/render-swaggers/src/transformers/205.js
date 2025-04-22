export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // Map legacy chat tags to AutoView chip color variants
    const tagColorMap = {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        olive: "lime", // olive approximated as lime
        green: "green",
        cobalt: "blue", // cobalt approximated as blue
        purple: "violet", // purple as violet
        pink: "pink",
        navy: "indigo", // navy as indigo
    };
    // Helper to flatten message blocks into plain text
    function extractBlockText(blocks) {
        if (!blocks || blocks.length === 0)
            return "";
        return blocks
            .map((b) => {
            var _a;
            const self = (_a = b.value) !== null && _a !== void 0 ? _a : "";
            const children = extractBlockText(b.blocks);
            return children ? `${self}\n${children}` : self;
        })
            .join("\n");
    }
    // === Card Header ===
    // Show user avatar and name, and current chat state
    const user = input.user;
    const userName = (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : "Unknown User";
    const avatar = {
        type: "Avatar",
        src: user === null || user === void 0 ? void 0 : user.avatarUrl,
        name: userName.charAt(0),
        variant: "gray",
        size: 40,
    };
    const header = {
        type: "CardHeader",
        title: userName,
        description: (_c = (_b = input.userChat) === null || _b === void 0 ? void 0 : _b.state) !== null && _c !== void 0 ? _c : undefined,
        startElement: avatar,
    };
    // === Card Content ===
    // Prefer markdown rendering of the latest message content
    const msg = input.message;
    let contentChildren;
    if (msg) {
        // Consolidate plainText or blocks into a single markdown string
        const text = (_e = (_d = msg.plainText) !== null && _d !== void 0 ? _d : extractBlockText(msg.blocks)) !== null && _e !== void 0 ? _e : "No text content available.";
        contentChildren = [
            {
                type: "Markdown",
                content: text,
            },
        ];
    }
    else {
        // Fallback text when no message is present
        contentChildren = [
            {
                type: "Text",
                variant: "body2",
                content: "No message available.",
            },
        ];
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // === Card Footer ===
    // Show chat tags as chips and any action buttons from the message
    const chips = (_g = (_f = input.chatTags) === null || _f === void 0 ? void 0 : _f.map((tag) => {
        var _a, _b;
        return ({
            type: "Chip",
            label: tag.name,
            color: (_b = tagColorMap[(_a = tag.colorVariant) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "gray",
            size: "small",
            variant: "filled",
        });
    })) !== null && _g !== void 0 ? _g : [];
    const buttons = (_j = (_h = msg === null || msg === void 0 ? void 0 : msg.buttons) === null || _h === void 0 ? void 0 : _h.map((btn) => ({
        type: "Button",
        label: btn.title,
        href: btn.url,
        variant: "outlined",
        size: "small",
    }))) !== null && _j !== void 0 ? _j : [];
    const footerChildren = [
        ...chips,
        ...buttons,
    ];
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren.length > 0 ? footerChildren : undefined,
    };
    // === Assemble Vertical Card ===
    // Use a vertical card layout for responsive display on all devices
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=205.js.map