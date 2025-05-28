import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_listing_plan[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatPrice = (cents: number) =>
    (cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

  const priceModelLabels: Record<string, string> = {
    FREE: "Free",
    FLAT_RATE: "Flat Rate",
    PER_UNIT: "Per Unit",
  };

  // Handle empty or missing data
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <LucideReact.AlertCircle size={24} aria-hidden />
        <span className="mt-2 text-sm">No pricing plans available.</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {value.map((plan) => {
        const monthly = plan.monthly_price_in_cents;
        const yearly = plan.yearly_price_in_cents;
        const unitName = plan.unit_name ?? "unit";

        // Capitalize state label
        const stateLabel =
          plan.state.charAt(0).toUpperCase() + plan.state.slice(1).toLowerCase();

        return (
          <div
            key={plan.id}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Plan Title & Description */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
              <p className="mt-2 text-gray-600 line-clamp-3">{plan.description}</p>
            </div>

            {/* Pricing */}
            <div className="mb-4">
              {plan.price_model === "FREE" ? (
                <span className="text-2xl font-bold text-green-600">Free</span>
              ) : plan.price_model === "FLAT_RATE" ? (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(monthly)}<span className="text-sm text-gray-600">/mo</span>
                  </span>
                  <div className="mt-1 text-sm text-gray-500">
                    {formatPrice(yearly)}/yr
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(monthly)}
                    <span className="text-sm text-gray-600">/{unitName}</span>
                  </span>
                </div>
              )}
              <div className="mt-1 text-xs uppercase text-gray-500">
                {priceModelLabels[plan.price_model] ?? plan.price_model}
              </div>
            </div>

            {/* Tags: Free Trial & State */}
            <div className="mb-4 flex flex-wrap gap-2">
              {plan.has_free_trial && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  <LucideReact.CheckCircle size={14} className="mr-1" aria-hidden />
                  Free Trial
                </span>
              )}
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  plan.state.toLowerCase() === "active"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {stateLabel}
              </span>
            </div>

            {/* Feature Bullets */}
            <ul className="mb-4 space-y-2">
              {plan.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start">
                  <LucideReact.Check size={16} className="mt-1 text-blue-500" aria-hidden />
                  <span className="ml-2 text-gray-700 text-sm">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* URL */}
            <div className="mt-auto flex items-center text-sm text-gray-500 truncate">
              <LucideReact.Link size={16} className="mr-1 flex-shrink-0" aria-hidden />
              <span className="truncate">{plan.url}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
