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
  // If there's no data, show a friendly markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No marketplace purchases found\n\nYou currently have no active marketplace purchases."
    };
  }

  // Map each purchase to a ListItem with visual components
  const items: IAutoView.IAutoViewListItemProps[] = input.map((purchase) => {
    const info = purchase.marketplace_purchase;
    const plan = info.plan;
    const chips: IAutoView.IAutoViewChipProps[] = [];

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
      if (monthly && info.billing_cycle?.toLowerCase().includes("month")) {
        chips.push({
          type: "Chip",
          label: `$${monthly}/mo`,
          variant: "outlined",
          color: "info",
          size: "small",
        });
      } else if (yearly && info.billing_cycle?.toLowerCase().includes("year")) {
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
    if (info.unit_count != null && plan?.unit_name) {
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
      description: plan?.name ?? "Unknown plan",
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
