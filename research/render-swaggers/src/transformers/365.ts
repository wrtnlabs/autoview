import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Marketplace Purchase
     *
     * @title Marketplace Purchase
    */
    export type marketplace_purchase = {
        url: string;
        type: string;
        id: number & tags.Type<"int32">;
        login: string;
        organization_billing_email?: string;
        email?: string | null;
        marketplace_pending_change?: {
            is_installed?: boolean;
            effective_date?: string;
            unit_count?: (number & tags.Type<"int32">) | null;
            id?: number & tags.Type<"int32">;
            plan?: any;
        } | null;
        marketplace_purchase: {
            billing_cycle?: string;
            next_billing_date?: string | null;
            is_installed?: boolean;
            unit_count?: (number & tags.Type<"int32">) | null;
            on_free_trial?: boolean;
            free_trial_ends_on?: string | null;
            updated_at?: string;
            plan?: Schema.marketplace_listing_plan;
        };
    };
    /**
     * Marketplace Listing Plan
     *
     * @title Marketplace Listing Plan
    */
    export type marketplace_listing_plan = {
        url: string & tags.Format<"uri">;
        accounts_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        number: number & tags.Type<"int32">;
        name: string;
        description: string;
        monthly_price_in_cents: number & tags.Type<"int32">;
        yearly_price_in_cents: number & tags.Type<"int32">;
        price_model: "FREE" | "FLAT_RATE" | "PER_UNIT";
        has_free_trial: boolean;
        unit_name: string | null;
        state: string;
        bullets: string[];
    };
}
type IAutoViewTransformerInputType = Schema.marketplace_purchase[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a simple text message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No purchases available",
        };
    }

    // Helper to format ISO dates to a more friendly format
    const formatDate = (iso?: string | null): string | undefined => {
        if (!iso) return undefined;
        const d = new Date(iso);
        // Fallback to original string if parsing fails
        return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
    };

    // Build a VerticalCard for each purchase
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((purchase) => {
        const { login, email, marketplace_purchase } = purchase;
        const plan = marketplace_purchase.plan;
        const cycle = marketplace_purchase.billing_cycle;
        const nextBilling = formatDate(marketplace_purchase.next_billing_date);
        const unitCount = marketplace_purchase.unit_count;
        const onTrial = marketplace_purchase.on_free_trial;
        const trialEnds = formatDate(marketplace_purchase.free_trial_ends_on);

        // Build an array of Chips summarizing key metadata
        const chips: IAutoView.IAutoViewChipProps[] = [];

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
