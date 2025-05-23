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
  const plans = value;
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!plans || plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span>No plans available</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {plan.name}
            </h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {plan.description}
            </p>

            <div className="mt-4">
              {plan.price_model === "FREE" ? (
                <span className="text-2xl font-bold text-gray-900">Free</span>
              ) : (
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(plan.monthly_price_in_cents)}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">/mo</span>
                  </div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-lg font-medium text-gray-700">
                      {formatPrice(plan.yearly_price_in_cents)}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">/yr</span>
                  </div>
                  {plan.price_model === "PER_UNIT" && plan.unit_name && (
                    <span className="mt-1 text-sm text-gray-500">
                      per {plan.unit_name}
                    </span>
                  )}
                </div>
              )}
            </div>

            {plan.has_free_trial && (
              <div className="mt-3 inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs font-medium">
                <LucideReact.Clock size={12} className="mr-1" />
                <span>Free trial</span>
              </div>
            )}

            {plan.bullets && plan.bullets.length > 0 && (
              <ul className="mt-4 space-y-2 flex-1">
                {plan.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start">
                    <LucideReact.CheckCircle
                      size={16}
                      className="mt-0.5 text-green-500 flex-shrink-0"
                    />
                    <p className="ml-2 text-sm text-gray-700">{bullet}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center text-sm text-gray-500">
            <LucideReact.Tag size={16} className="mr-1" />
            <span>
              {plan.state.charAt(0).toUpperCase() + plan.state.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
