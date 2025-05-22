import * as LucideReact from "lucide-react";
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
  const purchases = value;

  // Format ISO date strings into "MMM D, YYYY"
  const formatDate = (dateStr?: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A";

  // Convert cents to a dollar string, e.g., 4999 -> "$49.99"
  const formatPrice = (cents: number): string =>
    `$${(cents / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (!purchases || purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No purchase data available.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {purchases.map((purchase) => {
        const {
          account,
          plan,
          billing_cycle,
          next_billing_date,
          on_free_trial,
          free_trial_ends_on,
          updated_at,
          unit_count,
        } = purchase;
        const priceCents =
          billing_cycle === "yearly"
            ? plan.yearly_price_in_cents
            : plan.monthly_price_in_cents;
        const priceText =
          plan.price_model === "FREE" ? "Free" : formatPrice(priceCents);
        const nextBilling = formatDate(next_billing_date);
        const freeTrialEnds = formatDate(free_trial_ends_on);
        const updatedAt = formatDate(updated_at);

        return (
          <div
            key={`${account.id}-${plan.id}`}
            className="bg-white p-4 rounded-lg shadow flex flex-col"
          >
            <div className="flex items-center mb-2">
              <LucideReact.User size={20} className="text-gray-500 mr-2" />
              <span className="font-medium text-gray-800">{account.login}</span>
            </div>
            {account.email && (
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <LucideReact.Mail size={16} className="mr-1" />
                <span>{account.email}</span>
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <p className="mt-1 text-gray-700 text-sm line-clamp-2 overflow-hidden">
              {plan.description}
            </p>
            <div className="mt-4 flex flex-col space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <LucideReact.DollarSign
                  size={16}
                  className="text-gray-400 mr-1"
                />
                <span>
                  {priceText} / {billing_cycle}
                </span>
              </div>
              <div className="flex items-center">
                <LucideReact.Calendar
                  size={16}
                  className="text-gray-400 mr-1"
                />
                <span>Next billing: {nextBilling}</span>
              </div>
              {plan.price_model === "PER_UNIT" && unit_count != null && (
                <div className="flex items-center">
                  <span>
                    {unit_count} {plan.unit_name ?? "Units"}
                  </span>
                </div>
              )}
              {on_free_trial && (
                <div className="flex items-center text-green-600">
                  <LucideReact.Clock size={16} className="mr-1" />
                  <span>Free trial ends {freeTrialEnds}</span>
                </div>
              )}
              <div className="flex items-center">
                <LucideReact.RefreshCw
                  size={16}
                  className="text-gray-400 mr-1"
                />
                <span>Updated: {updatedAt}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
