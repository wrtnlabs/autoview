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
  const formatDate = (dateStr: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const formatMoney = (cents: number): string =>
    (cents / 100).toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Header with total count */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Subscriptions ({value.length})
        </h2>
      </div>

      {/* Grid of subscription cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {value.map((purchase, idx) => {
          const {
            billing_cycle,
            next_billing_date,
            unit_count,
            on_free_trial,
            free_trial_ends_on,
            updated_at,
            account,
            plan,
          } = purchase;

          // Determine display name and email
          const userName = account.login;
          const userEmail =
            account.email ?? account.organization_billing_email ?? "—";

          // Price display logic
          let priceLabel: string;
          if (plan.price_model === "FREE") {
            priceLabel = "Free";
          } else {
            const cents =
              billing_cycle === "yearly"
                ? plan.yearly_price_in_cents
                : plan.monthly_price_in_cents;
            const cycleAbbrev = billing_cycle === "yearly" ? "yr" : "mo";
            if (plan.price_model === "PER_UNIT" && unit_count != null) {
              priceLabel = `${unit_count} × ${formatMoney(
                cents
              )}/${plan.unit_name}`;
            } else {
              priceLabel = `${formatMoney(cents)}/${cycleAbbrev}`;
            }
          }

          // Status badge & date info
          const statusLabel = on_free_trial
            ? `Trial ends ${formatDate(free_trial_ends_on)}`
            : `Next billing ${formatDate(next_billing_date)}`;

          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-5 flex flex-col justify-between"
            >
              {/* Plan header */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {plan.name}
                </h3>
                <span className="inline-block mt-1 text-sm font-medium text-indigo-600">
                  {priceLabel}
                </span>
              </div>

              {/* User info */}
              <div className="mt-4 text-sm text-gray-700">
                <p className="font-medium text-gray-800 truncate">{userName}</p>
                <p className="truncate">{userEmail}</p>
              </div>

              {/* Plan description */}
              <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                {plan.description}
              </p>

              {/* Features count */}
              <p className="mt-2 text-xs text-gray-500">
                {plan.bullets.length} feature
                {plan.bullets.length !== 1 ? "s" : ""} included
              </p>

              {/* Status and updated info */}
              <div className="mt-4 flex flex-col space-y-1">
                <span className="inline-block text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded-full">
                  {statusLabel}
                </span>
                <span className="text-xs text-gray-400">
                  Updated {formatDate(updated_at)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
