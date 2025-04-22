export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle the empty case gracefully by informing the user
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No webhook deliveries available\nThere are currently no deliveries to display."
        };
    }
    // Aggregate basic statistics
    const total = input.length;
    const successCount = input.filter(item => item.status_code < 400).length;
    const failureCount = total - successCount;
    const averageDuration = input.reduce((sum, item) => sum + item.duration, 0) / total;
    // Build a markdown summary for the card
    const summaryMarkdown = `**Total Deliveries**: ${total}  \n` +
        `**Successful**: ${successCount}  \n` +
        `**Failed**: ${failureCount}  \n` +
        `**Avg Duration**: ${averageDuration.toFixed(2)} ms`;
    // Map each delivery item into a DataListItemProps
    const listItems = input.map(item => {
        // Format the label as markdown: show timestamp and event name
        const labelComponent = {
            type: "Markdown",
            content: `**${item.delivered_at}** - _${item.event}_`
        };
        // Visual element for HTTP status
        const statusChip = {
            type: "Chip",
            label: item.status_code.toString(),
            color: item.status_code < 400 ? "green" : "red",
            size: "small",
            variant: "filled"
        };
        // Chip to show delivery duration
        const durationChip = {
            type: "Chip",
            label: `${item.duration}ms`,
            size: "small",
            variant: "outlined"
        };
        // Optional icon to mark redeliveries
        const redeliveryIcon = item.redelivery
            ? {
                type: "Icon",
                id: "redo",
                color: "orange",
                size: 16
            }
            : undefined;
        // Assemble the right-hand side value components
        const valueComponents = [
            statusChip,
            durationChip,
        ];
        if (redeliveryIcon)
            valueComponents.push(redeliveryIcon);
        return {
            type: "DataListItem",
            label: [labelComponent],
            value: valueComponents
        };
    });
    // Wrap the summary and the data list into a vertical card for responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Webhook Deliveries"
            },
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: summaryMarkdown
                    },
                    {
                        type: "DataList",
                        childrenProps: listItems
                    }
                ]
            }
        ]
    };
}
//# sourceMappingURL=762.js.map