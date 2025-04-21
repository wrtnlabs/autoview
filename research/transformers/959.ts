import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * User Marketplace Purchase
     *
     * @title User Marketplace Purchase
    */
    export type user_marketplace_purchase = {
        billing_cycle: string;
        next_billing_date: (string & tags.Format<"date-time">) | null;
        unit_count: (number & tags.Type<"int32">) | null;
        on_free_trial: boolean;
        free_trial_ends_on: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        account: Schema.marketplace_account;
        plan: Schema.marketplace_listing_plan;
    };
    /**
     * @title Marketplace Account
    */
    export type marketplace_account = {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        type: string;
        node_id?: string;
        login: string;
        email?: (string & tags.Format<"email">) | null;
        organization_billing_email?: (string & tags.Format<"email">) | null;
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
type IAutoViewTransformerInputType = Schema.user_marketplace_purchase[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No purchases found.\n\nYou have no marketplace purchases at this time."
    };
  }

  // Map each purchase into a ListItem for display
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(purchase => {
    const { plan, billing_cycle, next_billing_date, on_free_trial, free_trial_ends_on } = purchase;

    // Choose an icon based on the pricing model
    let iconId: string;
    let iconColor: IAutoView.IAutoViewIconProps["color"];
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

    const startIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: iconId,
      size: 24,
      color: iconColor
    };

    // Helper to format ISO date strings into user-friendly date
    const formatDate = (iso: string): string => {
      try {
        return new Date(iso).toLocaleDateString();
      } catch {
        return iso;
      }
    };

    // Build a set of chips to highlight key fields
    const chips: IAutoView.IAutoViewChipProps[] = [];

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
