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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr?: string | null): string => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (cents: number): string =>
    (cents / 100).toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
    });

  const purchases = value || [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No purchases found</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {purchases.map((purchase, idx) => {
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

        const cycleLabel =
          billing_cycle.charAt(0).toUpperCase() + billing_cycle.slice(1);
        const priceCents =
          billing_cycle === "yearly"
            ? plan.yearly_price_in_cents
            : plan.monthly_price_in_cents;
        const priceLabel = `${formatPrice(priceCents)}/${
          billing_cycle === "yearly" ? "yr" : "mo"
        }`;

        return (
          <div
            key={idx}
            className="flex flex-col justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LucideReact.User size={20} className="text-gray-500" />
                  <span className="font-medium text-gray-800">
                    {account.login}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{cycleLabel}</span>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </span>
                <span className="text-sm text-gray-600">{priceLabel}</span>
              </div>

              {on_free_trial ? (
                <div className="flex items-center space-x-1">
                  <LucideReact.Clock
                    size={16}
                    className="text-amber-500"
                  />
                  <span className="text-sm text-amber-700">
                    Trial ends {formatDate(free_trial_ends_on)}
                  </span>
                </div>
              ) : next_billing_date ? (
                <div className="flex items-center space-x-1">
                  <LucideReact.Calendar
                    size={16}
                    className="text-gray-500"
                  />
                  <span className="text-sm text-gray-700">
                    Next bill {formatDate(next_billing_date)}
                  </span>
                </div>
              ) : null}

              {plan.price_model === "PER_UNIT" && unit_count != null && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Users
                    size={16}
                    className="text-gray-500"
                  />
                  <span className="text-sm text-gray-700">
                    {unit_count} {plan.unit_name || "units"}
                  </span>
                </div>
              )}

              {account.email && (
                <div className="flex items-center space-x-1">
                  <LucideReact.Mail size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {account.email}
                  </span>
                </div>
              )}

              {plan.bullets && plan.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-600">
                  {plan.bullets.slice(0, 3).map((b, i) => (
                    <li key={i} className="truncate">
                      {b}
                    </li>
                  ))}
                  {plan.bullets.length > 3 && (
                    <li className="text-gray-500">
                      +{plan.bullets.length - 3} more
                    </li>
                  )}
                </ul>
              )}
            </div>

            {updated_at && (
              <div className="mt-4 text-xs text-gray-400">
                Updated {formatDate(updated_at)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
