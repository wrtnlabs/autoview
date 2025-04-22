export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    const msg = input.oneTimeMsg;
    // If there's no message data, show a simple markdown notice
    if (!msg) {
        return {
            type: "Markdown",
            content: "### No message data available."
        };
    }
    // Helper: format timestamps (milliseconds) into a locale string
    const formatDate = (ts) => ts != null ? new Date(ts).toLocaleString() : "-";
    // Map message state to a chip color
    const stateColorMap = {
        draft: "gray",
        waiting: "yellow",
        sent: "green",
        canceled: "red",
        removed: "darkGray"
    };
    // Map send mediums to icons
    const mediumIconMap = {
        appAlimtalk: "comment",
        appLine: "line",
        email: "envelope",
        inAppChat: "comments",
        xms: "sms"
    };
    // Build header: show name, channel, an icon and a state badge
    const header = {
        type: "CardHeader",
        title: msg.name,
        description: msg.channelId ? `Channel: ${msg.channelId}` : undefined,
        // Marketing bullhorn icon
        startElement: {
            type: "Icon",
            id: "bullhorn",
            color: "blue",
            size: 24
        },
        // State chip on the right
        endElement: {
            type: "Chip",
            label: msg.state,
            color: (_a = stateColorMap[msg.state]) !== null && _a !== void 0 ? _a : "primary",
            variant: "filled"
        }
    };
    // Build a data list of key properties
    const dataListItems = [
        { key: "ID", value: (_b = msg.id) !== null && _b !== void 0 ? _b : "-", icon: "hashtag" },
        { key: "State", value: msg.state, icon: "info-circle" },
        { key: "Send Mode", value: (_c = msg.sendMode) !== null && _c !== void 0 ? _c : "-", icon: "clock" },
        { key: "Medium", value: (_d = msg.sendMedium) !== null && _d !== void 0 ? _d : "-", icon: (_f = mediumIconMap[(_e = msg.sendMedium) !== null && _e !== void 0 ? _e : ""]) !== null && _f !== void 0 ? _f : "question" },
        { key: "Start At", value: formatDate(msg.startAt), icon: "calendar" },
        { key: "Created At", value: formatDate(msg.createdAt), icon: "calendar-check" },
        { key: "Updated At", value: formatDate(msg.updatedAt), icon: "edit" }
    ].map(item => {
        // For each entry, use DataListItem with an icon + markdown label and markdown value
        const labelMd = `![icon](/icon/${item.icon}) **${item.key}**`;
        return {
            type: "DataListItem",
            label: [
                {
                    type: "Markdown",
                    content: labelMd
                }
            ],
            value: [
                {
                    type: "Text",
                    content: item.value
                }
            ]
        };
    });
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Build a set of metric chips for sent/view/click/goal
    const metricChips = [];
    if (msg.sent != null) {
        metricChips.push({ type: "Chip", label: `Sent: ${msg.sent}`, color: "primary", variant: "outlined" });
    }
    if (msg.view != null) {
        metricChips.push({ type: "Chip", label: `Viewed: ${msg.view}`, color: "secondary", variant: "outlined" });
    }
    if (msg.click != null) {
        metricChips.push({ type: "Chip", label: `Clicked: ${msg.click}`, color: "success", variant: "outlined" });
    }
    if (msg.goal != null) {
        metricChips.push({ type: "Chip", label: `Goal: ${msg.goal}`, color: "info", variant: "outlined" });
    }
    const metricsGroup = metricChips.length > 0
        ? {
            type: "ChipGroup",
            childrenProps: metricChips,
            maxItems: 4
        }
        : undefined;
    // Assemble the card content: DataList and metrics
    const contentChildren = [
        dataList,
        { type: "Divider", orientation: "horizontal", color: "#eee" }
    ];
    if (metricsGroup) {
        contentChildren.push(metricsGroup);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren
    };
    // Footer: a chip summarizing send mode, if available
    const footerChild = msg.sendMode
        ? {
            type: "Chip",
            label: `Mode: ${msg.sendMode}`,
            variant: "outlined",
            color: "gray"
        }
        : undefined;
    const footer = {
        type: "CardFooter",
        childrenProps: footerChild ? footerChild : []
    };
    // Return a vertical card with header, content, footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=195.js.map