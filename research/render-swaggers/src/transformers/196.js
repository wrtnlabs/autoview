export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    const user = input.oneTimeMsgUser;
    // If there's no data, show a friendly markdown message
    if (!user) {
        return {
            type: "Markdown",
            content: "### No User Data Available\nNo one-time message user data was provided."
        };
    }
    // Normalize metrics (fallback to zero if undefined)
    const sent = (_a = user.sent) !== null && _a !== void 0 ? _a : 0;
    const views = (_b = user.view) !== null && _b !== void 0 ? _b : 0;
    const clicks = (_c = user.click) !== null && _c !== void 0 ? _c : 0;
    const goal = (_d = user.goal) !== null && _d !== void 0 ? _d : 0;
    // Define each metric with a label, icon, and its numeric value
    const metrics = [
        { label: "Sent", icon: "paper-plane", value: sent },
        { label: "Views", icon: "eye", value: views },
        { label: "Clicks", icon: "hand-pointer", value: clicks },
        { label: "Goal", icon: "bullseye", value: goal },
    ];
    // Build a DataListItem for each metric
    const dataListItems = metrics.map(metric => {
        // For "Views", compare against goal to pick a color
        let chipColor = "primary";
        if (metric.label === "Views" && goal > 0) {
            const ratio = metric.value / goal;
            if (ratio >= 1)
                chipColor = "success";
            else if (ratio >= 0.75)
                chipColor = "info";
            else if (ratio >= 0.5)
                chipColor = "warning";
            else
                chipColor = "error";
        }
        return {
            type: "DataListItem",
            // Combine an icon and text for the label
            label: [
                { type: "Icon", id: metric.icon, size: 20, color: "gray" },
                { type: "Text", content: metric.label, variant: "body1", color: "gray" }
            ],
            // Show the metric as a colored chip
            value: {
                type: "Chip",
                label: `${metric.value}`,
                color: chipColor,
                size: "small",
                variant: "filled"
            }
        };
    });
    // Compose a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `User: ${(_e = user.userId) !== null && _e !== void 0 ? _e : "Unknown"}`,
                description: `Message ID: ${(_f = user.oneTimeMsgId) !== null && _f !== void 0 ? _f : "N/A"}`,
                startElement: { type: "Icon", id: "chart-bar", size: 24, color: "blue" }
            },
            {
                type: "CardContent",
                // Nest a DataList inside the card content
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            }
        ]
    };
}
//# sourceMappingURL=196.js.map