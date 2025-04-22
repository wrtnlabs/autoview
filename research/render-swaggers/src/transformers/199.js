export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    const plugin = input.plugin;
    // Handle missing plugin gracefully
    if (!plugin) {
        return {
            type: "Text",
            content: "No plugin data available",
            variant: "body1",
        };
    }
    // Utility to format timestamps into human-readable strings
    const formatTimestamp = (ts) => {
        if (typeof ts !== "number")
            return undefined;
        try {
            return new Date(ts).toLocaleString();
        }
        catch (_a) {
            return ts.toString();
        }
    };
    // Icon to indicate plugin state
    const stateIcon = {
        type: "Icon",
        id: plugin.state === "active" ? "play" : "hourglass",
        color: plugin.state === "active" ? "green" : "yellow",
        size: 20,
    };
    // Build a DataList of core plugin properties
    const detailsList = [];
    // Helper to push a label/value pair
    const pushDetail = (label, value) => {
        if (value == null)
            return;
        detailsList.push({
            type: "DataListItem",
            label: { type: "Text", content: label, variant: "subtitle2" },
            value: { type: "Text", content: value, variant: "body2" },
        });
    };
    pushDetail("ID", plugin.id);
    pushDetail("Key", plugin.key);
    pushDetail("Channel", plugin.channelId);
    pushDetail("State", plugin.state);
    pushDetail("Created At", formatTimestamp(plugin.createdAt));
    pushDetail("Bot Name", plugin.botName);
    if (typeof plugin.runRate === "number") {
        pushDetail("Run Rate", `${(plugin.runRate * 100).toFixed(1)}%`);
    }
    if (plugin.color) {
        pushDetail("Color", plugin.color);
    }
    // Build markdown sections for I18n texts if present
    const markdownSections = [];
    const renderI18n = (title, i18n) => {
        if (!i18n)
            return;
        markdownSections.push(`### ${title}`);
        if (i18n.text)
            markdownSections.push(`- Default: ${i18n.text}`);
        if (i18n.en)
            markdownSections.push(`- EN: ${i18n.en}`);
        if (i18n.ja)
            markdownSections.push(`- JA: ${i18n.ja}`);
        if (i18n.ko)
            markdownSections.push(`- KO: ${i18n.ko}`);
        markdownSections.push(""); // blank line
    };
    renderI18n("Welcome Text", plugin.welcomeI18n);
    renderI18n("Profile Bot Message", plugin.profileBotMessageI18n);
    // Build chip list for URL whitelist
    const urlChips = (_b = (_a = plugin.urlWhitelist) === null || _a === void 0 ? void 0 : _a.map((url) => ({
        type: "Chip",
        label: url,
        variant: "outlined",
        size: "small",
    }))) !== null && _b !== void 0 ? _b : [];
    // Assemble the VerticalCard children
    const cardChildren = [];
    // Header with state icon and plugin name
    cardChildren.push({
        type: "CardHeader",
        title: plugin.name,
        description: plugin.labelButton ? "Label button enabled" : undefined,
        startElement: stateIcon,
    });
    // Media: desktop image if available
    if (plugin.deskImageUrl) {
        cardChildren.push({
            type: "CardMedia",
            src: plugin.deskImageUrl,
        });
    }
    // Content: Details list
    cardChildren.push({
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: detailsList,
        },
    });
    // Content: I18n markdown if any section generated
    if (markdownSections.length > 0) {
        cardChildren.push({
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: markdownSections.join("\n"),
            },
        });
    }
    // Footer: URL whitelist chips
    if (urlChips.length > 0) {
        cardChildren.push({
            type: "CardFooter",
            childrenProps: urlChips,
        });
    }
    // Return a vertical card that composes all parts
    return {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
}
//# sourceMappingURL=199.js.map