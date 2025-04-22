export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const { pagination, data } = input;
    const { current, pages, records, limit } = pagination;
    // Handle empty data gracefully
    if (!Array.isArray(data) || data.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No coupons available.",
        };
    }
    // Card header summarizing pagination
    const header = {
        type: "CardHeader",
        title: `Coupons (Page ${current} of ${pages})`,
        description: `Showing ${data.length} of ${records} total, ${limit} per page.`,
    };
    // Build DataList items for each coupon
    const items = data.map((coupon) => {
        // Label: coupon name as a heading
        const label = {
            type: "Text",
            variant: "h5",
            content: coupon.name,
        };
        // Build chips for visual attributes
        const chips = [];
        // Access level chip
        chips.push({
            type: "Chip",
            label: coupon.restriction.access,
            color: coupon.restriction.access === "public" ? "green" : "gray",
            variant: "filled",
        });
        // Exclusivity chip
        chips.push({
            type: "Chip",
            label: coupon.restriction.exclusive ? "Exclusive" : "Combinable",
            color: coupon.restriction.exclusive ? "error" : "success",
            variant: "filled",
        });
        // Inventory global volume
        const volLabel = coupon.inventory.volume != null
            ? `Volume: ${coupon.inventory.volume}`
            : "Volume: Unlimited";
        chips.push({
            type: "Chip",
            label: volLabel,
            variant: "outlined",
        });
        // Inventory per-citizen volume
        const perLabel = coupon.inventory.volume_per_citizen != null
            ? `Per-user: ${coupon.inventory.volume_per_citizen}`
            : "Per-user: Unlimited";
        chips.push({
            type: "Chip",
            label: perLabel,
            variant: "outlined",
        });
        // Expiration by days after issuance
        if (coupon.restriction.expired_in != null) {
            chips.push({
                type: "Chip",
                label: `Expires in ${coupon.restriction.expired_in} day(s)`,
                variant: "outlined",
            });
        }
        // Expiration by absolute date
        if (coupon.restriction.expired_at) {
            // display date portion only
            const dt = new Date(coupon.restriction.expired_at);
            chips.push({
                type: "Chip",
                label: `Expires at ${dt.toLocaleDateString()}`,
                variant: "outlined",
            });
        }
        // Validity period (opened_at to closed_at)
        if (coupon.opened_at || coupon.closed_at) {
            const opened = coupon.opened_at
                ? new Date(coupon.opened_at).toLocaleDateString()
                : "Anytime";
            const closed = coupon.closed_at
                ? new Date(coupon.closed_at).toLocaleDateString()
                : "No expiry";
            chips.push({
                type: "Chip",
                label: `Valid: ${opened} → ${closed}`,
                variant: "outlined",
            });
        }
        // Group chips into a ChipGroup for layout
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
        };
        return {
            type: "DataListItem",
            label: label,
            value: chipGroup,
        };
    });
    // Compose the DataList
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Wrap in a card for better layout
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=6.js.map