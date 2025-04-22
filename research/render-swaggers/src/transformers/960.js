export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No purchases found\n\nYou currently have no marketplace purchases."
        };
    }
    // Helper to format nullable dates
    const fmt = (iso) => iso ? new Date(iso).toLocaleDateString() : "N/A";
    // Build a ListItem for each purchase
    const listItems = input.map((purchase) => {
        // Choose a chip color based on the pricing model
        let planColor;
        switch (purchase.plan.price_model) {
            case "FREE":
                planColor = "green";
                break;
            case "FLAT_RATE":
                planColor = "blue";
                break;
            case "PER_UNIT":
                planColor = "orange";
                break;
            default:
                planColor = "gray";
        }
        // Assemble chips to display plan, billing cycle, and trial status
        const chips = [
            {
                type: "Chip",
                label: purchase.plan.name,
                color: planColor,
                size: "small",
                variant: "filled",
            },
            {
                type: "Chip",
                label: `Cycle: ${purchase.billing_cycle}`,
                color: "teal",
                size: "small",
                variant: "outlined",
            },
        ];
        if (purchase.on_free_trial && purchase.free_trial_ends_on) {
            chips.push({
                type: "Chip",
                label: `Trial ends ${fmt(purchase.free_trial_ends_on)}`,
                color: "warning",
                size: "small",
                variant: "outlined",
            });
        }
        return {
            type: "ListItem",
            // Primary text is the account login
            title: purchase.account.login,
            // Secondary text: plan description truncated + next billing date
            description: `${purchase.plan.bullets.length} features • Next billing: ${fmt(purchase.next_billing_date)}`,
            // A user icon to identify the account visually
            startElement: {
                type: "Icon",
                id: "user",
                color: "cyan",
                size: 24,
            },
            // Show chips on the right side
            endElement: chips,
            // Link to the account's marketplace URL
            href: purchase.account.url,
        };
    });
    // Wrap all items in a List with a sticky header
    return {
        type: "List",
        childrenProps: [
            {
                type: "ListSubheader",
                stickToTop: true,
                // Use a Text component for the title
                childrenProps: {
                    type: "Text",
                    variant: "h5",
                    content: `Marketplace Purchases (${input.length})`,
                },
            },
            // Spread all purchase items under the header
            ...listItems,
        ],
    };
}
//# sourceMappingURL=960.js.map