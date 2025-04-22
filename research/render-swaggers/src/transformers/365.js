export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a simple text message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No purchases available",
        };
    }
    // Helper to format ISO dates to a more friendly format
    const formatDate = (iso) => {
        if (!iso)
            return undefined;
        const d = new Date(iso);
        // Fallback to original string if parsing fails
        return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
    };
    // Build a VerticalCard for each purchase
    const cards = input.map((purchase) => {
        const { login, email, marketplace_purchase } = purchase;
        const plan = marketplace_purchase.plan;
        const cycle = marketplace_purchase.billing_cycle;
        const nextBilling = formatDate(marketplace_purchase.next_billing_date);
        const unitCount = marketplace_purchase.unit_count;
        const onTrial = marketplace_purchase.on_free_trial;
        const trialEnds = formatDate(marketplace_purchase.free_trial_ends_on);
        // Build an array of Chips summarizing key metadata
        const chips = [];
        // Billing cycle chip
        if (cycle) {
            chips.push({
                type: "Chip",
                label: `Cycle: ${cycle}`,
                color: "primary",
                variant: "outlined",
                size: "small",
            });
        }
        // Unit count chip
        if (unitCount != null) {
            chips.push({
                type: "Chip",
                label: `Units: ${unitCount}`,
                color: "secondary",
                variant: "outlined",
                size: "small",
            });
        }
        // Free trial status chip
        if (onTrial) {
            chips.push({
                type: "Chip",
                label: `Trial ends: ${trialEnds || "N/A"}`,
                color: "info",
                variant: "outlined",
                size: "small",
            });
        }
        // Next billing date chip
        if (nextBilling) {
            chips.push({
                type: "Chip",
                label: `Next pay: ${nextBilling}`,
                color: "success",
                variant: "outlined",
                size: "small",
            });
        }
        // Price chips: monthly and yearly
        if (plan) {
            const monthly = plan.monthly_price_in_cents / 100;
            const yearly = plan.yearly_price_in_cents / 100;
            chips.push({
                type: "Chip",
                label: `$${monthly.toFixed(2)}/mo`,
                color: "green",
                variant: "filled",
                size: "small",
            });
            chips.push({
                type: "Chip",
                label: `$${yearly.toFixed(2)}/yr`,
                color: "teal",
                variant: "filled",
                size: "small",
            });
        }
        return {
            type: "VerticalCard",
            childrenProps: [
                {
                    // CardHeader shows the user and contact info
                    type: "CardHeader",
                    title: login,
                    description: email || "—",
                    startElement: {
                        type: "Avatar",
                        name: login,
                        variant: "primary",
                        size: 40,
                    },
                },
                {
                    // CardContent has plan details in markdown + summary chips
                    type: "CardContent",
                    childrenProps: [
                        {
                            type: "Markdown",
                            content: plan
                                ? `### ${plan.name}\n\n${plan.description}`
                                : "No plan information",
                        },
                        {
                            type: "ChipGroup",
                            childrenProps: chips,
                            maxItems: 5,
                        },
                    ],
                },
            ],
        };
    });
    // Wrap all cards in a carousel for responsive browsing
    return {
        type: "Carousel",
        childrenProps: cards,
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
    };
}
//# sourceMappingURL=365.js.map