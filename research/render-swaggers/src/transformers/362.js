export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No marketplace purchases found\n\nYou currently have no active marketplace purchases."
        };
    }
    // Map each purchase to a ListItem with visual components
    const items = input.map((purchase) => {
        var _a, _b, _c;
        const info = purchase.marketplace_purchase;
        const plan = info.plan;
        const chips = [];
        // Billing cycle chip
        if (info.billing_cycle) {
            chips.push({
                type: "Chip",
                label: info.billing_cycle.charAt(0).toUpperCase() + info.billing_cycle.slice(1),
                variant: "outlined",
                color: "primary",
                size: "small",
            });
        }
        // Price per cycle chip (if plan data is available)
        if (plan) {
            const monthly = plan.monthly_price_in_cents != null
                ? (plan.monthly_price_in_cents / 100).toFixed(2)
                : null;
            const yearly = plan.yearly_price_in_cents != null
                ? (plan.yearly_price_in_cents / 100).toFixed(2)
                : null;
            // Show monthly price if monthly cycle, else yearly if available
            if (monthly && ((_a = info.billing_cycle) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes("month"))) {
                chips.push({
                    type: "Chip",
                    label: `$${monthly}/mo`,
                    variant: "outlined",
                    color: "info",
                    size: "small",
                });
            }
            else if (yearly && ((_b = info.billing_cycle) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes("year"))) {
                chips.push({
                    type: "Chip",
                    label: `$${yearly}/yr`,
                    variant: "outlined",
                    color: "info",
                    size: "small",
                });
            }
        }
        // Free trial status
        if (info.on_free_trial && info.free_trial_ends_on) {
            chips.push({
                type: "Chip",
                label: `Trial until ${new Date(info.free_trial_ends_on).toLocaleDateString()}`,
                variant: "filled",
                color: "success",
                size: "small",
            });
        }
        // Unit count (for PER_UNIT plans)
        if (info.unit_count != null && (plan === null || plan === void 0 ? void 0 : plan.unit_name)) {
            chips.push({
                type: "Chip",
                label: `${info.unit_count} ${plan.unit_name}`,
                variant: "outlined",
                color: "warning",
                size: "small",
            });
        }
        return {
            type: "ListItem",
            // Use GitHub login or fallback to ID
            title: purchase.login || `#${purchase.id}`,
            // Show plan name or a placeholder
            description: (_c = plan === null || plan === void 0 ? void 0 : plan.name) !== null && _c !== void 0 ? _c : "Unknown plan",
            // A store icon to represent marketplace
            startElement: {
                type: "Icon",
                id: "store",
                color: "blue",
                size: 24,
            },
            // Display all chips on the right side
            endElement: chips,
            // Link to the purchase URL
            href: purchase.url,
        };
    });
    // Return a responsive list of purchases
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=362.js.map