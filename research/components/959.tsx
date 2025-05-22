import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
    account: AutoViewInputSubTypes.marketplace_account;
    plan: AutoViewInputSubTypes.marketplace_listing_plan;
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
export type AutoViewInput = AutoViewInputSubTypes.user_marketplace_purchase[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (cents: number): string => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No purchases available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((purchase, index) => {
        const {
          account,
          plan,
          billing_cycle,
          next_billing_date,
          unit_count,
          on_free_trial,
          free_trial_ends_on,
          updated_at,
        } = purchase;

        // Derive a human-readable price label
        let priceLabel: string;
        if (plan.price_model === "FREE") {
          priceLabel = "Free";
        } else if (plan.price_model === "PER_UNIT") {
          priceLabel = `${unit_count ?? "—"} ${plan.unit_name ?? "unit"} @ ${formatPrice(plan.monthly_price_in_cents)}`;
        } else {
          const cycle = billing_cycle.toLowerCase().includes("year")
            ? "yr"
            : "mo";
          const cents =
            cycle === "yr"
              ? plan.yearly_price_in_cents
              : plan.monthly_price_in_cents;
          priceLabel = `${formatPrice(cents)}/${cycle}`;
        }

        return (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            {/* Header: Account + Status */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <LucideReact.User className="text-gray-500" size={20} />
                <span className="font-semibold text-gray-800 truncate">
                  {account.login}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {on_free_trial ? (
                  <>
                    <LucideReact.Clock className="text-amber-500" size={16} />
                    <span className="text-amber-600">Trial</span>
                  </>
                ) : (
                  <>
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                    />
                    <span className="text-green-600">Active</span>
                  </>
                )}
              </div>
            </div>

            {/* Plan Info */}
            <div className="mb-3">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {plan.description}
              </p>
            </div>

            {/* Details List */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <LucideReact.Calendar className="text-gray-400" size={16} />
                <span className="ml-2">Next billing:</span>
                <span className="ml-auto font-medium">
                  {formatDate(next_billing_date)}
                </span>
              </div>

              {plan.price_model === "PER_UNIT" && (
                <div className="flex items-center">
                  <LucideReact.Tag className="text-gray-400" size={16} />
                  <span className="ml-2">Units:</span>
                  <span className="ml-auto font-medium">
                    {unit_count ?? "—"}
                  </span>
                </div>
              )}

              <div className="flex items-center">
                <LucideReact.CreditCard className="text-gray-400" size={16} />
                <span className="ml-2">Price:</span>
                <span className="ml-auto font-medium">{priceLabel}</span>
              </div>

              {updated_at && (
                <div className="flex items-center">
                  <LucideReact.RefreshCw className="text-gray-400" size={16} />
                  <span className="ml-2">Updated:</span>
                  <span className="ml-auto font-medium">
                    {formatDate(updated_at)}
                  </span>
                </div>
              )}

              {on_free_trial && (
                <div className="flex items-center">
                  <LucideReact.Timer className="text-gray-400" size={16} />
                  <span className="ml-2">Trial ends:</span>
                  <span className="ml-auto font-medium">
                    {formatDate(free_trial_ends_on)}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
