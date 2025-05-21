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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_purchase;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const purchase = value.marketplace_purchase;
  const plan = purchase.plan;
  const planName = plan?.name ?? "Unknown Plan";
  const description = plan?.description ?? "";
  const monthlyPrice =
    plan?.monthly_price_in_cents != null
      ? (plan.monthly_price_in_cents / 100).toFixed(2)
      : null;
  const yearlyPrice =
    plan?.yearly_price_in_cents != null
      ? (plan.yearly_price_in_cents / 100).toFixed(2)
      : null;
  const priceModel = plan?.price_model;
  const unitName = plan?.unit_name;
  const unitCount = purchase.unit_count;
  const billingCycle = purchase.billing_cycle;
  const isInstalled = purchase.is_installed;
  const onFreeTrial = purchase.on_free_trial;
  const freeTrialEndsOn = purchase.free_trial_ends_on;
  const nextBillingDate = purchase.next_billing_date;
  const updatedAt = purchase.updated_at;
  const pending = value.marketplace_pending_change;

  // Date formatting helper
  const formatDate = (dateString?: string | null): string =>
    dateString
      ? new Date(dateString).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{planName}</h2>
        {billingCycle && (
          <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
            {billingCycle.charAt(0).toUpperCase() +
              billingCycle.slice(1).toLowerCase()}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{description}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
        {monthlyPrice && (
          <div>
            <span className="font-medium">Monthly Price:</span> ${monthlyPrice}
          </div>
        )}
        {yearlyPrice && (
          <div>
            <span className="font-medium">Yearly Price:</span> ${yearlyPrice}
          </div>
        )}
        {priceModel === "PER_UNIT" && unitCount != null && unitName && (
          <div>
            <span className="font-medium">Capacity:</span> {unitCount} {unitName}
          </div>
        )}
        <div>
          <span className="font-medium">Status:</span>{" "}
          {onFreeTrial ? (
            <span className="px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-800">
              Free trial until {formatDate(freeTrialEndsOn)}
            </span>
          ) : isInstalled ? (
            <span className="px-2 py-0.5 rounded text-xs bg-green-100 text-green-800">
              Active
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-xs bg-red-100 text-red-800">
              Inactive
            </span>
          )}
        </div>
        {nextBillingDate && (
          <div>
            <span className="font-medium">Next Billing:</span>{" "}
            {formatDate(nextBillingDate)}
          </div>
        )}
        {updatedAt && (
          <div>
            <span className="font-medium">Last Updated:</span>{" "}
            {formatDate(updatedAt)}
          </div>
        )}
        {pending && (
          <div className="sm:col-span-2">
            <span className="font-medium">Pending Change Effective:</span>{" "}
            {formatDate(pending.effective_date)}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
        <div>
          <span className="font-medium">Purchased by:</span> {value.login}
        </div>
        {value.email && (
          <div>
            <span className="font-medium">Email:</span> {value.email}
          </div>
        )}
      </div>
    </div>
  );
}
