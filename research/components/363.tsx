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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_purchase;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr?: string | null): string =>
    dateStr ? new Date(dateStr).toLocaleDateString() : '-';
  const formatCurrency = (cents: number): string =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  const purchase = value.marketplace_purchase;
  const plan = purchase.plan!;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: Plan Name and Installation Status */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
        {purchase.is_installed ? (
          <div className="flex items-center text-green-600 text-sm sm:text-base">
            <LucideReact.CheckCircle className="mr-1" size={16} /> Installed
          </div>
        ) : (
          <div className="flex items-center text-red-600 text-sm sm:text-base">
            <LucideReact.XCircle className="mr-1" size={16} /> Not Installed
          </div>
        )}
      </div>

      {/* User & Billing Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <LucideReact.User className="mr-2" size={16} /> <span>{value.login}</span>
          </div>
          {value.email && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Mail className="mr-2" size={16} /> <span>{value.email}</span>
            </div>
          )}
          {value.organization_billing_email && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Mail className="mr-2" size={16} /> <span>{value.organization_billing_email}</span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          {purchase.billing_cycle && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Calendar className="mr-2" size={16} /> <span>Billing: {purchase.billing_cycle}</span>
            </div>
          )}
          {purchase.next_billing_date && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Clock className="mr-2" size={16} /> <span>Next Billing: {formatDate(purchase.next_billing_date)}</span>
            </div>
          )}
          {purchase.on_free_trial && purchase.free_trial_ends_on && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Clock className="mr-2" size={16} /> <span>Free Trial Ends: {formatDate(purchase.free_trial_ends_on)}</span>
            </div>
          )}
          {purchase.unit_count != null && plan.unit_name && (
            <div className="flex items-center text-gray-700">
              <LucideReact.Users className="mr-2" size={16} /> <span>{purchase.unit_count} {plan.unit_name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Plan Description and Pricing */}
      <div>
        <p className="text-gray-600 line-clamp-2">{plan.description}</p>
        <div className="mt-2 flex items-center">
          {plan.price_model === 'FREE' ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="text-gray-800 font-medium">
              {purchase.billing_cycle === 'yearly'
                ? formatCurrency(plan.yearly_price_in_cents)
                : formatCurrency(plan.monthly_price_in_cents)}{' '}
              / {purchase.billing_cycle || 'cycle'}
            </span>
          )}
        </div>
      </div>

      {/* Pending Change Info */}
      {value.marketplace_pending_change && (
        <div className="p-3 bg-amber-50 border-l-4 border-amber-400 space-y-1">
          <div className="flex items-center text-amber-700">
            <LucideReact.Clock className="mr-2" size={16} /> <span>Pending Change</span>
          </div>
          {value.marketplace_pending_change.effective_date && (
            <div className="flex items-center text-amber-700">
              <LucideReact.Calendar className="mr-2" size={16} /> <span>Effective: {formatDate(value.marketplace_pending_change.effective_date)}</span>
            </div>
          )}
          {value.marketplace_pending_change.unit_count != null && plan.unit_name && (
            <div className="flex items-center text-amber-700">
              <LucideReact.Users className="mr-2" size={16} /> <span>{value.marketplace_pending_change.unit_count} {plan.unit_name}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
