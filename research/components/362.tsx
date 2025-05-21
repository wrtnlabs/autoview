import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
            plan?: AutoViewInputSubTypes.marketplace_listing_plan;
        } | null;
        marketplace_purchase: {
            billing_cycle?: string;
            next_billing_date?: string | null;
            is_installed?: boolean;
            unit_count?: (number & tags.Type<"int32">) | null;
            on_free_trial?: boolean;
            free_trial_ends_on?: string | null;
            updated_at?: string;
            plan?: AutoViewInputSubTypes.marketplace_listing_plan;
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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_purchase[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (
    plan: AutoViewInputSubTypes.marketplace_listing_plan | undefined,
    cycle?: string,
  ): string => {
    if (!plan) return "—";
    switch (plan.price_model) {
      case "FREE":
        return "Free";
      case "FLAT_RATE":
        if (cycle === "monthly")
          return `$${(plan.monthly_price_in_cents / 100).toFixed(2)}/mo`;
        if (cycle === "yearly")
          return `$${(plan.yearly_price_in_cents / 100).toFixed(2)}/yr`;
        return `$${(plan.monthly_price_in_cents / 100).toFixed(2)}/mo`;
      case "PER_UNIT":
        const unitName = plan.unit_name || "unit";
        return `$${(plan.monthly_price_in_cents / 100).toFixed(2)}/${unitName}`;
      default:
        return "—";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((purchase) => {
        const p = purchase.marketplace_purchase;
        const pending = purchase.marketplace_pending_change;

        return (
          <div
            key={purchase.id}
            className="bg-white p-4 rounded-lg shadow space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="truncate">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {purchase.login}
                </h3>
                {purchase.organization_billing_email && (
                  <p className="text-sm text-gray-500 truncate">
                    {purchase.organization_billing_email}
                  </p>
                )}
                {purchase.email && (
                  <p className="text-sm text-gray-500 truncate">
                    {purchase.email}
                  </p>
                )}
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  p.is_installed
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {p.is_installed ? "Installed" : "Uninstalled"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
              <div className="truncate">
                <p className="font-medium">Plan</p>
                <p className="truncate">{p.plan?.name || "—"}</p>
              </div>
              <div>
                <p className="font-medium">Price</p>
                <p>{formatPrice(p.plan, p.billing_cycle)}</p>
              </div>
              <div>
                <p className="font-medium">Billing Cycle</p>
                <p>{p.billing_cycle || "—"}</p>
              </div>
              <div>
                <p className="font-medium">Next Billing</p>
                <p>
                  {p.next_billing_date
                    ? formatDate(p.next_billing_date)
                    : "—"}
                </p>
              </div>
              {p.on_free_trial && p.free_trial_ends_on && (
                <div className="col-span-2">
                  <p className="font-medium">Free Trial Ends</p>
                  <p>{formatDate(p.free_trial_ends_on)}</p>
                </div>
              )}
              {p.unit_count != null && p.plan?.price_model === "PER_UNIT" && (
                <div>
                  <p className="font-medium">Units</p>
                  <p>{p.unit_count}</p>
                </div>
              )}
            </div>

            {pending && (
              <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-700">
                <p className="font-medium">Pending Change</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                  {pending.plan && (
                    <>
                      <p className="font-medium">New Plan</p>
                      <p className="truncate">{pending.plan.name}</p>
                    </>
                  )}
                  {pending.effective_date && (
                    <>
                      <p className="font-medium">Effective Date</p>
                      <p>{formatDate(pending.effective_date)}</p>
                    </>
                  )}
                  {pending.unit_count != null && (
                    <>
                      <p className="font-medium">Units</p>
                      <p>{pending.unit_count}</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
