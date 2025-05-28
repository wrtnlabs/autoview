import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * User Marketplace Purchase
     *
     * @title User Marketplace Purchase
    */
    export interface user_marketplace_purchase {
        billing_cycle: string;
        next_billing_date: (string & tags.Format<"date-time">) | null;
        unit_count: (number & tags.Type<"int32">) | null;
        on_free_trial: boolean;
        free_trial_ends_on: (string & tags.Format<"date-time">) | null;
        updated_at: (string & tags.Format<"date-time">) | null;
        account: AutoViewInputSubTypes.marketplace_account;
        plan: AutoViewInputSubTypes.marketplace_listing_plan;
    }
    /**
     * @title Marketplace Account
    */
    export interface marketplace_account {
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        type: string;
        node_id?: string;
        login: string;
        email?: (string & tags.Format<"email">) | null;
        organization_billing_email?: (string & tags.Format<"email">) | null;
    }
    /**
     * Marketplace Listing Plan
     *
     * @title Marketplace Listing Plan
    */
    export interface marketplace_listing_plan {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.user_marketplace_purchase[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const purchases = value;

  // Format a date string into "MMM D, YYYY"
  const formatDate = (dateString: string | null | undefined): string =>
    dateString
      ? new Date(dateString).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  // Empty state
  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No purchases found</p>
      </div>
    );
  }

  // Render list of user marketplace purchases
  return (
    <div className="space-y-4">
      {purchases.map((purchase, idx) => {
        const plan = purchase.plan;

        // Derive a human-friendly price label
        const priceLabel =
          plan.price_model === "FREE"
            ? "Free"
            : plan.price_model === "FLAT_RATE"
            ? `$${(plan.monthly_price_in_cents / 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} / ${purchase.billing_cycle}`
            : `$${(plan.monthly_price_in_cents / 100).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} per ${plan.unit_name ?? "unit"}`;

        // Show up to three feature bullets, with an indicator if there are more
        const features = plan.bullets.slice(0, 3);

        return (
          <div key={idx} className="p-4 bg-white rounded-lg shadow">
            {/* Account header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LucideReact.User size={20} className="text-gray-500" />
                <span className="font-semibold text-gray-800">
                  {purchase.account.login}
                </span>
              </div>
              {purchase.on_free_trial && purchase.free_trial_ends_on && (
                <div className="flex items-center gap-1 text-amber-600 text-sm">
                  <LucideReact.Clock size={16} />
                  <span>Trial until {formatDate(purchase.free_trial_ends_on)}</span>
                </div>
              )}
            </div>

            {/* Plan name and price */}
            <div className="mt-2">
              <div className="flex items-center gap-1">
                <LucideReact.Tag size={16} className="text-blue-500" />
                <span className="text-gray-800 font-medium">{plan.name}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-gray-700">
                <LucideReact.DollarSign size={16} className="text-gray-500" />
                <span>{priceLabel}</span>
              </div>
            </div>

            {/* Plan description */}
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">
              {plan.description}
            </p>

            {/* Feature bullets */}
            {features.length > 0 && (
              <ul className="mt-2 list-disc list-inside text-gray-600 text-sm space-y-1">
                {features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
                {plan.bullets.length > features.length && <li>...and more</li>}
              </ul>
            )}

            {/* Metadata: next billing, updated date, unit count */}
            <div className="mt-4 flex flex-wrap items-center text-gray-600 text-sm gap-4">
              {purchase.next_billing_date && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-500" />
                  <span>Next bill: {formatDate(purchase.next_billing_date)}</span>
                </div>
              )}
              {purchase.updated_at && (
                <div className="flex items-center gap-1">
                  <LucideReact.RefreshCw size={16} className="text-gray-500" />
                  <span>Updated: {formatDate(purchase.updated_at)}</span>
                </div>
              )}
              {plan.unit_name && purchase.unit_count !== null && (
                <div className="flex items-center gap-1">
                  <LucideReact.Box size={16} className="text-gray-500" />
                  <span>
                    {purchase.unit_count} {plan.unit_name}
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
