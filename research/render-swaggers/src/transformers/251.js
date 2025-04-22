export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no message, show a friendly markdown.
    if (!input.oneTimeMsg) {
        return {
            type: "Markdown",
            content: "## No message data available\nThere is nothing to display."
        };
    }
    const msg = input.oneTimeMsg;
    // Helper: format timestamp or date-time string to a human‐readable form.
    const formatDate = (isoOrEpoch) => {
        if (isoOrEpoch === undefined)
            return undefined;
        try {
            const d = typeof isoOrEpoch === "number"
                ? new Date(isoOrEpoch)
                : new Date(isoOrEpoch);
            return d.toLocaleString();
        }
        catch (_a) {
            return String(isoOrEpoch);
        }
    };
    // Map sendMedium to fontawesome icon names.
    const mediumIconMap = {
        email: "envelope",
        appAlimtalk: "comment-alt",
        appLine: "comment",
        inAppChat: "comments",
        xms: "sms"
    };
    const mediumIcon = msg.sendMedium ? (mediumIconMap[msg.sendMedium] || "question-circle") : undefined;
    // Map state to chip color.
    const stateColorMap = {
        draft: "gray",
        waiting: "warning",
        sent: "success",
        canceled: "error",
        removed: "darkGray"
    };
    const stateColor = stateColorMap[msg.state] || "primary";
    // Build a list of key/value pairs to render in a DataList.
    const keyValues = [
        { label: "ID", value: msg.id },
        { label: "Channel ID", value: msg.channelId },
        { label: "Channel Op ID", value: msg.channelOperationId },
        { label: "Send Mode", value: msg.sendMode },
        { label: "Send Medium", value: msg.sendMedium },
        { label: "Scheduled Start", value: msg.localStartAt || formatDate(msg.startAt) },
        { label: "Created At", value: formatDate(msg.createdAt) },
        { label: "Updated At", value: formatDate(msg.updatedAt) },
        { label: "Advertising", value: msg.advertising ? "Yes" : "No" },
        { label: "Offline XMS", value: msg.sendToOfflineXms ? "Yes" : "No" },
        { label: "Offline Email", value: msg.sendToOfflineEmail ? "Yes" : "No" }
    ];
    // Construct DataListItems, filtering out undefined values.
    const dataListItems = keyValues
        .filter(kv => kv.value !== undefined && kv.value !== null)
        .map(kv => ({
        type: "DataListItem",
        // Use Markdown for labels to allow bold styling.
        label: [
            {
                type: "Markdown",
                content: `**${kv.label}**`
            }
        ],
        // Use plain Text for values.
        value: {
            type: "Text",
            content: String(kv.value)
        }
    }));
    const metrics = {
        sent: { icon: "paper-plane", count: msg.sent },
        view: { icon: "eye", count: msg.view },
        click: { icon: "mouse-pointer", count: msg.click },
        goal: { icon: "bullseye", count: msg.goal }
    };
    const metricChips = Object.keys(metrics)
        .filter(key => metrics[key].count !== undefined)
        .map(key => ({
        type: "Chip",
        label: String(metrics[key].count),
        variant: "outlined",
        size: "small",
        color: "primary",
        startElement: {
            type: "Icon",
            id: metrics[key].icon,
            size: 12,
            color: "gray"
        }
    }));
    // Assemble the final VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with name, medium icon and state chip.
            {
                type: "CardHeader",
                title: msg.name,
                // show medium icon at the start
                startElement: mediumIcon
                    ? { type: "Icon", id: mediumIcon, size: 24, color: "teal" }
                    : undefined,
                // show state as a colored chip at the end
                endElement: {
                    type: "Chip",
                    label: msg.state,
                    color: stateColor,
                    variant: "filled",
                    size: "small"
                }
            },
            // Main content: a DataList of properties
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            },
            // Footer with metric chips
            {
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: metricChips
                }
            }
        ]
    };
}
//# sourceMappingURL=251.js.map