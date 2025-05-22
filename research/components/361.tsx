import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    (cents / 100).toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {value.map((plan) => {
        // Derived display values
        const isFree = plan.price_model === "FREE";
        const monthlyLabel = isFree
          ? "Free"
          : `${formatPrice(plan.monthly_price_in_cents)}${
              plan.price_model === "PER_UNIT" && plan.unit_name
                ? ` / ${plan.unit_name}`
                : "/mo"
            }`;
        const yearlyLabel = isFree
          ? "Free"
          : `${formatPrice(plan.yearly_price_in_cents)}/yr`;
        const isActive = plan.state.toLowerCase() === "active";

        return (
          <div
            key={plan.id}
            className="flex flex-col bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            {/* Header: Plan name and active state */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {plan.name}
              </h3>
              {isActive ? (
                <LucideReact.CheckCircle className="text-green-500" size={20} />
              ) : (
                <LucideReact.XCircle className="text-gray-400" size={20} />
              )}
            </div>

            {/* Description (truncated) */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {plan.description}
            </p>

            {/* Pricing */}
            <div className="mb-4 space-y-1">
              <div className="text-gray-800">
                <span className="font-medium">Monthly:</span> {monthlyLabel}
              </div>
              <div className="text-gray-800">
                <span className="font-medium">Yearly:</span> {yearlyLabel}
              </div>
            </div>

            {/* Free trial badge */}
            {plan.has_free_trial && (
              <div className="inline-flex items-center px-2 py-1 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                <LucideReact.Clock className="mr-1" size={16} />
                Free Trial
              </div>
            )}

            {/* Feature bullets (limit to first 5) */}
            {plan.bullets.length > 0 && (
              <ul className="space-y-2 mt-auto">
                {plan.bullets.slice(0, 5).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-gray-700 text-sm"
                  >
                    <LucideReact.Check
                      className="mt-0.5 text-green-500"
                      size={16}
                      strokeWidth={2}
                    />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}
