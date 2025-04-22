export function transform($input) {
    return visualizeData($input);
}
// Transforms combined billing usage data into a visual AutoView component.
function visualizeData(input) {
    // Destructure and rename inputs for clarity.
    const { days_left_in_billing_cycle: daysLeft, estimated_paid_storage_for_month: paidStorage, estimated_storage_for_month: totalStorage, } = input;
    // Prepare a list of items to display each metric with an icon and a text label/value.
    const listItems = [
        {
            type: "DataListItem",
            // Combine an icon and text for the label.
            label: [
                { type: "Icon", id: "clock", color: "blue", size: 20 },
                { type: "Text", content: "Days left in billing cycle", variant: "body2" },
            ],
            // Display the numeric value with units.
            value: { type: "Text", content: `${daysLeft} days`, variant: "body1" },
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "hdd", color: "green", size: 20 },
                { type: "Text", content: "Estimated paid storage", variant: "body2" },
            ],
            value: { type: "Text", content: `${paidStorage} GB`, variant: "body1" },
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "database", color: "teal", size: 20 },
                { type: "Text", content: "Estimated total storage", variant: "body2" },
            ],
            value: { type: "Text", content: `${totalStorage} GB`, variant: "body1" },
        },
    ];
    // Compose the final UI as a vertical card with a header and data list.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Title and description for the whole card.
                title: "Billing Usage",
                description: "Overview of your billing cycle usage",
                // A pie-chart icon to visually indicate metrics overview.
                startElement: { type: "Icon", id: "chart-pie", color: "indigo", size: 24 },
            },
            {
                type: "CardContent",
                // Embed a DataList to render our metrics in a responsive, mobile-friendly list.
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=1009.js.map