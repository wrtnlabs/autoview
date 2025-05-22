import { tags } from "typia";
import React from "react";
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
  const totalSubscriptions = value.length;
  const trialCount = value.filter((sub) => sub.on_free_trial).length;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="text-gray-700 text-base sm:text-lg">
        You have{" "}
        <span className="font-medium">{totalSubscriptions}</span>{" "}
        {totalSubscriptions === 1 ? "subscription" : "subscriptions"}
        {trialCount > 0 && (
          <>
            ,{" "}
            <span className="font-medium text-green-600">
              {trialCount} on trial
            </span>
          </>
        )}
        .
      </div>

      {/* Subscription cards */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {value.map((sub, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-indigo-600 font-semibold truncate">
                {sub.plan.name}
              </h3>
              {sub.on_free_trial && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Free Trial
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {sub.plan.description}
            </p>

            {/* Key details */}
            <div className="flex flex-wrap text-sm text-gray-700 mb-3 space-x-4">
              <div>
                <span className="font-medium">Account:</span>{" "}
                {sub.account.login}
              </div>
              <div>
                <span className="font-medium">Cycle:</span>{" "}
                {sub.billing_cycle.charAt(0).toUpperCase() +
                  sub.billing_cycle.slice(1)}
              </div>
              {sub.unit_count != null && sub.plan.price_model === "PER_UNIT" && (
                <div>
                  <span className="font-medium">Usage:</span> {sub.unit_count}{" "}
                  {sub.plan.unit_name}
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="flex flex-wrap text-sm text-gray-700 mb-3 space-x-4">
              {sub.plan.price_model === "FREE" ? (
                <div className="font-medium text-green-600">Free Plan</div>
              ) : (
                <>
                  <div>
                    <span className="font-medium">Monthly:</span>{" "}
                    ${(sub.plan.monthly_price_in_cents / 100).toFixed(2)}
                  </div>
                  <div>
                    <span className="font-medium">Yearly:</span>{" "}
                    ${(sub.plan.yearly_price_in_cents / 100).toFixed(2)}
                  </div>
                </>
              )}
            </div>

            {/* Features */}
            {sub.plan.bullets.length > 0 && (
              <ul className="list-disc pl-5 mb-3 text-gray-600 text-sm line-clamp-3">
                {sub.plan.bullets.slice(0, 3).map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            )}

            {/* Footer dates */}
            <div className="mt-auto text-gray-500 text-xs space-y-1">
              {sub.next_billing_date && (
                <div>Next Billing: {formatDate(sub.next_billing_date)}</div>
              )}
              {sub.on_free_trial && sub.free_trial_ends_on && (
                <div>Trial Ends: {formatDate(sub.free_trial_ends_on)}</div>
              )}
              {sub.updated_at && (
                <div>Last Updated: {formatDate(sub.updated_at)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
