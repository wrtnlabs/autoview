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
  const contactEmail: string | null = value.organization_billing_email ?? value.email ?? null;
  const purchase = value.marketplace_purchase;
  const plan = purchase.plan ?? null;
  const seats: number = purchase.unit_count ?? 0;
  const monthlyPrice = plan ? plan.monthly_price_in_cents / 100 : 0;
  const yearlyPrice = plan ? plan.yearly_price_in_cents / 100 : 0;
  const priceModel: 'FREE' | 'FLAT_RATE' | 'PER_UNIT' = plan?.price_model ?? 'FREE';
  const billingCycle = purchase.billing_cycle ?? 'monthly';
  let displayedPrice: string;
  if (priceModel === 'FREE') {
    displayedPrice = 'Free';
  } else if (priceModel === 'FLAT_RATE') {
    const price = billingCycle === 'yearly' ? yearlyPrice : monthlyPrice;
    const suffix = billingCycle === 'yearly' ? '/yr' : '/mo';
    displayedPrice = `$${price.toFixed(2)}${suffix}`;
  } else {
    displayedPrice = `$${monthlyPrice.toFixed(2)}/unit`;
  }
  const formattedNextBilling: string = purchase.next_billing_date
    ? new Date(purchase.next_billing_date).toLocaleDateString()
    : '—';
  const onFreeTrial: boolean = purchase.on_free_trial ?? false;
  const freeTrialEnds: string | null = purchase.free_trial_ends_on
    ? new Date(purchase.free_trial_ends_on).toLocaleDateString()
    : null;
  const lastUpdated: string | null = purchase.updated_at
    ? new Date(purchase.updated_at).toLocaleDateString()
    : null;
  const pending = value.marketplace_pending_change ?? null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header: Buyer and Install Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{value.login}</h2>
          {contactEmail && (
            <div className="flex items-center text-sm text-gray-500 mt-1 truncate">
              <LucideReact.Mail size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">{contactEmail}</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          {purchase.is_installed ? (
            <LucideReact.CheckCircle
              size={20}
              className="text-green-500"
              role="img"
              aria-label="Installed"
            />
          ) : (
            <LucideReact.XCircle
              size={20}
              className="text-red-500"
              role="img"
              aria-label="Not installed"
            />
          )}
        </div>
      </div>

      {/* Plan Details */}
      {plan ? (
        <>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 truncate">{plan.name}</h3>
            {plan.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{plan.description}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
            <div className="flex items-center">
              <LucideReact.Tag size={16} className="mr-1 text-gray-400 flex-shrink-0" />
              <span>{displayedPrice}</span>
            </div>
            <div className="flex items-center">
              <LucideReact.Users size={16} className="mr-1 text-gray-400 flex-shrink-0" />
              <span>
                {seats} {seats === 1 ? 'seat' : 'seats'}
              </span>
            </div>
            <div className="flex items-center col-span-2">
              <LucideReact.Calendar size={16} className="mr-1 text-gray-400 flex-shrink-0" />
              <span>Next Billing: {formattedNextBilling}</span>
            </div>
          </div>
          {onFreeTrial && freeTrialEnds && (
            <div className="mb-4 inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              <LucideReact.Clock size={14} className="mr-1 flex-shrink-0" />
              <span>Free trial until {freeTrialEnds}</span>
            </div>
          )}
          {lastUpdated && (
            <div className="text-xs text-gray-500 mb-4 flex items-center">
              <LucideReact.Calendar size={14} className="mr-1 flex-shrink-0" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          )}
        </>
      ) : (
        <div className="text-sm text-gray-500 mb-4">Plan information unavailable.</div>
      )}

      {/* Pending Change */}
      {pending && (
        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 rounded">
          <div className="flex items-center mb-1">
            <LucideReact.AlertTriangle size={16} className="mr-1 flex-shrink-0" />
            <span className="font-medium">Pending Change</span>
          </div>
          {pending.plan && (
            <div>
              <span className="font-medium">New Plan:</span> {pending.plan.name}
            </div>
          )}
          {pending.unit_count != null && (
            <div>
              <span className="font-medium">Seats:</span> {pending.unit_count}
            </div>
          )}
          {pending.effective_date && (
            <div className="flex items-center">
              <LucideReact.Calendar size={14} className="mr-1 text-gray-500 flex-shrink-0" />
              <span>Effective: {new Date(pending.effective_date).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
