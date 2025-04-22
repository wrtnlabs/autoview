export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Mapping of message states to chip colors
    const stateColorMap = {
        draft: "gray",
        waiting: "warning",
        sent: "success",
        canceled: "error",
        removed: "secondary",
    };
    // Mapping of metric keys to icon identifiers and colors
    const metricIconMap = {
        sent: { id: "paper-plane", color: "blue" },
        view: { id: "eye", color: "teal" },
        goal: { id: "bullseye", color: "green" },
        click: { id: "mouse-pointer", color: "violet" },
    };
    // If there are no messages, show a friendly markdown notice
    if (!input.oneTimeMsgs || input.oneTimeMsgs.length === 0) {
        return {
            type: "Markdown",
            content: "### No one-time messages to display\nYou can schedule messages to see them here.",
        };
    }
    // Build a DataListItem for each message record
    const items = input.oneTimeMsgs.map((msg) => {
        // Primary label: message name styled as heading
        const nameLabel = {
            type: "Text",
            variant: "h6",
            content: msg.name,
        };
        // Chip to indicate the message state
        const stateChip = {
            type: "Chip",
            label: msg.state,
            color: stateColorMap[msg.state] || "gray",
            size: "small",
            variant: "filled",
        };
        // Optional: chip to indicate send mode if provided
        const sendModeChip = msg.sendMode
            ? {
                type: "Chip",
                label: msg.sendMode,
                color: "primary",
                size: "small",
                variant: "outlined",
            }
            : null;
        // Build badges for each available metric
        const metricBadges = [];
        ["sent", "view", "goal", "click"].forEach((key) => {
            const value = msg[key];
            if (typeof value === "number") {
                const iconMeta = metricIconMap[key];
                metricBadges.push({
                    type: "Badge",
                    count: value,
                    childrenProps: {
                        type: "Icon",
                        id: iconMeta.id,
                        color: iconMeta.color,
                        size: 16,
                    },
                    // showZero false by default
                });
            }
        });
        // Assemble the label area with name and state (and optional send mode)
        const labelComponents = [
            nameLabel,
            stateChip,
        ];
        if (sendModeChip) {
            labelComponents.push(sendModeChip);
        }
        // The value area shows the metric badges inline
        const valueComponents = metricBadges;
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Return the overall DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=250.js.map