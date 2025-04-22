export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    // Helper: format nullable numbers or dates
    const formatValue = (val) => val == null ? "∞" : String(val);
    // Page info text
    const pageInfoText = {
        type: "Text",
        variant: "subtitle1",
        // Show current page, total pages, and total records
        content: `Page ${pagination.current} of ${pagination.pages} (${pagination.records} total)`,
    };
    // Build a DataListItem for each coupon
    const listItems = data.map((coupon) => {
        var _a;
        // Label: coupon name
        const labelText = {
            type: "Text",
            variant: "body1",
            content: coupon.name,
        };
        // Build chips for key metadata: access, exclusivity, inventory, expiration
        const chips = [];
        // Access level chip
        chips.push({
            type: "Chip",
            label: coupon.restriction.access,
            color: coupon.restriction.access === "public" ? "green" : "gray",
            size: "small",
            variant: "filled",
        });
        // Exclusive flag
        chips.push({
            type: "Chip",
            label: `Exclusive: ${coupon.restriction.exclusive ? "Yes" : "No"}`,
            color: coupon.restriction.exclusive ? "orange" : "gray",
            size: "small",
            variant: "outlined",
        });
        // Inventory at‐large
        chips.push({
            type: "Chip",
            label: `Volume: ${formatValue(coupon.inventory.volume)}`,
            size: "small",
            variant: "outlined",
        });
        // Inventory per citizen
        chips.push({
            type: "Chip",
            label: `Per user: ${formatValue(coupon.inventory.volume_per_citizen)}`,
            size: "small",
            variant: "outlined",
        });
        // Expiration date (use restriction.expired_at, fallback to N/A)
        chips.push({
            type: "Chip",
            label: `Expires: ${(_a = coupon.restriction.expired_at) !== null && _a !== void 0 ? _a : "N/A"}`,
            size: "small",
            variant: "outlined",
        });
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
        };
        // Compose the DataListItem
        const item = {
            type: "DataListItem",
            label: [labelText],
            value: chipGroup,
        };
        return item;
    });
    // The DataList containing all coupons
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Main container card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with icon and summary
            {
                type: "CardHeader",
                title: "Coupons",
                description: `Page ${pagination.current}/${pagination.pages} • ${pagination.records} records`,
                startElement: {
                    type: "Icon",
                    id: "ticket-alt", // FontAwesome ticket icon
                    color: "blue",
                    size: 24,
                },
            },
            // Content: page info and the list
            {
                type: "CardContent",
                childrenProps: [
                    pageInfoText,
                    dataList,
                ],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=128.js.map