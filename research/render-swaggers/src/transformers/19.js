export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Compose a sticky subheader to display pagination info
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            content: `Page ${input.pagination.current} of ${input.pagination.pages}`,
            variant: "subtitle2",
            color: "gray"
        }
    };
    // Transform each order into a ListItemProps
    const items = input.data.map((order) => {
        // Show basic order info: name and creation date
        // Show an icon for the order and chips for item count & total price
        return {
            type: "ListItem",
            title: order.name,
            description: `Created: ${new Date(order.created_at).toLocaleString()}`,
            startElement: {
                type: "Icon",
                id: "shopping-cart",
                size: 24,
                color: "blue"
            },
            endElement: [
                {
                    type: "Chip",
                    label: `${order.goods.length} items`,
                    size: "small",
                    variant: "outlined",
                    color: "primary"
                },
                {
                    type: "Chip",
                    label: `Total $${order.price.real.toFixed(2)}`,
                    size: "small",
                    variant: "filled",
                    color: "success"
                }
            ]
        };
    });
    // Return a responsive List component
    return {
        type: "List",
        childrenProps: [subheader, ...items]
    };
}
//# sourceMappingURL=19.js.map