export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No purchases found.\n\nYou have no marketplace purchases at this time."
        };
    }
    // Map each purchase into a ListItem for display
    const listItems = input.map(purchase => {
        const { plan, billing_cycle, next_billing_date, on_free_trial, free_trial_ends_on } = purchase;
        // Choose an icon based on the pricing model
        let iconId;
        let iconColor;
        switch (plan.price_model) {
            case "FREE":
                iconId = "gift";
                iconColor = "green";
                break;
            case "FLAT_RATE":
                iconId = "dollar-sign";
                iconColor = "blue";
                break;
            case "PER_UNIT":
                iconId = "coins";
                iconColor = "teal";
                break;
            default:
                iconId = "tag";
                iconColor = "gray";
        }
        const startIcon = {
            type: "Icon",
            id: iconId,
            size: 24,
            color: iconColor
        };
        // Helper to format ISO date strings into user-friendly date
        const formatDate = (iso) => {
            try {
                return new Date(iso).toLocaleDateString();
            }
            catch (_a) {
                return iso;
            }
        };
        // Build a set of chips to highlight key fields
        const chips = [];
        // Billing cycle chip
        chips.push({
            type: "Chip",
            label: `Cycle: ${billing_cycle}`,
            size: "small",
            variant: "outlined",
            color: "primary"
        });
        // Next billing date chip (if available)
        if (next_billing_date) {
            chips.push({
                type: "Chip",
                label: `Next: ${formatDate(next_billing_date)}`,
                size: "small",
                variant: "outlined",
                color: "secondary"
            });
        }
        // Free trial chip (only when on trial)
        if (on_free_trial && free_trial_ends_on) {
            chips.push({
                type: "Chip",
                label: `Trial ends: ${formatDate(free_trial_ends_on)}`,
                size: "small",
                variant: "filled",
                color: "success"
            });
        }
        return {
            type: "ListItem",
            // Plan name as the main title
            title: plan.name,
            // Plan description as secondary text
            description: plan.description,
            // Icon indicating the pricing model
            startElement: startIcon,
            // Show chips to highlight important dates and cycles
            endElement: chips
        };
    });
    // Return a responsive list of all purchases
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=959.js.map