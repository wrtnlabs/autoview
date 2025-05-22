import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // Utility to format ISO dates into "MMM DD, YYYY"
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2">No purchases found.</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {value.map((purchase) => {
        const {
          login,
          email,
          organization_billing_email,
          marketplace_purchase: mp,
          marketplace_pending_change: pending,
        } = purchase;
        const plan = mp.plan;
        const billingCycle = mp.billing_cycle || "monthly";
        const priceCents =
          billingCycle === "yearly"
            ? plan?.yearly_price_in_cents
            : plan?.monthly_price_in_cents;
        const formattedPrice =
          plan && plan.price_model === "FREE"
            ? "Free"
            : priceCents != null
              ? `$${(priceCents / 100).toFixed(2)}`
              : "—";
        const unitCount = mp.unit_count;
        const unitName = plan?.unit_name || "unit";
        const totalPrice =
          priceCents != null && unitCount != null
            ? `$${((priceCents / 100) * unitCount).toFixed(2)}`
            : null;

        return (
          <div key={purchase.id} className="p-4 bg-white rounded-lg shadow">
            {/* User / Organization */}
            <div className="flex items-center gap-2">
              <LucideReact.User size={20} className="text-gray-600" />
              <span className="font-semibold text-lg">{login}</span>
            </div>
            {(email || organization_billing_email) && (
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <LucideReact.Mail size={16} />
                <span>{email || organization_billing_email}</span>
              </div>
            )}

            {/* Plan Details */}
            {plan && (
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-800">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {plan.description}
                </p>

                {/* Pricing */}
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  <LucideReact.Tag size={16} className="text-gray-400 mr-1" />
                  <span>
                    {formattedPrice}
                    {plan.price_model !== "FREE" && ` / ${billingCycle}`}
                  </span>
                </div>

                {/* Per-unit details */}
                {plan.price_model === "PER_UNIT" && unitCount != null && (
                  <div className="mt-1 text-sm text-gray-700">
                    <span>
                      Units: {unitCount} {unitName}
                    </span>
                    {totalPrice && (
                      <span className="ml-3">Total: {totalPrice}</span>
                    )}
                  </div>
                )}

                {/* Installation Status */}
                <div className="mt-2 flex items-center text-sm">
                  {mp.is_installed ? (
                    <LucideReact.CheckCircle
                      size={16}
                      className="text-green-500"
                      aria-label="Installed"
                    />
                  ) : (
                    <LucideReact.XCircle
                      size={16}
                      className="text-red-500"
                      aria-label="Not Installed"
                    />
                  )}
                  <span className="ml-1 text-gray-700">
                    {mp.is_installed ? "Installed" : "Not Installed"}
                  </span>
                </div>

                {/* Free Trial */}
                {mp.on_free_trial && mp.free_trial_ends_on && (
                  <div className="mt-1 flex items-center text-sm text-blue-700">
                    <LucideReact.Clock
                      size={16}
                      className="text-blue-500 mr-1"
                    />
                    <span>
                      Free trial ends on {formatDate(mp.free_trial_ends_on)}
                    </span>
                  </div>
                )}

                {/* Next Billing Date */}
                {mp.next_billing_date && (
                  <div className="mt-1 flex items-center text-sm text-gray-700">
                    <LucideReact.Calendar
                      size={16}
                      className="text-gray-400 mr-1"
                    />
                    <span>
                      Next billing: {formatDate(mp.next_billing_date)}
                    </span>
                  </div>
                )}

                {/* Last Updated */}
                {mp.updated_at && (
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <LucideReact.RefreshCw
                      size={16}
                      className="text-gray-400 mr-1"
                    />
                    <span>Last updated: {formatDate(mp.updated_at)}</span>
                  </div>
                )}

                {/* Pending Change */}
                {pending && pending.plan && pending.effective_date && (
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-2">
                    <div className="flex items-center text-sm text-yellow-700">
                      <LucideReact.RefreshCw size={16} className="mr-1" />
                      <span>
                        Scheduled change to{" "}
                        <span className="font-medium">{pending.plan.name}</span>{" "}
                        on {formatDate(pending.effective_date)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
