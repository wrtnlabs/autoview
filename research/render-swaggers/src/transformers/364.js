export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data provided, show a simple markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "# No plans available"
        };
    }
    // Transform each plan into a vertical card
    const cards = input.map(plan => {
        // Icon representing pricing model
        const priceIcon = {
            type: "Icon",
            id: plan.price_model === "FREE" ? "gift" : "dollar-sign",
            color: plan.price_model === "FREE" ? "green" : "blue",
            size: 24
        };
        // Build markdown content for pricing and features
        const lines = [];
        lines.push(`**Monthly:** $${(plan.monthly_price_in_cents / 100).toFixed(2)}`);
        lines.push(`**Yearly:** $${(plan.yearly_price_in_cents / 100).toFixed(2)}`);
        if (plan.unit_name) {
            lines.push(`**Unit Name:** ${plan.unit_name}`);
        }
        if (plan.bullets.length > 0) {
            lines.push("");
            lines.push("**Features:**");
            plan.bullets.forEach(b => lines.push(`- ${b}`));
        }
        return {
            type: "VerticalCard",
            childrenProps: [
                // Header with title, description, and an icon
                {
                    type: "CardHeader",
                    title: plan.name,
                    description: plan.description,
                    startElement: priceIcon
                },
                // Content showing pricing breakdown and features
                {
                    type: "CardContent",
                    childrenProps: {
                        type: "Markdown",
                        content: lines.join("\n")
                    }
                },
                // Footer with status chips and a management button
                {
                    type: "CardFooter",
                    childrenProps: [
                        {
                            type: "Chip",
                            label: plan.price_model,
                            color: plan.price_model === "FREE" ? "teal" : "primary",
                            size: "small",
                            variant: "filled"
                        },
                        {
                            type: "Chip",
                            label: plan.has_free_trial ? "Free Trial" : "No Trial",
                            color: plan.has_free_trial ? "lime" : "gray",
                            size: "small",
                            variant: "outlined"
                        },
                        {
                            type: "Button",
                            label: "Manage",
                            variant: "contained",
                            color: "primary",
                            size: "small",
                            href: plan.accounts_url
                        }
                    ]
                }
            ]
        };
    });
    // Return a responsive carousel of plan cards
    return {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
        childrenProps: cards
    };
}
//# sourceMappingURL=364.js.map