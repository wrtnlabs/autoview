export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    // Build a list of DataListItem components for each non-null piece of input data
    const items = [];
    // Helper to push a simple text data item
    const pushTextItem = (labelText, valueText) => {
        items.push({
            type: "DataListItem",
            // Label on the left
            label: {
                type: "Text",
                content: labelText,
                variant: "subtitle2",
            },
            // Value on the right
            value: {
                type: "Text",
                content: valueText != null ? String(valueText) : "–",
                variant: "body1",
            },
        });
    };
    // 1. User information
    if (input.user) {
        const name = (_b = (_a = input.user.name) !== null && _a !== void 0 ? _a : input.user.id) !== null && _b !== void 0 ? _b : "Unknown User";
        pushTextItem("User", name);
        if (input.user.email) {
            pushTextItem("Email", input.user.email);
        }
        if (input.user.language) {
            pushTextItem("Language", input.user.language);
        }
        if (input.user.country) {
            pushTextItem("Country", input.user.country);
        }
    }
    // 2. Chat session info
    if (input.session) {
        pushTextItem("Unread Messages", input.session.unread);
        pushTextItem("Alerts", input.session.alert);
    }
    // 3. Last message preview
    if (input.message) {
        const preview = input.message.plainText
            ? // Truncate long text for display
                input.message.plainText.length > 100
                    ? input.message.plainText.slice(0, 100) + "…"
                    : input.message.plainText
            : "<no text>";
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Last Message",
                variant: "subtitle2",
            },
            // Use Markdown to preserve line breaks or simple formatting
            value: {
                type: "Markdown",
                content: preview.replace(/([*_`])/g, "\\$1"), // escape markdown chars
            },
        });
    }
    // 4. Chat tags as a group of chips
    if (input.chatTags && input.chatTags.length > 0) {
        // Map backend variants to AutoView chip colors
        const colorMap = {
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
        const chips = input.chatTags.map((tag) => {
            var _a, _b;
            return ({
                type: "Chip",
                label: tag.name,
                variant: "outlined",
                color: (_b = colorMap[(_a = tag.colorVariant) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "gray",
                size: "small",
            });
        });
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Tags",
                variant: "subtitle2",
            },
            value: {
                type: "ChipGroup",
                childrenProps: chips,
            },
        });
    }
    // Compose the DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Build the card header: user avatar or fallback icon + title + subtitle
    const header = {
        type: "CardHeader",
        title: (_f = (_d = (_c = input.user) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : (_e = input.user) === null || _e === void 0 ? void 0 : _e.id) !== null && _f !== void 0 ? _f : "Chat Overview",
        description: (_h = (_g = input.user) === null || _g === void 0 ? void 0 : _g.email) !== null && _h !== void 0 ? _h : (input.session ? `Chat ID: ${input.session.chatId}` : undefined),
        startElement: ((_j = input.user) === null || _j === void 0 ? void 0 : _j.avatarUrl)
            ? {
                type: "Avatar",
                src: input.user.avatarUrl,
                name: (_k = input.user.name) !== null && _k !== void 0 ? _k : undefined,
                size: 40,
                variant: "gray",
            }
            : {
                type: "Icon",
                id: "user",
                size: 40,
                color: "gray",
            },
    };
    // Footer: show last update timestamp
    const updatedAt = (_p = (_m = (_l = input.message) === null || _l === void 0 ? void 0 : _l.updatedAt) !== null && _m !== void 0 ? _m : (_o = input.session) === null || _o === void 0 ? void 0 : _o.updatedAt) !== null && _p !== void 0 ? _p : (_q = input.user) === null || _q === void 0 ? void 0 : _q.updatedAt;
    const footerText = updatedAt
        ? new Date(updatedAt).toLocaleString()
        : "No updates";
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Text",
            content: `Last updated: ${footerText}`,
            variant: "caption",
            color: "#888", // subtle color
        },
    };
    // Final card assembly
    return {
        type: "VerticalCard",
        childrenProps: [header, { type: "CardContent", childrenProps: dataList }, footer],
    };
}
//# sourceMappingURL=259.js.map