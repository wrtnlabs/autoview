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
  const purchaser = value.organization_billing_email || value.email || value.login;
  const purchase = value.marketplace_purchase;
  const plan = purchase.plan;
  const billingCycle = purchase.billing_cycle || "N/A";
  const isInstalled = purchase.is_installed ?? false;
  const onTrial = purchase.on_free_trial ?? false;
  const unitCount = purchase.unit_count;
  const nextBillingDate = purchase.next_billing_date;
  const freeTrialEnds = purchase.free_trial_ends_on;
  const updatedAt = purchase.updated_at;

  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const formatCurrency = (cents: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  const priceDisplay = plan
    ? plan.price_model === "FREE"
      ? "Free"
      : billingCycle.toLowerCase().includes("year")
      ? `${formatCurrency(plan.yearly_price_in_cents)}/yr`
      : billingCycle.toLowerCase().includes("month")
      ? `${formatCurrency(plan.monthly_price_in_cents)}/mo`
      : formatCurrency(plan.monthly_price_in_cents)
    : "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {plan?.name || "Marketplace Purchase"}
        </h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            isInstalled
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {isInstalled ? "Installed" : "Not Installed"}
        </span>
      </div>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">User:</span> {purchaser}
        </p>
        <p>
          <span className="font-medium">Billing Cycle:</span> {billingCycle}
        </p>
        <p>
          <span className="font-medium">Price:</span> {priceDisplay}
        </p>
        {unitCount != null && plan?.unit_name && (
          <p>
            <span className="font-medium">Units:</span> {unitCount}{" "}
            {plan.unit_name}
          </p>
        )}
        {onTrial && freeTrialEnds && (
          <p>
            <span className="font-medium">On Trial Until:</span>{" "}
            {formatDate(freeTrialEnds)}
          </p>
        )}
        {!onTrial && nextBillingDate && (
          <p>
            <span className="font-medium">Next Billing:</span>{" "}
            {formatDate(nextBillingDate)}
          </p>
        )}
        {updatedAt && (
          <p>
            <span className="font-medium">Last Updated:</span>{" "}
            {formatDate(updatedAt)}
          </p>
        )}
      </div>

      {plan?.description && (
        <p className="mt-4 text-gray-700 text-sm line-clamp-2">
          {plan.description}
        </p>
      )}

      {plan?.bullets && plan.bullets.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-gray-600 text-sm space-y-1">
          {plan.bullets.slice(0, 3).map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      )}

      {value.marketplace_pending_change && (
        <div className="mt-5 p-3 bg-yellow-50 border-l-4 border-yellow-300 rounded">
          <p className="text-yellow-800 text-sm font-medium">
            Pending Change
          </p>
          {value.marketplace_pending_change.effective_date && (
            <p className="text-yellow-700 text-sm">
              <span className="font-medium">Effective:</span>{" "}
              {formatDate(value.marketplace_pending_change.effective_date)}
            </p>
          )}
          {value.marketplace_pending_change.unit_count != null &&
            plan?.unit_name && (
              <p className="text-yellow-700 text-sm">
                <span className="font-medium">Units:</span>{" "}
                {value.marketplace_pending_change.unit_count}{" "}
                {plan.unit_name}
              </p>
            )}
          {typeof value.marketplace_pending_change.is_installed ===
            "boolean" && (
            <p className="text-yellow-700 text-sm">
              <span className="font-medium">Installed:</span>{" "}
              {value.marketplace_pending_change.is_installed
                ? "Yes"
                : "No"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
