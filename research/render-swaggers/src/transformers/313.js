export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no deliveries, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "**No deliveries available.**",
        };
    }
    // Helper to derive color based on HTTP status code
    function getStatusColor(code) {
        if (code >= 200 && code < 300)
            return "success";
        if (code >= 300 && code < 400)
            return "warning";
        return "error";
    }
    // Sort deliveries by delivered_at in descending order (newest first)
    const sorted = [...input].sort((a, b) => {
        const ta = Date.parse(a.delivered_at) || 0;
        const tb = Date.parse(b.delivered_at) || 0;
        return tb - ta;
    });
    // Transform each delivery into a DataListItemProps
    const items = sorted.map((item) => {
        // Primary icon + timestamp display
        const timestampLabel = [
            {
                type: "Icon",
                id: "clock",
                size: 16,
                color: "gray",
            },
            {
                type: "Text",
                variant: "body2",
                color: "tertiary",
                content: ` ${new Date(item.delivered_at).toLocaleString()}`,
            },
        ];
        // Status chip with color mapping
        const statusChip = {
            type: "Chip",
            label: item.status,
            color: getStatusColor(item.status_code),
            variant: "filled",
            size: "small",
        };
        // Status code text
        const statusCodeText = {
            type: "Text",
            variant: "caption",
            color: "tertiary",
            content: `Code: ${item.status_code}`,
        };
        // Redelivery indicator if applicable
        const extraChips = [];
        if (item.redelivery) {
            extraChips.push({
                type: "Chip",
                label: "Redelivery",
                color: "warning",
                variant: "outlined",
                size: "small",
            });
        }
        // Assemble the "value" side of the data list item
        const valueComponents = [
            statusChip,
            statusCodeText,
            ...extraChips,
        ];
        // Build the DataListItemProps
        return {
            type: "DataListItem",
            label: timestampLabel,
            value: valueComponents,
        };
    });
    // Return the top-level DataList component with all items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=313.js.map