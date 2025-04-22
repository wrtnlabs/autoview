export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Edge case: no data to display
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "# No delivery pieces to display\n\nThere are currently no delivery pieces available."
        };
    }
    // Group delivery pieces by publish_id for logical organization
    const groups = {};
    for (const piece of input) {
        const key = piece.publish_id;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(piece);
    }
    // Build the childrenProps for a List component: alternating subheaders and list items
    const listChildren = [];
    for (const publishId of Object.keys(groups)) {
        // Add a subheader for each order group
        listChildren.push({
            type: "ListSubheader",
            stickToTop: false,
            childrenProps: {
                type: "Text",
                variant: "subtitle2",
                content: `Order: ${publishId}`
            }
        });
        // Add each delivery piece under its order subheader
        for (const piece of groups[publishId]) {
            listChildren.push({
                type: "ListItem",
                // Show the good ID as the primary title
                title: piece.good_id,
                // Show the stock ID as supporting text
                description: `Stock: ${piece.stock_id}`,
                // Use a cube icon to visually represent a package/stock
                startElement: {
                    type: "Icon",
                    id: "cube",
                    color: "blue",
                    size: 20
                },
                // Display the quantity in a colored chip for quick visual scanning
                endElement: {
                    type: "Chip",
                    label: piece.quantity.toString(),
                    variant: "filled",
                    color: "primary",
                    size: "small"
                }
            });
        }
    }
    // Return a List component for responsive, mobile‑friendly rendering
    return {
        type: "List",
        childrenProps: listChildren
    };
}
//# sourceMappingURL=124.js.map