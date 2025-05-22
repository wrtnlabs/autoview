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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_purchase[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  const formatPrice = (
    cents?: number,
    model?: "FREE" | "FLAT_RATE" | "PER_UNIT",
  ): string => {
    if (!model || model === "FREE" || cents === undefined) return "Free";
    const dollars = (cents / 100).toFixed(2);
    switch (model) {
      case "FLAT_RATE":
        return `$${dollars}/mo`;
      case "PER_UNIT":
        return `$${dollars}/unit`;
      default:
        return `$${dollars}`;
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {value.map((purchase) => {
        const {
          id,
          login,
          organization_billing_email,
          email,
          url,
          type,
          marketplace_pending_change,
          marketplace_purchase,
        } = purchase;
        const plan = marketplace_purchase.plan;
        const pending = marketplace_pending_change;
        return (
          <div
            key={id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Header: User and Organization */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <LucideReact.User className="text-gray-500" size={16} />
                <span className="font-medium text-gray-800">{login}</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideReact.Mail className="text-gray-400" size={16} />
                <span className="text-gray-600 truncate max-w-xs">
                  {organization_billing_email || email || "—"}
                </span>
              </div>
            </div>

            {/* Link & Type */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <LucideReact.Link size={16} />
              <a
                href={url}
                className="truncate hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
                title={url}
              >
                {url}
              </a>
              <span className="ml-auto capitalize">{type}</span>
            </div>

            {/* Plan Details */}
            {plan && (
              <div className="mb-4">
                <h3 className="text-gray-900 font-semibold">{plan.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {plan.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <LucideReact.Star size={16} className="text-yellow-400" />
                    <span>
                      {formatPrice(
                        plan.monthly_price_in_cents,
                        plan.price_model,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} className="text-gray-400" />
                    <span>
                      {plan.has_free_trial ? "Trial available" : "No trial"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Purchase Status */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                {marketplace_purchase.is_installed ? (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                  />
                ) : (
                  <LucideReact.XCircle size={16} className="text-red-500" />
                )}
                <span>
                  {marketplace_purchase.is_installed
                    ? "Installed"
                    : "Not installed"}
                </span>
              </div>
              {marketplace_purchase.unit_count != null && (
                <div className="flex items-center gap-1">
                  <LucideReact.Users size={16} className="text-gray-500" />
                  <span>{marketplace_purchase.unit_count} units</span>
                </div>
              )}
              {marketplace_purchase.on_free_trial && (
                <div className="flex items-center gap-1">
                  <LucideReact.Clock size={16} className="text-amber-500" />
                  <span>
                    Trial ends{" "}
                    {formatDate(marketplace_purchase.free_trial_ends_on)}
                  </span>
                </div>
              )}
              {marketplace_purchase.next_billing_date && (
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="text-gray-400" />
                  <span>
                    Next billing{" "}
                    {formatDate(marketplace_purchase.next_billing_date)}
                  </span>
                </div>
              )}
            </div>

            {/* Pending Change */}
            {pending && (
              <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-amber-500 rounded">
                <div className="flex items-center gap-2 text-amber-700">
                  <LucideReact.AlertTriangle size={16} />
                  <span className="font-medium">Pending Change</span>
                </div>
                <div className="mt-2 text-sm text-amber-800">
                  {pending.plan && (
                    <div>
                      New Plan: <strong>{pending.plan.name}</strong>
                    </div>
                  )}
                  {pending.unit_count != null && (
                    <div>Units: {pending.unit_count}</div>
                  )}
                  {pending.effective_date && (
                    <div>Effective {formatDate(pending.effective_date)}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
