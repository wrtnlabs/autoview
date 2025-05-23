import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Marketplace Purchase
     *
     * @title Marketplace Purchase
    */
    export interface marketplace_purchase {
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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_purchase[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const totalPurchases = value.length;
  const totalUnits = value.reduce(
    (sum, item) => sum + (item.marketplace_purchase.unit_count ?? 0),
    0,
  );

  // Helper: format ISO date to locale string or fallback
  const formatDate = (iso?: string | null) =>
    iso ? new Date(iso).toLocaleDateString() : "N/A";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      {/* Summary */}
      <div className="flex items-center text-gray-700">
        <LucideReact.ShoppingCart
          size={20}
          className="text-gray-600 mr-2"
          aria-hidden="true"
        />
        <span className="font-semibold text-lg">
          {totalPurchases} Purchase{totalPurchases !== 1 ? "s" : ""}
        </span>
        {totalUnits > 0 && (
          <span className="ml-4 text-sm text-gray-500">
            Total Units: {totalUnits}
          </span>
        )}
      </div>

      {/* Purchase List */}
      <ul className="space-y-4">
        {value.map((purchase) => {
          const {
            id,
            login,
            email,
            organization_billing_email,
            marketplace_purchase: current,
            marketplace_pending_change: pending,
          } = purchase;
          const {
            plan,
            billing_cycle,
            next_billing_date,
            unit_count,
            on_free_trial,
            free_trial_ends_on,
            updated_at,
          } = current;

          return (
            <li
              key={id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header: Plan name and updated date */}
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <LucideReact.Package
                    size={20}
                    className="text-indigo-500"
                    aria-hidden="true"
                  />
                  <h3 className="text-lg font-medium text-gray-800 truncate">
                    {plan?.name ?? "Unnamed Plan"}
                  </h3>
                </div>
                {updated_at && (
                  <div className="flex items-center text-sm text-gray-400">
                    <LucideReact.RefreshCw
                      size={16}
                      className="mr-1"
                      aria-hidden="true"
                    />
                    <span>Updated {formatDate(updated_at)}</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                {billing_cycle && (
                  <div className="flex items-center">
                    <LucideReact.Calendar
                      size={16}
                      className="mr-1"
                      aria-hidden="true"
                    />
                    <span>{billing_cycle}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <LucideReact.Calendar
                    size={16}
                    className="mr-1"
                    aria-hidden="true"
                  />
                  <span>Next: {formatDate(next_billing_date)}</span>
                </div>
                {unit_count != null && (
                  <div className="flex items-center">
                    <LucideReact.Users
                      size={16}
                      className="mr-1"
                      aria-hidden="true"
                    />
                    <span>
                      {unit_count} Unit{unit_count !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                {on_free_trial && free_trial_ends_on && (
                  <div className="flex items-center text-amber-600">
                    <LucideReact.Clock
                      size={16}
                      className="mr-1"
                      aria-hidden="true"
                    />
                    <span>Trial ends {formatDate(free_trial_ends_on)}</span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              {(email || organization_billing_email) && (
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                  {email && (
                    <div className="flex items-center">
                      <LucideReact.Mail
                        size={16}
                        className="mr-1"
                        aria-hidden="true"
                      />
                      <span className="truncate">{email}</span>
                    </div>
                  )}
                  {organization_billing_email && (
                    <div className="flex items-center">
                      <LucideReact.Mail
                        size={16}
                        className="mr-1"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {organization_billing_email}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Pending Change */}
              {pending && (
                <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-100">
                  <div className="flex items-center text-amber-700 text-sm font-medium">
                    <LucideReact.AlertTriangle
                      size={16}
                      className="mr-1"
                      aria-hidden="true"
                    />
                    <span>Pending Change</span>
                  </div>
                  <div className="mt-2 space-y-1 text-sm text-amber-700">
                    {pending.plan && (
                      <div className="flex items-center">
                        <LucideReact.Package
                          size={16}
                          className="mr-1"
                          aria-hidden="true"
                        />
                        <span>{pending.plan.name}</span>
                      </div>
                    )}
                    {pending.unit_count != null && (
                      <div className="flex items-center">
                        <LucideReact.Users
                          size={16}
                          className="mr-1"
                          aria-hidden="true"
                        />
                        <span>
                          {pending.unit_count} Unit
                          {pending.unit_count !== 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                    {pending.effective_date && (
                      <div className="flex items-center">
                        <LucideReact.Calendar
                          size={16}
                          className="mr-1"
                          aria-hidden="true"
                        />
                        <span>
                          Effective {formatDate(pending.effective_date)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
