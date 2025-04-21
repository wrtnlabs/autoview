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
type IAutoViewTransformerInputType = Schema.marketplace_purchase;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Destructure nested purchase and plan for easier access
  const purchase = input.marketplace_purchase;
  const plan = purchase.plan!; // plan is required by schema

  // Determine installation status and color coding
  const isInstalled = purchase.is_installed === true;
  const statusLabel = isInstalled ? "Installed" : "Not Installed";
  const statusColor = isInstalled ? "success" : "error";

  // Build a list of key/value pairs to display in a DataList
  const details: IAutoView.IAutoViewDataListItemProps[] = [];

  // Helper to push a DataListItem with given label and value strings
  const pushDetail = (label: string, value: string) => {
    details.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: label,
          variant: "body2",
          color: "secondary",
        },
      ],
      value: [
        {
          type: "Text",
          content: value,
          variant: "body1",
        },
      ],
    });
  };

  // Core purchase details
  pushDetail("User", input.login);
  pushDetail("Purchase ID", input.id.toString());
  if (input.email) {
    pushDetail("Email", input.email);
  }
  if (input.organization_billing_email) {
    pushDetail("Org. Billing Email", input.organization_billing_email);
  }
  if (purchase.billing_cycle) {
    pushDetail("Billing Cycle", purchase.billing_cycle);
  }
  if (purchase.unit_count != null) {
    pushDetail("Units", purchase.unit_count.toString());
  }
  // Free trial info
  if (purchase.on_free_trial) {
    pushDetail("On Free Trial", "Yes");
    if (purchase.free_trial_ends_on) {
      pushDetail("Trial Ends On", purchase.free_trial_ends_on);
    }
  }
  // Next billing and updated timestamps
  if (purchase.next_billing_date) {
    pushDetail("Next Billing Date", purchase.next_billing_date);
  }
  if (purchase.updated_at) {
    pushDetail("Last Updated", purchase.updated_at);
  }
  // Show pending change if any
  if (input.marketplace_pending_change) {
    const pending = input.marketplace_pending_change;
    if (pending.effective_date) {
      pushDetail("Pending Effective", pending.effective_date);
    }
    if (pending.unit_count != null) {
      pushDetail("Pending Units", pending.unit_count.toString());
    }
  }
  // Plan financial details
  pushDetail(
    "Monthly Price",
    `$${(plan.monthly_price_in_cents / 100).toFixed(2)}`,
  );
  pushDetail(
    "Yearly Price",
    `$${(plan.yearly_price_in_cents / 100).toFixed(2)}`,
  );

  // Assemble the DataList component
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: details,
  };

  // Card header with plan title, brief subtitle, icon and status chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: plan.name,
    description: `Purchase #${input.id}`,
    startElement: {
      type: "Icon",
      id: "file-invoice-dollar", // FontAwesome icon
      color: "blue",
      size: 24,
    },
    endElement: {
      type: "Chip",
      label: statusLabel,
      color: statusColor,
      variant: "filled",
      size: "small",
    },
  };

  // Card content: plan description (markdown) + details list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "Markdown",
        content: plan.description,
      },
      detailsList,
    ],
  };

  // Card footer: action button to manage subscription
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "Manage Subscription",
      variant: "contained",
      color: "primary",
      size: "medium",
      href: input.url,
    },
  };

  // Return a vertical card encapsulating all elements
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
