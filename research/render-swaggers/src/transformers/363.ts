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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure key pieces from input
  const {
    login,
    url,
    marketplace_purchase: purchaseData,
    marketplace_pending_change: pending,
  } = input;

  // Helper for creating a Text component
  const makeText = (
    content: string,
    variant: IAutoView.IAutoViewTextProps['variant'] = 'body2'
  ): IAutoView.IAutoViewTextProps => ({
    type: 'Text',
    content,
    variant,
  });

  // Build a list of data items to display
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Helper to push a label/value pair into the DataList
  const addItem = (label: string, value: string) => {
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
  if (plan?.state) {
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
  const dataList: IAutoView.IAutoViewDataListProps = {
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
        title: plan?.name ?? 'Marketplace Plan',
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
          ...(plan?.description
            ? [
                {
                  type: 'Markdown',
                  content: plan.description,
                } as IAutoView.IAutoViewMarkdownProps,
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
