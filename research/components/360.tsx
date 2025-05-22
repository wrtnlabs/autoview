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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_purchase;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const billingContact = value.organization_billing_email ?? value.email ?? "—";
  const purchase = value.marketplace_purchase;
  const plan = purchase.plan;
  const cycle = purchase.billing_cycle;
  const priceString =
    plan && cycle
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(
          (cycle === "year"
            ? plan.yearly_price_in_cents
            : plan.monthly_price_in_cents) / 100,
        ) + `/${cycle}`
      : "—";
  const freeTrialEnds =
    purchase.on_free_trial && purchase.free_trial_ends_on
      ? new Date(purchase.free_trial_ends_on).toLocaleDateString()
      : null;
  const nextBilling = purchase.next_billing_date
    ? new Date(purchase.next_billing_date).toLocaleDateString()
    : null;
  const pending = value.marketplace_pending_change;
  const pendingPlanName = pending?.plan?.name;
  const pendingEffective = pending?.effective_date
    ? new Date(pending.effective_date).toLocaleDateString()
    : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full">
      {/* Header: purchaser and installation status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LucideReact.User size={20} className="text-gray-500" />
          <span className="text-lg font-semibold text-gray-900">
            {value.login}
          </span>
        </div>
        {purchase.is_installed ? (
          <LucideReact.CheckCircle
            size={20}
            className="text-green-500"
            aria-label="Installed"
          />
        ) : (
          <LucideReact.XCircle
            size={20}
            className="text-red-500"
            aria-label="Not installed"
          />
        )}
      </div>

      {/* Billing contact */}
      <div className="mt-2 flex items-center text-sm text-gray-600 gap-1">
        <LucideReact.Mail size={16} />
        <span>{billingContact}</span>
      </div>

      {/* Plan details */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex items-center gap-2">
          <LucideReact.Tag size={16} className="text-blue-500" />
          <span className="text-md font-medium text-gray-800">
            {plan?.name ?? "Unknown Plan"}
          </span>
        </div>
        {plan?.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {plan.description}
          </p>
        )}
        <div className="mt-2 flex items-center text-sm text-gray-700 gap-1">
          <LucideReact.DollarSign size={16} className="text-gray-400" />
          <span>{priceString}</span>
        </div>
        {freeTrialEnds && (
          <div className="mt-1 flex items-center text-sm text-amber-600 gap-1">
            <LucideReact.Clock size={16} className="text-amber-500" />
            <span>Trial ends on {freeTrialEnds}</span>
          </div>
        )}
        {nextBilling && (
          <div className="mt-1 flex items-center text-sm text-gray-600 gap-1">
            <LucideReact.Calendar size={16} className="text-gray-400" />
            <span>Next billing: {nextBilling}</span>
          </div>
        )}
      </div>

      {/* Pending change notification */}
      {pending && (
        <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
          <div className="flex items-center text-sm text-amber-700 gap-1">
            <LucideReact.Edit2 size={16} className="text-amber-500" />
            <span>
              Pending change to {pendingPlanName ?? "plan"}
              {pendingEffective ? ` on ${pendingEffective}` : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
