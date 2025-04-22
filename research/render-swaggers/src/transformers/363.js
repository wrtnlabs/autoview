export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Destructure key pieces from input
    const { login, url, marketplace_purchase: purchaseData, marketplace_pending_change: pending, } = input;
    // Helper for creating a Text component
    const makeText = (content, variant = 'body2') => ({
        type: 'Text',
        content,
        variant,
    });
    // Build a list of data items to display
    const dataItems = [];
    // Helper to push a label/value pair into the DataList
    const addItem = (label, value) => {
        dataItems.push({
            type: 'DataListItem',
            label: [makeText(label, 'caption')],
            value: [makeText(value)],
        });
    };
    // Billing cycle
    if (purchaseData.billing_cycle) {
        addItem('Billing Cycle', purchaseData.billing_cycle);
    }
    // Plan details
    const plan = purchaseData.plan;
    if (plan) {
        // Convert from cents to dollar string
        const monthly = (plan.monthly_price_in_cents / 100).toFixed(2);
        const yearly = (plan.yearly_price_in_cents / 100).toFixed(2);
        addItem('Monthly Price', `$${monthly}`);
        addItem('Yearly Price', `$${yearly}`);
        addItem('Price Model', plan.price_model);
    }
    // Unit count (seats)
    if (purchaseData.unit_count != null) {
        addItem('Units', String(purchaseData.unit_count));
    }
    // Free trial information
    if (purchaseData.on_free_trial != null) {
        addItem('On Free Trial', purchaseData.on_free_trial ? 'Yes' : 'No');
        if (purchaseData.free_trial_ends_on) {
            addItem('Trial Ends On', purchaseData.free_trial_ends_on);
        }
    }
    // Next billing date
    if (purchaseData.next_billing_date) {
        addItem('Next Billing', purchaseData.next_billing_date);
    }
    // Last updated timestamp
    if (purchaseData.updated_at) {
        addItem('Last Updated', purchaseData.updated_at);
    }
    // Plan state (e.g. ACTIVE, CANCELED, etc.)
    if (plan === null || plan === void 0 ? void 0 : plan.state) {
        addItem('Plan State', plan.state);
    }
    // Pending change info, if present
    if (pending) {
        if (pending.effective_date) {
            addItem('Change Effective', pending.effective_date);
        }
        if (pending.unit_count != null) {
            addItem('Pending Units', String(pending.unit_count));
        }
    }
    // Compose a DataList component from the aggregated items
    const dataList = {
        type: 'DataList',
        childrenProps: dataItems,
    };
    // Return a VerticalCard that shows:
    // - CardHeader: Plan name, user login and icon
    // - CardContent: Markdown description + DataList of details
    // - CardFooter: A button linking to the purchase URL
    return {
        type: 'VerticalCard',
        childrenProps: [
            {
                type: 'CardHeader',
                title: (_a = plan === null || plan === void 0 ? void 0 : plan.name) !== null && _a !== void 0 ? _a : 'Marketplace Plan',
                description: `User: ${login}`,
                startElement: {
                    type: 'Icon',
                    id: 'shopping-cart',
                    color: 'blue',
                    size: 24,
                },
            },
            {
                type: 'CardContent',
                childrenProps: [
                    // Plan description as markdown (for bullet formatting, links, etc.)
                    ...((plan === null || plan === void 0 ? void 0 : plan.description)
                        ? [
                            {
                                type: 'Markdown',
                                content: plan.description,
                            },
                        ]
                        : []),
                    dataList,
                ],
            },
            {
                type: 'CardFooter',
                // Single Button component in the footer
                childrenProps: {
                    type: 'Button',
                    variant: 'contained',
                    color: 'primary',
                    label: 'Manage Purchase',
                    href: url,
                },
            },
        ],
    };
}
//# sourceMappingURL=363.js.map