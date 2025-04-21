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
  // If there's no data, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No purchases found\n\nYou currently have no marketplace purchases."
    };
  }

  // Helper to format nullable dates
  const fmt = (iso: string | null): string =>
    iso ? new Date(iso).toLocaleDateString() : "N/A";

  // Build a ListItem for each purchase
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((purchase) => {
    // Choose a chip color based on the pricing model
    let planColor: IAutoView.IAutoViewChipProps["color"];
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
    const chips: IAutoView.IAutoViewChipProps[] = [
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
      description: `${purchase.plan.bullets.length} features • Next billing: ${fmt(
        purchase.next_billing_date
      )}`,
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
