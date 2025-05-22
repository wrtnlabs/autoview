import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.marketplace_listing_plan[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatPrice = (cents: number): string =>
    `$${(cents / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const capitalize = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Render each plan as a responsive card with formatted pricing, truncated description, feature bullets, and status.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((plan) => (
        <div
          key={plan.id}
          className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          {/* Header: Plan Name & Free Trial Badge */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {plan.name}
            </h2>
            {plan.has_free_trial && (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                Free Trial
              </span>
            )}
          </div>

          {/* Description: truncated for mobile-first readability */}
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {plan.description}
          </p>

          {/* Pricing Section */}
          <div className="mt-4">
            {plan.price_model === "FREE" ? (
              <span className="text-xl font-bold text-blue-600">Free</span>
            ) : plan.price_model === "FLAT_RATE" ? (
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(plan.monthly_price_in_cents)}/mo
                </span>
                <span className="text-sm text-gray-500">
                  or {formatPrice(plan.yearly_price_in_cents)}/yr
                </span>
              </div>
            ) : (
              <div className="text-xl font-bold text-gray-900">
                {formatPrice(plan.monthly_price_in_cents)}
                {plan.unit_name ? `/${plan.unit_name}` : ""}
              </div>
            )}
          </div>

          {/* Feature Bullets */}
          <ul className="mt-4 list-disc list-inside space-y-1 text-sm text-gray-700">
            {plan.bullets.map((bullet, idx) => (
              <li key={idx} className="truncate">
                {bullet}
              </li>
            ))}
          </ul>

          {/* State Badge */}
          <div className="mt-4">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                plan.state.toLowerCase() === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {capitalize(plan.state)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
