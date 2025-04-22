export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure relevant fields from input
    const { id, customer, coupon, created_at, expired_at } = input;
    // Determine if the ticket is expired
    let isExpired = false;
    if (expired_at !== null) {
        const expDate = new Date(expired_at).getTime();
        if (!isNaN(expDate) && expDate < Date.now()) {
            isExpired = true;
        }
    }
    // Build a list of key/value pairs for the DataList
    const dataListItems = [
        {
            type: "DataListItem",
            // Label with user icon + text
            label: [
                { type: "Icon", id: "user", color: "gray", size: 16 },
                { type: "Text", content: "Customer ID" }
            ],
            // Customer ID value
            value: { type: "Text", content: customer.id }
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "tag", color: "gray", size: 16 },
                { type: "Text", content: "Coupon Name" }
            ],
            value: { type: "Text", content: coupon.name }
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "calendar-alt", color: "gray", size: 16 },
                { type: "Text", content: "Issued At" }
            ],
            value: { type: "Text", content: created_at }
        },
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "hourglass-end", color: "gray", size: 16 },
                { type: "Text", content: "Expires At" }
            ],
            value: {
                type: "Text",
                content: expired_at !== null ? expired_at : "Never"
            }
        }
    ];
    // Build the CardHeader with a ticket icon
    const header = {
        type: "CardHeader",
        title: `Coupon Ticket`,
        description: `ID: ${id}`,
        startElement: {
            type: "Icon",
            id: "ticket-alt",
            color: "blue",
            size: 24
        }
    };
    // Wrap the DataList in CardContent
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: dataListItems
        }
    };
    // Show a status chip in the footer indicating whether this ticket is expired
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Chip",
            label: isExpired ? "Expired" : "Active",
            color: isExpired ? "error" : "success",
            variant: "filled"
        }
    };
    // Compose a vertical card containing the header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=59.js.map