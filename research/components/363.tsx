import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  // 1. Data transformation and derived values
  const {
    login,
    email,
    organization_billing_email,
    url,
    marketplace_purchase,
    marketplace_pending_change,
  } = value;

  const current = marketplace_purchase;
  const plan = current.plan;
  const pending = marketplace_pending_change ?? undefined;

  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const formatPrice = (cents: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  const isInstalled = current.is_installed ?? false;
  const billingCycle = current.billing_cycle ?? "—";
  const nextBilling = formatDate(current.next_billing_date);
  const onFreeTrial = current.on_free_trial ?? false;
  const freeTrialEnds = formatDate(current.free_trial_ends_on);

  const unitName = plan?.unit_name ?? "Units";
  const unitCount =
    current.unit_count != null ? `${current.unit_count} ${unitName}` : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg space-y-4">
      {/* User & Account Info */}
      <div className="flex items-center space-x-3">
        <LucideReact.User className="text-gray-500" size={20} />
        <span className="font-medium text-gray-800">{login}</span>
      </div>
      {email && (
        <div className="flex items-center space-x-2">
          <LucideReact.Mail className="text-gray-400" size={16} />
          <span className="text-gray-600 truncate">{email}</span>
        </div>
      )}
      {organization_billing_email && (
        <div className="flex items-center space-x-2">
          <LucideReact.Mail className="text-gray-400" size={16} />
          <span className="text-gray-600 truncate">
            {organization_billing_email}
          </span>
        </div>
      )}
      {url && (
        <div className="flex items-center space-x-2">
          <LucideReact.Link className="text-gray-400" size={16} />
          <span className="text-blue-600 truncate">{url}</span>
        </div>
      )}

      <hr className="border-gray-200" />

      {/* Current Plan */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-800">Current Plan</span>
          {isInstalled ? (
            <LucideReact.CheckCircle
              className="text-green-500"
              size={18}
              aria-label="Installed"
            />
          ) : (
            <LucideReact.XCircle
              className="text-red-500"
              size={18}
              aria-label="Not Installed"
            />
          )}
        </div>
        {plan && (
          <div className="space-y-1 text-gray-700 text-sm">
            <div className="font-medium">{plan.name}</div>
            <div>
              <span className="font-semibold">
                {formatPrice(plan.monthly_price_in_cents)}
              </span>{" "}
              / month &nbsp;|&nbsp;{" "}
              <span className="font-semibold">
                {formatPrice(plan.yearly_price_in_cents)}
              </span>{" "}
              / year
            </div>
            {unitCount && (
              <div className="flex items-center space-x-1">
                <LucideReact.Tag className="text-gray-400" size={16} />
                <span>{unitCount}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <LucideReact.Calendar className="text-gray-400" size={16} />
              <span>Next Billing: {nextBilling}</span>
            </div>
            {onFreeTrial && (
              <div className="flex items-center space-x-1 text-blue-600">
                <LucideReact.Clock size={16} />
                <span>Free Trial until {freeTrialEnds}</span>
              </div>
            )}
            {plan.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {plan.description}
              </p>
            )}
            {plan.bullets && plan.bullets.length > 0 && (
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-0.5">
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
        )}
      </div>

      {/* Pending Change */}
      {pending && (
        <div className="space-y-2 p-3 bg-yellow-50 border-l-4 border-amber-300 rounded">
          <div className="flex items-center space-x-2">
            <LucideReact.Clock className="text-amber-500" size={18} />
            <span className="font-semibold text-amber-700">Pending Change</span>
          </div>
          <div className="text-gray-700 text-sm space-y-1">
            {pending.effective_date && (
              <div>
                <span className="font-medium">Effective:</span>{" "}
                {formatDate(pending.effective_date)}
              </div>
            )}
            {pending.plan && (
              <div className="flex items-center space-x-1">
                <LucideReact.Edit3 className="text-amber-500" size={16} />
                <span>New Plan: {pending.plan.name}</span>
              </div>
            )}
            {pending.unit_count != null && (
              <div className="flex items-center space-x-1">
                <LucideReact.Tag className="text-amber-500" size={16} />
                <span>
                  Units: {pending.unit_count}{" "}
                  {pending.plan?.unit_name ?? unitName}
                </span>
              </div>
            )}
            {pending.is_installed != null && (
              <div className="flex items-center space-x-1">
                {pending.is_installed ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={16} />
                )}
                <span>{pending.is_installed ? "Install" : "Uninstall"}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
