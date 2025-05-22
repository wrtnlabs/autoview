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
  // Utility: format cents into USD currency string
  const formatPrice = (cents: number): string =>
    (cents / 100).toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

  // Compose JSX for each plan card
  const cards = value.map((plan) => {
    // Determine price display based on price_model
    let priceDisplay: string;
    switch (plan.price_model) {
      case "FREE":
        priceDisplay = "Free";
        break;
      case "FLAT_RATE":
        priceDisplay = `${formatPrice(plan.monthly_price_in_cents)}/mo • ${formatPrice(
          plan.yearly_price_in_cents,
        )}/yr`;
        break;
      case "PER_UNIT":
        const unit = plan.unit_name ?? "unit";
        priceDisplay = `${formatPrice(plan.monthly_price_in_cents)}/${unit}`;
        break;
      default:
        priceDisplay = formatPrice(plan.monthly_price_in_cents);
    }

    return (
      <div
        key={plan.id}
        className="bg-white rounded-lg shadow-md p-6 flex flex-col"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
          {plan.has_free_trial && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase font-medium">
              Free Trial
            </span>
          )}
        </div>
        <p className="text-gray-700 mt-2 line-clamp-3">{plan.description}</p>
        <div className="mt-4 text-xl font-bold text-gray-900">{priceDisplay}</div>
        {plan.bullets.length > 0 && (
          <ul className="mt-3 space-y-1 list-disc list-inside text-gray-700 text-sm">
            {plan.bullets.map((bullet, idx) => (
              <li key={idx} className="truncate">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  });

  // Render grid of plan cards
  return (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards}
    </div>
  );
}
