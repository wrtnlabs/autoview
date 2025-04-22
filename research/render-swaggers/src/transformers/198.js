export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const plugin = input.plugin;
    // If there's no plugin payload, render a friendly Markdown message
    if (!plugin) {
        return {
            type: "Markdown",
            content: "### No plugin data available"
        };
    }
    // Helper: create a Text component
    const makeText = (text, variant) => (Object.assign({ type: "Text", content: text }, (variant ? { variant } : {})));
    // Helper: create a DataListItem component, value can be either text or an Image
    const makeItem = (label, value) => ({
        type: "DataListItem",
        label: makeText(label, "body2"),
        value: typeof value === "string"
            ? makeText(value, "body1")
            : value
    });
    // Format timestamp
    const createdStr = plugin.createdAt
        ? new Date(plugin.createdAt).toLocaleString()
        : "N/A";
    // Build the list of key/value items
    const items = [
        makeItem("ID", (_a = plugin.id) !== null && _a !== void 0 ? _a : "N/A"),
        makeItem("Key", (_b = plugin.key) !== null && _b !== void 0 ? _b : "N/A"),
        makeItem("Channel", (_c = plugin.channelId) !== null && _c !== void 0 ? _c : "N/A"),
        makeItem("State", (_d = plugin.state) !== null && _d !== void 0 ? _d : "N/A"),
        makeItem("Created At", createdStr),
        makeItem("Bot Name", (_e = plugin.botName) !== null && _e !== void 0 ? _e : "N/A"),
        makeItem("Color", plugin.color),
        makeItem("Label Button", plugin.labelButton ? "Yes" : "No"),
        makeItem("URL Whitelist Count", String((_g = (_f = plugin.urlWhitelist) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : 0)),
        makeItem("Run Rate", plugin.runRate != null ? String(plugin.runRate) : "N/A")
    ];
    // If images URLs are provided, render them inline
    if (plugin.deskImageUrl) {
        items.push(makeItem("Desktop Image", {
            type: "Image",
            src: plugin.deskImageUrl,
            alt: "Desktop image"
        }));
    }
    if (plugin.mobileImageUrl) {
        items.push(makeItem("Mobile Image", {
            type: "Image",
            src: plugin.mobileImageUrl,
            alt: "Mobile image"
        }));
    }
    // Header: show plugin name, description (i18n text), an icon, and a state chip
    const header = {
        type: "CardHeader",
        title: plugin.name,
        description: (_j = (_h = plugin.textI18n) === null || _h === void 0 ? void 0 : _h.text) !== null && _j !== void 0 ? _j : "",
        startElement: {
            type: "Icon",
            id: "robot",
            size: 32,
            color: "gray"
        },
        endElement: {
            type: "Chip",
            label: (_k = plugin.state) !== null && _k !== void 0 ? _k : "",
            color: plugin.state === "active" ? "success" : "warning",
            size: "small",
            variant: "filled"
        }
    };
    // The DataList component wrapping all items
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Content: embed the DataList inside CardContent
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Wrap everything in a VerticalCard for a clean, responsive layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
    return card;
}
//# sourceMappingURL=198.js.map