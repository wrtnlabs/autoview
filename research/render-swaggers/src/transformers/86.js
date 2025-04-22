export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map delivery/order states to visual chip colors
    const stateColorMap = {
        none: "gray",
        preparing: "warning",
        manufacturing: "info",
        shipping: "primary",
        delivering: "secondary",
        arrived: "success",
    };
    // Prepare a chip summarizing the overall order state
    const orderStateChip = {
        type: "Chip",
        label: input.state,
        color: (_a = stateColorMap[input.state]) !== null && _a !== void 0 ? _a : "gray",
        size: "medium",
        variant: "filled",
    };
    // Format the address as markdown for readability and responsive layout
    let addressLines = [
        `**Delivery Address**`,
        `${input.address.name} • ${input.address.mobile}`,
        `${input.address.country}, ${input.address.province}, ${input.address.city}, ${input.address.department}`,
        `${input.address.possession}`,
        `${input.address.zip_code}`,
    ];
    if (input.address.special_note) {
        addressLines.push(`\n> _${input.address.special_note}_`);
    }
    const addressMarkdown = addressLines.join("  \n");
    // Compute basic order metrics
    const deliveriesCount = input.deliveries.length.toString();
    const paidAtDisplay = (_b = input.paid_at) !== null && _b !== void 0 ? _b : "-";
    const cancelledAtDisplay = (_c = input.cancelled_at) !== null && _c !== void 0 ? _c : "-";
    // Generate chips for each individual delivery's state
    const deliveryStateChips = input.deliveries.map((delivery) => {
        var _a;
        return ({
            type: "Chip",
            label: delivery.state,
            color: (_a = stateColorMap[delivery.state]) !== null && _a !== void 0 ? _a : "gray",
            size: "small",
            variant: "outlined",
        });
    });
    // Build a data list of key order details
    const orderDetailsList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Total Deliveries", variant: "subtitle2" }
                ],
                value: [
                    { type: "Text", content: deliveriesCount, variant: "subtitle2" }
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Delivery States", variant: "subtitle2" }
                ],
                // You can pass an array of Chips directly as the value
                value: deliveryStateChips,
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Paid At", variant: "subtitle2" }
                ],
                value: [
                    { type: "Text", content: paidAtDisplay, variant: "body2" }
                ],
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Text", content: "Cancelled At", variant: "subtitle2" }
                ],
                value: [
                    { type: "Text", content: cancelledAtDisplay, variant: "body2" }
                ],
            },
        ],
    };
    // Compose the card header with order ID, state chip, and creation timestamp
    const header = {
        type: "CardHeader",
        title: `Order #${input.id}`,
        description: `Status: ${input.state}`,
        startElement: orderStateChip,
        endElement: {
            type: "Text",
            content: `Created: ${input.created_at}`,
            variant: "caption",
        },
    };
    // Compose the card content with address and detailed list
    const content = {
        type: "CardContent",
        childrenProps: [
            // Use markdown for a nicely formatted address block
            {
                type: "Markdown",
                content: addressMarkdown,
            },
            // Then show the data list of order metrics
            orderDetailsList,
        ],
    };
    // Return a vertical card assembling header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=86.js.map