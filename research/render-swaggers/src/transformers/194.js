export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    const msgs = (_a = input.oneTimeMsgs) !== null && _a !== void 0 ? _a : [];
    // If there are no messages, show a friendly markdown message
    if (msgs.length === 0) {
        return {
            type: "Markdown",
            content: "## No one-time messages found."
        };
    }
    // Define mappings for message state to icon and color
    const stateIconMap = {
        draft: "pencil-alt",
        waiting: "clock",
        sent: "check",
        canceled: "times",
        removed: "trash"
    };
    const stateColorMap = {
        draft: "gray",
        waiting: "yellow",
        sent: "green",
        canceled: "red",
        removed: "darkGray"
    };
    // Transform each message into a DataListItem
    const childrenProps = msgs.map(msg => {
        const iconId = stateIconMap[msg.state] || "info-circle";
        const iconColor = stateColorMap[msg.state] || "blue";
        // Label: icon + message name
        const labelComponents = [
            {
                type: "Icon",
                id: iconId,
                color: iconColor,
                size: 16
            },
            {
                type: "Text",
                variant: "body1",
                content: msg.name
            }
        ];
        // Prepare metric chips for sent, viewed, clicked, goal
        const metricChips = [];
        const metrics = [
            { label: "Sent", value: msg.sent },
            { label: "Viewed", value: msg.view },
            { label: "Clicked", value: msg.click },
            { label: "Goal", value: msg.goal }
        ];
        metrics.forEach(m => {
            if (typeof m.value === "number") {
                metricChips.push({
                    type: "Chip",
                    label: `${m.label}: ${m.value}`,
                    size: "small",
                    variant: "outlined",
                    color: "primary"
                });
            }
        });
        // Value: either a ChipGroup of metrics or a fallback text
        const valueComponent = metricChips.length > 0
            ? {
                type: "ChipGroup",
                childrenProps: metricChips
            }
            : {
                type: "Text",
                variant: "caption",
                content: "No metrics available"
            };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent
        };
    });
    // Compose the DataList to render all items
    return {
        type: "DataList",
        childrenProps
    };
}
//# sourceMappingURL=194.js.map