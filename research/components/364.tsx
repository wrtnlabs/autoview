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
  // 1. Define data aggregation/transformation functions or derived constants
  const plans = value;
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  const formatState = (state: string) => {
    const lower = state.toLowerCase();
    if (lower === "active") {
      return { label: "Active", color: "bg-green-100 text-green-800" };
    }
    if (lower === "pending") {
      return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
    }
    if (lower === "inactive" || lower === "disabled") {
      return { label: "Inactive", color: "bg-red-100 text-red-800" };
    }
    return {
      label: state.charAt(0).toUpperCase() + state.slice(1),
      color: "bg-gray-100 text-gray-800",
    };
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No plans available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => {
        const { label: stateLabel, color: stateColor } = formatState(
          plan.state,
        );
        const monthly = currencyFormatter.format(
          plan.monthly_price_in_cents / 100,
        );
        const yearly = currencyFormatter.format(
          plan.yearly_price_in_cents / 100,
        );

        return (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col"
          >
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <p className="mt-2 text-gray-600 text-sm line-clamp-3 overflow-hidden">
              {plan.description}
            </p>

            <div className="mt-4">
              {plan.price_model === "FREE" ? (
                <div className="flex items-center text-green-600 font-semibold">
                  <LucideReact.CheckCircle size={20} className="mr-1" />
                  <span>Free</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-xl font-semibold text-gray-900">
                      {monthly}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      /mo
                      {plan.price_model === "PER_UNIT" && plan.unit_name
                        ? ` per ${plan.unit_name}`
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-semibold text-gray-900">
                      {yearly}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      /yr
                      {plan.price_model === "PER_UNIT" && plan.unit_name
                        ? ` per ${plan.unit_name}`
                        : ""}
                    </span>
                  </div>
                </div>
              )}

              {plan.has_free_trial && (
                <div className="mt-2 flex items-center text-teal-600">
                  <LucideReact.Sun size={16} className="mr-1" />
                  <span className="text-sm font-medium">
                    Free Trial Available
                  </span>
                </div>
              )}
            </div>

            {plan.bullets.length > 0 && (
              <ul className="mt-4 list-disc list-inside space-y-1 text-gray-700 text-sm flex-1">
                {plan.bullets.map((bullet, idx) => (
                  <li key={idx} className="truncate">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <span
                className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${stateColor}`}
              >
                {stateLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
