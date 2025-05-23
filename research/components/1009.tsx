import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface combined_billing_usage {
        /**
         * Numbers of days left in billing cycle.
        */
        days_left_in_billing_cycle: number & tags.Type<"int32">;
        /**
         * Estimated storage space (GB) used in billing cycle.
        */
        estimated_paid_storage_for_month: number & tags.Type<"int32">;
        /**
         * Estimated sum of free and paid storage space (GB) used in billing cycle.
        */
        estimated_storage_for_month: number & tags.Type<"int32">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.combined_billing_usage;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    days_left_in_billing_cycle,
    estimated_paid_storage_for_month,
    estimated_storage_for_month,
  } = value;

  // Calculate percent of storage used, safeguarding against division by zero
  const percentUsed =
    estimated_storage_for_month > 0
      ? (estimated_paid_storage_for_month / estimated_storage_for_month) * 100
      : 0;

  // Format percentage to one decimal place
  const percentLabel = `${percentUsed.toFixed(1)}% used`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">
        Billing Cycle Usage
      </h2>

      <div className="mt-3 flex items-center text-gray-600 text-sm">
        <LucideReact.Calendar
          className="mr-1 flex-shrink-0"
          size={16}
          aria-hidden="true"
        />
        <span>
          {days_left_in_billing_cycle}{" "}
          {days_left_in_billing_cycle === 1 ? "day" : "days"} left
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-gray-600 text-sm">
          <LucideReact.Database
            className="mr-1 flex-shrink-0"
            size={16}
            aria-hidden="true"
          />
          <span>
            {estimated_paid_storage_for_month} / {estimated_storage_for_month}{" "}
            GB
          </span>
        </div>

        <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-500 h-2"
            style={{ width: `${percentUsed}%` }}
          />
        </div>

        <div className="mt-1 text-right text-xs text-gray-500">
          {percentLabel}
        </div>
      </div>
    </div>
  );
}
