export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map delivery state to chip color
    const stateColorMap = {
        none: "gray",
        preparing: "warning",
        manufacturing: "orange",
        shipping: "primary",
        delivering: "info",
        arrived: "success",
        underway: "teal",
    };
    const { pagination, data: deliveries } = input;
    // Generate DataList items for each delivery record
    const items = deliveries.map(delivery => {
        // Create small summary chips: state, orders count, shippers count, journeys count
        const summaryChips = [
            {
                type: "Chip",
                label: delivery.state,
                color: stateColorMap[delivery.state] || "gray",
                variant: "filled",
            },
            {
                type: "Chip",
                label: `${delivery.orders.length} orders`,
                color: "primary",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: `${delivery.shippers.length} shippers`,
                color: "secondary",
                variant: "outlined",
            },
            {
                type: "Chip",
                label: `${delivery.journeys.length} steps`,
                color: "info",
                variant: "outlined",
            },
        ];
        // Label area: delivery ID and creation timestamp
        const labelComponents = [
            {
                type: "Text",
                content: [`Delivery ID: ${delivery.id}`],
                variant: "subtitle1",
            },
            {
                type: "Text",
                content: [`Created: ${new Date(delivery.created_at).toLocaleString()}`],
                variant: "caption",
            },
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: summaryChips,
        };
    });
    // If no deliveries, show a Markdown notice
    const contentComponent = {
        type: "CardContent",
        childrenProps: deliveries.length
            ? [
                {
                    type: "DataList",
                    childrenProps: items,
                },
            ]
            : [
                {
                    type: "Markdown",
                    content: "### No deliveries found.",
                },
            ],
    };
    // Header showing title and pagination info
    const headerComponent = {
        type: "CardHeader",
        title: "Delivery Records",
        description: `Page ${pagination.current} of ${pagination.pages} • Total ${pagination.records} records`,
    };
    // Footer could contain additional navigation or summary; here we leave it minimal
    const footerComponent = {
        type: "CardFooter",
        childrenProps: [
            {
                type: "Text",
                content: [
                    `Showing ${deliveries.length} of ${pagination.records} deliveries`,
                ],
                variant: "caption",
            },
        ],
    };
    // Compose the vertical card
    return {
        type: "VerticalCard",
        childrenProps: [headerComponent, contentComponent, footerComponent],
    };
}
//# sourceMappingURL=122.js.map