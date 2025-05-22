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
  const totalPurchases = value.length;
  const installedCount = value.filter(item => item.marketplace_purchase.is_installed).length;
  const trialCount = value.filter(item => item.marketplace_purchase.on_free_trial).length;
  const totalUnits = value.reduce(
    (sum, item) => sum + (item.marketplace_purchase.unit_count ?? 0),
    0,
  );

  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const formatPrice = (cents?: number | null): string =>
    cents != null ? `$${(cents / 100).toFixed(2)}` : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Marketplace Purchases
        </h2>
        <div className="flex flex-wrap space-x-4 text-sm text-gray-600 mt-2 sm:mt-0">
          <span>Total: {totalPurchases}</span>
          <span>Installed: {installedCount}</span>
          <span>On Trial: {trialCount}</span>
          <span>Units: {totalUnits}</span>
        </div>
      </div>

      {totalPurchases === 0 ? (
        <div className="text-center text-gray-500">
          No purchases available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {value.map(item => {
            const purchase = item.marketplace_purchase;
            const plan = purchase.plan;

            return (
              <div
                key={item.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    {plan?.name || "Unnamed Plan"}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${
                      purchase.is_installed
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {purchase.is_installed ? "Installed" : "Not Installed"}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  User: {item.login}
                  {item.email ? ` (${item.email})` : ""}
                </div>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {plan?.description}
                </p>

                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  <div>
                    <span className="font-semibold">Billing:</span>{" "}
                    {purchase.billing_cycle ?? "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Next Billing:</span>{" "}
                    {formatDate(purchase.next_billing_date)}
                  </div>
                  {purchase.on_free_trial && (
                    <div>
                      <span className="font-semibold">Free Trial Ends:</span>{" "}
                      {formatDate(purchase.free_trial_ends_on)}
                    </div>
                  )}
                  {purchase.unit_count != null && plan?.unit_name && (
                    <div>
                      <span className="font-semibold">Units:</span>{" "}
                      {purchase.unit_count} {plan.unit_name}
                    </div>
                  )}
                  {plan && (
                    <div>
                      <span className="font-semibold">Price:</span>{" "}
                      {formatPrice(plan.monthly_price_in_cents)}/mo &nbsp;|&nbsp;{" "}
                      {formatPrice(plan.yearly_price_in_cents)}/yr
                    </div>
                  )}
                </div>

                {plan?.bullets && plan.bullets.length > 0 && (
                  <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1 max-h-24 overflow-auto">
                    {plan.bullets.slice(0, 3).map((b, idx) => (
                      <li key={idx} className="truncate">
                        {b}
                      </li>
                    ))}
                    {plan.bullets.length > 3 && (
                      <li className="italic text-gray-500">
                        +{plan.bullets.length - 3} more
                      </li>
                    )}
                  </ul>
                )}

                <div className="mt-3 text-xs text-gray-500">
                  Last updated: {formatDate(purchase.updated_at)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
