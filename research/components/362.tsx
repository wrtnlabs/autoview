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
  const purchases = value;
  // If there are no purchases, show an empty state
  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No purchases available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {purchases.map((item) => {
        // Destructure for clarity
        const {
          login,
          email,
          organization_billing_email,
          marketplace_pending_change: pending,
          marketplace_purchase,
        } = item;

        const contactEmail = email ?? organization_billing_email;
        const plan = marketplace_purchase.plan;
        const planName = plan?.name ?? 'Unknown Plan';
        const billingCycle = marketplace_purchase.billing_cycle ?? 'monthly';
        // Determine which price to show based on billing cycle
        const priceCents = plan
          ? billingCycle.toLowerCase().includes('year')
            ? plan.yearly_price_in_cents
            : plan.monthly_price_in_cents
          : 0;
        const price = (priceCents / 100).toLocaleString(undefined, {
          style: 'currency',
          currency: 'USD',
        });

        // Format dates
        const nextBilling = marketplace_purchase.next_billing_date
          ? new Date(marketplace_purchase.next_billing_date).toLocaleDateString()
          : 'N/A';
        const freeTrialEnds = marketplace_purchase.free_trial_ends_on
          ? new Date(marketplace_purchase.free_trial_ends_on).toLocaleDateString()
          : null;
        const pendingDate = pending?.effective_date
          ? new Date(pending.effective_date).toLocaleDateString()
          : null;

        const isInstalled = marketplace_purchase.is_installed;
        const onFreeTrial = marketplace_purchase.on_free_trial;
        const unitCount = marketplace_purchase.unit_count;

        return (
          <div key={item.id} className="p-4 bg-white rounded-lg shadow">
            {/* Header: Account & Contact */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <LucideReact.User className="text-gray-500" size={20} />
                <span className="font-semibold text-gray-800">{login}</span>
              </div>
              {contactEmail && (
                <div className="flex items-center gap-1">
                  <LucideReact.Mail className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-600 truncate">{contactEmail}</span>
                </div>
              )}
            </div>

            {/* Plan Title & Cycle */}
            <div className="mb-2">
              <span className="text-lg font-medium text-gray-900">{planName}</span>
              <span className="text-sm text-gray-500 ml-2 capitalize">
                {billingCycle}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-xl font-semibold text-gray-900">{price}</span>
              <span className="text-sm text-gray-500">/ {billingCycle}</span>
            </div>

            {/* Key Details */}
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} />
                <span>Next Billing: {nextBilling}</span>
              </div>
              <div className="flex items-center gap-1">
                {isInstalled ? (
                  <LucideReact.CheckCircle className="text-green-500" size={16} />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={16} />
                )}
                <span>{isInstalled ? 'Installed' : 'Not Installed'}</span>
              </div>
              {typeof unitCount === 'number' && (
                <div className="flex items-center gap-1">
                  <LucideReact.Users className="text-gray-500" size={16} />
                  <span>
                    {unitCount} {plan?.unit_name ?? 'units'}
                  </span>
                </div>
              )}
              {onFreeTrial && freeTrialEnds && (
                <div className="flex items-center gap-1">
                  <LucideReact.Clock className="text-amber-500" size={16} />
                  <span>Free trial ends on {freeTrialEnds}</span>
                </div>
              )}
            </div>

            {/* Pending Change Section */}
            {pending && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-800">
                <div className="flex items-center gap-1 mb-1">
                  <LucideReact.Clock className="text-yellow-800" size={16} />
                  <span>Pending Change</span>
                </div>
                {pendingDate && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} />
                    <span>Effective: {pendingDate}</span>
                  </div>
                )}
                {pending.plan && (
                  <div className="flex items-center gap-1">
                    <LucideReact.Tag size={16} />
                    <span>New Plan: {pending.plan.name}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
